import type { WorkoutTypes } from "@/types/workoutType";
import { FaFireFlameSimple } from "react-icons/fa6";
import { FiClock, FiStar } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

interface WorkoutCardProps {
  workout: WorkoutTypes;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  
  const {
    id,
    name,
    image,
    muscleGroups,
    equipment,
    duration,
    caloriesBurned,
    rating,
  } = workout;

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#292C33] bg-[#15171D]">
      {/* Image */}
      <Link href={`/workout-details/${id}`} className="block">
        <div className="relative aspect-2/1 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="px-8 py-7">
        {/* Muscle Groups */}
        <div className="mb-5 flex flex-wrap gap-2">
          {muscleGroups.slice(0, 2).map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-(--primary-color) px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/workout-details/${id}`}>
          <h2 className="font-oswald text-2xl font-bold uppercase tracking-wide text-white transition-colors hover:text-(--primary-color)">
            {name}
          </h2>
        </Link>

        {/* Equipment */}
        <p className="mt-2 text-base text-[#8F95A0]">
          {equipment}
        </p>
      </div>

      {/* Stats */}
      <div className="border-t border-[#25282F] px-8 py-4">
        <div className="flex items-center gap-5 text-sm text-[#9DA3AE]">
          {/* Duration */}
          <div className="flex items-center gap-2">
            <FiClock className="text-lg" />
            <span>{duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-2">
            <FaFireFlameSimple className="text-base" />
            <span>{caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="ml-auto flex items-center gap-2">
            <FiStar className="text-lg" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default WorkoutCard;