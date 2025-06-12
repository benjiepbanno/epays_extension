"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useEmployeeSearchResultStore } from "@/store/special-earnings/employee-search-result-store";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Info, Loader, Search } from "lucide-react";

const formSchema = z.object({
  employee_number: z.string().min(1, "Required"),
});

export default function EmployeeSearchForm() {
  const {
    employee_search_result,
    is_loading,
    fetchAndSetEmployeeSearchResult,
  } = useEmployeeSearchResultStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_number: employee_search_result.body.employee_number || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    fetchAndSetEmployeeSearchResult(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 items-end">
          <FormField
            control={form.control}
            name="employee_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Number</FormLabel>
                <FormControl>
                  <Input placeholder="Input an employee number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="">
            <Button type="submit" disabled={is_loading} className="">
              <Search />
              Search
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
