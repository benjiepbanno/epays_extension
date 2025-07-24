"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { EditFormData, editFormSchema } from "@/lib/special-earnings/schemas";
import { updateSpecialEarnings } from "@/actions/special-earnings-actions";
import { useGetResponseStore } from "@/store/special-earnings/get-response-store";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Check } from "lucide-react";

import PersonnelIdFormField from "./form-fields/personnel-id-form-field";
import EmployeeNameFormField from "./form-fields/employee-name-form-field";
import AppointmentStatusCodeFormField from "./form-fields/appointment-status-code-form-field";
import EarningsStatusCodeFormField from "./form-fields/earnings-status-code-form-field";
import EarningsCodeFormField from "./form-fields/earnings-code-form-field";
import AmountFormField from "./form-fields/amount-form-field";
import PeriodFromFormFields from "./form-fields/period-from-form-fields";
import PeriodToFormFields from "./form-fields/period-to-form-fields";
import OfficeCodeFormField from "./form-fields/office-code-form-field";
import WorkstationCodeFormField from "./form-fields/workstation-code-form-field";

export default function EditSpecialEarningsForm() {
  const { response: get_special_earnings_response } = useGetResponseStore();

  const form = useForm<EditFormData>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      special_earnings_id:
        get_special_earnings_response.body?.special_earnings_id,
      personnel_id: get_special_earnings_response.body?.personnel_id,
      appointment_status_code:
        get_special_earnings_response.body?.appointment_status_code,
      earnings_status_code:
        get_special_earnings_response.body?.earnings_status_code,
      earnings_code: get_special_earnings_response.body?.earnings_code,
      amount: get_special_earnings_response.body?.amount,
      year_from: get_special_earnings_response.body?.year_from,
      month_from: get_special_earnings_response.body?.month_from,
      year_to: get_special_earnings_response.body?.year_to,
      month_to: get_special_earnings_response.body?.month_to,
    },
  });

  async function onSubmit(values: EditFormData) {
    const promise = async () => {
      const response = await updateSpecialEarnings(values);
      if (response.error) throw new Error(response.error);

      return response.body;
    };

    toast.promise(promise(), {
      loading: "Updating special earnings...",
      success: () => "Special earnings successfully updated.",
      error: (error) => error.message || "Failed to update special earnings.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Personnel ID */}
            <div className="col-span-1">
              <PersonnelIdFormField
                form={form}
                personnel_id={get_special_earnings_response.body?.personnel_id}
              />
            </div>
            {/* Personnel Name */}
            <div className="col-span-1 col-start-1">
              <EmployeeNameFormField
                form={form}
                personnel_name={
                  get_special_earnings_response.body?.personnel_name ?? ""
                }
              />
            </div>
            {/* Appointment Status Code */}
            <div className="col-span-1">
              <AppointmentStatusCodeFormField
                form={form}
                appointment_status_code={
                  get_special_earnings_response.body?.appointment_status_code
                }
              />
            </div>
            {/* Office Code */}
            <div className="col-span-1">
              <OfficeCodeFormField
                form={form}
                office_code={get_special_earnings_response.body?.office_code ?? ""}
              />
            </div>
            {/* Workstation Code */}
            <div className="col-span-1">
              <WorkstationCodeFormField
                form={form}
                workstation_code={
                  get_special_earnings_response.body?.workstation_code ?? ""
                }
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
                salary_rate={get_special_earnings_response.body?.salary_rate}
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
                <Check />
                Save
              </Button>
            </DialogFooter>
          </div>
        </div>
      </form>
    </Form>
  );
}
