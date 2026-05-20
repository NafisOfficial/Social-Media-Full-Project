"use client";

import { useState } from "react";

interface AddFamilyMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: FamilyMemberData) => void;
}

interface FamilyMemberData {
  firstName: string;
  lastName: string;
  birthDate: string;
  relation: string;
  photo?: string;
}

const relations = [
  "Parent",
  "Child",
  "Spouse",
  "Sibling",
  "Grandparent",
  "Grandchild",
  "Aunt/Uncle",
  "Niece/Nephew",
  "Cousin",
  "Other",
];

export default function AddFamilyMemberModal({
  isOpen,
  onClose,
  onAdd,
}: AddFamilyMemberModalProps) {
  const [formData, setFormData] = useState<FamilyMemberData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    relation: "",
  });
  const [photo, setPhoto] = useState<string | null>(null);

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
    onAdd({ ...formData, photo: photo || undefined });
    setFormData({
      firstName: "",
      lastName: "",
      birthDate: "",
      relation: "",
    });
    setPhoto(null);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-playfair font-bold text-deep-neutral">
              Add Family Member
            </h2>
            <button
              onClick={onClose}
              className="text-deep-neutral/60 hover:text-deep-neutral transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-4">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-deep-neutral/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-deep-neutral/40"
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
              <label className="cursor-pointer bg-peach hover:bg-peach/90 text-deep-neutral px-4 py-2 rounded-lg font-medium transition-colors text-sm">
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
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-deep-neutral mb-2"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
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
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
              />
            </div>

            {/* Relation */}
            <div>
              <label
                htmlFor="relation"
                className="block text-sm font-medium text-deep-neutral mb-2"
              >
                Relation *
              </label>
              <select
                id="relation"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-deep-neutral/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                required
              >
                <option value="">Select relation</option>
                {relations.map((relation) => (
                  <option key={relation} value={relation}>
                    {relation}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-deep-neutral/10 text-deep-neutral rounded-lg hover:bg-deep-neutral/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
