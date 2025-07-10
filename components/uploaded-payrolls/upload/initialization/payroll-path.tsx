"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ALLOWED_FILES = [
  "payrolh1.dbf",
  "payrold1.dbf",
  "payrolh2.dbf",
  "payrold2.dbf",
  "payremh.dbf",
  "payremd.dbf",
  "paysplh.dbf",
  "payspld.dbf",
];

type PayrollPathProps = {
  filteredFiles: File[];
  setFilteredFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function PayrollPath({
  filteredFiles,
  setFilteredFiles,
}: PayrollPathProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [folderName, setFolderName] = useState<string>("Choose folder");

  function handleFolderSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files && files.length > 0) {
      // Filter only allowed files
      const allowed = Array.from(files).filter((file) =>
        ALLOWED_FILES.includes(file.name.toLowerCase())
      );

      setFilteredFiles(allowed);

      // Get the root folder name from the first file's webkitRelativePath
      const firstPath = files[0].webkitRelativePath;
      const folder = firstPath.split("/")[0];
      setFolderName(folder);
    } else {
      setFolderName("Choose folder");
      setFilteredFiles([]);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="path">Payroll Path</Label>

      <div className="flex flex-row items-center gap-8">
        <div className="flex flex-row items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => inputRef.current?.click()}
          >
            <Plus />
          </Button>

          {folderName === "Choose folder" ? (
            <span className="text-sm text-muted-foreground">{folderName}</span>
          ) : (
            <span className="text-sm font-medium">{folderName}</span>
          )}
        </div>

        {folderName !== "Choose folder" &&
          (filteredFiles.length === 0 ? (
            <Badge variant="destructive">payroll files not found</Badge>
          ) : filteredFiles.length === ALLOWED_FILES.length ? (
            <Badge variant="secondary">payroll files found</Badge>
          ) : (
            <Badge variant="secondary">some payroll files not found</Badge>
          ))}
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
    </div>
  );
}
