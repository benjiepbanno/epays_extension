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

import { useGetPersonnelResponseStore } from "@/store/external-databases/get-personnel-response-store";

const formSchema = z.object({
  personnel_id: z.string().min(1, "Required"),
});

export default function PersonnelForm() {
  const { response, is_loading, fetchAndSetResponse } =
    useGetPersonnelResponseStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personnel_id: response.body?.personnel_id ?? "",
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
            name="personnel_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personnel ID</FormLabel>
                <FormControl>
                  <Input placeholder="Input personnel id" {...field} />
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
