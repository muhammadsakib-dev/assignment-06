"use client";

import Image from "next/image";
import Link from "next/link";
import { FiClock, FiX } from "react-icons/fi";
import { FaFireFlameSimple } from "react-icons/fa6";

import { useFitLog } from "@/context/FitLogContext";
import type { WorkoutTypes } from "@/types/workoutType";

interface TodayPlanProps {
  workouts: WorkoutTypes[];
}

const TodayPlan = ({ workouts }: TodayPlanProps) => {
  const { removeFromPlan } = useFitLog();

  if (workouts.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-[#292D35] bg-[#0F1115] px-6 text-center">
        <h2 className="font-oswald text-xl font-bold uppercase text-white">
          Nothing here yet
        </h2>

        <p className="mt-2 text-xs text-[#737A85]">
          Browse the workout library and add a lift to get today moving.
        </p>

        <Link
          href="/"
          className="mt-5 rounded-full bg-(--primary-color) px-5 py-2 text-xs font-bold text-black"
        >
          Go to workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {workouts.map((workout) => (
        <article
          key={workout.id}
          className="flex items-center gap-3 rounded-xl border border-[#24272E] bg-[#14171D] p-3"
        >
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

          <div className="min-w-0 flex-1">
            <Link href={`/workouts/${workout.id}`}>
              <h2 className="truncate font-oswald text-sm font-bold uppercase text-white">
                {workout.name}
              </h2>
            </Link>

            <p className="mt-1 truncate text-xs text-[#737A85]">
              {workout.equipment}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-[10px] text-[#858B96]">
              <span className="flex items-center gap-1">
                <FiClock className="text-(--primary-color)" />
                {workout.duration} min
              </span>

              <span className="flex items-center gap-1">
                <FaFireFlameSimple className="text-(--primary-color)" />
                {workout.caloriesBurned} kcal
              </span>

              <span className="text-(--primary-color)">
                ★ {workout.rating}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeFromPlan(workout.id)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#69717D] hover:bg-[#23262D] hover:text-white"
          >
            <FiX />
          </button>
        </article>
      ))}
    </div>
  );
};

export default TodayPlan;