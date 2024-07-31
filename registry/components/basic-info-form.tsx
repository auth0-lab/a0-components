"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface KeyValueMap {
  [key: string]: any;
}

export default function BasicInfoForm({ user }: { user: KeyValueMap }) {
  const name = user.name;
  const email = user.email;
  const nickname = user.nickname;
  const phone = user.phone_number;

  return (
    <Card className="w-full">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg font-normal">General</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
}
