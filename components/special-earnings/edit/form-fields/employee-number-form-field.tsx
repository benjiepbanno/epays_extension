import { EditFormType } from "@/lib/special-earnings/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  form: EditFormType;
  employee_number: string;
};

export default function EmployeeNumberFormField({
  form,
  employee_number,
}: Props) {
  return (
    <FormField
      control={form.control}
      name="employee_number"
      render={() => (
        <FormItem>
          <FormLabel>Employee Number</FormLabel>
          <FormControl>
            <Input disabled value={employee_number} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
