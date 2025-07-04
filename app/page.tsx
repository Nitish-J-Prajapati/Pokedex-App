import { Filter } from "@/components/filter";
import Footer from "@/components/footer";
import MainBody from "@/components/mainBody";
import { fetchAllPokemon } from "@/lib/fetchPokemon";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/filterUtils";

export default async function Page({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] }> }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const page = parseInt((resolvedSearchParams.page as string) || '1');
  const pageSize = 12;

  // Fetch all Pokémon (or a reasonable limit)
  const allPokemon = await fetchAllPokemon(300);

  // Parse and apply filters
  const filters = parseFiltersFromSearchParams(resolvedSearchParams);
  const filteredPokemon = applyFilters(allPokemon, filters);

  // Paginate after filtering
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
        searchParams={resolvedSearchParams}
      />
      <Filter />
      <Footer currentPage={page} totalPages={totalPages} searchParams={resolvedSearchParams} />
    </>
  );
}
