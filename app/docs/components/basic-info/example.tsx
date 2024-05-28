"use client";

import BasicInfoForm from "@/registry/components/basic-info-form";

export function Example() {
  return (
    <BasicInfoForm
      user={{
        given_name: "John",
        family_name: "Doe",
        nickname: "johndoe",
        name: "John Doe",
        email: "john.doe@acme.com",
      }}
    />
  );
}
