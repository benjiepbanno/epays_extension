import { getAllSpecialEarnings } from "@/actions/special-earnings-actions";
import ErrorAlert from "@/components/special-earnings/error-alert";
import SpecialEarningsTable from "@/components/special-earnings/special-earnings-table";

export default async function Page() {
  const { body: special_earnings, error } = await getAllSpecialEarnings();

  if (error) {
    return (
      <div className="p-8">
        <div className="w-sm">
          <ErrorAlert error={error} />
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
