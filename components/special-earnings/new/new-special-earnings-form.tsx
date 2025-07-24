"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { NewFormData, newFormSchema } from "@/lib/special-earnings/schemas";
import { postSpecialEarnings } from "@/actions/special-earnings-actions";
import { useGetPersonnelResponseStore } from "@/store/external-databases/get-personnel-response-store";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import PersonnelNameFormField from "./form-fields/personnel-name-form-field";
import AppointmentStatusCodeFormField from "./form-fields/appointment-status-code-form-field";
import OfficeCodeFormField from "./form-fields/office-code-form-field";
import WorkstationCodeFormField from "./form-fields/workstation-code-form-field";
import EarningsStatusCodeFormField from "./form-fields/earnings-status-code-form-field";
import EarningsCodeFormField from "./form-fields/earnings-code-form-field";
import AmountFormField from "./form-fields/amount-form-field";
import PeriodFromFormFields from "./form-fields/period-from-form-fields";
import PeriodToFormFields from "./form-fields/period-to-form-fields";

export default function NewSpecialEarningsForm() {
  const { response: get_personnel_response } = useGetPersonnelResponseStore();

  const form = useForm<NewFormData>({
    resolver: zodResolver(newFormSchema),
    defaultValues: {
      personnel_id: get_personnel_response.body?.personnel_id,
      appointment_status_code:
        get_personnel_response.body?.appointment_status_code,
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
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Personnel Name */}
            <div className="col-span-1">
              <PersonnelNameFormField
                form={form}
                personnel_name={get_personnel_response.body?.personnel_name}
              />
            </div>
            {/* Appointment Status Code */}
            <div className="col-span-1">
              <AppointmentStatusCodeFormField
                form={form}
                appointment_status_code={
                  get_personnel_response.body?.appointment_status_code
                }
              />
            </div>
            {/* Office Code */}
            <div className="col-span-1">
              <OfficeCodeFormField
                form={form}
                office_code={get_personnel_response.body?.office_code}
              />
            </div>
            {/* Workstation Code */}
            <div className="col-span-1">
              <WorkstationCodeFormField
                form={form}
                workstation_code={get_personnel_response.body?.workstation_code}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Earnings Status Code */}
            <div className="col-span-1">
              <EarningsStatusCodeFormField form={form} />
            </div>
            {/* Earnings Code */}
            <div className="col-span-1 col-start-1">
              <EarningsCodeFormField form={form} />
            </div>
            {/* Amount */}
            <div className="col-span-1">
              <AmountFormField
                form={form}
                salary_rate={get_personnel_response.body?.salary_rate}
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
