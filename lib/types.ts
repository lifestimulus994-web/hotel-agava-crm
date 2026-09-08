export interface Guest {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  room_number: string;
  guests_count: number;
  notes: string | null;
  check_in: string;
  check_out: string | null;
  created_by: string | null;
}

export type NewGuest = Pick<
  Guest,
  "first_name" | "last_name" | "phone" | "room_number" | "guests_count" | "notes"
>;
