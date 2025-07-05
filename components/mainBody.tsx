import PokemonCard from "./pokemon-card";
import type { Pokemon } from "@/lib/fetchPokemon";

interface Props {
  allPokemon: Pokemon[];
  totalCards: number;
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] };
}

export default function MainBody({
  allPokemon,
  totalCards,
  currentPage,
  totalPages,
  searchParams,
}: Props) {
  return (
    <main className="flex-grow overflow-auto">
      <div className="w-full max-w-screen-xl mx-auto">
        <p className="text-start ml-6 mt-4 text-black font-semibold text-2xl">
          Total Cards: <span className="bg-red-400 px-2 rounded-lg text-black">{totalCards}</span>
        </p>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mx-auto">
          {allPokemon.length > 0 ? (
            allPokemon.map((p: any) => <PokemonCard key={p.id} pokemon={p} />)
          ) : (
            <div className="text-center text-gray-500 col-span-full">No Pokémon found.</div>
          )}
        </div>
      </div>
    </main>
  );
}
