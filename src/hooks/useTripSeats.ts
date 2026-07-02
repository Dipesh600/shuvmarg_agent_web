import { useState, useEffect, useCallback } from "react";
import { fetchTripSeats, TripSeatsData } from "@/lib/seatApi";
import { SeatConfig } from "@/components/dashboard/bookings/PassengerSeatMap";

export function useTripSeats(tripId: string) {
  const [data, setData] = useState<TripSeatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSeats = useCallback(async () => {
    if (!tripId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const seatData = await fetchTripSeats(tripId);
      setData(seatData);
    } catch (err: any) {
      setError(err.message || "Failed to load seats");
    } finally {
      setIsLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    loadSeats();
  }, [loadSeats]);

  return {
    seatConfig: data?.seatConfig as SeatConfig | undefined,
    bookedSeatIds: data?.bookedSeatIds || [],
    isLoading,
    error,
    refetch: loadSeats,
  };
}
