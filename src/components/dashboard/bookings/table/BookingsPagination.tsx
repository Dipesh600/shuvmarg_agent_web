"use client";

interface BookingsPaginationProps {
  totalItems: number;
}

export default function BookingsPagination({
  totalItems,
}: BookingsPaginationProps) {
  if (totalItems === 0) return null;

  return (
    <div className="flex items-center justify-between mt-6 px-2">
      <span className="text-[14px] font-medium text-neutral-500">
        Showing 1 to {totalItems} of {totalItems} entries
      </span>
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 border border-neutral-200 rounded-lg text-[14px] font-semibold text-neutral-500 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        <button className="px-4 py-2 bg-neutral-100 rounded-lg text-[14px] font-bold text-neutral-900">
          1
        </button>
        <button className="px-4 py-2 border border-neutral-200 rounded-lg text-[14px] font-semibold text-neutral-500 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  );
}
