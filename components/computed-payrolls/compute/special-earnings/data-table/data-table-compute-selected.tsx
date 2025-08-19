"use client";

import { Table } from "@tanstack/react-table";
import { specialEarningsSchema } from "@/lib/computed-payrolls/schemas";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Binary, Plus } from "lucide-react";

interface DataTableComputeSelectedProps<TData> {
  table: Table<TData>;
}

export default function DataTableComputeSelected<TData>({
  table,
}: DataTableComputeSelectedProps<TData>) {
  const selected = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => specialEarningsSchema.parse(row.original));

  console.log(selected)

  return (
    <div>
      <DialogFooter>
        <Button disabled={selected.length === 0}>
          <Binary />
          Compute
        </Button>
      </DialogFooter>
    </div>
  );
}
