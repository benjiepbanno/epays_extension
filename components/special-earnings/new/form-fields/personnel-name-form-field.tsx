import { NewFormType } from "@/lib/special-earnings/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  form: NewFormType;
  personnel_name: string;
};

export default function PersonnelNameFormField({ form, personnel_name }: Props) {
  return (
    <FormField
      control={form.control}
      name="personnel_id"
      render={() => (
        <FormItem>
          <FormLabel>Personnel Name</FormLabel>
          <FormControl>
            <Input disabled value={personnel_name} className="truncate" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
