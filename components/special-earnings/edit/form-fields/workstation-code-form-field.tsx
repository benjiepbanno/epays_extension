import { EditFormType } from "@/lib/special-earnings/schemas";
import { useGetWorkstationsResponseStore } from "@/store/external-databases/get-workstations-response-store";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  form: EditFormType;
  workstation_code: string;
};

export default function WorkstationCodeFormField({
  form,
  workstation_code,
}: Props) {
  const { response } = useGetWorkstationsResponseStore();

  const workstations: {
    code: string;
    name: string;
  }[] = response.body ?? [];

  const workstation = workstations.find(
    (workstation) => workstation.code === workstation_code
  );

  return (
    <FormField
      control={form.control}
      name="personnel_id"
      render={() => (
        <FormItem>
          <FormLabel>Workstation</FormLabel>
          <FormControl>
            <Input disabled value={workstation?.name} className="truncate" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
