"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import UploadPayrollForm from "./upload-payroll-form";
import SupportingDocumentsReview from "./supporting-documents-review";

export default function UploadPayrollDialog() {
  const [step, setStep] = useState<number>(1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Upload Payroll
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle>Upload Payroll</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="">
          {step === 1 && <UploadPayrollForm setStep={setStep} />}
          {step === 2 && <SupportingDocumentsReview setStep={setStep} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
