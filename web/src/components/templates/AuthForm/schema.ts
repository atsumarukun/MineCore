import { z } from "zod";

export const authFormSchema = z.object({
  password: z.string().min(1, "パスワードを入力してください."),
});

export type AuthFormSchema = z.infer<typeof authFormSchema>;
