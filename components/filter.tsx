'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { fetchTypes } from '@/lib/fetchPokemon';
import { useRouter, useSearchParams } from 'next/navigation';
// import { heightRanges, weightRanges, expRanges } from '@/lib/constants';

const filterSections = ['type', 'height', 'weight'];
const heightOptions = ['<5', '6-20', '>20'];
const weightOptions = ['<50', '51-150', '>150'];

function OptionSelector({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label key={option} className="text-sm flex items-center gap-2">
          <input
            type="radio"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

function TypeSelector({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full px-2">
      {options.map((type) => (
        <button
          key={type}
          className={`px-2 py-1 rounded border text-sm w-full ${value.includes(type) ? 'bg-orange-400 text-black' : 'bg-black text-white border-white'}`}
          onClick={() => onChange(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export function Filter({ filter, setFilter, onApply, onClear }: {
  filter: { type: string[]; height: string; weight: string; search?: string };
  setFilter: (newFilter: Partial<{ type: string[]; height: string; weight: string; search?: string }>) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>('type');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchTypes().then(setTypeOptions);
  }, []);

  const toggleType = (type: string) => {
    setFilter({
      type: filter.type.includes(type)
        ? filter.type.filter((t) => t !== type)
        : [...filter.type, type],
    });
  };

  const updateFilter = (field: string, value: string) => {
    setFilter({ [field]: value });
  };

  const renderRightSection = () => {
    if (activeSection === 'type') {
      return (
        <>
          <div className="font-semibold mb-2 text-black">Select your type</div>
          <TypeSelector options={typeOptions} value={filter.type} onChange={toggleType} />
        </>
      );
    }
    if (activeSection === 'height') {
      return (
        <>
          <div className="font-semibold mb-2">Select height range</div>
          <OptionSelector options={heightOptions} value={filter.height} onChange={(v) => updateFilter('height', v)} />
        </>
      );
    }
    if (activeSection === 'weight') {
      return (
        <>
          <div className="font-semibold mb-2">Select weight range</div>
          <OptionSelector options={weightOptions} value={filter.weight} onChange={(v) => updateFilter('weight', v)} />
        </>
      );
    }
    return null;
  };

  const handleApply = () => {
    setOpen(false);
    if (onApply) onApply();
  };

  const handleRemoveFilters = () => {
    setOpen(false);
    if (onClear) onClear();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-15 left-1/2 transform -translate-x-1/2 px-4 py-2 text-sm rounded-full shadow-md z-50"
          style={{ minWidth: 'auto', width: 'auto' }}
        >
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[400px] h-[400px] p-0 flex flex-col
          sm:w-[400px] sm:h-[400px] sm:rounded-xl
          w-screen h-[90vh] left-0 top-0 rounded-none max-w-none max-h-none flex-col h-[450px]"
        sideOffset={8}
        style={{}}
      >
        <div className="flex items-center justify-between border-b px-4 py-3 bg-white z-10">
          <div className="text-lg font-semibold whitespace-nowrap">Filter Options</div>
          <Button size="icon" variant="ghost" className="ml-2" onClick={() => setOpen(false)} aria-label="Close filter">
            <span aria-hidden>×</span>
          </Button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 flex flex-col sm:flex-row gap-4">
          <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto sm:basis-[30%] flex-shrink-0 flex-grow-0 min-w-0 sm:min-w-[100px] sm:max-w-[140px]">
            {filterSections.map((section) => (
              <button
                key={section}
                className={`capitalize py-2 px-3 rounded flex-1 sm:w-full h-10 flex items-center justify-center sm:justify-start text-center sm:text-left ${activeSection === section ? 'bg-white font-medium text-black border-2' : 'hover:bg-gray-600 text-black'}`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            ))}
          </div>
          <div className="w-full sm:basis-[70%] flex-shrink-0 flex-grow min-w-0 pl-0 sm:pl-2 pr-0 sm:pr-2 flex flex-col justify-start items-start min-h-[120px] max-h-[250px] sm:max-h-[250px] overflow-y-auto">
            {renderRightSection()}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 border-t px-4 py-3 bg-white z-10">
          <Button
            onClick={handleApply}
            className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply Filter
          </Button>
          <Button
            onClick={handleRemoveFilters}
            className="w-full sm:flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            Clear Filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
