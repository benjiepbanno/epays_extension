"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "../data-table-reusable-components/data-table-view-options";
import NewSpecialEarningsDialog from "./new/new-special-earnings-dialog";

import { appointment_statuses, earnings_statuses } from "@/lib/data";
import { useGetEarningsCodesResponseStore } from "@/store/special-earnings/get-earnings-codes-response-store";
import { DataTableDeleteSelected } from "./delete/data-table-delete-selected";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { response } = useGetEarningsCodesResponseStore();
  const earnings_codes: {
    code: string;
    description: string;
  }[] = response.body ?? [];

  return (
    <div className="flex flex-row gap-24 items-start">
      <div className="flex flex-wrap flex-1 items-center gap-2">
        <NewSpecialEarningsDialog />

        <Input
          placeholder="Search employee name..."
          value={
            (table.getColumn("employee_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("employee_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("appointment_status_code") && (
          <DataTableFacetedFilter
            column={table.getColumn("appointment_status_code")}
            title="Appointment Status"
            options={appointment_statuses}
          />
        )}
        {table.getColumn("earnings_code") && (
          <DataTableFacetedFilter
            column={table.getColumn("earnings_code")}
            title="Earnings Code"
            options={earnings_codes.map((code) => ({
              label: code.description,
              value: code.code,
            }))}
          />
        )}
        {table.getColumn("earnings_status_code") && (
          <DataTableFacetedFilter
            column={table.getColumn("earnings_status_code")}
            title="Earnings Status"
            options={earnings_statuses}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
            className="text-red-500 hover:text-red-600 hover:bg-red-100"
          >
            <X />
            Reset
          </Button>
        )}
      </div>
      <div className="flex flex-row items-center gap-2">
        <DataTableDeleteSelected table={table} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
