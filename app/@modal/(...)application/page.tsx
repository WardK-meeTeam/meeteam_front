"use client";

import ApplicationPage from "@/app/application/page";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <ApplicationPage />
    </Suspense>
  );
}
