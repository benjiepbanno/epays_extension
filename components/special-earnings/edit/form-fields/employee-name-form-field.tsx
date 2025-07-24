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
  personnel_name: string;
};

export default function EmployeeNameFormField({ form, personnel_name }: Props) {
  return (
    <FormField
      control={form.control}
      name="personnel_id"
      render={() => (
        <FormItem>
          <FormLabel>Personnel Name</FormLabel>
          <FormControl>
            <Input disabled value={personnel_name} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
