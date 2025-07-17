import { EditFormType } from "@/lib/special-earnings/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  form: EditFormType;
};

export default function EarningsStatusCodeFormField({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="earnings_status_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Earnings Status</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an earnings status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="1">Active</SelectItem>
              <SelectItem value="0">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
