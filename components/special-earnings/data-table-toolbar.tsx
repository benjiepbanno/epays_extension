"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "../data-table-reusable-components/data-table-view-options";
import NewSpecialEarningsDialog from "./new/new-special-earnings-dialog";

import {
  appointment_statuses,
  earnings_statuses,
} from "@/lib/special-earnings/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <NewSpecialEarningsDialog />

        <Input
          placeholder="Filter employees..."
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
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
