"use client";

import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { specialEarningsSchema } from "@/lib/special-earnings/schemas";
import { deleteSpecialEarnings } from "@/actions/special-earnings-actions";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DataTableDeleteSelectedProps<TData> {
  table: Table<TData>;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DataTableDeleteSelected<TData>({
  table,
  open,
  setOpen,
}: DataTableDeleteSelectedProps<TData>) {
  const [isLoading, setIsLoading] = useState(false);

  const selected = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => specialEarningsSchema.parse(row.original));

  async function handleDelete() {
    setIsLoading(true);

    const deletionPromises = selected.map(async (special_earnings) => {
      const { error } = await deleteSpecialEarnings({
        special_earnings_id: special_earnings.special_earnings_id,
      });

      if (error) {
        toast.error(
          `Special earnings ${special_earnings.earnings_code} has not been deleted`
        );
      } else {
        toast.success(
          `Special earnings ${special_earnings.earnings_code} has been deleted`
        );
      }
    });

    await Promise.all(deletionPromises);

    table.toggleAllRowsSelected(false);
    setIsLoading(false);
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Special Earnings</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{selected.length}</strong>{" "}
            selected special earnings? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
