// app/lib/filterUtils.ts
export function parseFiltersFromSearchParams(params: any) {
    return {
      search: params.search || '',
      type: Array.isArray(params.type) ? params.type : params.type ? [params.type] : [],
      height: params.height || '',
      weight: params.weight || '',
      experience: params.experience || '',
      region: params.region || ''
    };
  }
  
  export function applyFilters(pokemonList: any[], filters: any) {
    return pokemonList.filter((p) => {
      if (!p || !p.name) return false; // 🛡️ Prevent undefined errors
  
      const matchesType =
        (!filters.type?.length || filters.type.some((type: string) => p.type?.includes(type)));
  
      const matchesHeight =
        !filters.height ||
        (filters.height === '<5' && p.height < 5) ||
        (filters.height === '6-20' && p.height >= 6 && p.height <= 20) ||
        (filters.height === '>20' && p.height > 20);
  
      const matchesWeight =
        !filters.weight ||
        (filters.weight === '<50' && p.weight < 50) ||
        (filters.weight === '51-150' && p.weight >= 51 && p.weight <= 150) ||
        (filters.weight === '>150' && p.weight > 150);
  
      const matchesRegion = !filters.region || p.region === filters.region;
  
      const matchesSearch =
        !filters.search ||
        (p.name && p.name.toLowerCase().includes(filters.search.toLowerCase()));
  
      return matchesType && matchesHeight && matchesWeight && matchesRegion && matchesSearch;
    });
  }
  
  