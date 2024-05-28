"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CLAIMS } from "@/lib/utils";
import { Claims } from "@auth0/nextjs-auth0";

import { getAvatarFallback } from "../helpers";
import BasicInfoForm from "./basic-info-form";
import useUpdateUserMedata from "./helpers/user-metadata";
import MFAForm from "./mfa-form";
import UserMetadataForm from "./user-metadata-form";

export default function UserProfile({
  user,
  metadataSchema,
}: {
  user: Claims;
  metadataSchema: any;
}) {
  const picture = user.picture;
  const metadataDefaultValues = user[CLAIMS.USER_METADATA];
  const updateUserMetadata = useUpdateUserMedata(user);

  return (
    <div className="max-w-screen-lg mx-auto gap-5 md:gap-5 lg:gap-5 justify-center p-4 py-2 flex flex-col w-full">
      <div className="flex flex-col items-center gap-3">
        <Avatar className="h-16 w-16">
          <AvatarImage src={picture} alt={picture} />
          <AvatarFallback>{getAvatarFallback(user)}</AvatarFallback>
        </Avatar>
        <h2 className="text-3xl font-medium">User profile</h2>
        <p className="text-md text-neutral-500 font-light">
          Info about you and your preferences
        </p>
      </div>

      <BasicInfoForm user={user} />

      <UserMetadataForm
        schema={metadataSchema}
        defaultValues={metadataDefaultValues}
        onSave={updateUserMetadata}
      />

      <MFAForm />
    </div>
  );
}
