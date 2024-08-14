"use client";

import clsx, { ClassValue } from "clsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import useMfaEnrollment from "../hooks/use-mfa-enrollment";
import useUserMetadata from "../hooks/use-user-metadata";
import BasicInfoForm from "./basic-info-form";
/**
 * Make sure to install the MFAEnrollment component from:
 *   - https://components.lab.auth0.com/docs/components/mfa-enrollment
 */
import MFAEnrollment from "./mfa-enrollment";
/**
 * Make sure to install the UserMetadata component from:
 *   - https://components.lab.auth0.com/docs/components/user-metadata
 */
import UserMetadata from "./user-metadata";

interface KeyValueMap {
  [key: string]: any;
}

type MfaEnrollment = {
  name: string;
  enabled: boolean;
  enrollmentId?: string;
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function UserProfile({
  user,
  userMetadata,
  metadataSchema,
  factors,
}: {
  user: KeyValueMap;
  metadataSchema: any;
  userMetadata?: KeyValueMap;
  factors?: MfaEnrollment[];
}) {
  const [currentItem, setCurrentItem] = useState("basic-info");
  const metadataDefaultValues = userMetadata;
  const { updateUserMetadata, fetchUserMetadata } = useUserMetadata();
  const { fetchFactors, createEnrollment, deleteEnrollment } =
    useMfaEnrollment();

  const handleItemClick = (id: string) => () => {
    setCurrentItem(id);
  };

  return (
    <div className="max-w-screen-lg mx-auto gap-5 md:gap-5 lg:gap-5 justify-center p-2 flex flex-col w-full">
      <div className="md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">User Profile</h2>
          <p className="text-muted-foreground">
            Info about you and your preferences
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <nav
              className={
                "flex space-x-1 lg:flex-col lg:space-x-0 lg:space-y-1 justify-center"
              }
            >
              {[
                { title: "General", id: "basic-info" },
                { title: "Preferences", id: "preferences" },
                { title: "Security", id: "security" },
              ].map((item) => (
                <button
                  onClick={handleItemClick(item.id)}
                  type="button"
                  key={item.id}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    currentItem === item.id
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start",
                    "px-3 py-1.5"
                  )}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          </aside>
          <div className="flex-1">
            {currentItem === "basic-info" && <BasicInfoForm user={user} />}

            {currentItem === "preferences" && (
              <UserMetadata
                schema={metadataSchema}
                metadata={metadataDefaultValues}
                onFetch={fetchUserMetadata}
                onSave={updateUserMetadata}
              />
            )}

            {currentItem === "security" && (
              <MFAEnrollment
                factors={factors}
                onFetch={fetchFactors}
                onCreate={createEnrollment}
                onDelete={deleteEnrollment}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
