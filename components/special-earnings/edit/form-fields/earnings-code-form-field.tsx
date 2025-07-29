"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { EditFormType } from "@/lib/special-earnings/schemas";
import { Check, ChevronsUpDown } from "lucide-react";
import { useGetEarningsCodesResponseStore } from "@/store/external-databases/get-earnings-codes-response-store";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  form: EditFormType;
};

export default function EarningsCodeFormField({ form }: Props) {
  const { response: get_earnings_codes_response } =
    useGetEarningsCodesResponseStore();

  const earnings_codes: {
    code: string;
    description: string;
  }[] = get_earnings_codes_response.body ?? [];

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <FormField
      control={form.control}
      name="earnings_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Earnings Code</FormLabel>
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openPopover}
                  className={cn(
                    "w-full truncate justify-between font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    <div>
                      <Badge variant="secondary">{field.value}</Badge>
                      <span className="text-xs">
                        {" "}
                        {earnings_codes.find(
                          (earnings_code) => earnings_code.code === field.value
                        )?.description || "Unknown earnings code"}
                      </span>
                    </div>
                  ) : (
                    "Select an earnings code"
                  )}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput
                  placeholder="Search an earnings code..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No earnings code found.</CommandEmpty>
                  <CommandGroup>
                    {earnings_codes.map((earnings_code) => (
                      <CommandItem
                        value={`${earnings_code.code} ${earnings_code.description}`}
                        key={earnings_code.code}
                        onSelect={() => {
                          form.setValue("earnings_code", earnings_code.code, {
                            shouldValidate: true,
                          });
                          setOpenPopover(false);
                        }}
                      >
                        <Badge variant="secondary">{earnings_code.code}</Badge>
                        <span className="text-xs">
                          {earnings_code.description}
                        </span>
                        <Check
                          className={cn(
                            "ml-auto",
                            earnings_code.code === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
