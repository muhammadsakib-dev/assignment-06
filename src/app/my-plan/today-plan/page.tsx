"use client";

import TodayPlan from "@/app/components/plan/TodayPlan";
import { useFitLog } from "@/context/FitLogContext";
import type { WorkoutTypes } from "@/types/workoutType";

interface TodayPlanPageProps {
  workouts?: WorkoutTypes[];
}

const TodayPlanPage = ({ workouts = [] }: TodayPlanPageProps) => {
  const { planWorkouts } = useFitLog();
  const resolvedWorkouts = workouts.length > 0 ? workouts : planWorkouts;

  return <TodayPlan workouts={resolvedWorkouts} />;
};

export default TodayPlanPage;
