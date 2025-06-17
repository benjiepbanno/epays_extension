"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { useGetEmployeeResponseStore } from "@/store/special-earnings/get-employee-response-store";

const formSchema = z.object({
  employee_number: z.string().min(1, "Required"),
});

export default function EmployeeSearchForm() {
  const { response, is_loading, fetchAndSetResponse } =
    useGetEmployeeResponseStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_number: response.body?.employee_number ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    fetchAndSetResponse(values);
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
            <Button type="submit" variant="secondary" disabled={is_loading}>
              <Search />
              Search
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
