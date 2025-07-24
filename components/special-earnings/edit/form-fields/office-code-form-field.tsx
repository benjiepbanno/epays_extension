import { EditFormType } from "@/lib/special-earnings/schemas";
import { useGetOfficesResponseStore } from "@/store/external-databases/get-offices-response-store";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  form: EditFormType;
  office_code: string;
};

export default function OfficeCodeFormField({ form, office_code }: Props) {
  const { response } = useGetOfficesResponseStore();

  const offices: {
    code: string;
    name: string;
    abbr: string;
  }[] = response.body ?? [];

  const office = offices.find((office) => office.code === office_code);

  return (
    <FormField
      control={form.control}
      name="personnel_id"
      render={() => (
        <FormItem>
          <FormLabel>Office</FormLabel>
          <FormControl>
            <Input disabled value={office?.name} className="truncate" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
