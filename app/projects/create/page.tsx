"use client";

import { useSearchParams } from "next/navigation";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";

export default function CreateProjectPage() {
  const searchParams = useSearchParams();

  const step = searchParams.get("step") || "1";

  return (
    <div>
      {step === "1" && <StepOne />}
      {step === "2" && <StepTwo />}
    </div>
  );
}
