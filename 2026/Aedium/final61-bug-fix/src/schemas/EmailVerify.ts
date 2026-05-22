import * as z from 'zod';

export const emailVerifySchema = z.object({
  code: z
    .string()
    .trim()
    .length(6, 'Code must be 6 digits')
    .refine((val) => {
      for (const char of val) {
        if (char >= '0' && char <= '9') {
          continue;
        }

        return false;
      }

      return true;
    }, 'Code must be a number'),
});

export type EmailVerify = z.infer<typeof emailVerifySchema>;
