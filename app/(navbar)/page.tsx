import { Suspense } from "react";
import HomePageClient from "./HomePageClient";

export default function HomePage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div>로딩 중...</div></div>}>
            <HomePageClient />
        </Suspense>
    );
}