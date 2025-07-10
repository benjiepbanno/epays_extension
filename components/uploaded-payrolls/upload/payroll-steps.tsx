import { STEPS } from "@/lib/office/data";

type PayrollStepsProps = {
  currentStep: number;
};

export default function PayrollSteps({ currentStep }: PayrollStepsProps) {
  return (
    <div className="">
      <ul className="steps w-full">
        {STEPS.map((step) => (
          <li
            key={step.id}
            className={`step ${currentStep >= step.id ? "step-primary" : ""}`}
          ></li>
        ))}
      </ul>
    </div>
  );
}
