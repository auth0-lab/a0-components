export const componentCode = `"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Claims } from "@auth0/nextjs-auth0";

export default function BasicInfoForm({ user }: { user: Claims }) {
  const name = user.name;
  const email = user.email;
  const nickname = user.nickname;
  const phone = user.phone_number;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-normal">Basic Info</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              disabled
              type="name"
              id="name"
              placeholder="Name"
              defaultValue={name}
            />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled
              type="email"
              id="email"
              placeholder="Email"
              defaultValue={email}
            />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              disabled
              type="nickname"
              id="nickname"
              placeholder="Nickname"
              defaultValue={nickname}
            />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              disabled
              type="phone"
              id="phone"
              placeholder="(415) 555-5555"
              defaultValue={phone}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}`;
