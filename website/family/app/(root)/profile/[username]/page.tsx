import { connectDB } from "@/lib/db";
import Story from "@/models/Story";
import User from "@/models/User";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  await connectDB();

  const user = await User.findOne({ username: params.username.toLowerCase() });

  if (!user) {
    notFound();
  }

  const storyCount = await Story.countDocuments({ author: user._id });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_90px_-50px_rgba(15,23,42,0.25)]">
          <div className="h-48 bg-slate-900" />
          <div className="space-y-6 p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Public profile
                </p>
                <h1 className="mt-3 text-4xl font-semibold text-slate-900">
                  {user.displayName}
                </h1>
                <p className="mt-2 text-sm text-slate-600">@{user.username}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 px-6 py-4 text-center">
                <p className="text-sm text-slate-500">Stories published</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {storyCount}
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold text-slate-900">About</h2>
                <p className="text-sm leading-6 text-slate-600">
                  {user.bio || "This user has not added a bio yet."}
                </p>
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div>
                  <p className="text-sm text-slate-500">Joined</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {user.createdAt.toDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Gender</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {user.gender.replace("_", " ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
