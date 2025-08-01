import { EditFormType } from "@/lib/special-earnings/schemas";
import { MONTHS, YEARS } from "@/lib/special-earnings/date";

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
  form: EditFormType;
};

export default function PeriodFromFormFields({ form }: Props) {
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
      <div className="col-span-8 text-sm font-medium">Period From</div>
      <div className="col-span-3">
        <FormField
          control={form.control}
          name="year_from"
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
                        month_to
                          ? isMonthYearDisabled(
                              value,
                              month_from || "01",
                              false
                            )
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
          name="month_from"
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
                        year_from
                          ? isMonthYearDisabled(year_from, value, false)
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
