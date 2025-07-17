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
  employee_name: string;
};

export default function EmployeeNameFormField({ form, employee_name }: Props) {
  return (
    <FormField
      control={form.control}
      name="employee_number"
      render={() => (
        <FormItem>
          <FormLabel>Employee Name</FormLabel>
          <FormControl>
            <Input disabled value={employee_name} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
