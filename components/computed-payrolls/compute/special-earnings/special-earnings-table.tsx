"use client";

import { useEffect } from "react";

import { SpecialEarnings } from "@/lib/computed-payrolls/schemas";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetOfficesResponseStore } from "@/store/external-databases/get-offices-response-store";
import { useGetWorkstationsResponseStore } from "@/store/external-databases/get-workstations-response-store";
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
    response: get_workstations_response,
    fetchAndSetResponse: fetchAndSetWorkstationsResponse,
  } = useGetWorkstationsResponseStore();

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
    if (!get_workstations_response.body) {
      fetchAndSetWorkstationsResponse();
    }
  }, [get_workstations_response.body, fetchAndSetWorkstationsResponse]);

  useEffect(() => {
    if (!get_earnings_codes_response.body) {
      fetchAndSetEarningsCodesResponse();
    }
  }, [get_earnings_codes_response.body, fetchAndSetEarningsCodesResponse]);

  return (
    <div>
      <DataTable columns={columns} data={special_earnings} />
    </div>
  );
}
