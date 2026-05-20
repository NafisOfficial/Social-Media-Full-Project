import MobileBottomNavigation from "@/components/MobileBottomNavigation";
import TopNavigation from "@/components/TopNavigation";

const profile = {
  fullName: "Noah Carter",
  location: "Oakland, CA",
  memberSince: "2023",
  birthday: "June 8, 1992",
  bio: "A proud family storyteller who loves collecting memories, planning gatherings, and keeping our family close.",
  coverPhoto:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
};

const familyConnections = [
  { name: "Mia Carter", relation: "Spouse" },
  { name: "Emma Carter", relation: "Daughter" },
  { name: "Grandma Rosa", relation: "Grandmother" },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-warm-beige">
      <TopNavigation />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6">
          <div className="relative h-52">
            <img
              src={profile.coverPhoto}
              alt="Profile cover"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-beige/90 via-warm-beige/30 to-transparent" />
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between -mt-16">
              <div className="flex items-center gap-4">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={profile.avatar}
                    alt="Profile avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-playfair font-bold text-deep-neutral">
                    {profile.fullName}
                  </h1>
                  <p className="text-sm text-deep-neutral/60">
                    Member since {profile.memberSince}
                  </p>
                </div>
              </div>
              <button className="rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm">
          <div className="border-b border-deep-neutral/10 px-6">
            <div className="flex flex-wrap gap-6 py-4">
              {["About", "Family", "Albums", "Stories", "Events"].map((tab) => (
                <button
                  key={tab}
                  className={`py-3 text-sm font-medium ${tab === "About" ? "border-b-2 border-terracotta text-terracotta" : "text-deep-neutral hover:text-terracotta"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-deep-neutral mb-4">
                About Noah
              </h3>
              <p className="text-deep-neutral/75 leading-7">{profile.bio}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-deep-neutral/60">
                    Location
                  </p>
                  <p className="text-deep-neutral">{profile.location}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-deep-neutral/60">
                    Birthday
                  </p>
                  <p className="text-deep-neutral">{profile.birthday}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-deep-neutral mb-4">
                  Family Connections
                </h3>
                <div className="space-y-3">
                  {familyConnections.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-3 rounded-3xl border border-deep-neutral/10 p-4"
                    >
                      <div className="h-10 w-10 rounded-full bg-deep-neutral/10 flex items-center justify-center text-deep-neutral/60">
                        👪
                      </div>
                      <div>
                        <p className="font-medium text-deep-neutral">
                          {member.name}
                        </p>
                        <p className="text-sm text-deep-neutral/60">
                          {member.relation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileBottomNavigation />
    </div>
  );
}
