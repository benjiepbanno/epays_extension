"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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

import { MONTHS, YEARS } from "@/lib/special-earnings/date";
import { getAppointmentStatus } from "@/lib/special-earnings/utils";
import { useGetResponseStore } from "@/store/special-earnings/get-response-store";
import { updateSpecialEarnings } from "@/actions/special-earnings-actions";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useGetEarningsCodesResponseStore } from "@/store/special-earnings/get-earnings-codes-response-store";
import { useState } from "react";

const formSchema = z.object({
  special_earnings_id: z.number({
    required_error: "Required",
  }),
  employee_number: z.string({
    required_error: "Required",
  }),
  appointment_status_code: z.string({
    required_error: "Required",
  }),
  earnings_status_code: z.string({
    required_error: "Required",
  }),
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

export default function EditSpecialEarningsForm() {
  const { response: get_special_earnings_response } = useGetResponseStore();
  const { response: get_earnings_codes_response } =
    useGetEarningsCodesResponseStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      special_earnings_id:
        get_special_earnings_response.body?.special_earnings_id,
      employee_number: get_special_earnings_response.body?.employee_number,
      appointment_status_code:
        get_special_earnings_response.body?.appointment_status_code,
      earnings_status_code:
        get_special_earnings_response.body?.earnings_status_code,
      earnings_code: get_special_earnings_response.body?.earnings_code,
      amount: get_special_earnings_response.body?.amount,
      year_from: get_special_earnings_response.body?.year_from,
      month_from: get_special_earnings_response.body?.month_from,
      year_to: get_special_earnings_response.body?.year_to,
      month_to: get_special_earnings_response.body?.month_to,
    },
  });

  const earnings_codes: {
    code: string;
    description: string;
  }[] = get_earnings_codes_response.body ?? [];

  const [openPopover, setOpenPopover] = useState(false);

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
      const response = await updateSpecialEarnings(values);
      if (response.error) throw new Error(response.error);

      return response.body;
    };

    toast.promise(promise(), {
      loading: "Updating special earnings...",
      success: () => "Special earnings successfully updated.",
      error: (error) => error.message || "Failed to update special earnings.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {/* Employee Number */}
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="employee_number"
              render={({}) => (
                <FormItem>
                  <FormLabel>Employee Number</FormLabel>
                  <FormControl>
                    <Input disabled value={get_special_earnings_response.body?.employee_number} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Employee Name */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="employee_number"
              render={({}) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      value={get_special_earnings_response.body?.employee_name ?? ""}
                    />
                  </FormControl>
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
                        get_special_earnings_response.body?.appointment_status_code
                      )}
                    />
                  </FormControl>
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
                  <Popover open={openPopover} onOpenChange={setOpenPopover}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openPopover}
                          className={cn(
                            "w-full truncate justify-between font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? `${field.value} - ${
                                earnings_codes.find(
                                  (earnings_code) =>
                                    earnings_code.code === field.value
                                )?.description || "Unknown earnings code"
                              }`
                            : "Select an earnings code"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search an earnings code..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No earnings code found.</CommandEmpty>
                          <CommandGroup>
                            {earnings_codes.map((earnings_code) => (
                              <CommandItem
                                value={`${earnings_code.code} ${earnings_code.description}`}
                                key={earnings_code.code}
                                onSelect={() => {
                                  form.setValue(
                                    "earnings_code",
                                    earnings_code.code
                                  );
                                  setOpenPopover(false);
                                }}
                              >
                                {`${earnings_code.code} - ${earnings_code.description}`}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    earnings_code.code === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                <Check />
                Save
              </Button>
            </DialogFooter>
          </div>
        </div>
      </form>
    </Form>
  );
}
