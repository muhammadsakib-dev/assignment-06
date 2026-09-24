"use client";

import { FiChevronDown } from "react-icons/fi";

export type SortBy = "duration" | "calories" | "rating";

interface SortControlProps {
  sortBy: SortBy;
  onSortChange: (value: SortBy) => void;
}

const SortControl = ({
  sortBy,
  onSortChange,
}: SortControlProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-[#666D78]">
        Sort By
      </span>

      <div className="relative">
        <select
          value={sortBy}
          onChange={(event) =>
            onSortChange(event.target.value as SortBy)
          }
          className="h-8 appearance-none rounded-lg border border-[#292D35] bg-[#15181E] py-0 pl-3 pr-8 text-[10px] text-[#C8CCD2] outline-none transition focus:border-[#3A3F48]"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>

        <FiChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#68707B]"
        />
      </div>
    </div>
  );
};

export default SortControl;