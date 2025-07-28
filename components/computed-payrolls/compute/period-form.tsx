"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MONTHS, YEARS } from "@/lib/special-earnings/date";
import { usePeriodStore } from "@/store/computed-payrolls/period-store";
import { useGetSpecialEarningsResponseStore } from "@/store/computed-payrolls/get-special-earnings-response-store";

import { Button } from "@/components/ui/button";
import {
  Form,
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
import { Search } from "lucide-react";

const formSchema = z.object({
  period_year: z.string().min(1, "Required"),
  period_month: z.string().min(1, "Required"),
});

export default function PeriodForm() {
  const { fields, setFields } = usePeriodStore();
  const { is_loading } = useGetSpecialEarningsResponseStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      period_year: fields.period_year ?? "2025",
      period_month: fields.period_month ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFields(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-8 gap-4 items-end">
          <div className="col-span-2 grid grid-cols-8 gap-1">
            <div className="col-span-8 text-sm font-medium">Payroll Period</div>
            {/* Year */}
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="period_year"
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
                          <SelectItem key={value} value={value}>
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
            {/* Month */}
            <div className="col-span-5">
              <FormField
                control={form.control}
                name="period_month"
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
                          <SelectItem key={value} value={value}>
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
          </div>

          <div className="">
            <Button type="submit" variant="secondary" disabled={is_loading}>
              <Search />
              Search
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
