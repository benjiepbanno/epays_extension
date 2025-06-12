import { Alert, AlertTitle } from "@/components/ui/alert";
import { useEmployeeSearchResultStore } from "@/store/special-earnings/employee-search-result-store";
import { AlertCircleIcon } from "lucide-react";

export default function EmployeeSearchError() {
  const { error } = useEmployeeSearchResultStore();

  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{error}</AlertTitle>
    </Alert>
  );
}
