"use client";

import { useEffect } from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { SpecialEarnings } from "@/lib/special-earnings/schema";
import NewSpecialEarningsDialog from "./new/new-special-earnings-dialog";

type Props = {
  special_earnings: SpecialEarnings[];
};

export default function SpecialEarningsTable({ special_earnings }: Props) {
  return (
    <div>
      <NewSpecialEarningsDialog />
      <DataTable columns={columns} data={special_earnings} />
    </div>
  );
}
