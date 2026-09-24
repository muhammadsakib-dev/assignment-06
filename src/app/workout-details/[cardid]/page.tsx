import { redirect } from "next/navigation";

export default async function LegacyWorkoutDetailsPage({
  params,
}: {
  params: Promise<{ cardid: string }>;
}) {
  const { cardid } = await params;
  redirect(`/workouts/${cardid}`);
}
