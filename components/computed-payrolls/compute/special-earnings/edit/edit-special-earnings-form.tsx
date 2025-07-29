"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  EditSpecialEarningsFormData,
  editSpecialEarningsFormSchema,
} from "@/lib/computed-payrolls/schemas";
import { useGetResponseStore } from "@/store/special-earnings/get-response-store";
import { useGetSpecialEarningsResponseStore } from "@/store/computed-payrolls/get-special-earnings-response-store";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Check } from "lucide-react";

import PersonnelIdFormField from "./form-fields/personnel-id-form-field";
import PersonnelNameFormField from "./form-fields/personnel-name-form-field";
import AppointmentStatusCodeFormField from "./form-fields/appointment-status-code-form-field";
import OfficeCodeFormField from "./form-fields/office-code-form-field";
import WorkstationCodeFormField from "./form-fields/workstation-code-form-field";
import EarningsCodeFormField from "./form-fields/earnings-code-form-field";
import AmountFormField from "./form-fields/amount-form-field";

type Props = {
  amount: number;
};

export default function EditSpecialEarningsForm({ amount }: Props) {
  const { response: get_special_earnings_response } = useGetResponseStore();
  const { updateAmount } = useGetSpecialEarningsResponseStore();

  const form = useForm<EditSpecialEarningsFormData>({
    resolver: zodResolver(editSpecialEarningsFormSchema),
    defaultValues: {
      special_earnings_id:
        get_special_earnings_response.body?.special_earnings_id,
      amount: amount,
    },
  });

  async function onSubmit(values: EditSpecialEarningsFormData) {
    // Update the item in the store
    updateAmount(values.special_earnings_id, values.amount);
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
              <PersonnelNameFormField
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
                office_code={
                  get_special_earnings_response.body?.office_code ?? ""
                }
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
              <EarningsCodeFormField
                form={form}
                code={get_special_earnings_response.body?.earnings_code}
              />
            </div>
            {/* Amount */}
            <div className="col-span-1">
              <AmountFormField
                form={form}
                salary_rate={get_special_earnings_response.body?.salary_rate}
              />
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
