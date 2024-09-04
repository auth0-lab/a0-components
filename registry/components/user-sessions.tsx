"use client";

import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

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

interface KeyValueMap {
  [key: string]: any;
}

type UserSessionsProps = {
  user: KeyValueMap;
  sessions?: KeyValueMap[];
  onFetch: () => Promise<{ sessions?: KeyValueMap[]; status: number }>;
  onDelete: (sessionId: string) => Promise<{
    id?: string;
    status: number;
  }>;
};

export default function UserSessions({
  user,
  sessions,
  onFetch,
  onDelete,
}: UserSessionsProps) {
  const { toast } = useToast();
  const [currentSessions, setCurrentSessions] = useState<
    KeyValueMap[] | undefined
  >(sessions);
  const [fetching, setFetching] = useState(false);
  const [isRevokingSession, setIsRevokingSession] = useState<string | null>(
    null
  );

  const handleRevokeSession = (sessionId: string) => async () => {
    setIsRevokingSession(sessionId);
    const response = await onDelete(sessionId);

    if (response.status !== 200) {
      setIsRevokingSession(null);

      return toast({
        title: "Info",
        description:
          "There was a problem removing the session. Try again later.",
      });
    }

    const { id } = response;

    setCurrentSessions((prev) => prev?.filter((session) => session.id !== id));

    setIsRevokingSession(null);
  };

  const handleFetchSessions = useCallback(
    async function handleFetchSessions() {
      setFetching(true);
      const response = await onFetch();

      if (response.status !== 200) {
        return setFetching(false);
      }

      setCurrentSessions(response.sessions);
      setFetching(false);
    },
    [onFetch]
  );

  useEffect(() => {
    (async () => {
      if (!sessions) {
        await handleFetchSessions();
      }
    })();
  }, [sessions, handleFetchSessions]);

  return (
    <>
      <Toaster />
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg font-normal">Active Sessions</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 p-4 pt-0 md:p-6 md:pt-0">
          {fetching && (
            <div className="flex w-full items-center justify-left">
              <Spinner />
              <span className="text-sm text-muted-foreground">
                Retrieving your active sessions...
              </span>
            </div>
          )}

          {!currentSessions && !fetching && (
            <div className="flex flex-col gap-6">
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label className="flex flex-col space-y-2">
                  <p className="font-normal leading-snug text-muted-foreground max-w-fit">
                    There was a problem listing all user sessions. Try again
                    later.
                  </p>
                </Label>
              </div>
            </div>
          )}

          {currentSessions &&
            currentSessions
              .sort(({ id }) => (id === user.sid ? -1 : 1))
              .map((session, idx) => {
                const { id } = session;
                const lastUA = new UAParser(
                  session.device?.last_user_agent || "unknown"
                ).getResult();

                return (
                  <div
                    key={`session-${idx}-${id}`}
                    className="flex flex-col gap-6"
                  >
                    {idx > 0 && <Separator />}
                    <div
                      key={id}
                      className="flex flex-col md:flex-row items-center justify-between md:space-x-2 space-y-6 md:space-y-0"
                    >
                      <Label className="flex flex-col space-y-1">
                        <span className="leading-6">
                          {`Session on ${lastUA.browser.name} - ${lastUA.os.name} [${lastUA.os.version}]`}

                          {id === user.sid && (
                            <Badge
                              variant="default"
                              className="h-fit bg-green-300 text-black ml-3 font-light hover:bg-green-300"
                            >
                              Current
                            </Badge>
                          )}
                        </span>
                        <p className="font-normal leading-snug text-muted-foreground max-w-fit">
                          Last activity{" "}
                          <span
                            className="underline decoration-dotted cursor-help"
                            title={session.updated_at}
                          >
                            {moment(session.updated_at).fromNow()}
                          </span>{" "}
                          from location{" "}
                          <span
                            className="underline decoration-dotted cursor-help"
                            title={session.device?.last_ip}
                          >
                            {session.device?.last_ip}
                          </span>
                          .
                          <br />
                          First sign-in on{" "}
                          <span
                            className="underline decoration-dotted cursor-help"
                            title={session.created_at}
                          >
                            {moment(session.created_at).format(
                              "MMMM DD, YYYY \\a\\t HH:MM:SS"
                            )}
                          </span>
                          .
                        </p>
                      </Label>
                      <div className="flex space-x-24 items-center justify-end md:min-w-24">
                        <Button
                          className="h-fit min-w-24"
                          variant="outline"
                          onClick={handleRevokeSession(id)}
                          disabled={isRevokingSession === id}
                        >
                          {isRevokingSession === id && <Spinner />}
                          Sign out
                        </Button>
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
