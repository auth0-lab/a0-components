export const componentUsage = `<UserSessions
  user={user}
  sessions={sessions}
  onFetch={async () => {
    return { sessions, status: 200 };
  }}
  onDelete={async (sessionId: string) => {
    return { id: sessionId, status: 200 };
  }}
/>`;
