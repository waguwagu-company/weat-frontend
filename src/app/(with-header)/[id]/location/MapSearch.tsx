'use client';

import { useState } from 'react';
import { Search, Crosshair } from 'lucide-react';

interface MapSearchProps {
  isCurrent: boolean;
  handleGPS: () => void;
}

export default function MapSearch({ isCurrent, handleGPS }: MapSearchProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  return (
    <div className="absolute top-5 right-5 z-50 flex items-center space-x-2">
      <div
        className={`
          flex items-center justify-end
          border border-primary
          bg-white/30 backdrop-blur-sm
          shadow-[0_2px_4px_0_rgba(0,0,0,0.15),inset_0_3px_4px_0_rgba(0,0,0,0.25)]
          rounded-full 
          transition-all duration-300 overflow-hidden
          ${open ? 'w-77 h-11 gap-1' : 'w-11 h-11'}
        `}
      >
        <input
          type="text"
          id="addressSearch"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="주소 검색"
          className={`
            flex-1 bg-transparent outline-none text-black placeholder-muted-dark
            transition-opacity duration-300
            ${open ? 'opacity-100 ml-4 ' : 'opacity-0 pointer-events-none'}
          `}
        />

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center shrink-0 w-11 h-11 text-primary cursor-pointer"
        >
          <Search size={20} />
        </button>
      </div>

      <button
        type="button"
        className={`
            flex items-center justify-center w-11 h-11
            rounded-full bg-primary cursor-pointer
            shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] hover:scale-105 transition ease-in-out duration-200
            ${isCurrent ? 'text-white' : 'text-muted-light'}
        `}
        onClick={handleGPS}
      >
        <Crosshair size={20} />
      </button>
    </div>
  );
}
