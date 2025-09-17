"use client";

import { useSearchParams } from "next/navigation";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";

export default function CreateProjectPage() {
  const searchParams = useSearchParams();

  const step = searchParams.get("step") || "1";

  return (
    <div>
      {step === "1" && <Step1 />}
      {step === "2" && <Step2 />}
    </div>
  );
}
