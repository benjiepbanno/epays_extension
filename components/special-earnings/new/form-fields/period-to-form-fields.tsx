import { MONTHS, YEARS } from "@/lib/special-earnings/date";
import { FormType } from "@/lib/special-earnings/schema";

import {
  FormControl,
  FormField,
  FormItem,
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
  form: FormType;
};

export default function PeriodToFormFields({ form }: Props) {
  const year_from = form.watch("year_from");
  const month_from = form.watch("month_from");
  const year_to = form.watch("year_to");
  const month_to = form.watch("month_to");

  const periodFromValue =
    year_from && month_from ? `${year_from}${month_from}` : null;
  const periodToValue = year_to && month_to ? `${year_to}${month_to}` : null;

  function isMonthYearDisabled(
    year: string,
    month: string,
    isToField: boolean
  ) {
    const value = `${year}${month}`;
    if (isToField && periodFromValue) {
      return value < periodFromValue;
    }
    if (!isToField && periodToValue) {
      return value > periodToValue;
    }
    return false;
  }

  return (
    <>
      <div className="col-span-8 text-sm font-medium">Period To</div>
      <div className="col-span-3">
        <FormField
          control={form.control}
          name="year_to"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {YEARS.map((value) => (
                    <SelectItem
                      key={value}
                      value={value}
                      disabled={
                        month_from
                          ? isMonthYearDisabled(value, month_to || "12", true)
                          : false
                      }
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-5">
        <FormField
          control={form.control}
          name="month_to"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MONTHS.map(({ value, label }) => (
                    <SelectItem
                      key={value}
                      value={value}
                      disabled={
                        year_to
                          ? isMonthYearDisabled(year_to, value, true)
                          : false
                      }
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
