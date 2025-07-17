"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { NewFormData, newFormSchema } from "@/lib/special-earnings/schemas";
import { postSpecialEarnings } from "@/actions/special-earnings-actions";
import { useGetEmployeeResponseStore } from "@/store/special-earnings/get-employee-response-store";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import EmployeeNameFormField from "./form-fields/employee-name-form-field";
import AppointmentStatusCodeFormField from "./form-fields/appointment-status-code-form-field";
import EarningsStatusCodeFormField from "./form-fields/earnings-status-code-form-field";
import EarningsCodeFormField from "./form-fields/earnings-code-form-field";
import AmountFormField from "./form-fields/amount-form-field";
import PeriodFromFormFields from "./form-fields/period-from-form-fields";
import PeriodToFormFields from "./form-fields/period-to-form-fields";

export default function NewSpecialEarningsForm() {
  const { response: get_employee_response } = useGetEmployeeResponseStore();

  const form = useForm<NewFormData>({
    resolver: zodResolver(newFormSchema),
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

  async function onSubmit(values: NewFormData) {
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
          {/* Employee Name */}
          <div className="col-span-2">
            <EmployeeNameFormField
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
