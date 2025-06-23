"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MONTHS, YEARS } from "@/lib/special-earnings/date";
import { postSpecialEarnings } from "@/actions/special-earnings-actions";

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
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { getAppointmentStatus } from "@/lib/special-earnings/utils";
import { useGetEmployeeResponseStore } from "@/store/special-earnings/get-employee-response-store";
import { DialogFooter } from "@/components/ui/dialog";

const formSchema = z.object({
  employee_number: z.string().min(1, "Required"),
  appointment_status_code: z.string().min(1, "Required"),
  earnings_status_code: z.string().min(1, "Required"),
  earnings_code: z.string({
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
});

export default function NewSpecialEarningsForm() {
  const { response } = useGetEmployeeResponseStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_number: response.body?.employee_number,
      appointment_status_code: response.body?.appointment_status_code,
      earnings_status_code: "1",
      amount: 0,
      year_from: "2025",
      year_to: "2025",
    },
  });

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const promise = async () => {
      const response = await postSpecialEarnings(values);
      if (response.error) throw new Error(response.error);

      return response.body;
    };

    toast.promise(promise(), {
      loading: "Adding new special earnings...",
      success: () => "Special earnings successfully added.",
      error: (error) => error.message || "Failed to add special earnings.",
    });
  }

  const router = useRouter();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {/* Employee Name */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="employee_number"
              render={({}) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Input disabled value={response.body?.employee_name} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Appointment Status */}
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="appointment_status_code"
              render={({}) => (
                <FormItem>
                  <FormLabel>Appointment Status</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      value={getAppointmentStatus(
                        response.body?.appointment_status_code
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Earnings Status */}
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="earnings_status_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Earnings Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
          </div>
          {/* Earnings Code */}
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="earnings_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Earnings Code</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an earnings code" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AB">m@example.com</SelectItem>
                      <SelectItem value="BC">m@google.com</SelectItem>
                      <SelectItem value="CD">m@support.com</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Amount */}
          <div className="col-span-1">
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
          {/* Period From */}
          <div className="col-span-1 grid grid-cols-8 gap-1">
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
          {/* Period To */}
          <div className="col-span-1 grid grid-cols-8 gap-1">
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
            <DialogFooter>
              <Button type="submit">
                <Plus />
                Add
              </Button>
            </DialogFooter>
          </div>
        </div>
      </form>
    </Form>
  );
}
