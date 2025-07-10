import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PayrollClaimTypeProps = {
  claimType: string;
  setClaimType: (type: string) => void;
};

export default function PayrollClaimType({
  claimType,
  setClaimType,
}: PayrollClaimTypeProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="period">Claim Type</Label>
      <Select value={claimType} onValueChange={setClaimType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select claim type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="atm">ATM or non ATM</SelectItem>
          <SelectItem value="check">Check</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
