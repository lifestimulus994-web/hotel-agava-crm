create table if not exists guests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  phone text not null,
  room_number text not null,
  guests_count integer not null default 1,
  notes text,
  check_in timestamptz not null default now(),
  check_out timestamptz,
  created_by uuid references auth.users(id) on delete set null
);

alter table guests enable row level security;

create policy "authenticated can select guests"
on guests for select
to authenticated
using (true);

create policy "authenticated can insert guests"
on guests for insert
to authenticated
with check (true);

create policy "authenticated can update guests"
on guests for update
to authenticated
using (true)
with check (true);

create policy "authenticated can delete guests"
on guests for delete
to authenticated
using (true);
