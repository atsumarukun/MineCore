import { z } from "zod";

export const searchFileFormSchema = z.object({
  name: z.string().nullish(),
});

export type SearchFileFormSchema = z.infer<typeof searchFileFormSchema>;
