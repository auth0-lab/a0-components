"use client";

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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

type MfaEnrollment = {
  name: string;
  enabled: boolean;
  enrollmentId?: string;
};

type CreateEnrollmentResponse = { ticket_url: string };

type DeleteEnrollmentResponse = { id: string };

interface IPopupWindow {
  width: number;
  height: number;
  title: string;
  url: string;
  focus: boolean;
  scrollbars: boolean;
}

const factorsMeta: {
  [key: string]: any;
} = {
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

function openPopupWindow(popupOptions: IPopupWindow): Window | null {
  {
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - popupOptions.width) / 2 / systemZoom + dualScreenLeft;
    const top = (height - popupOptions.height) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      popupOptions.url,
      popupOptions.title,
      `scrollbars=${popupOptions.scrollbars ? "yes" : "no"},
      width=${popupOptions.width / systemZoom},
      height=${popupOptions.height / systemZoom},
      top=${top},
      left=${left}
      `
    );
    newWindow!.opener = null;
    if (popupOptions.focus) {
      newWindow!.focus();
    }
    return newWindow;
  }
}

function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2 animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
  );
}

type MFAEnrollmentProps = {
  factors?: MfaEnrollment[];
  onFetch: () => Promise<{ factors?: MfaEnrollment[]; status: number }>;
  onCreate: (factor: string) => Promise<{
    enrollment?: CreateEnrollmentResponse | undefined;
    status: number;
  }>;
  onDelete: (enrollmentId: string) => Promise<{
    enrollment?: DeleteEnrollmentResponse;
    status: number;
  }>;
};

export default function MFAEnrollment({
  factors,
  onFetch,
  onCreate,
  onDelete,
}: MFAEnrollmentProps) {
  const { toast } = useToast();
  const [currentFactors, setCurrentFactors] = useState<
    MfaEnrollment[] | undefined
  >(factors);
  const [isEnrolling, setIsEnrolling] = useState<string | null>(null);
  const [isRemovingEnrollment, setIsRemovingEnrollment] = useState<
    string | null
  >(null);
  const [fetching, setFetching] = useState(false);

  const handleCreateEnrollment = (factor: string) => async () => {
    setIsEnrolling(factor);

    const response = await onCreate(factor);

    if (response.status !== 200) {
      setIsEnrolling(null);

      return toast({
        title: "Info",
        description:
          "There was a problem starting the enrollment process. Try again later.",
      });
    }

    const { ticket_url } = response.enrollment!;
    const enrollmentPopupWindow = openPopupWindow({
      url: ticket_url,
      title: "",
      width: 450,
      height: 720,
      scrollbars: true,
      focus: true,
    });

    const timer = setInterval(async () => {
      if (enrollmentPopupWindow && enrollmentPopupWindow.closed) {
        setIsEnrolling(null);
        clearInterval(timer);
        await handleFetching();
      }
    }, 0);
  };

  const handleRemoveEnrollment = (enrollmentId: string) => async () => {
    setIsRemovingEnrollment(enrollmentId);
    const response = await onDelete(enrollmentId);

    if (response.status !== 200) {
      setIsRemovingEnrollment(null);

      return toast({
        title: "Info",
        description:
          "There was a problem removing the enrollment. Try again later.",
      });
    }

    const { id } = response.enrollment!;

    setCurrentFactors((prev) =>
      prev?.map((factor) =>
        factor.enrollmentId === id
          ? { ...factor, enrollmentId: undefined }
          : factor
      )
    );

    setIsRemovingEnrollment(null);
  };

  const handleFetching = useCallback(
    async function handleFetching() {
      setFetching(true);
      const response = await onFetch();

      if (response.status !== 200) {
        return setFetching(false);
      }

      setCurrentFactors(response.factors);
      setFetching(false);
    },
    [onFetch]
  );

  useEffect(() => {
    (async () => {
      if (!factors) {
        await handleFetching();
      }
    })();
  }, [factors, handleFetching]);

  return (
    <>
      <Toaster />
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg font-normal">
            Multi-Factor Authentication
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 p-4 pt-0 md:p-6 md:pt-0">
          {fetching && (
            <div className="flex w-full items-center justify-left">
              <Spinner />
              <span className="text-sm text-muted-foreground">
                Fetching MFA factors...
              </span>
            </div>
          )}
          {!currentFactors && !fetching && (
            <div className="flex flex-col gap-6">
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label className="flex flex-col space-y-2">
                  <p className="font-normal leading-snug text-muted-foreground max-w-fit">
                    There was a problem listing MFA factors. Try again later.
                  </p>
                </Label>
              </div>
            </div>
          )}
          {currentFactors &&
            currentFactors.length > 0 &&
            !fetching &&
            currentFactors
              .filter((factor: any) => factor.enabled)
              .map((factor: any, idx: number) => {
                const meta = factorsMeta[factor.name];

                return (
                  <div
                    key={`${meta.name}-${idx}`}
                    className="flex flex-col gap-6"
                  >
                    {idx > 0 && <Separator />}
                    <div
                      key={factor.name}
                      className="flex flex-col md:flex-row items-center justify-between md:space-x-2 space-y-6 md:space-y-0"
                    >
                      <Label className="flex flex-col space-y-1">
                        <span className="leading-6">
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
                      <div className="flex space-x-24 items-center justify-end md:min-w-72">
                        {factor.enrollmentId ? (
                          <Button
                            className="h-fit min-w-24"
                            variant="outline"
                            onClick={handleRemoveEnrollment(
                              factor.enrollmentId
                            )}
                            disabled={
                              isRemovingEnrollment === factor.enrollmentId
                            }
                          >
                            {isRemovingEnrollment === factor.enrollmentId && (
                              <Spinner />
                            )}
                            Remove
                          </Button>
                        ) : (
                          <Button
                            className="h-fit min-w-24"
                            variant="default"
                            onClick={handleCreateEnrollment(factor.name)}
                            disabled={isEnrolling === factor.name}
                          >
                            {isEnrolling === factor.name && <Spinner />}
                            Enroll
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
        </CardContent>
      </Card>
    </>
  );
}
