import React, { useState } from "react";
import { TripResult, formatDuration } from "@/types/search";
import { SeatSelectionDrawer } from "./SeatSelectionDrawer";

interface BusResultCardProps {
  trip: TripResult;
}

export default function BusResultCard({ trip }: BusResultCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { busDetail, routeDetail, departureTime, arrivalTime, tripFare, availableSeats } = trip;

  const durationMinutes = routeDetail?.durationMinutes ?? 0;
  const durationLabel = durationMinutes ? formatDuration(durationMinutes) : "";

  const seatsLabel =
    availableSeats === 0
      ? "Sold Out"
      : availableSeats <= 5
      ? `${availableSeats} Seats Left`
      : `${availableSeats} Seats`;

  const seatsColor =
    availableSeats === 0
      ? "text-red-500"
      : availableSeats <= 5
      ? "text-orange-500"
      : "text-[#C99A4A]";

  const rating = busDetail.averageRating ?? 0;
  const reviews = busDetail.totalReviews ?? 0;

  return (
    <>
      <div 
        className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsDrawerOpen(true)}
      >
        {/* Main Info Row */}
      <div className="flex items-center justify-between mb-4">

        {/* Operator & Bus Type */}
        <div className="flex-[1.5] min-w-0 pr-2">
          <h3 className="text-[15px] font-bold text-neutral-900 mb-0.5 truncate">{busDetail.busName}</h3>
          <p className="text-[13px] text-neutral-500 font-medium truncate">
            {busDetail.busType}
            {busDetail.seatLayout ? ` (${busDetail.seatLayout})` : ""}
          </p>
        </div>

        {/* Rating Badge */}
        {rating > 0 && (
          <div className="flex-shrink-0 mr-4">
            <div className="flex flex-col rounded-lg overflow-hidden border border-green-100 shadow-sm">
              <div className="bg-[#16a34a] text-white text-[12px] font-bold px-2 py-0.5 flex items-center justify-center gap-1">
                ★ {rating.toFixed(1)}
              </div>
              {reviews > 0 && (
                <div className="bg-green-50 text-neutral-700 text-[11px] font-bold px-2 py-0.5 text-center">
                  {reviews}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Times & Duration */}
        <div className="flex-[2] flex flex-col items-center">
          <div className="text-[18px] font-bold text-neutral-900 flex items-center gap-3 mb-0.5">
            {departureTime}
            <span className="text-neutral-300 font-normal text-[16px]">—</span>
            {arrivalTime}
          </div>
          <p className="text-[13px] text-neutral-500 font-medium">
            {durationLabel && (
              <>
                {durationLabel}
                <span className="mx-1.5 text-neutral-300">•</span>
              </>
            )}
            <span className={`font-bold ${seatsColor}`}>{seatsLabel}</span>
          </p>
        </div>

        {/* Price */}
        <div className="flex-[1.5] text-right flex flex-col justify-center pl-2">
          <div className="text-[20px] font-bold text-neutral-900 mb-0.5">
            Rs. {tripFare.toLocaleString()}
          </div>
          <p className="text-[12px] text-neutral-500 font-medium">Starting from</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-neutral-200 my-3" />

      {/* Bottom Links & Action */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 text-[13px] font-bold text-[#7A1D1B]">
          {busDetail.amenities.length > 0 && (
            <>
              <span className="cursor-pointer hover:text-[#5C1414] transition-colors">Amenities</span>
              <div className="w-[1px] h-3 bg-neutral-200" />
            </>
          )}
          {(busDetail.boardingPoints.length > 0 || busDetail.droppingPoints.length > 0) && (
            <>
              <span className="cursor-pointer hover:text-[#5C1414] transition-colors">Boarding/ Dropping Points</span>
              <div className="w-[1px] h-3 bg-neutral-200" />
            </>
          )}
          {reviews > 0 && (
            <>
              <span className="cursor-pointer hover:text-[#5C1414] transition-colors">Ratings &amp; Reviews</span>
              <div className="w-[1px] h-3 bg-neutral-200" />
            </>
          )}
          {busDetail.fleetImages.length > 0 && (
            <>
              <span className="cursor-pointer hover:text-[#5C1414] transition-colors">Bus Photos</span>
              <div className="w-[1px] h-3 bg-neutral-200" />
            </>
          )}
          <span className="cursor-pointer hover:text-[#5C1414] transition-colors">Cancellation Policies</span>
        </div>

        <button
          disabled={availableSeats === 0}
          onClick={() => setIsDrawerOpen(true)}
          className="h-10 px-8 bg-[#7A1D1B] text-white rounded-xl text-[14px] font-bold hover:bg-[#5C1414] transition-colors shadow-sm flex-shrink-0 ml-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {availableSeats === 0 ? "Sold Out" : "View seats"}
        </button>
      </div>
    </div>
    
    <SeatSelectionDrawer 
      isOpen={isDrawerOpen} 
      onClose={() => setIsDrawerOpen(false)} 
      trip={trip} 
    />
    </>
  );
}
