"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MONTHS, YEARS } from "@/lib/special-earnings/date";
import { ALLOWED_FILES, TRANSACTION_TYPES } from "@/lib/uploaded-payrolls/data";
import { usePayrollInitializationStore } from "@/store/uploaded-payrolls/payroll-initialization-store";
import { useGetSequenceNumbersResponseStore } from "@/store/uploaded-payrolls/get-sequence-numbers-response-store";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const formSchema = z.object({
  payroll_files: z
    .array(z.instanceof(File))
    .refine((files) => files.length > 0, "Payroll files not found")
    .refine(
      (files) => files.length === ALLOWED_FILES.length,
      "Some payroll files are missing."
    ),
  appointment_status_code: z.string().min(1, "Required"),
  period_year: z.string().min(1, "Required"),
  period_month: z.string().min(1, "Required"),
  transaction_type: z.string().min(1, "Required"),
  sequence_number: z.string().min(1, "Required"),
  claim_type: z.string().min(1, "Required"),
});

type Props = {
  setStep: (step: number) => void;
};

export default function UploadPayrollForm({ setStep }: Props) {
  const { fields, setFields } = usePayrollInitializationStore();
  const { response, is_loading, error, fetchAndSetResponse } =
    useGetSequenceNumbersResponseStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const [folderName, setFolderName] = useState<string>(
    fields.folder_name || "Choose folder"
  );
  const [transactionTypes, setTransactionTypes] = useState<any>([]);
  const [sequenceNumbers, setSequenceNumbers] = useState<any>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payroll_files: fields.payroll_files || [],
      appointment_status_code: fields.appointment_status_code || "",
      period_year: fields.period_year || "2025",
      period_month: fields.period_month || "",
      transaction_type: fields.transaction_type || "",
      sequence_number: fields.sequence_number || "",
      claim_type: fields.claim_type || "",
    },
  });

  const payroll_files = form.watch("payroll_files");
  const appointment_status_code = form.watch("appointment_status_code");
  const period_year = form.watch("period_year");
  const period_month = form.watch("period_month");
  const transaction_type = form.watch("transaction_type");
  const sequence_number = form.watch("sequence_number");

  // Update transaction types when appointment status changes
  useEffect(() => {
    if (appointment_status_code) {
      if (transaction_type) {
        form.setValue("transaction_type", "");
      }

      if (appointment_status_code === "p") {
        setTransactionTypes(TRANSACTION_TYPES.plantilla);
      } else if (appointment_status_code === "np") {
        setTransactionTypes(TRANSACTION_TYPES.non_plantilla);
      }
    }
  }, [appointment_status_code]);

  // Fetch sequence numbers when payroll files, period year, period month, and transaction type change
  useEffect(() => {
    if (sequence_number) {
      form.setValue("sequence_number", "");
    }

    setSequenceNumbers([]);

    if (
      payroll_files.length > 0 &&
      period_year &&
      period_month &&
      transaction_type
    ) {
      const selectedTransactionType = transactionTypes.find(
        (type: any) => type.id === transaction_type
      );

      const sourceFileName =
        selectedTransactionType?.sequence_numbers_source_file;

      let selectedFile: File | undefined;
      if (sourceFileName) {
        selectedFile = payroll_files.find(
          (file) => file.name.toLowerCase() === sourceFileName.toLowerCase()
        ) as File;
      }

      if (selectedFile) {
        fetchAndSetResponse({
          payroll_file: selectedFile,
          period_year,
          period_month,
          transaction_type,
        });
      }
    }
  }, [payroll_files, period_year, period_month, transaction_type]);

  // Update sequence numbers when response changes
  useEffect(() => {
    if (response.body) {
      setSequenceNumbers(response.body);
    }
  }, [response.body]);

  function handleFolderSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    console.log("e:",e.target)

    if (files && files.length > 0) {
      // Filter only allowed files
      const allowed = Array.from(files).filter((file) =>
        ALLOWED_FILES.includes(file.name.toLowerCase())
      );

      form.setValue("payroll_files", allowed);
      form.trigger("payroll_files"); // Revalidate the field

      // Get the root folder name from the first file's webkitRelativePath
      const firstPath = files[0].webkitRelativePath;
      const folder = firstPath.split("/")[0];
      setFolderName(folder);
    } else {
      setFolderName("Choose folder");
      form.setValue("payroll_files", []);
      form.trigger("payroll_files"); // Revalidate the field
    }
  }

  console.log(payroll_files)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    setFields({ folder_name: folderName, ...values });
    setStep(2);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {/* Payroll File */}
          <div>
            <FormField
              control={form.control}
              name="payroll_files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payroll Path</FormLabel>
                  <div className="flex flex-row gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => inputRef.current?.click()}
                    >
                      <Plus />
                    </Button>
                    <FormControl>
                      <Input value={folderName} disabled />
                    </FormControl>
                  </div>

                  <Input
                    ref={inputRef}
                    id="path"
                    type="file"
                    style={{ display: "none" }}
                    // @ts-ignore – allow non-standard attribute
                    webkitdirectory="true"
                    directory=""
                    multiple
                    onChange={handleFolderSelect}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Appointment Status */}
          <div>
            <FormField
              control={form.control}
              name="appointment_status_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select appointment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="p">Plantilla</SelectItem>
                      <SelectItem value="np">Non-plantilla</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Period */}
          <div className="flex flex-col gap-0.5">
            <div className="col-span-8 text-sm font-medium">Period</div>
            <div className="grid grid-cols-8 gap-1">
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="period_year"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {YEARS.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-5">
                <FormField
                  control={form.control}
                  name="period_month"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MONTHS.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <FormField
              control={form.control}
              name="transaction_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full truncate">
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transactionTypes?.map(
                        (transaction_type: { id: string; label: string }) => (
                          <SelectItem
                            key={transaction_type.id}
                            value={transaction_type.id}
                          >
                            {transaction_type.label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Sequence Number */}
          <div>
            <FormField
              control={form.control}
              name="sequence_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sequence Number</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select sequence number" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sequenceNumbers.map((sequence_number: string) => (
                        <SelectItem
                          key={sequence_number}
                          value={sequence_number}
                        >
                          {sequence_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Claim Type */}
          <div>
            <FormField
              control={form.control}
              name="claim_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Claim Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select claim type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="atm">ATM or non ATM</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2">
            <DialogFooter>
              <Button type="submit">Next</Button>
            </DialogFooter>
          </div>
        </div>
      </form>
    </Form>
  );
}
