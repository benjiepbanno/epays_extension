"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import PersonnelForm from "./personnel-form";
import NewSpecialEarningsForm from "./new-special-earnings-form";
import NewSpecialEarningsFormSkeleton from "./new-special-earnings-form-skeleton";
import ErrorAlert from "../../error-alert";

import { useGetEarningsCodesResponseStore } from "@/store/external-databases/get-earnings-codes-response-store";
import { useGetPersonnelResponseStore } from "@/store/external-databases/get-personnel-response-store";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function NewSpecialEarningsDialog({ open, setOpen }: Props) {
  const { error: get_earnings_codes_error } =
    useGetEarningsCodesResponseStore();

  const {
    response: get_personnel_response,
    is_loading: get_personnel_is_loading,
    error: get_personnel_error,
  } = useGetPersonnelResponseStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-xl">
        <DialogHeader>
          <DialogTitle>New Special Earnings</DialogTitle>
          <DialogDescription>
            Search for a personnel and enter special earnings details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 min-h-128">
          <PersonnelForm />

          {get_personnel_is_loading ? (
            <div className="flex flex-col justify-end h-full">
              <NewSpecialEarningsFormSkeleton />
            </div>
          ) : get_earnings_codes_error || get_personnel_error ? (
            <div className="flex flex-col gap-2">
              {get_earnings_codes_error && (
                <div className="flex flex-col justify-start h-full">
                  <ErrorAlert error={get_earnings_codes_error} />
                </div>
              )}
              {get_personnel_error && (
                <div className="flex flex-col justify-start h-full">
                  <ErrorAlert error={get_personnel_error} />
                </div>
              )}
            </div>
          ) : get_personnel_response.body ? (
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
