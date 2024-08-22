"use client";

import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

interface KeyValueMap {
  [key: string]: any;
}

interface IPopupWindow {
  width: number;
  height: number;
  title: string;
  url: string;
  focus: boolean;
  scrollbars: boolean;
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
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
  );
}

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

export default function OrganizationSSO({
  orgId,
  connections,
  onConfigure,
  onUpdateConfiguration,
  onFetch,
  onDelete,
}: {
  orgId: string;
  connections?: KeyValueMap[];
  onFetch: (id: string) => Promise<KeyValueMap>;
  onConfigure?: (values: KeyValueMap) => Promise<{
    selfService?: KeyValueMap;
    status: number;
  }>;
  onUpdateConfiguration: (values: KeyValueMap) => Promise<{
    selfService?: KeyValueMap;
    status: number;
  }>;
  onDelete: (id: string, connection_id: string) => Promise<KeyValueMap>;
}) {
  const [fetching, setFetching] = useState(false);
  const [defaultValues, setDefaultValues] = useState<KeyValueMap[] | undefined>(
    connections
  );
  const { toast } = useToast();
  const [working, setWorking] = useState<boolean>(false);
  const [isConfiguring, setIsConfiguring] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  async function onStartSelfService(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setWorking(true);

    if (typeof onConfigure === "function") {
      const response = await onConfigure({
        organizations_to_enable: [orgId],
      });

      if (response.status !== 200) {
        toast({
          title: "Info",
          description:
            "There was a problem creating connection. Try again later.",
        });
      }

      if (response.selfService) {
        const enrollmentPopupWindow = openPopupWindow({
          url: response.selfService.ticket,
          title: "",
          width: 1080,
          height: 768,
          scrollbars: true,
          focus: true,
        });

        const timer = setInterval(async () => {
          if (enrollmentPopupWindow && enrollmentPopupWindow.closed) {
            setWorking(false);
            clearInterval(timer);
            await handleFetching();
          }
        }, 0);
      }
    }
  }

  function onStartSelfServiceConnectionUpdate(connection_id: string) {
    return async () => {
      setIsConfiguring(connection_id);

      if (typeof onConfigure === "function") {
        const response = await onUpdateConfiguration({
          connection_id,
          organizations_to_enable: [orgId],
        });

        if (response.status !== 200) {
          toast({
            title: "Info",
            description:
              "There was a problem updating connection. Try again later.",
          });
        }

        if (response.selfService) {
          const enrollmentPopupWindow = openPopupWindow({
            url: response.selfService.ticket,
            title: "",
            width: 1080,
            height: 768,
            scrollbars: true,
            focus: true,
          });

          const timer = setInterval(async () => {
            if (enrollmentPopupWindow && enrollmentPopupWindow.closed) {
              setIsConfiguring(null);
              clearInterval(timer);
              await handleFetching();
            }
          }, 0);
        }
      }
    };
  }

  const handleFetching = useCallback(
    async function handleFetching() {
      setFetching(true);
      const response = await onFetch(orgId);

      if (response.status !== 200) {
        return setFetching(false);
      }

      setDefaultValues(response.connections);

      setFetching(false);
    },
    [onFetch, orgId]
  );

  function handleOnDelete(connection_id: string) {
    return async () => {
      setIsRemoving(connection_id);
      const response = await onDelete(orgId, connection_id);

      if (response.status !== 200) {
        return setIsRemoving(null);
      }

      setIsRemoving(null);
      await handleFetching();
    };
  }

  useEffect(() => {
    (async () => {
      if (!defaultValues) {
        await handleFetching();
      }
    })();
  }, [defaultValues, handleFetching]);

  return (
    <>
      <Toaster />
      <Card className="w-full">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg font-normal">Single sign-on </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        {fetching && (
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
            <div className="flex w-full items-center justify-left gap-2">
              <Spinner />
              <span className="text-sm text-muted-foreground">
                Fetching Connections...
              </span>
            </div>
          </CardContent>
        )}

        {!defaultValues && !fetching && (
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
            <div className="flex flex-col gap-6">
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label className="flex flex-col space-y-2">
                  <p className="font-normal leading-snug text-muted-foreground max-w-fit">
                    There was a problem retrieving connections. Try again later.
                  </p>
                </Label>
              </div>
            </div>
          </CardContent>
        )}

        {defaultValues && !fetching && (
          <CardContent className="grid gap-6 p-4 pt-0 md:p-6 md:pt-0">
            {defaultValues.map((value: any) => {
              return (
                <div key={value.connection_id} className="flex flex-col gap-6">
                  <div
                    key={value.connection.name}
                    className="flex flex-col md:flex-row items-center justify-between md:space-x-2 space-y-6 md:space-y-0"
                  >
                    <Label className="flex flex-row  items-center">
                      <Badge
                        variant="default"
                        className="min-h-[38px] px-6 bg-transparent border-neutral-200 rounded-sm font-medium text-black hover:bg-transparent uppercase"
                      >
                        {value.connection.strategy}
                      </Badge>
                    </Label>
                    <div className="flex gap-2 items-center justify-end md:min-w-72">
                      <Button
                        className="h-fit min-w-24 border-black flex gap-2"
                        variant="outline"
                        onClick={onStartSelfServiceConnectionUpdate(
                          value.connection_id
                        )}
                        disabled={isConfiguring === value.connection_id}
                      >
                        {isConfiguring === value.connection_id && <Spinner />}
                        Configure
                      </Button>
                      <Button
                        className="h-fit min-h-[38px] pl-2 pr-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white justify-center"
                        variant="outline"
                        onClick={handleOnDelete(value.connection_id)}
                        disabled={isRemoving === value.connection_id}
                      >
                        {isRemoving === value.connection_id ? (
                          <Spinner />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Separator />
                </div>
              );
            })}
          </CardContent>
        )}

        <CardFooter className="p-4 pt-0 md:p-6 md:pt-0">
          <form onSubmit={onStartSelfService} className="space-y-8 ml-auto">
            <Button
              type="submit"
              disabled={working}
              className="ml-auto flex gap-2"
            >
              {working && <Spinner />}
              Setup SSO
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
