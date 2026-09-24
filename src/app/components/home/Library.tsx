"use client";
import { useFitLog } from "@/context/FitLogContext";
import WorkoutCard from "../workout/WorkoutCard";

const Library = () => {

  const { workouts, loading, error } = useFitLog();
  if (loading) {
    return <p>Loading workouts...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div id="workouts" className="mx-auto max-w-375 px-4 py-6 sm:px-6 lg:max-w-1450 lg:px-8 mb-16">
      <div className="mb-8 ">
        <h3 className="text-4xl font-bold text-white">THE LIBRARY</h3>
        <p>Twelve lifts covering every major muscle group.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
};

export default Library;
