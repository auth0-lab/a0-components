"use client";

import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const factorsMapper: any = {
  sms: {
    title: "Phone Message",
    description: "Users will receive a phone message with a verification code",
  },
  "push-notification": {
    title: "Push Notification using Auth0 Guardian",
    description: "Provide a push notification using Auth0 Guardian.",
  },
  otp: {
    title: "One-time Password",
    description:
      "Provide a one-time password using Google Authenticator or similar.",
  },
  email: {
    title: "Email",
    description:
      "Users will receive an email message containing a verification code.",
  },
  duo: {
    title: "Duo Security",
    description: "Use your DUO account for Multi-factor Authentication.",
  },
  "webauthn-roaming": {
    title: "WebAuthn with FIDO Security Keys",
    description:
      "Depending on your browser, you can use WebAuthn-compliant security keys (like FIDO2) as a second factor of authentication.",
  },
  "webauthn-platform": {
    title: "WebAuthn with FIDO Device Biometrics",
    description:
      "Depending on your browser, you can use WebAuthn-compliant device biometrics as a second factor of authentication",
  },
  "recovery-code": {
    title: "Recovery Code",
    description:
      "Provide a unique code that allows users to regain access to their account.",
  },
};

export default function MFAForm() {
  const [factors, setFactors] = useState([]);
  const fetchFactors = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/mfa", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await response.json();

      setFactors(data.filter((factor: any) => factor.enabled));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchFactors();
  }, [fetchFactors]);

  return (
    <>
      {factors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-normal">
              Multi-Factor Authentication
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6">
            {factors
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
                        <span>{meta.title}</span>
                        <p className="font-normal leading-snug text-muted-foreground max-w-fit">
                          {meta.description}
                        </p>
                      </Label>
                      <div className="flex space-x-24">
                        <Badge
                          variant="outline"
                          className="font-medium rounded-lg min-w-24"
                        >
                          Not enrolled
                        </Badge>
                        <Switch id="performance" />
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
