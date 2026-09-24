"use client";

import SavedPlan from "@/app/components/plan/SavedPlan";
import { useFitLog } from "@/context/FitLogContext";
import type { WorkoutTypes } from "@/types/workoutType";

interface SavedPageProps {
  workouts?: WorkoutTypes[];
}

const SavedPage = ({ workouts = [] }: SavedPageProps) => {
  const { savedWorkouts } = useFitLog();
  const resolvedWorkouts = workouts.length > 0 ? workouts : savedWorkouts;

  return <SavedPlan workouts={resolvedWorkouts} />;
};

export default SavedPage;
