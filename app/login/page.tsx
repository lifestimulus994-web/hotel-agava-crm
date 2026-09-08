"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError("არასწორი ელფოსტა ან პაროლი");
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <Image
          src="/logo.png"
          alt="სასტუმრო აგავა"
          width={200}
          height={200}
          className="mx-auto mb-2 h-20 w-20 object-contain"
          priority
        />
        <h1 className="mb-1 text-center text-xl font-semibold">სასტუმრო აგავა</h1>
        <p className="mb-6 text-center text-sm text-[var(--ink-muted)]">
          რეცეფციის შესვლა
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--ink)]">
              ელფოსტა
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-base outline-none focus:border-[var(--gold-700)]"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--ink)]">
              პაროლი
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-base outline-none focus:border-[var(--gold-700)]"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-[var(--ink)] px-4 py-2.5 text-base font-medium text-white transition active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "იტვირთება..." : "შესვლა"}
          </button>
        </form>
      </div>
    </main>
  );
}
