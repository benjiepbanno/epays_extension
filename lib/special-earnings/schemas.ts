import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const specialEarningsSchema = z.object({
  id: z.number(),
  employee_number: z.string(),
  employee_name: z.string().nullable(),
  appointment_status_code: z.string(),
  earnings_status_code: z.string(),
  earnings_code: z.string(),
  amount: z.number(),
  period_from: z.string(),
  period_to: z.string(),
});

export type SpecialEarnings = z.infer<typeof specialEarningsSchema>;

export const newFormSchema = z.object({
  employee_number: z.string().min(1, "Required"),
  appointment_status_code: z.string().min(1, "Required"),
  earnings_status_code: z.string().min(1, "Required"),
  earnings_code: z.string().min(1, "Required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  year_from: z.string().min(1, "Required"),
  month_from: z.string().min(1, "Required"),
  year_to: z.string().min(1, "Required"),
  month_to: z.string().min(1, "Required"),
});

export type NewFormData = z.infer<typeof newFormSchema>;
export type NewFormType = UseFormReturn<NewFormData>;

export const editFormSchema = z.object({
  special_earnings_id: z.coerce.number().positive("Required"),
  employee_number: z.string().min(1, "Required"),
  appointment_status_code: z.string().min(1, "Required"),
  earnings_status_code: z.string().min(1, "Required"),
  earnings_code: z.string().min(1, "Required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  year_from: z.string().min(1, "Required"),
  month_from: z.string().min(1, "Required"),
  year_to: z.string().min(1, "Required"),
  month_to: z.string().min(1, "Required"),
});

export type EditFormData = z.infer<typeof editFormSchema>;
export type EditFormType = UseFormReturn<EditFormData>;
