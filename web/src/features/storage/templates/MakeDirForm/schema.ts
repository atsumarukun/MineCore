import { z } from "zod";

export const makeDirFormSchema = z.object({
  name: z.string().min(1, "フォルダ名を入力してください."),
});

export type MakeDirFormSchema = z.infer<typeof makeDirFormSchema>;
