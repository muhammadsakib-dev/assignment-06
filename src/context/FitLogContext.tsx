"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { WorkoutTypes } from "@/types/workoutType";

interface FitLogContextType {
  workouts: WorkoutTypes[];
  loading: boolean;
  error: string | null;

  planIds: number[];
  savedIds: number[];

  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;
  isInPlan: (id: number) => boolean;

  addToSaved: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isSaved: (id: number) => boolean;

  planWorkouts: WorkoutTypes[];
  savedWorkouts: WorkoutTypes[];
}

const FitLogContext = createContext<
  FitLogContextType | undefined
>(undefined);

const API_URL =
  "https://api.abcz.workers.dev/api/fitlog";

const FitLogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [workouts, setWorkouts] = useState<WorkoutTypes[]>(
    []
  );

  const [planIds, setPlanIds] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      return storedPlan ? JSON.parse(storedPlan) : [];
    } catch {
      return [];
    }
  });
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const storedSaved = localStorage.getItem("fitlog-saved");
      return storedSaved ? JSON.parse(storedSaved) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null
  );

  const [hydrated] = useState(true);

  // ----------------------------------------
  // Fetch API data
  // ----------------------------------------

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: WorkoutTypes[] =
          await response.json();

        setWorkouts(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // ----------------------------------------
  // Save plan
  // ----------------------------------------

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(planIds)
    );
  }, [planIds, hydrated]);

  // ----------------------------------------
  // Save saved workouts
  // ----------------------------------------

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(savedIds)
    );
  }, [savedIds, hydrated]);

  // ----------------------------------------
  // Plan actions
  // ----------------------------------------

  const addToPlan = useCallback((id: number) => {
    setPlanIds((current) => {
      if (current.includes(id)) {
        return current;
      }

      if (current.length >= 5) {
        return current;
      }

      return [...current, id];
    });
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    setPlanIds((current) =>
      current.filter((workoutId) => workoutId !== id)
    );
  }, []);

  const isInPlan = useCallback(
    (id: number) => planIds.includes(id),
    [planIds]
  );

  // ----------------------------------------
  // Saved actions
  // ----------------------------------------

  const addToSaved = useCallback((id: number) => {
    setSavedIds((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    setSavedIds((current) =>
      current.filter((workoutId) => workoutId !== id)
    );
  }, []);

  const isSaved = useCallback(
    (id: number) => savedIds.includes(id),
    [savedIds]
  );

  // ----------------------------------------
  // Derived data
  // ----------------------------------------

  const planWorkouts = useMemo(() => {
    return workouts.filter((workout) =>
      planIds.includes(workout.id)
    );
  }, [workouts, planIds]);

  const savedWorkouts = useMemo(() => {
    return workouts.filter((workout) =>
      savedIds.includes(workout.id)
    );
  }, [workouts, savedIds]);

  // ----------------------------------------
  // Context value
  // ----------------------------------------

  const value = useMemo(
    () => ({
      workouts,
      loading,
      error,

      planIds,
      savedIds,

      addToPlan,
      removeFromPlan,
      isInPlan,

      addToSaved,
      removeFromSaved,
      isSaved,

      planWorkouts,
      savedWorkouts,
    }),
    [
      workouts,
      loading,
      error,
      planIds,
      savedIds,
      addToPlan,
      removeFromPlan,
      isInPlan,
      addToSaved,
      removeFromSaved,
      isSaved,
      planWorkouts,
      savedWorkouts,
    ]
  );

  return (
    <FitLogContext.Provider value={value}>
      {children}
    </FitLogContext.Provider>
  );
};

export default FitLogProvider;

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
};