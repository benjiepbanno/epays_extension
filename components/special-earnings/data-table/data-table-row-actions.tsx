"use client";

import { useEffect, useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import { specialEarningsSchema } from "@/lib/special-earnings/schemas";
import { useGetResponseStore } from "@/store/special-earnings/get-response-store";
import EditSpecialEarningsDialog from "../edit/edit-special-earnings-dialog";
import DeleteSpecialEarningsDialog from "../delete/delete-special-earnings-dialog";


interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const special_earnings = specialEarningsSchema.parse(row.original);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { fetchAndSetResponse } = useGetResponseStore();

  useEffect(() => {
    if (openEditDialog) {
      fetchAndSetResponse({ special_earnings_id: special_earnings.special_earnings_id });
    }
  }, [openEditDialog, fetchAndSetResponse, special_earnings.special_earnings_id]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-muted size-8"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="">
          <DropdownMenuItem onClick={() => setOpenEditDialog(true)}>
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openEditDialog && (
        <EditSpecialEarningsDialog
          open={openEditDialog}
          setOpen={setOpenEditDialog}
        />
      )}

      {openDeleteDialog && (
        <DeleteSpecialEarningsDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          special_earnings_id={special_earnings.special_earnings_id}
        />
      )}
    </>
  );
}
