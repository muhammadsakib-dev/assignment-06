"use client";

import { cloneElement, isValidElement, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import MyPlanHeader from "@/app/components/plan/MyPlanHeader";
import PlanSummary from "@/app/components/plan/PlanSummary";
import PlanTabs from "@/app/components/plan/PlanTabs";
import SortControl, { type SortBy } from "@/app/components/plan/SortControl";
import { useFitLog } from "@/context/FitLogContext";
import type { WorkoutTypes } from "@/types/workoutType";

const sortWorkouts = (items: WorkoutTypes[], sortValue: SortBy) => {
  return [...items].sort((a, b) => {
    switch (sortValue) {
      case "calories":
        return b.caloriesBurned - a.caloriesBurned;
      case "rating":
        return b.rating - a.rating;
      case "duration":
      default:
        return a.duration - b.duration;
    }
  });
};

const MyPlanLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const { planWorkouts, savedWorkouts } = useFitLog();
  const [sortBy, setSortBy] = useState<SortBy>("duration");

  const currentWorkouts =
    pathname === "/my-plan/saved" ? savedWorkouts : planWorkouts;

  const sortedWorkouts = useMemo(
    () => sortWorkouts(currentWorkouts, sortBy),
    [currentWorkouts, sortBy],
  );

  const content = isValidElement(children)
    ? cloneElement(
        children as React.ReactElement<{
          workouts?: WorkoutTypes[];
        }>,
        {
          workouts: sortedWorkouts,
        },
      )
    : children;

  return (
    <main className="min-h-[calc(100vh-88px)] bg-[#0B0D10] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-300">
        <MyPlanHeader />
        <PlanSummary />

        <div className="mt-5 flex items-center justify-between">
          <PlanTabs />
          <SortControl sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        <section className="mt-4">{content}</section>
      </div>
    </main>
  );
};

export default MyPlanLayout;
