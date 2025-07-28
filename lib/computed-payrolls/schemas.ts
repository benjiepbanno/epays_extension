import { z } from "zod";

// Data Table

export const specialEarningsSchema = z.object({
  special_earnings_id: z.number(),
  personnel_id: z.string(),
  personnel_name: z.string().nullable(),
  appointment_status_code: z.string(),
  office_code: z.string().nullable(),
  workstation_code: z.string().nullable(),
  earnings_code: z.string(),
  amount: z.number(),
});

export type SpecialEarnings = z.infer<typeof specialEarningsSchema>;
