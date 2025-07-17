import { FormType } from "@/lib/special-earnings/schema";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  form: FormType;
  employee_name: string;
};

export default function EmployeeNumberFormField({ form, employee_name }: Props) {
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
