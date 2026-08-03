/**
 * lib/seatApi.ts
 *
 * API layer for seat selection and booking flows.
 * Uses authFetch for automatic token refresh.
 */

import { authFetch } from "./auth";
import { SeatConfig } from "@/components/dashboard/bookings/PassengerSeatMap";

import { API_URL as API } from "./config";

// ── Backend response shapes ──────────────────────────────────────────────────

interface BackendSeatUnit {
  seatNo: string;
  booked: boolean;
  blockedFor?: "none" | "wheelchair" | "reserved";
}

interface BackendCell {
  colIndex: number;
  cellType: "SEAT" | "AISLE" | "EMPTY" | "DRIVER" | "DOOR";
  seatId?: string | null;
  seatLabel?: string | null;
  seatType?: "STANDARD" | "SLEEPER_LOWER" | "SLEEPER_UPPER" | "SEMI_SLEEPER" | "SOFA" | "PRIORITY";
  isActive?: boolean;
}

interface BackendRow {
  rowIndex: number;
  rowType: "DRIVER_CABIN" | "DOOR_ROW" | "SPACER" | "SEAT_ROW" | "BACK_ROW";
  cells: BackendCell[];
}

interface BackendFloor {
  floorIndex: number;
  rows: BackendRow[];
}

interface BackendSeatConfig {
  busShape: string;
  layoutVariant?: string;
  floors: BackendFloor[];
}

interface GetSeatsResponse {
  status: boolean;
  message: string;
  data: {
    seata: BackendSeatUnit[];
    seatb: BackendSeatUnit[];
    seatc: BackendSeatUnit[];
    seatConfig?: BackendSeatConfig;
  };
}

// ── Adapter: backend seatConfig → PassengerSeatMap SeatConfig ──────────────

function adaptSeatConfig(backendConfig: BackendSeatConfig): SeatConfig {
  return {
    busShape: backendConfig.layoutVariant || backendConfig.busShape || "2X2",
    floors: backendConfig.floors.map((floor, fi) => ({
      floorLevel: floor.floorIndex ?? fi,
      floorName: fi === 0 ? "Lower Deck" : "Upper Deck",
      rows: floor.rows
        .filter(row => row.rowType !== "DRIVER_CABIN" && row.rowType !== "SPACER")
        .map(row => ({
          cells: row.cells.map(cell => ({
            cellType: cell.cellType,
            seatType: cell.seatType ?? "STANDARD",
            seatLabel: cell.seatLabel ?? null,
            seatId: cell.seatId ?? null,
          })),
        })),
    })),
  };
}

// ── Public API functions ─────────────────────────────────────────────────────

export interface TripSeatsData {
  seatConfig: SeatConfig;
  bookedSeatIds: string[];
}

/**
 * Fetch real seat layout and booked state for a trip.
 * Returns adapted SeatConfig for PassengerSeatMap + list of booked seatIds.
 */
export async function fetchTripSeats(tripId: string): Promise<TripSeatsData> {
  const res = await authFetch(`${API}/ticket/getSeats`, {
    method: "POST",
    body: JSON.stringify({ tripId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to load seats (${res.status})`);
  }

  const json: GetSeatsResponse = await res.json();

  if (!json.status || !json.data) {
    throw new Error(json.message || "No seat data returned");
  }

  // Collect booked seat IDs from all seat arrays
  const allSeats = [
    ...(json.data.seata || []),
    ...(json.data.seatb || []),
    ...(json.data.seatc || []),
  ];

  // Seats that are booked OR held by another user appear as booked
  const bookedSeatIds = allSeats
    .filter(s => s.booked || s.blockedFor === "reserved")
    .map(s => s.seatNo.toLowerCase());

  // Use real seatConfig if present, otherwise fall back to mock
  let seatConfig: SeatConfig;
  if (json.data.seatConfig?.floors?.length) {
    seatConfig = adaptSeatConfig(json.data.seatConfig);
  } else {
    // Fallback: generate a 2x2 layout from the flat seat list
    seatConfig = buildFallbackConfig(allSeats);
  }

  return { seatConfig, bookedSeatIds };
}

/**
 * Build a minimal 2x2 seat config from the flat seata/seatb/seatc arrays
 * as a fallback when the trip has no seatConfig attached.
 */
function buildFallbackConfig(allSeats: BackendSeatUnit[]): SeatConfig {
  const seats = allSeats.map(s => s.seatNo.toLowerCase());
  const rows: { cells: { cellType: "SEAT" | "AISLE"; seatType: "STANDARD"; seatLabel: string | null; seatId: string | null }[] }[] = [];

  // Group every 4 seats into a row (2 left + aisle + 2 right)
  for (let i = 0; i < seats.length; i += 4) {
    const chunk = seats.slice(i, i + 4);
    rows.push({
      cells: [
        { cellType: "SEAT", seatType: "STANDARD", seatLabel: chunk[0]?.toUpperCase() ?? null, seatId: chunk[0] ?? null },
        { cellType: "SEAT", seatType: "STANDARD", seatLabel: chunk[1]?.toUpperCase() ?? null, seatId: chunk[1] ?? null },
        { cellType: "AISLE", seatType: "STANDARD", seatLabel: null, seatId: null },
        { cellType: "SEAT", seatType: "STANDARD", seatLabel: chunk[2]?.toUpperCase() ?? null, seatId: chunk[2] ?? null },
        { cellType: "SEAT", seatType: "STANDARD", seatLabel: chunk[3]?.toUpperCase() ?? null, seatId: chunk[3] ?? null },
      ],
    });
  }

  return {
    busShape: "2X2",
    floors: [{ floorLevel: 1, floorName: "Lower Deck", rows }],
  };
}

// ── Booking ──────────────────────────────────────────────────────────────────

export interface BookSeatsResult {
  success: boolean;
  ticketId?: string;
  message: string;
}

/**
 * Book selected seats for a trip as an agent.
 * Uses AGENT_MANUAL gateway — no payment gateway required.
 */
export async function bookSeats(
  tripId: string,
  seatNumbers: string[],  // e.g. ["a1", "a2"]
): Promise<BookSeatsResult> {
  const transactionId = `AGENT-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const res = await authFetch(`${API}/ticket/bookTicket`, {
    method: "POST",
    body: JSON.stringify({
      tripId,
      seatNumbers,
      gateway: "AGENT_MANUAL",
      transactionId,
    }),
  });

  const json = await res.json().catch(() => ({ status: false, message: "Unexpected error" }));

  if (!res.ok || !json.status) {
    return { success: false, message: json.message || "Booking failed" };
  }

  return {
    success: true,
    ticketId: json.data?.ticketId ?? json.ticketId,
    message: json.message || "Booking confirmed",
  };
}
