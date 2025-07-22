"use client";

import { useEffect } from "react";

import { SpecialEarnings } from "@/lib/computed-payrolls/schemas";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetEarningsCodesResponseStore } from "@/store/special-earnings/get-earnings-codes-response-store";

type Props = {
  special_earnings: SpecialEarnings[];
};

export default function SpecialEarningsTable({ special_earnings }: Props) {
  const { response: get_earnings_codes_response, fetchAndSetResponse } =
    useGetEarningsCodesResponseStore();

  useEffect(() => {
    if (!get_earnings_codes_response.body) {
      fetchAndSetResponse();
    }
  }, [get_earnings_codes_response.body, fetchAndSetResponse]);

  return (
    <div>
      <DataTable columns={columns} data={special_earnings} />
    </div>
  );
}
