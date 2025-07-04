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
    <div className="flex flex-wrap gap-2">
      {options.map((type) => (
        <button
          key={type}
          className={`px-2 py-1 rounded border text-sm ${value.includes(type) ? 'bg-orange-400 text-black' : 'bg-black text-white border-white'}`}
          onClick={() => onChange(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export function Filter() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<{ type: string[]; height: string; weight: string; }>({
    type: [],
    height: '',
    weight: '',
  });
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>('type');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchTypes().then(setTypeOptions);
  }, []);

  const toggleType = (type: string) => {
    setFilter((prev) => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter((t) => t !== type)
        : [...prev.type, type],
    }));
  };

  const updateFilter = (field: string, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
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
    // Build new URLSearchParams
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // Reset to first page on filter
    Object.entries(filter).forEach(([key, value]) => {
      params.delete(key);
      if (Array.isArray(value)) {
        value.forEach((v) => v && params.append(key, v));
      } else if (value) {
        params.set(key, value);
      }
    });
    router.push(`?${params.toString()}`);
  };

  const handleRemoveFilters = () => {
    setOpen(false);
    // Remove all filter params from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete('type');
    params.delete('height');
    params.delete('weight');
    params.delete('page'); // Reset to first page
    router.push(`?${params.toString()}`);
    setFilter({ type: [], height: '', weight: '' });
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
      <PopoverContent className="w-[600px] h-[400px] max-w-full">
        <div className="flex h-full">
          {/* Left side: Filter sections */}
          <div className="w-[30%] min-w-[150px] max-w-[200px] border-r border-gray-500 pr-4 flex flex-col">
            <div className="text-lg font-semibold mb-4">Filter Options</div>
            {filterSections.map((section) => (
              <button
                key={section}
                className={`text-left capitalize py-1 px-2 rounded mb-2 ${activeSection === section ? 'bg-white font-medium text-black border-2' : 'hover:bg-gray-600 text-black'}`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            ))}
          </div>
          {/* Right side: Dynamic options */}
          <div className="w-[70%] pl-6 flex flex-col justify-start items-start">
            {renderRightSection()}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handleRemoveFilters}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded border border-gray-400 hover:bg-gray-300"
          >
            Remove Filters
          </button>
          <button onClick={() => setOpen(false)} className="bg-gray-300 border border-gray-400 hover:bg-gray-500 px-3 py-1 rounded">
            Close
          </button>
          <button
            onClick={handleApply}
            className="bg-indigo-500 border border-indigo-950 hover:bg-indigo-800 text-white px-3 py-1 rounded"
          >
            Apply
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
