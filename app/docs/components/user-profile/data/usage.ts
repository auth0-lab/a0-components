export const componentUsage = `<UserProfile
  user={user}
  metadataSchema={z.object({
    address: z.string(),
    job_title: z.string(),
    language: z.enum(languages),
  })}
/>`;
