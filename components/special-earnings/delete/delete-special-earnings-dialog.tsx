import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useDeleteResponseStore } from "@/store/special-earnings/delete-response-store";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  special_earnings_id: number;
};

export default function DeleteSpecialEarningsDialog({
  open,
  setOpen,
  special_earnings_id,
}: Props) {
  const { is_loading, error, fetchAndSetResponse } = useDeleteResponseStore();

  async function handleDelete() {
    await fetchAndSetResponse({ special_earnings_id });

    // Optionally close the dialog if no error
    if (error) {
      toast.error("Special earnings has not been deleted");
    } else {
      toast.success("Special earnings has been deleted");
      setOpen(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Special Earnings</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this special earnings record? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={is_loading}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={is_loading}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
