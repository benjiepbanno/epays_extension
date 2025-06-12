"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MONTHS, YEARS } from "@/lib/special-earnings/date";
import { useEmployeeSearchResultStore } from "@/store/special-earnings/employee-search-result-store";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, CircleX } from "lucide-react";

const formSchema = z.object({
  employee_number: z.string().min(1, "Required"),
  earning_code: z.string({
    required_error: "Required",
  }),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  year_from: z.string({
    required_error: "Required",
  }),
  month_from: z.string({
    required_error: "Required",
  }),
  year_to: z.string({
    required_error: "Required",
  }),
  month_to: z.string({
    required_error: "Required",
  }),
  description: z.string().min(1, "Required"),
});

export default function EncodeForm() {
  const { employee_search_result } = useEmployeeSearchResultStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_number: employee_search_result.body.employee_number,
      amount: 0,
      year_from: "2025",
      year_to: "2025",
    },
  });

  // useEffect(() => {
  //   form.setValue("employee_number", employee_number);
  // }, [employee_number]);

  const watchMonthFrom = form.watch("month_from");
  const watchYearFrom = form.watch("year_from");
  const watchMonthTo = form.watch("month_to");
  const watchYearTo = form.watch("year_to");

  const periodFromValue =
    watchYearFrom && watchMonthFrom
      ? `${watchYearFrom}${watchMonthFrom}`
      : null;
  const periodToValue =
    watchYearTo && watchMonthTo ? `${watchYearTo}${watchMonthTo}` : null;

  const isMonthYearDisabled = (
    year: string,
    month: string,
    isToField: boolean
  ): boolean => {
    const value = `${year}${month}`;
    if (isToField && periodFromValue) {
      return value < periodFromValue;
    }
    if (!isToField && periodToValue) {
      return value > periodToValue;
    }
    return false;
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formattedAmount = parseFloat(values.amount.toFixed(2));
    console.log({ ...values, amount: formattedAmount });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="employee_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="earning_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Earning Code</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an earning code" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Input an amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-8 gap-1">
            <div className="col-span-8 text-sm font-medium">Period From</div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="year_from"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                              watchMonthTo
                                ? isMonthYearDisabled(
                                    value,
                                    watchMonthFrom || "01",
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                              watchYearFrom
                                ? isMonthYearDisabled(
                                    watchYearFrom,
                                    value,
                                    false
                                  )
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
          </div>

          <div className="grid grid-cols-8 gap-1">
            <div className="col-span-8 text-sm font-medium">Period To</div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="year_to"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                              watchMonthFrom
                                ? isMonthYearDisabled(
                                    value,
                                    watchMonthTo || "12",
                                    true
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
                name="month_to"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                              watchYearTo
                                ? isMonthYearDisabled(watchYearTo, value, true)
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
          </div>

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Input a description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2 flex flex-row gap-4 justify-end">
            <Button type="submit">
              <CirclePlus />
              Add
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
