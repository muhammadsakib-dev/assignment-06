"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  FiArrowLeft,
  FiBookmark,
  FiCalendar,
  FiCheck,

} from "react-icons/fi";


import { useFitLog } from "@/context/FitLogContext";

const WorkoutDetails = () => {
  const { cardid } = useParams<{ cardid: string }>();

  const {
    workouts,
    loading,
    error,
    addToPlan,
    removeFromPlan,
    addToSaved,
    removeFromSaved,
    isInPlan,
    isSaved,
  } = useFitLog();

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4">
        <p className="text-sm text-[#8F95A0]">
          Loading workout...
        </p>
      </main>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------

  if (error) {
    return (
      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4">
        <p className="text-sm text-red-400">{error}</p>
      </main>
    );
  }

  // -----------------------------
  // Find workout
  // -----------------------------

  const workout = workouts.find(
    (item) => String(item.id) === cardid
  );

  if (!workout) {
    return (
      <main className="flex min-h-[calc(100vh-88px)] flex-col items-center justify-center gap-4">
        <h1 className="font-oswald text-3xl uppercase text-white">
          Workout not found
        </h1>

        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-(--primary-color)"
        >
          <FiArrowLeft />
          Back to workouts
        </Link>
      </main>
    );
  }

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-300">
        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#8F95A0] transition hover:text-white"
        >
          <FiArrowLeft />
          Back to workouts
        </Link>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* ================= IMAGE ================= */}
          <div className="relative aspect-[0.82] overflow-hidden rounded-xl border border-[#25282F] bg-[#15171D] lg:aspect-auto lg:min-h-152.5">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* ================= DETAILS ================= */}
          <div className="flex flex-col">
            {/* Title */}
            <h1 className="font-oswald text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#9DA3AE] sm:text-base">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-(--primary-color) px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Stats Table */}
            <div className="mt-5 overflow-hidden rounded-xl border border-[#25282F] bg-[#171A20]">
              <DetailRow
                label="Equipment"
                value={workout.equipment}
              />

              <DetailRow
                label="Difficulty"
                value={workout.difficulty}
              />

              <DetailRow
                label="Sets"
                value={String(workout.sets)}
              />

              <DetailRow
                label="Reps"
                value={workout.reps}
              />

              <DetailRow
                label="Duration"
                value={`${workout.duration} min`}
              />

              <DetailRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <DetailRow
                label="Rating"
                value={String(workout.rating)}
              />
            </div>

            {/* Instructions */}
            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-white">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={`${workout.id}-${index}`}
                      className="flex gap-3 text-sm leading-6 text-[#A0A5AE]"
                    >
                      <span className="shrink-0 text-[#737984]">
                        {index + 1}.
                      </span>

                      <span>{instruction}</span>
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap gap-3">
              {/* Plan */}
              <button
                type="button"
                onClick={() =>
                  inPlan
                    ? removeFromPlan(workout.id)
                    : addToPlan(workout.id)
                }
                className={`inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold transition ${
                  inPlan
                    ? "bg-[#25282F] text-white"
                    : "bg-(--primary-color) text-black hover:brightness-90"
                }`}
              >
                {inPlan ? <FiCheck /> : <FiCalendar />}

                {inPlan
                  ? "Added to today's plan"
                  : "Add to today's plan"}
              </button>

              {/* Save */}
              <button
                type="button"
                onClick={() =>
                  saved
                    ? removeFromSaved(workout.id)
                    : addToSaved(workout.id)
                }
                className={`inline-flex h-11 items-center gap-2 rounded-lg border px-5 text-sm font-semibold transition ${
                  saved
                    ? "border-(--primary-color) text-(--primary-color)"
                    : "border-[#343840] text-[#D1D4DA] hover:border-[#555A64] hover:text-white"
                }`}
              >
                {saved ? <FiCheck /> : <FiBookmark />}

                {saved ? "Saved" : "Save for later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetails;

// ----------------------------------
// Detail Row
// ----------------------------------

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({
  label,
  value,
}: DetailRowProps) => {
  return (
    <div className="flex min-h-11.75 items-center justify-between border-b border-[#25282F] px-4 last:border-b-0">
      <span className="text-[10px] font-bold uppercase tracking-wide text-[#747B87]">
        {label}
      </span>

      <span className="text-sm text-[#E1E3E7]">
        {value}
      </span>
    </div>
  );
};