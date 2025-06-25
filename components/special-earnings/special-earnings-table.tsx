"use client";

import { useEffect } from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { SpecialEarnings } from "@/lib/special-earnings/schema";
import { useGetEarningsCodesResponseStore } from "@/store/special-earnings/get-earnings-codes-response-store";

type Props = {
  special_earnings: SpecialEarnings[];
};

export default function SpecialEarningsTable({ special_earnings }: Props) {
  const {
    response: get_earnings_codes_response,
    fetchAndSetResponse,
  } = useGetEarningsCodesResponseStore();

  useEffect(() => {
    if (!get_earnings_codes_response.body) {
      fetchAndSetResponse();
    }
    console.log(get_earnings_codes_response);
  }, [get_earnings_codes_response.body, fetchAndSetResponse]);

  return (
    <div>
      <DataTable columns={columns} data={special_earnings} />
    </div>
  );
}
