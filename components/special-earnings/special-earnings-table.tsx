"use client";

import { useEffect } from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { SpecialEarnings } from "@/lib/special-earnings/schemas";
import { useGetOfficesResponseStore } from "@/store/external-databases/get-offices-response-store";
import { useGetEarningsCodesResponseStore } from "@/store/external-databases/get-earnings-codes-response-store";

type Props = {
  special_earnings: SpecialEarnings[];
};

export default function SpecialEarningsTable({ special_earnings }: Props) {
  const {
    response: get_offices_response,
    fetchAndSetResponse: fetchAndSetOfficesResponse,
  } = useGetOfficesResponseStore();

  const {
    response: get_earnings_codes_response,
    fetchAndSetResponse: fetchAndSetEarningsCodesResponse,
  } = useGetEarningsCodesResponseStore();

  useEffect(() => {
    if (!get_offices_response.body) {
      fetchAndSetOfficesResponse();
    }
  }, [get_offices_response.body, fetchAndSetOfficesResponse]);

  useEffect(() => {
    if (!get_earnings_codes_response.body) {
      fetchAndSetEarningsCodesResponse();
    }
  }, [get_earnings_codes_response.body, fetchAndSetEarningsCodesResponse]);

  console.log(get_offices_response.body);
  console.log(get_earnings_codes_response.body);

  return (
    <div>
      <DataTable columns={columns} data={special_earnings} />
    </div>
  );
}
