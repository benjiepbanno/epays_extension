"use client";

import { get, set } from "idb-keyval";
import { Button } from "@/components/ui/button";

export default function Page() {
  // async function newDirectory() {
  //   try {
  //     const directoryHandle = await window.showDirectoryPicker();
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.log(error.name, error.message);
  //     } else {
  //       console.log(error);
  //     }
  //   }
  // }

  return (
    <div className="p-8 space-y-4">
      {/* <Button onClick={newDirectory}>New Directory</Button> */}
    </div>
  );
}
