import { EditFormType } from "@/lib/special-earnings/schemas";
import { appointment_statuses } from "@/lib/data";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  form: EditFormType;
  appointment_status_code: string;
};

export default function AppointmentStatusCodeFormField({
  form,
  appointment_status_code,
}: Props) {
  const appointment_status = appointment_statuses.find(
    (appointment_status) => appointment_status.value === appointment_status_code
  );

  return (
    <FormField
      control={form.control}
      name="appointment_status_code"
      render={() => (
        <FormItem>
          <FormLabel>Appointment Status</FormLabel>
          <FormControl>
            <Input disabled value={appointment_status?.label} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
