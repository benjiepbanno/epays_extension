"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-reusable-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import { SpecialEarnings } from "@/lib/special-earnings/schemas";
import { appointment_statuses, earnings_statuses } from "@/lib/data";
import { formatPeriod } from "@/lib/special-earnings/utils";
import { useGetEarningsCodesResponseStore } from "@/store/external-databases/get-earnings-codes-response-store";
import { useGetOfficesResponseStore } from "@/store/external-databases/get-offices-response-store";
import { useGetWorkstationsResponseStore } from "@/store/external-databases/get-workstations-response-store";

import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import DataTableCellMissingValue from "../data-table-reusable-components/data-table-cell-missing-value";


export const columns: ColumnDef<SpecialEarnings>[] = [
  // Select
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
  // Personnel ID
  {
    accessorKey: "personnel_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Personnel Name
  {
    accessorKey: "personnel_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Personnel Name" />
    ),
    cell: ({ row }) => {
      const personnel_name = row.original.personnel_name;

      return (
        <div className="max-w-[300px]">
          {personnel_name ? (
            <span className="text-wrap">{personnel_name}</span>
          ) : (
            <DataTableCellMissingValue />
          )}
        </div>
      );
    },
  },
  // Appointment Status Code
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
            <Badge variant="secondary">{appointment_status.label}</Badge>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Office Code
  {
    accessorKey: "office_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Office" />
    ),
    cell: ({ row }) => {
      const { response } = useGetOfficesResponseStore();
      const offices: {
        code: string;
        name: string;
        abbr: string;
      }[] = response.body ?? [];

      const office = offices.find(
        (office) => office.code === row.original.office_code
      );

      return (
        <div className="max-w-[200px]">
          {office ? (
            <>
              <Badge variant="secondary">{office.code}</Badge>
              <span className="text-xs text-wrap"> {office.name}</span>
            </>
          ) : row.getValue("office_code") ? (
            <>
              <Badge variant="outline">{row.getValue("office_code")}</Badge>
              <span className="text-xs text-wrap"> Unknown</span>
            </>
          ) : (
            <DataTableCellMissingValue />
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Workstation Code
  {
    accessorKey: "workstation_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Workstation" />
    ),
    cell: ({ row }) => {
      const { response } = useGetWorkstationsResponseStore();
      const workstations: {
        code: string;
        name: string;
      }[] = response.body ?? [];

      const workstation = workstations.find(
        (workstation) => workstation.code === row.original.workstation_code
      );

      return (
        <div className="max-w-[200px]">
          {workstation ? (
            <>
              <Badge variant="secondary">{workstation.code}</Badge>
              <span className="text-xs text-wrap"> {workstation.name}</span>
            </>
          ) : row.getValue("workstation_code") ? (
            <>
              <Badge variant="outline">
                {row.getValue("workstation_code")}
              </Badge>
              <span className="text-xs text-wrap"> Unknown</span>
            </>
          ) : (
            <DataTableCellMissingValue />
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Earnings Code
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
        <div className="max-w-[200px]">
          {earnings_code ? (
            <>
              <Badge variant="secondary">{earnings_code.code}</Badge>
              <span className="text-xs text-wrap">
                {" "}
                {earnings_code.description}
              </span>
            </>
          ) : (
            <>
              <Badge variant="secondary">{row.original.earnings_code}</Badge>
              <Badge variant="destructive">Unknown</Badge>
            </>
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
  // Amount
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
    enableSorting: false,
    enableHiding: false,
  },
  // Period From
  {
    accessorKey: "period_from",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Period From" />
    ),
    cell: ({ row }) => <div>{formatPeriod(row.getValue("period_from"))}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  // Period To
  {
    accessorKey: "period_to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Period To" />
    ),
    cell: ({ row }) => <div>{formatPeriod(row.getValue("period_to"))}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  // Earnings Status Code
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
  // Actions
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
