"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import PayrollPath from "./initialization/payroll-path";
import PayrollPeriod from "./initialization/payroll-period";
import PayrollTransactionType from "./initialization/payroll-transaction-type";
import PayrollClaimType from "./initialization/payroll-claim-type";
import PayrollSequenceNumber from "./initialization/payroll-sequence-number";

export default function Initialization() {
  const [filteredFiles, setFilteredFiles] = useState<File[]>([]);
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [claimType, setClaimType] = useState<string>("");

  function validateParameters() {
    if (!claimType) {
      toast.error("Claim type is required. Please select a claim type.");
    }

    if (!transactionType) {
      toast.error(
        "Transaction type is required. Please select a transaction type."
      );
    }

    if (!month) {
      toast.error("Period month is required. Please select a month.");
    }

    if (!year) {
      toast.error("Period year is required. Please select a year.");
    }

    if (!claimType || !transactionType || !month || !year) {
      return false;
    }

    return true;
  }

  function handleNext() {
    console.log("Filtered Files:", filteredFiles);

    const isValid = validateParameters();
    if (!isValid) return;

    console.log("Year:", year);
    console.log("Month:", month);
    console.log("Transaction Type:", transactionType);
    console.log("Claim Type:", claimType);
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <PayrollPath
            filteredFiles={filteredFiles}
            setFilteredFiles={setFilteredFiles}
          />
        </div>
        <PayrollPeriod
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
        />
        <PayrollTransactionType
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
        {/* <PayrollSequenceNumber /> */}
        <PayrollClaimType claimType={claimType} setClaimType={setClaimType} />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
