"use client";

import { useState } from "react";
import { STEPS } from "@/lib/uploaded-payrolls/data";

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
import { Progress } from "@/components/ui/progress";
import Initialization from "./initialization";

export default function UploadPayrollDialog() {
  const [currentStep, setCurrentStep] = useState(1);

  const step = STEPS.find((step) => step.id === currentStep);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === STEPS.length;

  function handleNext() {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  }

  function handleBack() {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Upload Payroll
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Payroll</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 min-h-102">
          <div className="flex flex-col gap-1">
            <div className="font-medium">{step?.label}</div>
            <Progress value={(currentStep / STEPS.length) * 100} />
          </div>

          {currentStep === 1 && <Initialization />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
