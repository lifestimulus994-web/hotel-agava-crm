"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { Guest, NewGuest } from "@/lib/types";
import GuestRow from "@/components/GuestRow";
import GuestForm from "@/components/GuestForm";
import LogoutButton from "@/components/LogoutButton";

type Tab = "current" | "history";

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("current");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    loadGuests();
  }, []);

  async function loadGuests() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("guests")
      .select("*")
      .order("check_in", { ascending: false });

    setGuests(data ?? []);
    setLoading(false);
  }

  async function handleAddGuest(guest: NewGuest): Promise<string | null> {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("guests")
      .insert({ ...guest, created_by: userData.user?.id ?? null })
      .select()
      .single();

    if (error) return "სტუმრის დამატება ვერ მოხერხდა";

    setGuests((prev) => [data as Guest, ...prev]);
    return null;
  }

  async function handleCheckOut(id: string) {
    const supabase = createClient();
    const checkOutTime = new Date().toISOString();

    const { error } = await supabase
      .from("guests")
      .update({ check_out: checkOutTime })
      .eq("id", id);

    if (error) return;

    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, check_out: checkOutTime } : g))
    );
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const inTab = guests.filter((g) =>
      tab === "current" ? g.check_out === null : g.check_out !== null
    );
    const searched = q
      ? inTab.filter((g) =>
          `${g.first_name} ${g.last_name} ${g.phone}`.toLowerCase().includes(q)
        )
      : inTab;

    return [...searched].sort((a, b) => {
      if (tab === "current") {
        return new Date(b.check_in).getTime() - new Date(a.check_in).getTime();
      }
      return (
        new Date(b.check_out ?? 0).getTime() -
        new Date(a.check_out ?? 0).getTime()
      );
    });
  }, [guests, tab, search]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 pb-24 pt-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={40} height={40} className="h-9 w-9 object-contain" />
          <h1 className="text-lg font-semibold">სასტუმრო აგავა</h1>
        </div>
        <LogoutButton />
      </div>

      <div className="mb-4 flex rounded-xl bg-[var(--surface-3)] p-1">
        <button
          onClick={() => setTab("current")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
            tab === "current"
              ? "bg-[var(--surface)] text-[var(--ink)] shadow-sm ring-1 ring-[var(--gold-300)]"
              : "text-[var(--ink-muted)]"
          }`}
        >
          ამჟამად სასტუმროში
        </button>
        <button
          onClick={() => setTab("history")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
            tab === "history"
              ? "bg-[var(--surface)] text-[var(--ink)] shadow-sm ring-1 ring-[var(--gold-300)]"
              : "text-[var(--ink-muted)]"
          }`}
        >
          ისტორია
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ძებნა სახელით ან ტელეფონით"
        className="mb-4 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-base outline-none focus:border-[var(--gold-700)]"
      />

      <div className="flex flex-col gap-3">
        {loading && (
          <p className="text-center text-sm text-[var(--ink-muted)]">იტვირთება...</p>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-sm text-[var(--ink-muted)]">
            სტუმრები ვერ მოიძებნა
          </p>
        )}

        {filtered.map((guest) => (
          <GuestRow
            key={guest.id}
            guest={guest}
            onCheckOut={tab === "current" ? handleCheckOut : undefined}
          />
        ))}
      </div>

      <button
        onClick={() => setFormOpen(true)}
        className="fixed bottom-6 left-1/2 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-xl bg-[var(--ink)] py-3.5 text-base font-medium text-white shadow-lg active:scale-[0.98] sm:w-auto sm:px-8"
      >
        + ახალი სტუმარი
      </button>

      {formOpen && (
        <GuestForm onSubmit={handleAddGuest} onClose={() => setFormOpen(false)} />
      )}
    </main>
  );
}
