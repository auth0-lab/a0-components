"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { CLAIMS } from "@/lib/utils";
import { Claims } from "@auth0/nextjs-auth0";

import { getAvatarFallback } from "../helpers";
import BasicInfoForm from "./basic-info-form";
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

  return (
    <div className="max-w-screen-lg mx-auto gap-5 md:gap-5 lg:gap-5 justify-center p-4 py-2 flex flex-col">
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
        user={user}
        schema={metadataSchema}
        defaultValues={metadataDefaultValues}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-normal">
            Multi-Factor Authentication
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="performance" className="flex flex-col space-y-1">
              <span>WebAuthn with FIDO Security Keys</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Security Keys can be used as an additional authentication
                factor.
              </span>
            </Label>
            <div className="flex space-x-24">
              <Badge variant="outline" className="font-medium rounded-lg">
                Not enrolled
              </Badge>
              <Switch id="performance" />
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="functional" className="flex flex-col space-y-1">
              <span>Auth0 Guardian</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Use Auth0 Guardian as your authenticator app.
              </span>
            </Label>
            <div className="flex space-x-24">
              <Badge variant="outline" className="font-medium rounded-lg">
                Not enrolled
              </Badge>
              <Switch id="functional" />
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>
                Google authenticator or similar
                <Badge variant="outline" className="font-medium rounded-lg">
                  Not enrolled
                </Badge>
              </span>
              <span className="font-normal leading-snug text-muted-foreground">
                Use your preferred authenticator app.
              </span>
            </Label>
            <div className="flex space-x-24">
              <Badge variant="outline" className="font-medium rounded-lg">
                Not enrolled
              </Badge>
              <Switch id="necessary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
