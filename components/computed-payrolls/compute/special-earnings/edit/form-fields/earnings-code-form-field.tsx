"use client";

import { cn } from "@/lib/utils";
import { EditSpecialEarningsFormType } from "@/lib/computed-payrolls/schemas";
import { useGetEarningsCodesResponseStore } from "@/store/external-databases/get-earnings-codes-response-store";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  form: EditSpecialEarningsFormType;
  code: string;
};

export default function EarningsCodeFormField({ form, code }: Props) {
  const { response } = useGetEarningsCodesResponseStore();

  const earnings_codes: {
    code: string;
    description: string;
  }[] = response.body ?? [];

  const earnings_code = earnings_codes.find(
    (earnings_code) => earnings_code.code === code
  );

  return (
    <FormField
      control={form.control}
      name="special_earnings_id"
      render={() => (
        <FormItem>
          <FormLabel>Earnings Code</FormLabel>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn("w-full truncate justify-between font-normal")}
              disabled
            >
              <div>
                <Badge variant="secondary">{code}</Badge>
                <span className="text-xs">
                  {" "}
                  {earnings_code?.description || "Unknown earnings code"}
                </span>
              </div>
            </Button>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
