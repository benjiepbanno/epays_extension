"use client";

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

import EmployeeForm from "./employee-form";
import NewSpecialEarningsForm from "./new-special-earnings-form";
import NewSpecialEarningsFormSkeleton from "./new-special-earnings-form-skeleton";
import ErrorAlert from "../error-alert";

import { useGetEmployeeResponseStore } from "@/store/special-earnings/get-employee-response-store";
import { useGetEarningsCodesResponseStore } from "@/store/special-earnings/get-earnings-codes-response-store";

export default function NewSpecialEarningsDialog() {
  const {
    response: get_employee_response,
    is_loading: get_employee_is_loading,
    error: get_employee_error,
  } = useGetEmployeeResponseStore();

  const { error: get_earnings_codes_error } =
    useGetEarningsCodesResponseStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          New
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-xl">
        <DialogHeader>
          <DialogTitle>New Special Earnings</DialogTitle>
          <DialogDescription>
            Search for an employee and enter earnings details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 min-h-102">
          <EmployeeForm />

          {get_employee_is_loading ? (
            <div className="flex flex-col justify-end h-full">
              <NewSpecialEarningsFormSkeleton />
            </div>
          ) : get_earnings_codes_error || get_employee_error ? (
            <div className="flex flex-col gap-2">
              {get_earnings_codes_error && (
                <div className="flex flex-col justify-start h-full">
                  <ErrorAlert error={get_earnings_codes_error} />
                </div>
              )}
              {get_employee_error && (
                <div className="flex flex-col justify-start h-full">
                  <ErrorAlert error={get_employee_error} />
                </div>
              )}
            </div>
          ) : get_employee_response.body ? (
            <div className="flex flex-col justify-end h-full">
              <NewSpecialEarningsForm />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
