import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";




export default function PayrollSequenceNumber() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="period">Sequence Number</Label>
      <div className="flex gap-2">
        <Input disabled />
        <Button variant="secondary">Get</Button>
      </div>
      
    </div>
  )
}