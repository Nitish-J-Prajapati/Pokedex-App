'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
// import FilterPanel from '@/components/filter';
// import PokemonCard from '@/components/pokemonCard';
// import Link from 'next/link';
// import PaginationDemo from '@/components/pagination';
import type { Pokemon } from "@/lib/fetchPokemon";

interface Props {
  allPokemon: Pokemon[];
  totalCards: number;
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] };
}

export default function DashboardClient({
  allPokemon,
  totalCards,
  currentPage,
  totalPages,
  searchParams
}: Props) {
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.search as string || '');
  // const [filterState, setFilterState] = useState({
  //   type: Array.isArray(searchParams.type) ? searchParams.type : searchParams.type ? [searchParams.type] : [],
  //   height: (searchParams.height as string) || '',
  //   weight: (searchParams.weight as string) || '',
  //   experience: (searchParams.experience as string) || ''
  // });
  // const [showFilter, setShowFilter] = useState(false);

  const handleSearch = (text: string) => {
    setSearch(text);
    const updatedParams = new URLSearchParams({ ...searchParams, search: text, page: '1' });
    router.push(`/dashboard?${updatedParams.toString()}`);
  };

  // const createUrl = (page: number) => {
  //   const params = new URLSearchParams();
  //   if (search) params.set('search', search);
  //   if (filterState.type.length > 0) filterState.type.forEach((t) => params.append('type', t));
  //   if (filterState.height) params.set('height', filterState.height);
  //   if (filterState.weight) params.set('weight', filterState.weight);
  //   if (filterState.experience) params.set('experience', filterState.experience);
  //   params.set('page', page.toString());
  //   return `/dashboard?${params.toString()}`;
  // };

  // const searchedPokemonObj = allPokemon.find((p: any) => p.name?.toLowerCase() === search.toLowerCase());
  // const searchedPokemonImage = searchedPokemonObj?.sprites?.front_default || "";

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      {/* <p className="text-center mt-4 text-gray-700">
        Total Cards: {totalCards}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-center">
        {allPokemon.map((p: any) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <PaginationDemo currentPage={currentPage} totalPages={totalPages} />
      </div>

      <button
        onClick={() => setShowFilter(true)}
        className="fixed bottom-15 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white px-4 py-2 rounded-full shadow-md"
      >
        Filter
      </button>

      {showFilter && (
        <FilterPanel
          filter={filterState}
          setFilter={setFilterState}
          onClose={() => setShowFilter(false)}
          onApply={() => {
            setShowFilter(false);
            router.push(createUrl(1));
          }}
        />
      )} */}
    </main>
  );
}
