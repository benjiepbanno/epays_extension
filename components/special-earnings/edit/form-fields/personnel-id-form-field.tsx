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
  personnel_id: string;
};

export default function PersonnelIdFormField({
  form,
  personnel_id,
}: Props) {
  return (
    <FormField
      control={form.control}
      name="personnel_id"
      render={() => (
        <FormItem>
          <FormLabel>Personnel ID</FormLabel>
          <FormControl>
            <Input disabled value={personnel_id} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
