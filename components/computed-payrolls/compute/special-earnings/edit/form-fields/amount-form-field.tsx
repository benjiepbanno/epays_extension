"use client";

import { useState } from "react";
import { EditSpecialEarningsFormType } from "@/lib/computed-payrolls/schemas";
import { ChevronsLeftRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

type Props = {
  form: EditSpecialEarningsFormType;
  salary_rate: number;
};

export default function AmountFormField({ form, salary_rate }: Props) {
  const [amountMode, setAmountMode] = useState<
    "fixedRate" | "salaryRatePercentage" | "fixedRatePercentage"
  >("fixedRate");

  const [salaryRatePercentage, setSalaryRatePercentage] = useState<string>("");
  const [fixedRatePercentage, setFixedRatePercentage] = useState<string>("");
  const [fixedRate, setFixedRate] = useState<string>(""); // Amount of fixed rate percentage

  function handleSwitchAmountMode() {
    setSalaryRatePercentage("");
    setFixedRatePercentage("");
    setFixedRate("");
    setAmountMode((prev) =>
      prev === "fixedRate"
        ? "salaryRatePercentage"
        : prev === "salaryRatePercentage"
        ? "fixedRatePercentage"
        : "fixedRate"
    );
  }

  return (
    <div className="space-y-0.5">
      <div className="flex flex-row gap-1 items-center">
        <div className="text-sm font-medium">Amount</div>
        <span className="text-sm">
          (
          {amountMode === "fixedRate"
            ? "Fixed Rate"
            : amountMode === "salaryRatePercentage"
            ? "Salary Rate Percentage"
            : "Fixed Rate Percentage"}
          )
        </span>
      </div>
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <div className="flex flex-row gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className=""
                  onClick={handleSwitchAmountMode}
                >
                  <ChevronsLeftRight />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Switch Amount Mode</TooltipContent>
            </Tooltip>

            <div className="flex w-full">
              {amountMode === "fixedRate" && (
                <FormItem className="w-full">
                  {/* Fixed Rate */}
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        setSalaryRatePercentage("");
                        setFixedRatePercentage("");
                        setFixedRate("");
                      }}
                      placeholder="Enter amount"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              {amountMode === "salaryRatePercentage" && (
                <FormItem>
                  {/* Salary Rate Percentage */}
                  <div className="flex flex-row gap-1 items-center">
                    <FormControl>
                      <Input
                        type="number"
                        value={salaryRatePercentage}
                        onChange={(e) => {
                          const pct = e.target.value;
                          setSalaryRatePercentage(pct);
                          setFixedRatePercentage("");
                          setFixedRate("");
                          const pctNum = parseFloat(pct);
                          if (!isNaN(pctNum)) {
                            form.setValue(
                              "amount",
                              (salary_rate * pctNum) / 100,
                              {
                                shouldValidate: true,
                              }
                            );
                          } else {
                            form.setValue("amount", 0, {
                              shouldValidate: true,
                            });
                          }
                        }}
                        disabled={salary_rate === null}
                        placeholder="%"
                        className="w-28"
                      />
                    </FormControl>
                    <span>of</span>
                    <FormControl>
                      <Input
                        type="number"
                        value={salary_rate}
                        readOnly
                        disabled
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
              {amountMode === "fixedRatePercentage" && (
                <FormItem>
                  {/* Fixed Rate Percentage */}
                  <div className="flex flex-row gap-1 items-center">
                    <FormControl>
                      <Input
                        type="number"
                        value={fixedRatePercentage}
                        onChange={(e) => {
                          const pct = e.target.value;
                          setFixedRatePercentage(pct);
                          setSalaryRatePercentage("");
                          const pctNum = parseFloat(pct);
                          const rateNum = parseFloat(fixedRate);
                          if (!isNaN(pctNum) && !isNaN(rateNum)) {
                            form.setValue("amount", (rateNum * pctNum) / 100, {
                              shouldValidate: true,
                            });
                          } else {
                            form.setValue("amount", 0, {
                              shouldValidate: true,
                            });
                          }
                        }}
                        placeholder="%"
                        className="w-28"
                      />
                    </FormControl>
                    <span>of</span>
                    <FormControl>
                      <Input
                        type="number"
                        value={fixedRate}
                        onChange={(e) => {
                          const rate = e.target.value;
                          setFixedRate(rate);
                          setSalaryRatePercentage("");
                          const pctNum = parseFloat(fixedRatePercentage);
                          const rateNum = parseFloat(rate);
                          if (!isNaN(pctNum) && !isNaN(rateNum)) {
                            form.setValue("amount", (rateNum * pctNum) / 100, {
                              shouldValidate: true,
                            });
                          } else {
                            form.setValue("amount", 0, {
                              shouldValidate: true,
                            });
                          }
                        }}
                        placeholder="amount"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
}
