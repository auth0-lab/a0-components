"use client";

import { z } from "zod";

import UserSessions from "@/registry/components/user-sessions";

const languages = ["en-US", "es-AR"] as const;

const user = {
  given_name: "John",
  family_name: "Doe",
  nickname: "john.doe",
  name: "John Doe",
  email: "john.doe@acme.com",
  sub: "auth0|123456789101112",
  sid: "123123-123123-123123-123123",
};

const sessions = [
  {
    id: "123123-123123-123123-123123",
    created_at: "2024-08-07T19:06:28.561Z",
    updated_at: "2024-08-07T19:06:28.971Z",
    authenticated_at: "2024-08-07T19:06:28.561Z",
    device: {
      initial_user_agent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      initial_asn: "394089",
      initial_ip: "130.41.100.250",
      last_user_agent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      last_ip: "130.41.100.250",
      last_asn: "394089",
    },
  },
  {
    id: "321321-321321-321321-321321",
    created_at: "2024-08-09T17:41:55.199Z",
    updated_at: "2024-08-09T17:41:55.585Z",
    authenticated_at: "2024-08-09T17:41:55.199Z",
    device: {
      initial_user_agent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:129.0) Gecko/20100101 Firefox/129.0",
      initial_ip: "130.41.100.250",
      last_user_agent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:129.0) Gecko/20100101 Firefox/129.0",
      last_ip: "130.41.100.250",
    },
  },
];

export function Example() {
  return (
    <UserSessions
      user={user}
      sessions={sessions}
      onFetch={async () => {
        return { sessions, status: 200 };
      }}
      onDelete={async (sessionId: string) => {
        alert(`Delete ${sessionId}`);
        return { id: sessionId, status: 200 };
      }}
    />
  );
}
