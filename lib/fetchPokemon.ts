export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  image: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: string[];
  stats: { name: string; value: number }[];
  forms: string[];
}

export async function fetchAllPokemon(limit = 300): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
    { cache: 'force-cache', next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Failed to fetch Pokémon list');
  const data = await res.json();
  const detailedPokemon = await Promise.all(
    data.results.map(async (p: any) => {
      const res = await fetch(p.url, { cache: 'force-cache', next: { revalidate: 300 } });
      if (!res.ok) return null;
      const details = await res.json();
      return {
        id: details.id,
        name: details.name,
        type: details.types.map((t: any) => t.type.name),
        image: details.sprites.front_default,
        height: details.height,
        weight: details.weight,
        base_experience: details.base_experience,
        abilities: details.abilities.map((a: any) => a.ability.name),
        stats: details.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
        forms: details.forms.map((f: any) => f.name),
      } as Pokemon;
    })
  );
  return detailedPokemon.filter((p): p is Pokemon => p !== null);
}

export async function fetchTypes() {
  const res = await fetch('https://pokeapi.co/api/v2/type', { cache: 'force-cache', next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Failed to fetch types');
  const data = await res.json();
  return data.results.map((type: any) => type.name);
}

export async function fetchPaginatedPokemon(page: number, pageSize: number): Promise<{ pokemon: Pokemon[]; totalCards: number; totalPages: number }> {
  const offset = (page - 1) * pageSize;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`, { cache: 'force-cache', next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Failed to fetch paginated Pokémon');
  const data = await res.json();
  const pokemon = await Promise.all(
    data.results.map(async (p: any) => {
      const res = await fetch(p.url, { cache: 'force-cache', next: { revalidate: 300 } });
      if (!res.ok) return null;
      const details = await res.json();
      return {
        id: details.id,
        name: details.name,
        type: details.types.map((t: any) => t.type.name),
        image: details.sprites.front_default,
        height: details.height,
        weight: details.weight,
        base_experience: details.base_experience,
        abilities: details.abilities.map((a: any) => a.ability.name),
        stats: details.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
        forms: details.forms.map((f: any) => f.name),
      } as Pokemon;
    })
  );
  const filtered = pokemon.filter((p): p is Pokemon => p !== null);
  const totalCards = data.count;
  const totalPages = Math.ceil(totalCards / pageSize);
  return { pokemon: filtered, totalCards, totalPages };
}

export async function fetchPokemonByIdOrName(idOrName: string | number): Promise<Pokemon | null> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`, { cache: 'force-cache', next: { revalidate: 300 } });
  if (!res.ok) return null;
  const details = await res.json();
  return {
    id: details.id,
    name: details.name,
    type: details.types.map((t: any) => t.type.name),
    image: details.sprites.front_default,
    height: details.height,
    weight: details.weight,
    base_experience: details.base_experience,
    abilities: details.abilities.map((a: any) => a.ability.name),
    stats: details.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
    forms: details.forms.map((f: any) => f.name),
  } as Pokemon;
}
