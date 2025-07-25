"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MONTHS, YEARS } from "@/lib/special-earnings/date";
import { ALLOWED_FILES, TRANSACTION_TYPES } from "@/lib/uploaded-payrolls/data";
import { usePayrollInitializationStore } from "@/store/uploaded-payrolls/payroll-initialization-store";
import { useGetSequenceNumbersResponseStore } from "@/store/uploaded-payrolls/get-sequence-numbers-response-store";
import { readSavedPaths, savePath, deletePath } from "@/app/api/payroll-paths/payroll-path.api";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Plus, FolderOpen, Trash2, ChevronDown, RotateCcw } from "lucide-react";

const formSchema = z.object({
  payroll_files: z
    .array(z.instanceof(File))
    .optional()
    .default([]),
  payroll_path: z.string().optional(),
  appointment_status_code: z.string().min(1, "Required"),
  period_year: z.string().min(1, "Required"),
  period_month: z.string().min(1, "Required"),
  transaction_type: z.string().min(1, "Required"),
  sequence_number: z.string().optional(),
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
  const [savedPaths, setSavedPaths] = useState<string[]>([]);
  const [selectedSavedPath, setSelectedSavedPath] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load saved paths on component mount
  useEffect(() => {
    const loadSavedPaths = async () => {
      const paths = await readSavedPaths();
      setSavedPaths(paths);
    };
    
    loadSavedPaths();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payroll_files: fields.payroll_files || [],
      payroll_path: fields.payroll_path || "",
      appointment_status_code: fields.appointment_status_code || "",
      period_year: fields.period_year || "2025",
      period_month: fields.period_month || "",
      transaction_type: fields.transaction_type || "",
      sequence_number: fields.sequence_number || "",
      claim_type: fields.claim_type || "",
    },
  });

  const payroll_files = form.watch("payroll_files");
  const payroll_path = form.watch("payroll_path");
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
      payroll_files && payroll_files.length > 0 &&
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

  async function handleFolderSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    console.log("Selected files:", files);

    if (files && files.length > 0) {
      // Filter only allowed files
      const allowed = Array.from(files).filter((file) =>
        ALLOWED_FILES.includes(file.name.toLowerCase())
      );

      form.setValue("payroll_files", allowed);
      form.setValue("payroll_path", ""); // Clear path when files are selected
      form.trigger("payroll_files"); // Revalidate the field

      // Get the root folder name from the first file's webkitRelativePath
      const firstPath = files[0].webkitRelativePath;
      const folder = firstPath.split("/")[0];
      setFolderName(folder);

      // Show validation message if not all required files are found
      if (allowed.length === 0) {
        form.setError("payroll_files", {
          type: "manual",
          message: `No valid payroll files found. Please select a folder containing the required .dbf files: ${ALLOWED_FILES.join(', ')}`
        });
      } else if (allowed.length < ALLOWED_FILES.length) {
        const missingFiles = ALLOWED_FILES.filter(requiredFile => 
          !allowed.some(file => file.name.toLowerCase() === requiredFile.toLowerCase())
        );
        form.setError("payroll_files", {
          type: "manual",
          message: `Missing required .dbf files: ${missingFiles.join(', ')}. Please select a folder containing all 8 required payroll files.`
        });
      }

      // Note: Path saving will happen in onSubmit to avoid duplicates
      console.log("Folder selected:", folder);
    } else {
      setFolderName("Choose folder");
      form.setValue("payroll_files", []);
      form.setValue("payroll_path", "");
      form.trigger("payroll_files"); // Revalidate the field
    }
  }

  // Handle selection from saved paths dropdown
  const handleSavedPathSelect = async (selectedPath: string) => {
    setSelectedSavedPath(selectedPath);
    setIsDropdownOpen(false); // Close dropdown after selection
    
    if (selectedPath) {
      try {
        // Extract folder name from path
        const pathParts = selectedPath.split(/[/\\]/);
        const folderName = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
        setFolderName(folderName);
        
        // Set the direct path
        form.setValue("payroll_path", selectedPath);
        
        // Create representative files for the path to maintain functionality
        // These represent the expected files in the selected folder
        const representativeFiles = ALLOWED_FILES.map((fileName) => {
          const file = new File([''], fileName, { type: 'application/octet-stream' });
          // Mark these as path-based files
          Object.defineProperty(file, 'isPathBased', {
            value: true,
            writable: false
          });
          Object.defineProperty(file, 'sourcePath', {
            value: selectedPath,
            writable: false
          });
          Object.defineProperty(file, 'webkitRelativePath', {
            value: `${folderName}/${fileName}`,
            writable: false
          });
          return file;
        });
        
        form.setValue("payroll_files", representativeFiles);
        form.clearErrors("payroll_files");
        
        console.log('Selected saved path:', selectedPath);
        console.log('Folder name set to:', folderName);
        console.log('Representative files created for functionality');
      } catch (error) {
        console.error('Error handling saved path selection:', error);
      }
    }
  };

  // Handle clearing the current selection
  const handleClearSelection = () => {
    setSelectedSavedPath("");
    setFolderName("Choose folder");
    form.setValue("payroll_files", []);
    form.setValue("payroll_path", "");
    form.clearErrors("payroll_files");
    console.log('Selection cleared');
  };

  // Handle delete with proper event stopping
  const handleDeletePath = async (pathToDelete: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const updatedPaths = await deletePath(pathToDelete);
    setSavedPaths(updatedPaths);
    
    // Clear the selected path if it was the one deleted
    if (selectedSavedPath === pathToDelete) {
      setSelectedSavedPath("");
      setFolderName("Choose folder");
      form.setValue("payroll_files", []);
      form.setValue("payroll_path", "");
    }
  };

  console.log("payroll_files:", payroll_files);
  console.log("payroll_path:", payroll_path);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    
    // Check if we have either files or a direct path selected
    const hasFiles = values.payroll_files && values.payroll_files.length > 0;
    const hasPath = values.payroll_path && values.payroll_path.trim() !== "";
    
    if (!hasFiles && !hasPath) {
      form.setError("payroll_files", {
        type: "manual",
        message: `Please select a payroll folder containing the required .dbf files: ${ALLOWED_FILES.join(', ')}`
      });
      return;
    }
    
    // If we have files, validate that we have all required files
    if (hasFiles && values.payroll_files!.length !== ALLOWED_FILES.length) {
      const missingFiles = ALLOWED_FILES.filter(requiredFile => 
        !values.payroll_files!.some(file => file.name.toLowerCase() === requiredFile.toLowerCase())
      );
      
      form.setError("payroll_files", {
        type: "manual",
        message: `Missing required .dbf files: ${missingFiles.join(', ')}. Please select a folder containing all 8 required payroll files.`
      });
      return;
    }
    
    // Save the current folder path if it's not already saved and we have real files
    if (folderName !== "Choose folder" && hasFiles) {
      const firstFile = values.payroll_files![0] as any;
      // Only save if it's a real file (not a representative file from recent paths)
      if (firstFile.webkitRelativePath && !firstFile.isPathBased) {
        // Try to get the actual directory path
        let pathToSave = "";
        
        if (firstFile.path) {
          // Electron environment - we have access to the full file path
          const filePath = firstFile.path.replace(/\//g, '\\'); // Normalize to Windows path
          pathToSave = filePath.substring(0, filePath.lastIndexOf('\\'));
        } else {
          // Browser environment - we can only save the folder name
          // Don't construct fake paths like "D:\folder_name"
          pathToSave = folderName;
        }
        
        if (pathToSave) {
          const updatedPaths = await savePath(pathToSave);
          setSavedPaths(updatedPaths);
        }
      }
    }
    
    setFields({ 
      folder_name: folderName, 
      payroll_path: values.payroll_path,
      ...values 
    });
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
                  
                  {/* Custom Saved Paths Dropdown */}
                  {savedPaths.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-medium text-foreground/80">
                          Recent Paths ({savedPaths.length})
                        </span>
                      </div>
                      
                      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between bg-gradient-to-r from-background to-muted/20 border-border/60 hover:border-border transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-500/10 rounded-md flex items-center justify-center">
                                <FolderOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <span className="text-sm">
                                {selectedSavedPath ? 
                                  (selectedSavedPath.split('\\').pop() || selectedSavedPath.split('/').pop()) : 
                                  "Select a recent path..."
                                }
                              </span>
                            </div>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full min-w-[400px] max-h-80 overflow-y-auto">
                          {savedPaths.map((path, index) => (
                            <DropdownMenuItem
                              key={index}
                              className="group relative py-3 px-3 cursor-pointer focus:bg-accent"
                              onSelect={() => handleSavedPathSelect(path)}
                            >
                              <div className="flex items-center justify-between gap-3 w-full">
                                {/* Path Content */}
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                    <FolderOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-foreground truncate">
                                      {path.split('\\').pop() || path.split('/').pop()}
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate">
                                      {path}
                                    </div>
                                  </div>
                                </div>

                                {/* Delete Button - Always visible for easy access */}
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 p-0 opacity-70 hover:opacity-100 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 flex-shrink-0"
                                  onClick={(e) => handleDeletePath(path, e)}
                                  title="Remove this path from recent paths"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                  {/* Browse for new folder */}
                  <div className="flex flex-row gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => inputRef.current?.click()}
                      title="Browse for new folder"
                    >
                      <Plus />
                    </Button>
                    <FormControl>
                      <Input value={folderName} disabled />
                    </FormControl>
                    {/* Clear Selection Button */}
                    {(folderName !== "Choose folder" || selectedSavedPath) && (
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={handleClearSelection}
                        title="Clear current selection"
                        className="hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
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