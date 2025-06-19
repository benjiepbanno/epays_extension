import { z } from "zod";

const specialEarningsSchema = z.object({
  id: z.number(),
  employee_number: z.string(),
  employee_name: z.string(),
  appointment_status_code: z.string(),
  earnings_status_code: z.string(),
  earnings_code: z.string(),
  amount: z.number(),
  period_from: z.string(),
  period_to: z.string(),
});

export type SpecialEarnings = z.infer<typeof specialEarningsSchema>;
