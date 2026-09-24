"use client";

import Image from "next/image";
import Link from "next/link";

import { FiClock, FiX } from "react-icons/fi";
import { FaFireFlameSimple } from "react-icons/fa6";

import { useFitLog } from "@/context/FitLogContext";

const SavedPlan = () => {
  const { savedWorkouts, removeFromSaved } = useFitLog();

  // ----------------------------------------
  // Empty State
  // ----------------------------------------

  if (savedWorkouts.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-[#292D35] bg-[#0F1115] px-6 text-center">
        <h2 className="font-oswald text-xl font-bold uppercase text-white">
          No saved workouts
        </h2>

        <p className="mt-2 max-w-sm text-xs leading-5 text-[#737A85]">
          Save workouts from the library and they will
          appear here.
        </p>

        <Link
          href="/"
          className="mt-5 rounded-full bg-(--primary-color) px-5 py-2 text-xs font-bold text-black transition hover:brightness-90"
        >
          Go to workouts
        </Link>
      </div>
    );
  }

  // ----------------------------------------
  // Saved Workouts
  // ----------------------------------------

  return (
    <div className="space-y-3">
      {savedWorkouts.map((workout) => (
        <article
          key={workout.id}
          className="flex items-center gap-3 rounded-xl border border-[#24272E] bg-[#14171D] p-3 transition-colors hover:border-[#343943]"
        >
          {/* --------------------------------
              Workout Image
          -------------------------------- */}

          <Link
            href={`/workouts/${workout.id}`}
            className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg"
          >
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </Link>

          {/* --------------------------------
              Workout Information
          -------------------------------- */}

          <div className="min-w-0 flex-1">
            <Link href={`/workouts/${workout.id}`}>
              <h2 className="truncate font-oswald text-sm font-bold uppercase text-white transition-colors hover:text-(--primary-color)">
                {workout.name}
              </h2>
            </Link>

            <p className="mt-1 truncate text-xs text-[#737A85]">
              {workout.equipment}
            </p>

            {/* Stats */}
            <div className="mt-2 flex flex-wrap items-center gap-4 text-[10px] text-[#858B96]">
              {/* Duration */}
              <span className="flex items-center gap-1">
                <FiClock className="text-(--primary-color)" />
                <span>{workout.duration} min</span>
              </span>

              {/* Calories */}
              <span className="flex items-center gap-1">
                <FaFireFlameSimple className="text-(--primary-color)" />
                <span>{workout.caloriesBurned} kcal</span>
              </span>

              {/* Rating */}
              <span className="text-(--primary-color)">
                ★ {workout.rating}
              </span>
            </div>
          </div>

          {/* --------------------------------
              Remove Button
          -------------------------------- */}

          <button
            type="button"
            onClick={() => removeFromSaved(workout.id)}
            aria-label={`Remove ${workout.name} from saved workouts`}
            title="Remove from saved"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#69717D] transition-colors hover:bg-[#23262D] hover:text-white"
          >
            <FiX className="text-sm" />
          </button>
        </article>
      ))}
    </div>
  );
};

export default SavedPlan;