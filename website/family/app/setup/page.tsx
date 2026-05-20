"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Setup() {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save user data and redirect to dashboard
    console.log({ firstName, lastName, birthDate, photo });
    // For now, redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-warm-beige flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair font-bold text-deep-neutral mb-2">
            Set Up Your Profile
          </h1>
          <p className="text-deep-neutral/70">
            Tell us about yourself to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              {photo ? (
                <Image
                  src={photo}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-deep-neutral/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-deep-neutral/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-peach hover:bg-peach/90 text-deep-neutral px-4 py-2 rounded-lg font-medium transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              Upload Photo
            </label>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-deep-neutral mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-deep-neutral mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Birth Date */}
          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-deep-neutral mb-2"
            >
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-terracotta hover:bg-terracotta/90 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Complete Setup
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sage-green hover:text-sage-green/80 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
