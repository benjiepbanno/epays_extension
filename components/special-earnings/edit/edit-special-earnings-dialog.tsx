import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditSpecialEarningsForm from "./edit-special-earnings-form";
import EditSpecialEarningsFormSkeleton from "./edit-special-earnings-form-skeleton";

import { useGetResponseStore } from "@/store/special-earnings/get-response-store";
import ErrorAlert from "../error-alert";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function EditSpecialEarningsDialog({ open, setOpen }: Props) {
  const { response, is_loading, error } = useGetResponseStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Special Earnings</DialogTitle>
          <DialogDescription>
            Update the selected employee's special earnings details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 min-h-102">
          {is_loading ? (
            <div className="flex flex-col justify-end h-full">
              <EditSpecialEarningsFormSkeleton />
            </div>
          ) : error ? (
            <div className="flex flex-col justify-start h-full">
              <ErrorAlert error={error} />
            </div>
          ) : response.body ? (
            <div className="flex flex-col justify-end h-full">
              <EditSpecialEarningsForm />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
