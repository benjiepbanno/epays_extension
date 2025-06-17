import { Alert, AlertTitle } from "@/components/ui/alert";
import { useGetEmployeeResponseStore } from "@/store/special-earnings/get-employee-response-store";
import { AlertCircleIcon } from "lucide-react";

export default function EmployeeSearchError() {
  const { error } = useGetEmployeeResponseStore();

  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{error}</AlertTitle>
    </Alert>
  );
}
