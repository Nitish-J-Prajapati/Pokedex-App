"use client";
import { useEffect, useState, useMemo } from "react";
import { fetchAllPokemon, fetchTypes, Pokemon } from "@/lib/fetchPokemon";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/filterUtils";
import MainBody from "./mainBody";
import Footer from "./footer";
import { Filter } from "./filter";
import { Skeleton } from "./ui/skeleton";

const PAGE_SIZE = 12;

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mx-auto flex-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-full min-w-0 h-[26rem] flex flex-col justify-between bg-white border-2 border-gray-200 rounded-xl shadow animate-pulse">
            <div className="flex items-center justify-center bg-white" style={{ height: '50%' }}>
              <Skeleton className="w-28 h-28 rounded-full" />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Skeleton className="h-[20px] w-[60px] rounded-full" />
              <Skeleton className="h-[20px] w-[60px] rounded-full" />
            </div>
            <div className="text-center mt-2 mb-2">
              <Skeleton className="h-[24px] w-[100px] rounded" />
            </div>
            <div className="flex flex-row justify-between px-4 pb-4 flex-1">
              <div className="flex flex-col gap-2 w-1/2 border-r border-gray-200 pr-2">
                <Skeleton className="h-[16px] w-[60px] rounded" />
                <Skeleton className="h-[16px] w-[60px] rounded" />
              </div>
              <div className="flex flex-col gap-2 w-1/2 pl-2">
                <Skeleton className="h-[16px] w-[60px] rounded" />
                <Skeleton className="h-[16px] w-[60px] rounded" />
                <Skeleton className="h-[16px] w-[60px] rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-2 fixed bottom-0 left-1/2 -translate-x-1/2">
        <Skeleton className="h-10 w-full rounded" />
      </div>
    </div>
  );
}

export default function PokedexClient() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ type: string[]; height: string; weight: string; search: string }>({
    type: [],
    height: '',
    weight: '',
    search: '',
  });
  const [pendingFilter, setPendingFilter] = useState<{ type: string[]; height: string; weight: string; search: string }>({
    type: [],
    height: '',
    weight: '',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchAllPokemon(300)
      .then(setAllPokemon)
      .finally(() => setLoading(false));
  }, []);

  // Filtering and searching
  const filteredPokemon = useMemo(() => {
    return applyFilters(allPokemon, filter);
  }, [allPokemon, filter]);

  const totalCards = filteredPokemon.length;
  const totalPages = Math.ceil(totalCards / PAGE_SIZE);
  const currentPagePokemon = filteredPokemon.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Handlers for filter/search
  const handlePendingFilterChange = (newFilter: Partial<typeof filter>) => {
    setPendingFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleApplyFilter = () => {
    setFilter(pendingFilter);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setPendingFilter({ type: [], height: '', weight: '', search: '' });
    setFilter({ type: [], height: '', weight: '', search: '' });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <>
      <MainBody
        allPokemon={currentPagePokemon}
        totalCards={totalCards}
      />
      <Filter
        filter={pendingFilter}
        setFilter={handlePendingFilterChange}
        onApply={handleApplyFilter}
        onClear={handleClearFilter}
      />
      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={filter}
        onPageChange={handlePageChange}
      />
    </>
  );
} 