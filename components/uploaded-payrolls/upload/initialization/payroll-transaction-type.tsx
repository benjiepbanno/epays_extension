import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type PayrollTransactionTypeProps = {
  transactionType: string;
  setTransactionType: (type: string) => void;
}


export default function PayrollTransactionType({
  transactionType,
  setTransactionType
}: PayrollTransactionTypeProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="period">Transaction Type</Label>
      <Select value={transactionType} onValueChange={setTransactionType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select transaction type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="first-salary">First Salary</SelectItem>
          <SelectItem value="regular-salary">Regular Salary</SelectItem>
          <SelectItem value="last-salary">Last Salary</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
