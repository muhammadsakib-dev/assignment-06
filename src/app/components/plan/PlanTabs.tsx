"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PlanTabs = () => {
  const pathname = usePathname();

  const isTodayPlan = pathname === "/my-plan/today-plan";
  const isSaved = pathname === "/my-plan/saved";

  return (
    <div className="flex rounded-lg border border-[#252930] bg-[#15181E] p-1">
      <Link
        href="/my-plan/today-plan"
        className={`rounded-md px-4 py-1.5 text-[11px] font-medium transition-colors ${
          isTodayPlan
            ? "bg-[#252A31] text-white"
            : "text-[#757C87] hover:text-white"
        }`}
      >
        Today&apos;s Plan
      </Link>

      <Link
        href="/my-plan/saved"
        className={`rounded-md px-4 py-1.5 text-[11px] font-medium transition-colors ${
          isSaved
            ? "bg-[#252A31] text-white"
            : "text-[#757C87] hover:text-white"
        }`}
      >
        Saved
      </Link>
    </div>
  );
};

export default PlanTabs;