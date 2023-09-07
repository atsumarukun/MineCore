import { z } from "zod";

export const renameFileFormSchema = z.object({
  name: z.string().min(1, "ファイル名を入力してください."),
});

export type RenameFileFormSchema = z.infer<typeof renameFileFormSchema>;
