"use client";

import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { useSweetAlert } from "@/hooks/useSweetAlert";
import {
  addFamilyMemberSchema,
  addRelationshipSchema,
  type AddFamilyMemberInput,
  type AddRelationshipInput,
} from "@/lib/validations/tree";
import { RelationshipType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface TreeMemberData {
  _id: string;
  displayName: string;
  avatarUrl?: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  bio?: string;
  dateOfBirth?: string | null;
  dateOfDeath?: string | null;
  isAlive: boolean;
}

interface TreeRelationshipData {
  _id: string;
  fromMember: string;
  toMember: string;
  relationshipType: RelationshipType;
  isConfirmed: boolean;
}

interface TreeManagerProps {
  members: TreeMemberData[];
  relationships: TreeRelationshipData[];
}

const relationshipOptions: RelationshipType[] = [
  "father",
  "mother",
  "son",
  "daughter",
  "spouse",
  "brother",
  "sister",
  "grandfather",
  "grandmother",
  "grandson",
  "granddaughter",
  "uncle",
  "aunt",
  "nephew",
  "niece",
  "cousin",
];

export function TreeManager({
  members: initialMembers,
  relationships: initialRelationships,
}: TreeManagerProps) {
  const [members, setMembers] = useState<TreeMemberData[]>(initialMembers);
  const [relationships, setRelationships] =
    useState<TreeRelationshipData[]>(initialRelationships);
  const { showSuccess, showError } = useSweetAlert();

  const {
    register: registerMember,
    handleSubmit: handleSubmitMember,
    reset: resetMember,
    formState: { errors: memberErrors, isSubmitting: isAddingMember },
  } = useForm<AddFamilyMemberInput>({
    resolver: zodResolver(addFamilyMemberSchema),
    defaultValues: {
      displayName: "",
      gender: "prefer_not_to_say",
      bio: "",
      isAlive: true,
    },
  });

  const {
    register: registerRelationship,
    handleSubmit: handleSubmitRelationship,
    reset: resetRelationship,
    formState: {
      errors: relationshipErrors,
      isSubmitting: isCreatingRelationship,
    },
  } = useForm<AddRelationshipInput>({
    resolver: zodResolver(addRelationshipSchema),
    defaultValues: {
      fromMemberId: members[0]?._id ?? "",
      toMemberId: members[1]?._id ?? "",
      relationshipType: "cousin",
    },
  });

  const addMember = async (data: AddFamilyMemberInput) => {
    const payload = {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth).toISOString()
        : undefined,
      dateOfDeath: data.dateOfDeath
        ? new Date(data.dateOfDeath).toISOString()
        : undefined,
    };

    try {
      const response = await fetch("/api/tree/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to add family member");
      }

      setMembers((current) => [...current, result.data]);
      resetMember();
      await showSuccess(
        "Member added",
        "Your family member was added successfully.",
      );
    } catch (error) {
      await showError(
        "Unable to add member",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  const addRelationship = async (data: AddRelationshipInput) => {
    try {
      const response = await fetch("/api/tree/relationships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to create relationship");
      }

      setRelationships((current) => [
        ...current,
        result.data.relationship,
        result.data.inverseRelationship,
      ]);
      resetRelationship();
      await showSuccess(
        "Relationship created",
        "The new family relationship was added.",
      );
    } catch (error) {
      await showError(
        "Unable to add relationship",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  const findMemberName = (id: string) =>
    members.find((member) => member._id === id)?.displayName ?? "Unknown";

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Family tree
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Your family tree
            </h1>
            <p className="mt-2 text-slate-600">
              Add members and connect their relationships to build the story of
              your family.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 px-5 py-4">
              <p className="text-sm text-slate-500">Members</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {members.length}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-5 py-4">
              <p className="text-sm text-slate-500">Relationships</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {relationships.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-5">
            Add a family member
          </h2>
          <form onSubmit={handleSubmitMember(addMember)} className="space-y-5">
            <FormField
              label="Display name"
              htmlFor="displayName"
              error={memberErrors.displayName?.message?.toString()}
            >
              <input
                id="displayName"
                {...registerMember("displayName")}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                label="Gender"
                htmlFor="gender"
                error={memberErrors.gender?.message?.toString()}
              >
                <select
                  id="gender"
                  {...registerMember("gender")}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="prefer_not_to_say">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </FormField>
              <FormField label="Is alive" htmlFor="isAlive">
                <select
                  id="isAlive"
                  {...registerMember("isAlive", {
                    setValueAs: (value) => value === "true",
                  })}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </FormField>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Birth date" htmlFor="dateOfBirth">
                <input
                  id="dateOfBirth"
                  type="date"
                  {...registerMember("dateOfBirth")}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </FormField>
              <FormField label="Death date" htmlFor="dateOfDeath">
                <input
                  id="dateOfDeath"
                  type="date"
                  {...registerMember("dateOfDeath")}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </FormField>
            </div>

            <FormField
              label="Bio"
              htmlFor="bio"
              error={memberErrors.bio?.message?.toString()}
            >
              <textarea
                id="bio"
                {...registerMember("bio")}
                rows={4}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </FormField>

            <Button
              type="submit"
              disabled={isAddingMember}
              className="rounded-2xl px-5 py-3"
            >
              {isAddingMember ? "Adding member..." : "Add member"}
            </Button>
          </form>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-5">
            Connect two members
          </h2>
          {members.length < 2 ? (
            <p className="text-slate-600">
              Add at least two family members before connecting them.
            </p>
          ) : (
            <form
              onSubmit={handleSubmitRelationship(addRelationship)}
              className="space-y-5"
            >
              <FormField
                label="From member"
                htmlFor="fromMemberId"
                error={relationshipErrors.fromMemberId?.message?.toString()}
              >
                <select
                  id="fromMemberId"
                  {...registerRelationship("fromMemberId")}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  {members.map((member) => (
                    <option value={member._id} key={member._id}>
                      {member.displayName}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="To member"
                htmlFor="toMemberId"
                error={relationshipErrors.toMemberId?.message?.toString()}
              >
                <select
                  id="toMemberId"
                  {...registerRelationship("toMemberId")}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  {members.map((member) => (
                    <option value={member._id} key={member._id}>
                      {member.displayName}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="Relationship type"
                htmlFor="relationshipType"
                error={relationshipErrors.relationshipType?.message?.toString()}
              >
                <select
                  id="relationshipType"
                  {...registerRelationship("relationshipType")}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  {relationshipOptions.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </FormField>

              <Button
                type="submit"
                disabled={isCreatingRelationship}
                className="rounded-2xl px-5 py-3"
              >
                {isCreatingRelationship
                  ? "Connecting..."
                  : "Create relationship"}
              </Button>
            </form>
          )}
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-5">Members</h2>
          {members.length === 0 ? (
            <p className="text-slate-600">No members have been added yet.</p>
          ) : (
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="rounded-3xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {member.displayName}
                      </p>
                      <p className="text-sm text-slate-500">
                        {member.gender.replace("_", " ")}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                      {member.isAlive ? "Alive" : "Deceased"}
                    </span>
                  </div>
                  {member.bio ? (
                    <p className="mt-3 text-sm text-slate-600">{member.bio}</p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-5">
            Relationships
          </h2>
          {relationships.length === 0 ? (
            <p className="text-slate-600">No relationships defined yet.</p>
          ) : (
            <div className="space-y-4">
              {relationships.map((relationship) => (
                <div
                  key={relationship._id}
                  className="rounded-3xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-900">
                    {findMemberName(relationship.fromMember)} →{" "}
                    {findMemberName(relationship.toMember)}
                  </p>
                  <p className="text-sm text-slate-600">
                    {relationship.relationshipType}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
