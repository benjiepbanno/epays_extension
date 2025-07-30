"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EditSpecialEarningsForm from "./edit-special-earnings-form";
import EditSpecialEarningsFormSkeleton from "./edit-special-earnings-form-skeleton";
import ErrorAlert from "@/components/error-alert";

import { useGetResponseStore } from "@/store/special-earnings/get-response-store";
import { useGetEarningsCodesResponseStore } from "@/store/external-databases/get-earnings-codes-response-store";
import { AlertCircleIcon } from "lucide-react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  amount: number;
};

export default function EditSpecialEarningsDialog({
  open,
  setOpen,
  amount,
}: Props) {
  const {
    response: get_special_earnings_response,
    is_loading: get_special_earnings_is_loading,
    error: get_special_earnings_error,
  } = useGetResponseStore();

  const { error: get_earnings_codes_error } =
    useGetEarningsCodesResponseStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Special Earnings</DialogTitle>
          <DialogDescription>
            Update the selected personnel's special earnings amount.
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            Editing the special earnings amount creates a copy of the original
            record for payroll computation. The original special earnings record
            in the database remains unchanged.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-4 min-h-86">
          {get_special_earnings_is_loading ? (
            <div className="flex flex-col justify-end h-full">
              <EditSpecialEarningsFormSkeleton />
            </div>
          ) : get_earnings_codes_error || get_special_earnings_error ? (
            <div className="flex flex-col gap-2">
              {get_earnings_codes_error && (
                <div className="flex flex-col justify-start h-full">
                  <ErrorAlert error={get_earnings_codes_error} />
                </div>
              )}
              {get_special_earnings_error && (
                <div className="flex flex-col justify-start h-full">
                  <ErrorAlert error={get_special_earnings_error} />
                </div>
              )}
            </div>
          ) : get_special_earnings_response.body ? (
            <div className="flex flex-col justify-end h-full">
              <EditSpecialEarningsForm amount={amount} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
