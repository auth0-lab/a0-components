"use client";

import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { factorsMapper } from "./lib/factors-mapper";
import openPopupWindow from "./open-popup-window";

type MfaEnrollment = {
  name: string;
  enabled: boolean;
  enrollmentId?: string;
};

export default function MFAForm({ factors }: { factors?: MfaEnrollment[] }) {
  const [currentFactors, setCurrentFactors] = useState(factors || []);
  const [isEnrolling, setIsEnrolling] = useState<string | null>(null);

  const fetchFactors = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/mfa", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setCurrentFactors(data.filter((factor: any) => factor.enabled));

      console.log(JSON.stringify(data.filter((factor: any) => factor.enabled)));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const createEnrollment = useCallback(async (factor: string) => {
    try {
      const response = await fetch("/api/auth/mfa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ factor }),
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteEnrollment = useCallback(async (enrollmentId: string) => {
    try {
      const response = await fetch(`/api/auth/mfa/${enrollmentId}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!factors) {
      fetchFactors();
    }
  }, [factors, fetchFactors]);

  const handleEnrollment = (factor: string) => async () => {
    setIsEnrolling(factor);
    const { ticket_url } = await createEnrollment(factor);

    const enrollmentPopupWindow = openPopupWindow({
      url: ticket_url,
      title: "",
      width: 600,
      height: 800,
      scrollbars: true,
      focus: true,
    });

    const timer = setInterval(async () => {
      if (enrollmentPopupWindow && enrollmentPopupWindow.closed) {
        setIsEnrolling(null);
        clearInterval(timer);
        fetchFactors();
      }
    }, 0);
  };

  const handleRemoveEnrloment = (enrollmentId: string) => async () => {
    await deleteEnrollment(enrollmentId);
    fetchFactors();
  };

  return (
    <>
      {currentFactors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-normal">
              Multi-Factor Authentication
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6">
            {currentFactors
              .filter((factor: any) => factor.enabled)
              .map((factor: any, idx: number) => {
                const meta = factorsMapper[factor.name];

                return (
                  <>
                    {idx > 0 && <Separator />}
                    <div
                      key={factor.name}
                      className="flex items-center justify-between space-x-2"
                    >
                      <Label
                        htmlFor="performance"
                        className="flex flex-col space-y-1"
                      >
                        <span>
                          {meta.title}
                          {factor.enrollmentId && (
                            <Badge
                              variant="default"
                              className="h-fit bg-green-300 text-black ml-3 font-light hover:bg-green-300"
                            >
                              Enrolled
                            </Badge>
                          )}
                        </span>
                        <p className="font-normal leading-snug text-muted-foreground max-w-fit">
                          {meta.description}
                        </p>
                      </Label>
                      <div
                        className={`flex space-x-24 items-center justify-end min-w-72`}
                      >
                        {factor.enrollmentId ? (
                          <Button
                            className="h-fit"
                            variant="outline"
                            onClick={handleRemoveEnrloment(factor.enrollmentId)}
                          >
                            Remove
                          </Button>
                        ) : (
                          <Button
                            className="h-fit"
                            variant="default"
                            onClick={handleEnrollment(factor.name)}
                            disabled={isEnrolling === factor.name}
                          >
                            {isEnrolling === factor.name && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Enroll
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
          </CardContent>
        </Card>
      )}
    </>
  );
}
