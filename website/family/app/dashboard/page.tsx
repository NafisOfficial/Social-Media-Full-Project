import MobileBottomNavigation from "@/components/MobileBottomNavigation";
import TopNavigation from "@/components/TopNavigation";

const feedItems = [
  {
    id: 1,
    name: "Sarah Johnson",
    action: "shared a new photo album",
    detail: "A sunset weekend at Grandma's lakehouse",
    time: "2 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Mike Chen",
    action: "added a new event",
    detail: "Family reunion at the park",
    time: "5 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
];

const birthdays = [
  { name: "Emma Johnson", date: "March 15", relation: "Daughter" },
  { name: "Luis Ortega", date: "March 21", relation: "Cousin" },
];

const upcomingEvents = [
  { title: "Family Picnic", date: "March 22", note: "Bring a dish to share" },
];

const suggestions = [
  {
    name: "David Smith",
    relation: "Cousin",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Olivia Carter",
    relation: "Aunt",
    avatar:
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=200&q=80",
  },
];

const treePreview = [
  {
    name: "Noah",
    relation: "You",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Mia",
    relation: "Spouse",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Emma",
    relation: "Daughter",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-warm-beige">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Mini Family Tree */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="text-lg font-playfair font-semibold text-deep-neutral mb-4">
                Family Tree
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {treePreview.map((member) => (
                    <div key={member.name} className="text-center">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="mx-auto h-16 w-16 rounded-full object-cover border-2 border-warm-beige shadow-sm"
                      />
                      <p className="mt-2 text-sm font-semibold text-deep-neutral">
                        {member.name}
                      </p>
                      <p className="text-xs text-deep-neutral/60">
                        {member.relation}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-deep-neutral/70">
                  Your family portrait is growing. One more connection and your
                  tree will be complete.
                </p>
                <button className="w-full rounded-full bg-terracotta px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta/90">
                  Add Family Member
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">
              <h3 className="text-lg font-playfair font-semibold text-deep-neutral mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="/tree"
                  className="block text-deep-neutral hover:text-terracotta transition-colors"
                >
                  View Full Tree
                </a>
                <a
                  href="/albums"
                  className="block text-deep-neutral hover:text-terracotta transition-colors"
                >
                  Browse Albums
                </a>
                <a
                  href="/events"
                  className="block text-deep-neutral hover:text-terracotta transition-colors"
                >
                  Upcoming Events
                </a>
                <a
                  href="/stories"
                  className="block text-deep-neutral hover:text-terracotta transition-colors"
                >
                  Family Stories
                </a>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h2 className="text-2xl font-playfair font-bold text-deep-neutral mb-6">
                Family Feed
              </h2>

              <div className="space-y-6">
                {feedItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-deep-neutral/10 pb-6"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="h-12 w-12 rounded-full object-cover shadow-sm"
                      />
                      <div className="flex-1">
                        <p className="text-deep-neutral">
                          <span className="font-semibold">{item.name}</span>{" "}
                          {item.action}
                        </p>
                        <p className="text-sm text-deep-neutral/60 mt-1">
                          {item.detail}
                        </p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.14em] text-deep-neutral/50">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Widgets */}
          <div className="lg:col-span-1">
            {/* This Month in Our Family */}
            <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-playfair font-semibold text-deep-neutral mb-4">
                This Month in Our Family
              </h3>

              <div className="space-y-4">
                {birthdays.map((birthday) => (
                  <div key={birthday.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-peach/20 flex items-center justify-center text-peach">
                      🎉
                    </div>
                    <div>
                      <p className="text-sm font-medium text-deep-neutral">
                        {birthday.name}
                      </p>
                      <p className="text-xs text-deep-neutral/60">
                        {birthday.date} • {birthday.relation}
                      </p>
                    </div>
                  </div>
                ))}
                {upcomingEvents.map((event) => (
                  <div key={event.title} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage-green/20 flex items-center justify-center text-sage-green">
                      📅
                    </div>
                    <div>
                      <p className="text-sm font-medium text-deep-neutral">
                        {event.title}
                      </p>
                      <p className="text-xs text-deep-neutral/60">
                        {event.date} • {event.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Connections */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="text-lg font-playfair font-semibold text-deep-neutral mb-4">
                Suggested Connections
              </h3>

              <div className="space-y-4">
                {suggestions.map((person) => (
                  <div key={person.name} className="flex items-center gap-3">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-deep-neutral">
                        {person.name}
                      </p>
                      <p className="text-xs text-deep-neutral/60">
                        {person.relation}
                      </p>
                    </div>
                    <button className="text-terracotta hover:text-terracotta/80 font-medium text-sm">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileBottomNavigation />
    </div>
  );
}
