"use client";

import { useEffect, useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { specialEarningsSchema } from "@/lib/special-earnings/schema";
import EditSpecialEarningsDialog from "./edit/edit-special-earnings-dialog";
import DeleteSpecialEarningsDialog from "./delete/delete-special-earnings-dialog";

import { useGetResponseStore } from "@/store/special-earnings/get-response-store";

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
      fetchAndSetResponse({ special_earnings_id: special_earnings.id });
    }
  }, [openEditDialog, fetchAndSetResponse, special_earnings.id]);

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

      <EditSpecialEarningsDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      />

      <DeleteSpecialEarningsDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
      />
    </>
  );
}
