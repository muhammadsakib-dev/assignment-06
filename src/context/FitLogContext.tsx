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
  completedIds: number[];

  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;
  isInPlan: (id: number) => boolean;

  addToSaved: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isSaved: (id: number) => boolean;

  markAsDone: (id: number) => void;
  isCompleted: (id: number) => boolean;

  planWorkouts: WorkoutTypes[];
  savedWorkouts: WorkoutTypes[];
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const readStoredIds = (key: string): number[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    if (!storedValue) {
      return [];
    }

    const parsed = JSON.parse(storedValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is number => typeof value === "number");
  } catch {
    return [];
  }
};

const FitLogProvider = ({ children }: { children: React.ReactNode }) => {
  const [workouts, setWorkouts] = useState<WorkoutTypes[]>([]);
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setPlanIds(readStoredIds("fitlog-plan"));
    setSavedIds(readStoredIds("fitlog-saved"));
    setCompletedIds(readStoredIds("fitlog-completed"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: WorkoutTypes[] = await response.json();
        setWorkouts(data);
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem("fitlog-plan", JSON.stringify(planIds));
  }, [hydrated, planIds]);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem("fitlog-saved", JSON.stringify(savedIds));
  }, [hydrated, savedIds]);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completedIds),
    );
  }, [completedIds, hydrated]);

  const addToPlan = useCallback((id: number) => {
    setPlanIds((current) => {
      if (current.includes(id) || current.length >= 5) {
        return current;
      }

      return [...current, id];
    });
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    setPlanIds((current) => current.filter((workoutId) => workoutId !== id));
  }, []);

  const isInPlan = useCallback((id: number) => planIds.includes(id), [planIds]);

  const addToSaved = useCallback((id: number) => {
    setSavedIds((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    setSavedIds((current) => current.filter((workoutId) => workoutId !== id));
  }, []);

  const isSaved = useCallback(
    (id: number) => savedIds.includes(id),
    [savedIds],
  );

  const markAsDone = useCallback((id: number) => {
    setCompletedIds((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  }, []);

  const isCompleted = useCallback(
    (id: number) => completedIds.includes(id),
    [completedIds],
  );

  const planWorkouts = useMemo(
    () => workouts.filter((workout) => planIds.includes(workout.id)),
    [planIds, workouts],
  );

  const savedWorkouts = useMemo(
    () => workouts.filter((workout) => savedIds.includes(workout.id)),
    [savedIds, workouts],
  );

  const value = useMemo(
    () => ({
      workouts,
      loading,
      error,
      planIds,
      savedIds,
      completedIds,
      addToPlan,
      removeFromPlan,
      isInPlan,
      addToSaved,
      removeFromSaved,
      isSaved,
      markAsDone,
      isCompleted,
      planWorkouts,
      savedWorkouts,
    }),
    [
      addToPlan,
      addToSaved,
      completedIds,
      error,
      isCompleted,
      isInPlan,
      isSaved,
      loading,
      markAsDone,
      planIds,
      planWorkouts,
      removeFromPlan,
      removeFromSaved,
      savedIds,
      savedWorkouts,
      workouts,
    ],
  );

  return (
    <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>
  );
};

export default FitLogProvider;

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
};
