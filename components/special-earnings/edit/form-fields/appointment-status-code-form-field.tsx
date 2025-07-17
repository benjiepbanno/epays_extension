import { EditFormType } from "@/lib/special-earnings/schemas";
import { getAppointmentStatus } from "@/lib/special-earnings/utils";

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
  return (
    <FormField
      control={form.control}
      name="appointment_status_code"
      render={() => (
        <FormItem>
          <FormLabel>Appointment Status</FormLabel>
          <FormControl>
            <Input
              disabled
              value={getAppointmentStatus(appointment_status_code)}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
