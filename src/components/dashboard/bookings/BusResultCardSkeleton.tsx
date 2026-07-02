export default function BusResultCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-4 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        {/* Operator */}
        <div className="flex-[1.5] pr-2 flex flex-col gap-2">
          <div className="h-4 bg-neutral-200 rounded-lg w-3/4" />
          <div className="h-3 bg-neutral-100 rounded-lg w-1/2" />
        </div>

        {/* Rating badge */}
        <div className="flex-shrink-0 mr-4">
          <div className="w-10 h-10 bg-neutral-200 rounded-lg" />
        </div>

        {/* Times */}
        <div className="flex-[2] flex flex-col items-center gap-2">
          <div className="h-5 bg-neutral-200 rounded-lg w-40" />
          <div className="h-3 bg-neutral-100 rounded-lg w-28" />
        </div>

        {/* Price */}
        <div className="flex-[1.5] text-right flex flex-col items-end gap-2 pl-2">
          <div className="h-6 bg-neutral-200 rounded-lg w-24" />
          <div className="h-3 bg-neutral-100 rounded-lg w-16" />
        </div>
      </div>

      <div className="border-t border-neutral-100 my-3" />

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="h-3 bg-neutral-100 rounded w-16" />
          <div className="h-3 bg-neutral-100 rounded w-24" />
          <div className="h-3 bg-neutral-100 rounded w-20" />
        </div>
        <div className="h-10 w-28 bg-neutral-200 rounded-xl" />
      </div>
    </div>
  );
}
