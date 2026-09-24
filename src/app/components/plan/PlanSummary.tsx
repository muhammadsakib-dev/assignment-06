"use client";

import { useFitLog } from "@/context/FitLogContext";
import { usePathname } from "next/navigation";

const PlanSummary = () => {
  const pathname = usePathname();
  const { planWorkouts, savedWorkouts } = useFitLog();

  const selectedWorkouts =
    pathname === "/my-plan/saved" ? savedWorkouts : planWorkouts;

  const totalMinutes = selectedWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = selectedWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  return (
    <section className="mt-5 grid grid-cols-3 overflow-hidden rounded-xl border border-[#24272E] bg-[#14171D]">
      <SummaryItem
        label="Exercises"
        value={selectedWorkouts.length}
        highlight
      />
      <SummaryItem label="Minutes" value={totalMinutes} />
      <SummaryItem label="Calories" value={totalCalories} />
    </section>
  );
};

interface SummaryItemProps {
  label: string;
  value: number;
  highlight?: boolean;
}

const SummaryItem = ({ label, value, highlight = false }: SummaryItemProps) => {
  return (
    <div className="border-r border-[#24272E] px-4 py-5 last:border-r-0 sm:px-6">
      <p className="text-[9px] uppercase tracking-wide text-[#6D7480]">
        {label}
      </p>
      <p
        className={`mt-1 font-oswald text-3xl font-bold leading-none ${
          highlight ? "text-(--primary-color)" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default PlanSummary;
