'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { debounce } from 'lodash';
import { Search, Crosshair } from 'lucide-react';
import { useAutocomplete } from '@/hooks/useLocation';

import type { ChangeEvent } from 'react';

interface MapSearchProps {
  isCurrent: boolean;
  handleGPS: () => void;
}

interface PlaceSuggestion {
  placeId: string;
  title: string;
  address: string;
}

export default function MapSearch({ isCurrent, handleGPS }: MapSearchProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);

  const { mutate } = useAutocomplete();

  const debouncedAutocomplete = useMemo(
    () =>
      debounce((input: string) => {
        mutate(input, {
          onSuccess: (data) => {
            const results: PlaceSuggestion[] = data.map((item) => {
              return {
                placeId: item.placePrediction.placeId,
                title: item.placePrediction.structuredFormat.mainText.text,
                address: item.placePrediction.text.text,
              };
            });
            setSuggestions(results);
          },
        });
      }, 1000),
    [mutate]
  );

  const enterQuery = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedAutocomplete(e.target.value);
    setQuery(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedAutocomplete.cancel();
    };
  }, [debouncedAutocomplete]);

  return (
    <div className="absolute top-5 right-5 z-10 flex items-center space-x-2">
      <div
        className={`
          flex items-center justify-end
          border border-primary
          bg-white/30 backdrop-blur-sm
          shadow-[0_2px_4px_0_rgba(0,0,0,0.15),inset_0_3px_4px_0_rgba(0,0,0,0.25)]
          rounded-full z-10
          transition-all duration-300 overflow-hidden
          ${open ? 'w-77 h-11 gap-1' : 'w-11 h-11'}
        `}
      >
        <input
          type="text"
          id="addressSearch"
          value={query}
          onChange={enterQuery}
          placeholder="주소 검색"
          className={`
            flex-1 bg-transparent outline-none text-black placeholder-muted-300
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

      {open && suggestions.length > 0 && (
        <div
          className="
              absolute top-full left-0 w-77 -mt-8 px-3 py-1.5 overflow-hidden z-9
              border border-primary rounded-lg
              bg-white/30 backdrop-blur-sm
              shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
            "
        >
          <ul>
            {suggestions.map((item) => (
              <li
                key={item.placeId}
                className="
                px-3 py-1.5 text-muted-400 border border-transparent
                not-last:border-b-muted-200 first:pt-8 cursor-pointer"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs">{item.address}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        className={`
            flex items-center justify-center w-11 h-11
            rounded-full text-white transition-all cursor-pointer
            shadow-[0_2px_4px_0_rgba(0,0,0,0.15)]
            ${isCurrent ? 'bg-white/30 backdrop-blur-sm border border-primary' : 'bg-primary'}
        `}
        onClick={handleGPS}
      >
        {isCurrent ? (
          <Image src="/images/icon-compass.svg" alt="GPS" width={18} height={17} />
        ) : (
          <Crosshair size={20} />
        )}
      </button>
    </div>
  );
}
