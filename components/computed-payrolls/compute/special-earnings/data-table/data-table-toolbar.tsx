"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { appointment_statuses, earnings_statuses } from "@/lib/data";
import { useGetOfficesResponseStore } from "@/store/external-databases/get-offices-response-store";
import { useGetWorkstationsResponseStore } from "@/store/external-databases/get-workstations-response-store";
import { useGetEarningsCodesResponseStore } from "@/store/external-databases/get-earnings-codes-response-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table-reusable-components/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table-reusable-components/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { response: offices_response } = useGetOfficesResponseStore();
  const { response: workstations_response } = useGetWorkstationsResponseStore();
  const { response: earnings_codes_response } =
    useGetEarningsCodesResponseStore();

  const offices: {
    code: string;
    name: string;
    abbr: string;
  }[] = offices_response.body ?? [];

  const workstations: {
    code: string;
    name: string;
  }[] = workstations_response.body ?? [];

  const earnings_codes: {
    code: string;
    description: string;
  }[] = earnings_codes_response.body ?? [];

  return (
    <div className="flex flex-row gap-24 items-start">
      <div className="flex flex-wrap flex-1 items-center gap-2">
        <Input
          placeholder="Search personnel name..."
          value={
            (table.getColumn("personnel_name")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("personnel_name")
              ?.setFilterValue(event.target.value)
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
        {table.getColumn("office_code") && (
          <DataTableFacetedFilter
            column={table.getColumn("office_code")}
            title="Office"
            options={offices.map((office) => ({
              label: office.name,
              value: office.code,
            }))}
          />
        )}
        {table.getColumn("workstation_code") && (
          <DataTableFacetedFilter
            column={table.getColumn("workstation_code")}
            title="Workstation"
            options={workstations.map((workstation) => ({
              label: workstation.name,
              value: workstation.code,
            }))}
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
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
