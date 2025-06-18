"use client";

import { usePathname } from "next/navigation";
import { modules } from "@/lib/modules";

import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export default function AppHeader() {
  const pathname = usePathname();
  const module = modules.find((module) => pathname === module.url);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <h1 className="text-base font-medium">{module?.title}</h1>
    </header>
  );
}
