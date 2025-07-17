"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-reusable-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import { SpecialEarnings } from "@/lib/special-earnings/schemas";
import {
  appointment_statuses,
  earnings_statuses,
} from "@/lib/special-earnings/data";
import { formatPeriod } from "@/lib/special-earnings/utils";
import { useGetEarningsCodesResponseStore } from "@/store/special-earnings/get-earnings-codes-response-store";

import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<SpecialEarnings>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employee_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Number" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employee_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[300px]">{row.getValue("employee_name")}</div>
    ),
  },
  {
    accessorKey: "appointment_status_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appointment Status" />
    ),
    cell: ({ row }) => {
      const appointment_status = appointment_statuses.find(
        (appointment_status) =>
          appointment_status.value === row.original.appointment_status_code
      );

      return (
        <div>
          {appointment_status && (
            <Badge variant="outline">{appointment_status.label}</Badge>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "earnings_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Earnings Code" />
    ),
    cell: ({ row }) => {
      const { response } = useGetEarningsCodesResponseStore();
      const earnings_codes: {
        code: string;
        description: string;
      }[] = response.body ?? [];

      const earnings_code = earnings_codes.find(
        (earnings_code) => earnings_code.code === row.original.earnings_code
      );

      return (
        <div>
          {earnings_code ? (
            <div>
              <Badge variant="secondary">{earnings_code.code}</Badge>
              <span className="text-xs"> {earnings_code.description}</span>
            </div>
          ) : (
            <div>
              <Badge variant="secondary">{row.original.earnings_code}</Badge>
              <Badge variant="destructive">Unknown</Badge>
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "period_from",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Period From" />
    ),
    cell: ({ row }) => <div>{formatPeriod(row.getValue("period_from"))}</div>,
  },
  {
    accessorKey: "period_to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Period To" />
    ),
    cell: ({ row }) => <div>{formatPeriod(row.getValue("period_to"))}</div>,
  },
  {
    accessorKey: "earnings_status_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Earnings Status" />
    ),
    cell: ({ row }) => {
      const earnings_status = earnings_statuses.find(
        (earnings_status) =>
          earnings_status.value === row.original.earnings_status_code
      );

      return (
        <div>
          {earnings_status && (
            <div className="flex gap-2 items-center">
              <div className="inline-grid *:[grid-area:1/1]">
                {earnings_status.value === "1" && (
                  <div
                    className={`status status-lg ${earnings_status.css} animate-ping`}
                  ></div>
                )}

                <div
                  className={`status status-lg ${earnings_status.css}`}
                ></div>
              </div>
              <div className="">{earnings_status.label}</div>
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
