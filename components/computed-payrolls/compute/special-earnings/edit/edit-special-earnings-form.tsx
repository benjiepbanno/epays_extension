"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  EditSpecialEarningsFormData,
  editSpecialEarningsFormSchema,
  SpecialEarnings,
} from "@/lib/computed-payrolls/schemas";
import { Form } from "@/components/ui/form";
import PersonnelIdFormField from "./form-fields/personnel-id-form-field";
import PersonnelNameFormField from "./form-fields/personnel-name-form-field";
import AppointmentStatusCodeFormField from "./form-fields/appointment-status-code-form-field";

type Props = {
  special_earnings: SpecialEarnings;
};

export default function EditSpecialEarningsForm({ special_earnings }: Props) {
  const form = useForm<EditSpecialEarningsFormData>({
    resolver: zodResolver(editSpecialEarningsFormSchema),
    defaultValues: {
      special_earnings_id: special_earnings.special_earnings_id,
      amount: special_earnings.amount,
    },
  });

  async function onSubmit(values: EditSpecialEarningsFormData) {
    console.log(values);
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
                personnel_id={special_earnings.personnel_id}
              />
            </div>
            {/* Personnel Name */}
            <div className="col-span-1 col-start-1">
              <PersonnelNameFormField
                form={form}
                personnel_name={special_earnings.personnel_name ?? ""}
              />
            </div>
            {/* Appointment Status Code */}
            <div className="col-span-1">
              <AppointmentStatusCodeFormField
                form={form}
                appointment_status_code={
                  special_earnings.appointment_status_code
                }
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
