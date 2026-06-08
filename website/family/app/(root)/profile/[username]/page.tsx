import { connectDB } from "@/lib/db";
import Story from "@/models/Story";
import User from "@/models/User";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User as UserIcon } from "lucide-react";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  await connectDB();
  const resolvedParams = await params;

  const user = await User.findOne({ username: resolvedParams.username.toLowerCase() }).lean();

  if (!user) {
    notFound();
  }

  const storyCount = await Story.countDocuments({ author: user._id });

  return (
    <main className="min-h-screen bg-slate-50/50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Profile Card */}
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_15px_50px_-30px_rgba(15,23,42,0.15)]">
          
          {/* Cover Photo */}
          <div className="relative h-56 w-full bg-linear-to-r from-emerald-800 to-teal-700">
            {user.coverUrl ? (
              <Image
                src={user.coverUrl}
                alt="Profile cover"
                fill
                className="object-cover opacity-80"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
          </div>

          <div className="relative space-y-6 p-8 pt-0 sm:p-10 sm:pt-0">
            
            {/* Overlapping Avatar and Stats */}
            <div className="relative -mt-16 mb-6 flex justify-between items-end flex-wrap gap-4">
              {user.avatarUrl ? (
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                  <Image
                    src={user.avatarUrl}
                    alt={user.displayName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-3xl font-extrabold text-white shadow-md">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-5 py-2.5 text-center shadow-3xs">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stories</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">
                  {storyCount}
                </p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-2">
              <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
                Public profile
              </span>
              <h1 className="text-2xl font-bold text-slate-900">
                {user.displayName}
              </h1>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">@{user.username}</p>
            </div>

            {/* Bio and metadata columns */}
            <div className="grid gap-6 md:grid-cols-[1.5fr_0.98fr] border-t border-slate-100 pt-6">
              {/* Left Column: About */}
              <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                <h2 className="text-sm font-bold text-slate-900">About</h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  {user.bio || "This user has not added a bio yet."}
                </p>
              </div>

              {/* Right Column: Meta details */}
              <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Joined</p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">
                      {user.createdAt.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>

                {user.gender && user.gender !== "prefer_not_to_say" && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <UserIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Gender</p>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5 capitalize">
                        {user.gender.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
