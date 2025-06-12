"use client";

import { useState } from "react";
import { EmployeeSearch } from "@/lib/special-earnings/types";
import { useEmployeeSearchResultStore } from "@/store/special-earnings/employee-search-result-store";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EmployeeSearchForm from "./employee-search-form";
import EmployeeSearchError from "./employee-search-error";
import EncodeForm from "./encode-form";
import EncodeFormSkeleton from "./encode-form-skeleton";
import { CirclePlus } from "lucide-react";

export default function EncodeDialog() {
  const { employee_search_result, is_loading, error } =
    useEmployeeSearchResultStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          New
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Special Earning</DialogTitle>
          <DialogDescription>
            Search employee and input earning details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 min-h-112">
          <EmployeeSearchForm />

          {is_loading ? (
            <div className="flex flex-col justify-end h-full">
              <EncodeFormSkeleton />
            </div>
          ) : Object.keys(employee_search_result.body).length !== 0 ? (
            <div className="flex flex-col justify-end h-full">
              <EncodeForm />
            </div>
          ) : error ? (
            <div className="flex flex-col justify-end h-full">
              <EmployeeSearchError />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
