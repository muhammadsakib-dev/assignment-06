"use client";

import { useMemo, useState } from "react";

import MyPlanHeader from "../components/plan/MyPlanHeader";
import PlanSummary from "../components/plan/PlanSummary";
import PlanTabs from "../components/plan/PlanTabs";
import SortControl from "../components/plan/SortControl";
import TodayPlan from "../components/plan/TodayPlan";
import SavedPlan from "../components/plan/SavedPlan";

import { useFitLog } from "@/context/FitLogContext";

import type { SortBy } from "../components/plan/SortControl";

type Tab = "plan" | "saved";

const MyPlan = () => {
  const { planWorkouts, savedWorkouts } = useFitLog();

  const [activeTab, setActiveTab] = useState<Tab>("plan");

  const [sortBy, setSortBy] = useState<SortBy>("duration");

  // Current tab-এর data
  const currentWorkouts = activeTab === "plan" ? planWorkouts : savedWorkouts;

  // Current list sort
  const sortedWorkouts = useMemo(() => {
    return [...currentWorkouts].sort((a, b) => {
      switch (sortBy) {
        case "calories":
          return b.caloriesBurned - a.caloriesBurned;

        case "rating":
          return b.rating - a.rating;

        case "duration":
        default:
          return a.duration - b.duration;
      }
    });
  }, [currentWorkouts, sortBy]);

  return (
    <main className="min-h-[calc(100vh-88px)] bg-[#0B0D10] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <MyPlanHeader />

        <PlanSummary activeTab={activeTab} />

        <div className="mt-5 flex items-center justify-between">
          <PlanTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <SortControl sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        <section className="mt-4">
          {activeTab === "plan" ? (
            <TodayPlan workouts={sortedWorkouts} />
          ) : (
            <SavedPlan />
          )}
        </section>
      </div>
    </main>
  );
};

export default MyPlan;
