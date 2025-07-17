export const componentUsage = `<UserMetadataForm
  onSave={async () => {
    alert("Saved!");
  }}
  schema={z.object({
    address: z.string(),
    job_title: z.string(),
    language: z.enum(languages),
  })}
  metadata={{
    address: "123 Fake st",
    job_title: "Designer",
    language: "es-AR",
  }}
/>`;
