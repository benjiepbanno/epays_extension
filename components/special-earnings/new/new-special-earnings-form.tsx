"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { formSchema } from "@/lib/special-earnings/schema";
import { MONTHS, YEARS } from "@/lib/special-earnings/date";
import { postSpecialEarnings } from "@/actions/special-earnings-actions";
import { getAppointmentStatus } from "@/lib/special-earnings/utils";
import { useGetEmployeeResponseStore } from "@/store/special-earnings/get-employee-response-store";
import { useGetEarningsCodesResponseStore } from "@/store/special-earnings/get-earnings-codes-response-store";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Check, ChevronsLeftRight, ChevronsUpDown, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import EmployeeNumberFormField from "./form-fields/employee-number-form-field";
import AppointmentStatusCodeFormField from "./form-fields/appointment-status-code-form-field";
import EarningsStatusCodeFormField from "./form-fields/earnings-status-code-form-field";
import EarningsCodeFormField from "./form-fields/earnings-code-form-field";
import AmountFormField from "./form-fields/amount-form-field";
import PeriodFromFormFields from "./form-fields/period-from-form-fields";
import PeriodToFormFields from "./form-fields/period-to-form-fields";

export default function NewSpecialEarningsForm() {
  const { response: get_employee_response } = useGetEmployeeResponseStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_number: get_employee_response.body?.employee_number,
      appointment_status_code:
        get_employee_response.body?.appointment_status_code,
      earnings_status_code: "1",
      earnings_code: "",
      amount: 0,
      year_from: "2025",
      month_from: "",
      year_to: "2025",
      month_to: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const promise = async () => {
      const response = await postSpecialEarnings(values);
      if (response.error) throw new Error(response.error);

      return response.body;
    };

    toast.promise(promise(), {
      loading: "Adding new special earnings...",
      success: () => "Special earnings successfully added.",
      error: (error) => error.message || "Failed to add special earnings.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {/* Employee Number */}
          <div className="col-span-2">
            <EmployeeNumberFormField
              form={form}
              employee_name={get_employee_response.body?.employee_name}
            />
          </div>
          {/* Appointment Status Code */}
          <div className="col-span-1">
            <AppointmentStatusCodeFormField
              form={form}
              appointment_status_code={
                get_employee_response.body?.appointment_status_code
              }
            />
          </div>
          {/* Earnings Status Code */}
          <div className="col-span-1">
            <EarningsStatusCodeFormField form={form} />
          </div>
          {/* Earnings Code */}
          <div className="col-span-1">
            <EarningsCodeFormField form={form} />
          </div>
          {/* Amount */}
          <div className="col-span-1">
            <AmountFormField
              form={form}
              salary_rate={get_employee_response.body?.salary_rate}
            />
          </div>
          {/* Period From */}
          <div className="col-span-1 grid grid-cols-8 gap-1">
            <PeriodFromFormFields form={form} />
          </div>
          {/* Period To */}
          <div className="col-span-1 grid grid-cols-8 gap-1">
            <PeriodToFormFields form={form} />
          </div>

          <div className="col-span-2">
            <DialogFooter>
              <Button type="submit">
                <Plus />
                Add
              </Button>
            </DialogFooter>
          </div>
        </div>
      </form>
    </Form>
  );
}
