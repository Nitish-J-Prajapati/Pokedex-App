import { Filter } from "@/components/filter";
import Footer from "@/components/footer";
import MainBody from "@/components/mainBody";
import { fetchAllPokemon } from "@/lib/fetchPokemon";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/filterUtils";

export type PageProps = {
  searchParams?: { [key: string]: string | string[] };
};

export default async function Home({ searchParams = {} }: PageProps) {
  const page = parseInt((searchParams.page as string) || '1');
  const pageSize = 12;

  // Fetch all Pokémon (or a reasonable limit)
  const allPokemon = await fetchAllPokemon(300);

  // Parse and apply filters
  const filters = parseFiltersFromSearchParams(searchParams);
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
        searchParams={searchParams}
      />
      <Filter />
      <Footer currentPage={page} totalPages={totalPages} searchParams={searchParams} />
    </>
  );
}
