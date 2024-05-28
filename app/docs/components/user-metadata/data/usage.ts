export const componentUsage = ` <UserMetadataForm
  user={user}
  schema={z.object({
    address: z.string(),
    job_title: z.string(),
    language: z.enum(languages),
  })}
  defaultValues={{
    address: "123 Fake st",
    job_title: "Designer",
    language: "es-AR",
  }}
/>`;
