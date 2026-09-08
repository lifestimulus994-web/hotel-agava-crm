"use client";

import type { Guest } from "@/lib/types";

const dateFormatter = new Intl.DateTimeFormat("ka-GE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default function GuestRow({
  guest,
  onCheckOut,
}: {
  guest: Guest;
  onCheckOut?: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-[var(--ink)]">
            {guest.first_name} {guest.last_name}
          </p>
          <p className="text-sm text-[var(--ink-muted)]">{guest.phone}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[var(--gold-50)] px-2.5 py-1 text-sm font-medium text-[var(--gold-700)]">
          ოთახი {guest.room_number}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--ink-muted)]">
        <span>სტუმრები: {guest.guests_count}</span>
        <span>შემოსვლა: {dateFormatter.format(new Date(guest.check_in))}</span>
        {guest.check_out && (
          <span>გასვლა: {dateFormatter.format(new Date(guest.check_out))}</span>
        )}
      </div>

      {guest.notes && (
        <p className="mt-2 text-sm text-[var(--ink)]">{guest.notes}</p>
      )}

      {onCheckOut && (
        <button
          onClick={() => onCheckOut(guest.id)}
          className="mt-3 w-full rounded-lg border border-[var(--border)] py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--surface-2)] active:scale-[0.98] sm:w-auto sm:px-4"
        >
          გასვლა
        </button>
      )}
    </div>
  );
}
