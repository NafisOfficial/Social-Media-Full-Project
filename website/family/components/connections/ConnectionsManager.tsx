"use client";

import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { useSweetAlert } from "@/hooks/useSweetAlert";
import {
  sendConnectionRequestSchema,
  type SendConnectionRequestInput,
} from "@/lib/validations/tree";
import { RelationshipType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ConnectionRequestCard {
  _id: string;
  senderUsername: string;
  receiverUsername: string;
  relationshipType: RelationshipType;
  status: "pending" | "accepted" | "rejected";
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

interface ConnectionsManagerProps {
  pending: ConnectionRequestCard[];
  accepted: ConnectionRequestCard[];
}

export function ConnectionsManager({
  pending: initialPending,
  accepted: initialAccepted,
}: ConnectionsManagerProps) {
  const [pending, setPending] =
    useState<ConnectionRequestCard[]>(initialPending);
  const [accepted, setAccepted] =
    useState<ConnectionRequestCard[]>(initialAccepted);
  const { showSuccess, showError } = useSweetAlert();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SendConnectionRequestInput>({
    resolver: zodResolver(sendConnectionRequestSchema),
    defaultValues: {
      receiverUsername: "",
      relationshipType: "cousin",
    },
  });

  const createRequest = async (data: SendConnectionRequestInput) => {
    try {
      const response = await fetch("/api/connections/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to send request");
      }

      setPending((current) => [...current, result.data]);
      reset();
      await showSuccess(
        "Request sent",
        "Your connection request has been created.",
      );
    } catch (error) {
      await showError(
        "Unable to send request",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  const updateRequestStatus = async (
    requestId: string,
    action: "accept" | "reject",
  ) => {
    try {
      const response = await fetch(`/api/connections/${requestId}/${action}`, {
        method: "POST",
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || `Unable to ${action} request`);
      }

      const acceptedRequest = pending.find(
        (request) => request._id === requestId,
      );

      setPending((current) =>
        current.filter((request) => request._id !== requestId),
      );

      if (action === "accept" && acceptedRequest) {
        setAccepted((current) => [
          ...current,
          {
            ...acceptedRequest,
            status: "accepted",
          },
        ]);
      }

      await showSuccess("Request updated", `Request ${action}ed successfully.`);
    } catch (error) {
      await showError(
        "Unable to update request",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Connection requests
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Family network
            </h1>
            <p className="mt-2 text-slate-600">
              Send requests to relatives and accept invitations from people
              trying to join your tree.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {pending.length}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900 mb-5">
          Send a connection request
        </h2>
        <form
          onSubmit={handleSubmit(createRequest)}
          className="grid gap-5 sm:grid-cols-2"
        >
          <FormField
            label="Relative username"
            htmlFor="receiverUsername"
            error={errors.receiverUsername?.message?.toString()}
          >
            <input
              id="receiverUsername"
              {...register("receiverUsername")}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </FormField>

          <FormField
            label="Relationship type"
            htmlFor="relationshipType"
            error={errors.relationshipType?.message?.toString()}
          >
            <select
              id="relationshipType"
              {...register("relationshipType")}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              {relationshipOptions.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </FormField>

          <div className="sm:col-span-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl px-5 py-3"
            >
              {isSubmitting ? "Sending..." : "Send request"}
            </Button>
          </div>
        </form>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-5">
            Pending requests
          </h2>
          {pending.length === 0 ? (
            <p className="text-slate-600">No pending requests at the moment.</p>
          ) : (
            <div className="space-y-4">
              {pending.map((request) => (
                <div
                  key={request._id}
                  className="rounded-3xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-900">
                    {request.senderUsername} → {request.receiverUsername}
                  </p>
                  <p className="text-sm text-slate-600">
                    {request.relationshipType}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => updateRequestStatus(request._id, "accept")}
                    >
                      Accept
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => updateRequestStatus(request._id, "reject")}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-5">
            Confirmed connections
          </h2>
          {accepted.length === 0 ? (
            <p className="text-slate-600">
              Accepted connections will appear here.
            </p>
          ) : (
            <div className="space-y-4">
              {accepted.map((connection) => (
                <div
                  key={connection._id}
                  className="rounded-3xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-900">
                    {connection.senderUsername} ↔ {connection.receiverUsername}
                  </p>
                  <p className="text-sm text-slate-600">
                    {connection.relationshipType}
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
