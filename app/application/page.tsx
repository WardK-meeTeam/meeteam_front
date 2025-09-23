import { Suspense } from "react";
import ApplicationClient from "./ApplicationClient";

export default function ApplicationPage() {
  return (
    <Suspense>
      <ApplicationClient />
    </Suspense>
  );
}