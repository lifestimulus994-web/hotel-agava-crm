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
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-900">
            {guest.first_name} {guest.last_name}
          </p>
          <p className="text-sm text-slate-500">{guest.phone}</p>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700">
          ოთახი {guest.room_number}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
        <span>სტუმრები: {guest.guests_count}</span>
        <span>შემოსვლა: {dateFormatter.format(new Date(guest.check_in))}</span>
        {guest.check_out && (
          <span>გასვლა: {dateFormatter.format(new Date(guest.check_out))}</span>
        )}
      </div>

      {guest.notes && (
        <p className="mt-2 text-sm text-slate-600">{guest.notes}</p>
      )}

      {onCheckOut && (
        <button
          onClick={() => onCheckOut(guest.id)}
          className="mt-3 w-full rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] sm:w-auto sm:px-4"
        >
          გასვლა
        </button>
      )}
    </div>
  );
}
