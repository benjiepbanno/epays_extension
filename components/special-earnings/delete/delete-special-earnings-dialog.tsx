import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function DeleteSpecialEarningsDialog({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Special Earnings</DialogTitle>
          <DialogDescription>
            Search for an employee and enter earnings details.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
