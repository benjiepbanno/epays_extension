import { Button } from "@/components/ui/button";


type Props = {
  setStep: (step: number) => void;
};

export default function SupportingDocumentsReview({ setStep }: Props) {
  function handleBack() {
    setStep(1);
  }

  function handleNext() {
    setStep(3);
  }
  
  return (
    <div>
      <div>Review Supporting Documents</div>
      <div>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
