"use client";

import { useGetEmployeeResponseStore } from "@/store/special-earnings/get-employee-response-store";

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

import EmployeeSearchForm from "./employee-search-form";
import EmployeeSearchError from "./employee-search-error";
import NewSpecialEarningsFormSkeleton from "./new-special-earnings-form-skeleton";
import NewSpecialEarningsForm from "./new-special-earnings-form";

export default function NewSpecialEarningsDialog() {
  const { response, is_loading, error } = useGetEmployeeResponseStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          New
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Special Earnings</DialogTitle>
          <DialogDescription>
            Search for an employee and enter earnings details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 min-h-102">
          <EmployeeSearchForm />

          {is_loading ? (
            <div className="flex flex-col justify-end h-full">
              <NewSpecialEarningsFormSkeleton />
            </div>
          ) : error ? (
            <div className="flex flex-col justify-start h-full">
              <EmployeeSearchError />
            </div>
          ) : response.body ? (
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
