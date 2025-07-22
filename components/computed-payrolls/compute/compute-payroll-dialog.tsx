"use client";

import { useEffect } from "react";

import { usePeriodStore } from "@/store/computed-payrolls/period-store";
import { useGetSpecialEarningsResponseStore } from "@/store/computed-payrolls/get-special-earnings-response-store";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import PeriodForm from "./period-form";
import SpecialEarningsTable from "./special-earnings/special-earnings-table";

export default function ComputePayrollDialog() {
  const { fields } = usePeriodStore();
  const { response, fetchAndSetResponse } =
    useGetSpecialEarningsResponseStore();

  useEffect(() => {
    if (fields.period_year && fields.period_month) {
      fetchAndSetResponse({
        period_year: fields.period_year,
        period_month: fields.period_month,
      });
    }
  }, [fields, fetchAndSetResponse]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Compute Payroll
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-6xl">
        <DialogHeader>
          <DialogTitle>Compute Payroll</DialogTitle>
          <DialogDescription>
            Select a payroll period and choose the special
            earnings to be included for that period.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 min-h-150">
          <PeriodForm />
          <SpecialEarningsTable special_earnings={response.body || []} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
