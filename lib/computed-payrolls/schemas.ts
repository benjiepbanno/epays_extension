import { z } from "zod";

export const specialEarningsSchema = z.object({
  special_earnings_id: z.number(),
  employee_number: z.string(),
  employee_name: z.string().nullable(),
  appointment_status_code: z.string(),
  earnings_code: z.string(),
  amount: z.number(),
});

export type SpecialEarnings = z.infer<typeof specialEarningsSchema>;
