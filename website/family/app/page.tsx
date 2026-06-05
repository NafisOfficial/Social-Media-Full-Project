"use client";

import { useAuth } from "@/context/AuthContext";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  Share2,
  TreePine,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/feed");
    }
  }, [user, router]);

  const testimonials = [
    {
      name: "Sarah M.",
      relation: "Family keeper",
      quote:
        "I've been asking cousins for family stories for years. With RootLink, my family actually wants to share. We've discovered stories we never knew existed.",
      image: "👩",
    },
    {
      name: "James K.",
      relation: "Grandpa",
      quote:
        "Building a family tree used to mean hours on Excel. This just works. My grandkids finally understand where we come from.",
      image: "👨‍🦳",
    },
    {
      name: "Amita L.",
      relation: "Global family",
      quote:
        "We're spread across four countries. RootLink keeps us connected in a way Facebook never did. My kids know their cousins again.",
      image: "👩‍👧",
    },
    {
      name: "Michael T.",
      relation: "Family reunion organizer",
      quote:
        "Before reunions, I manually track who's coming. Now everyone's already connected. It's made planning so much easier.",
      image: "👨",
    },
  ];

  const features = [
    {
      title: "Multi-generational family tree",
      description:
        "See your entire family across generations. Automatically infer and display inverse relationships.",
      icon: TreePine,
      benefit: "Understand your family structure",
    },
    {
      title: "Family stories & memories",
      description:
        "Share stories with photos. Relatives upvote, comment, and keep memories alive forever.",
      icon: Share2,
      benefit: "Preserve what matters most",
    },
    {
      title: "Direct invitations",
      description:
        "Invite relatives by email. Accept or reject connection requests. Control who's in your tree.",
      icon: Users,
      benefit: "Build your family network",
    },
    {
      title: "Privacy controls",
      description:
        "Share publicly or with relatives only. Your family data stays within your family.",
      icon: Heart,
      benefit: "Peace of mind about your data",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Create your account",
      description:
        "Sign up with your email and add your basic info. Takes 2 minutes.",
    },
    {
      number: "2",
      title: "Build or import your tree",
      description:
        "Manually add family members or invite relatives directly. They confirm and your tree grows.",
    },
    {
      number: "3",
      title: "Start sharing stories",
      description:
        "Write memories, share photos, and connect with relatives. Your family history stays alive.",
    },
  ];

  const faqs = [
    {
      q: "Is this just for genealogy researchers?",
      a: "No. It's for anyone who wants to preserve family history and stay connected. Whether you're building a detailed family tree or just capturing stories, RootLink works for you.",
    },
    {
      q: "How much does it cost?",
      a: "RootLink is free to start. Create your account and family tree at no cost. Premium features may be available in the future, but basic family tree creation and sharing will always be free.",
    },
    {
      q: "Is my family's data private?",
      a: "Yes. Your family tree is private by default. You choose what to share and with whom. We never sell your data or use it for advertising.",
    },
    {
      q: "Do I have to invite my whole family?",
      a: "No. You can use RootLink solo if you want. But it's more fun when family members join and add their own branches and stories.",
    },
    {
      q: "Can I access RootLink on my phone?",
      a: "Yes. RootLink works on any device—phone, tablet, or computer. Your family history goes with you.",
    },
    {
      q: "What if I make a mistake?",
      a: "You can edit or delete anything anytime. It's your family tree—you have complete control.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TreePine className="w-6 h-6 text-emerald-600" />
            <span className="text-xl font-semibold text-gray-900">
              RootLink
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 font-medium transition"
            >
              Log in
            </Link>
            <Link
              href="/demo"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your family history,{" "}
                <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  kept alive
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Build your multi-generational family tree, share stories with
                relatives, and discover connections that matter. No more lost
                memories. No more missing relatives.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold group"
                >
                  Book a Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  How it works
                </button>
              </div>

              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                Trusted by 2,000+ families worldwide
              </p>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block">
              <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <TreePine className="w-24 h-24 text-emerald-600/30 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">
                    Your family tree in one place
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-12 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500 mb-4">
              Why families trust RootLink
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-gray-900">2,000+</p>
                <p className="text-gray-600">Families using RootLink</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">15,000+</p>
                <p className="text-gray-600">Stories preserved</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">250,000+</p>
                <p className="text-gray-600">Family members connected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Family stories shouldn&apos;t be lost
          </h2>

          <p className="text-lg text-gray-600 text-center mb-12">
            Here&apos;s what happens to most families:
          </p>

          <div className="space-y-6">
            {[
              {
                problem: "Family memories get lost in boxes",
                detail:
                  "Old letters, photos, and stories sit in attics. When relatives pass away, so do their connections.",
              },
              {
                problem: "Relatives scatter across the world",
                detail:
                  "You don't know your cousins. You've heard names but never met them. Family connections fade.",
              },
              {
                problem: "No one knows the full family story",
                detail:
                  "Your kids don't know where Grandpa grew up. Your siblings don't know your parents' full story.",
              },
              {
                problem: "Building a family tree is a nightmare",
                detail:
                  "Spreadsheets. Confusing genealogy software. You give up halfway through.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.problem}
                </h3>
                <p className="text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            RootLink brings families together
          </h2>

          <p className="text-xl text-gray-600 text-center mb-12">
            A platform that actually makes sense for families:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-gray-50 p-8 rounded-lg">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <p className="text-sm text-emerald-600 font-medium flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {feature.benefit}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Get started in 3 steps
          </h2>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  {step.number}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-12">
            💡 <span className="font-medium">Pro tip:</span> Start with your
            immediate family. You can add more people and branches anytime.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            What families are saying
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonial.relation}
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Questions answered
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white p-6 rounded-lg border border-gray-200 group"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition" />
                </summary>
                <p className="text-gray-600 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            See RootLink in action
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            Join 2,000+ families keeping their heritage alive. A quick demo
            shows you exactly how it works.
          </p>

          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold text-lg group"
          >
            Book a Demo Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TreePine className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-900">RootLink</span>
              </div>
              <p className="text-sm text-gray-600">
                Keeping families connected across generations.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-600">
              &copy; {new Date().getFullYear()} RootLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
