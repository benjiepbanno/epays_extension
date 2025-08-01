"use client";

import { useEffect } from "react";

import { usePeriodStore } from "@/store/computed-payrolls/period-store";
import { useGetSpecialEarningsResponseStore } from "@/store/computed-payrolls/get-special-earnings-response-store";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import PeriodForm from "./period-form";
import SpecialEarningsTable from "./special-earnings/special-earnings-table";
import ErrorAlert from "@/components/error-alert";
import SpecialEarningsTableSkeleton from "./special-earnings/special-earnings-table-skeleton";

export default function ComputePayrollDialog() {
  const { fields } = usePeriodStore();
  const {
    response,
    is_loading,
    error,
    fetchAndSetResponse: fetchAndSetGetSpecialEarningsResponse,
  } = useGetSpecialEarningsResponseStore();

  useEffect(() => {
    if (fields.period_year && fields.period_month) {
      fetchAndSetGetSpecialEarningsResponse({
        period_year: fields.period_year,
        period_month: fields.period_month,
      });
    }
  }, [fields, fetchAndSetGetSpecialEarningsResponse]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Compute Payroll
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-7xl">
        <DialogHeader>
          <DialogTitle>Compute Payroll</DialogTitle>
          <DialogDescription>
            Select a payroll period and choose the special earnings to be
            included for that period.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 min-h-170">
          <PeriodForm />

          {is_loading ? (
            <div className="flex flex-col justify-end h-full">
              <SpecialEarningsTableSkeleton />
            </div>
          ) : error ? (
            <div className="flex flex-col justify-start h-full">
              <ErrorAlert error={error} />
            </div>
          ) : response.body ? (
            <div className="flex flex-col justify-end h-full">
              <SpecialEarningsTable special_earnings={response.body || []} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
