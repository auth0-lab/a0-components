"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useMfaForm from "../hooks/use-mfa-form";
import useUserMedata from "../hooks/use-update-user-medata";
import BasicInfoForm from "./basic-info-form";
import MFAForm from "./mfa-form";
import UserMetadataForm from "./user-metadata-form";

interface KeyValueMap {
  [key: string]: any;
}

type MfaEnrollment = {
  name: string;
  enabled: boolean;
  enrollmentId?: string;
};

function getAvatarFallback(user: KeyValueMap) {
  const givenName = user.given_name;
  const familyName = user.family_name;
  const nickname = user.nickname;
  const name = user.name;

  if (givenName && familyName) {
    return `${givenName[0]}${familyName[0]}`;
  }

  if (nickname) {
    return nickname[0];
  }

  return name[0];
}

export default function UserProfile({
  user,
  userMetadata,
  metadataSchema,
  factors,
}: {
  user: KeyValueMap;
  metadataSchema: any;
  userMetadata: KeyValueMap;
  factors?: MfaEnrollment[];
}) {
  const picture = user.picture;
  const metadataDefaultValues = userMetadata;
  const { update } = useUserMedata(user);
  const { fetchFactors, createEnrollment, deleteEnrollment } = useMfaForm();

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
        onSave={update}
      />

      <MFAForm
        factors={factors}
        onFetch={fetchFactors}
        onCreate={createEnrollment}
        onDelete={deleteEnrollment}
      />
    </div>
  );
}
