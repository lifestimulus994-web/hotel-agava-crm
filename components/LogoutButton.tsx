"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--ink-muted)] transition hover:bg-[var(--surface-3)] active:scale-[0.98]"
    >
      გასვლა
    </button>
  );
}
