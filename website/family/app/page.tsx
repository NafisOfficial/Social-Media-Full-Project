import Image from "next/image";
import Link from "next/link";

const heroPhoto =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=80";

const featuredFaces = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-beige">
      <section className="relative h-screen overflow-hidden">
        <Image
          src={heroPhoto}
          alt="Multigenerational family"
          fill
          className="absolute inset-0 object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-warm-beige/90 via-warm-beige/50 to-transparent"></div>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-deep-neutral/60">
            A warm home for your family story
          </p>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-deep-neutral drop-shadow-[0_4px_30px_rgba(0,0,0,0.12)]">
            Family
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl leading-8 text-deep-neutral/80">
            Build your family tree, share life stories, and stay connected
            through memories, albums, and events.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg shadow-terracotta/10"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-sage-green hover:bg-sage-green/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg shadow-sage-green/10"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-14 flex items-center justify-center gap-4">
            {featuredFaces.map((src, index) => (
              <div
                key={index}
                className="h-16 w-16 rounded-full overflow-hidden border-4 border-white shadow-lg"
              >
                <Image
                  src={src}
                  alt="Family face"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-deep-neutral/70 max-w-md">
            Share joyful moments, mark milestones, and keep every family memory
            alive in one beautifully crafted home.
          </p>
        </div>
      </section>
    </div>
  );
}
