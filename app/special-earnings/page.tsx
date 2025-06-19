import { getAllSpecialEarnings } from "@/actions/special-earnings-actions";
import SpecialEarningsTable from "@/components/special-earnings/special-earnings-table";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default async function Page() {
  const { body: special_earnings, error } = await getAllSpecialEarnings();
  console.log("error: ", error);
  console.log("body:", special_earnings);

  if (error) {
    return (
      <div className="p-8">
        <div className="w-sm">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-4">
      <SpecialEarningsTable special_earnings={special_earnings || []} />
    </div>
  );
}
