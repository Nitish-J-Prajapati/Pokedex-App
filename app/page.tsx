import { Suspense } from "react";
import { Filter } from "@/components/filter";
import Footer from "@/components/footer";
import MainBody from "@/components/mainBody";
import { fetchAllPokemon } from "@/lib/fetchPokemon";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/filterUtils";

import { Skeleton } from "@/components/ui/skeleton"

function LoadingSkeleton() {
  // Show a grid of skeleton cards to mimic the Pokédex card layout
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* Main grid skeleton */}
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
      {/* Filter skeleton (bottom center, fixed like real filter button) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      {/* Footer skeleton (pagination) at the bottom */}
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-2 fixed bottom-0 left-1/2 -translate-x-1/2">
        <Skeleton className="h-10 w-full rounded" />
      </div>
    </div>
  );
}

async function PokemonListServer({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
  const page = parseInt((searchParams.page as string) || '1');
  const pageSize = 12;
  const allPokemon = await fetchAllPokemon(300);
  const filters = parseFiltersFromSearchParams(searchParams);
  const filteredPokemon = applyFilters(allPokemon, filters);
  const totalCards = filteredPokemon.length;
  const totalPages = Math.ceil(totalCards / pageSize);
  const currentPagePokemon = filteredPokemon.slice((page - 1) * pageSize, page * pageSize);
  return (
    <>
      <MainBody
        allPokemon={currentPagePokemon}
        totalCards={totalCards}
        currentPage={page}
        totalPages={totalPages}
        searchParams={searchParams}
      />
      <Filter />
      <Footer currentPage={page} totalPages={totalPages} searchParams={searchParams} />
    </>
  );
}

export default async function Page({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] }> }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PokemonListServer searchParams={resolvedSearchParams} />
    </Suspense>
  );
}
