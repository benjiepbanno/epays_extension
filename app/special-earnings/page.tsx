import NewSpecialEarningsDialog from "@/components/special-earnings/new/new-special-earnings-dialog";


export default function Page() {
  return (
    <div className="p-16 space-y-16">
      <div className="text-4xl">Special Earnings</div>

      <NewSpecialEarningsDialog />
    </div>
  );
}
