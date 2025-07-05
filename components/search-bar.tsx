"use client"

import { Search } from "lucide-react"
import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"


export default function SearchBar() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [pokemonList, setPokemonList] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Fetch all Pokémon on first open
  React.useEffect(() => {
    if (open && pokemonList.length === 0 && !loading) {
      setLoading(true)
      fetch("https://pokeapi.co/api/v2/pokemon?limit=300")
        .then(res => res.json())
        .then(async data => {
          // Fetch details for each
          const detailed = await Promise.all(
            data.results.map(async (p: any) => {
              try {
                const res = await fetch(p.url)
                if (!res.ok) return null
                const details = await res.json()
                return {
                  id: details.id,
                  name: details.name,
                  image: details.sprites.front_default,
                }
              } catch {
                return null
              }
            })
          )
          setPokemonList(detailed.filter(Boolean))
        })
        .finally(() => setLoading(false))
    }
  }, [open, pokemonList.length, loading])

  // Filtered list
  const filtered =
    search.trim() === ""
      ? pokemonList
      : pokemonList.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )

  return (
    <>
      <button
        className="flex py-2 pl-4 pr-2 w-full max-w-sm rounded-[16px] items-center flex-row justify-between border-2 border-gray-300 transition-all duration-300 hover:scale-102"
        onClick={() => setOpen(true)}
        type="button"
      >
        <div className="flex flex-row gap-2">
          <Search />
          <p className="text-end">Search...</p>
        </div>
        <div className="flex items-center p-2 rounded-[8px] bg-gray-500 border-2 border-gray-300 text-white text-sm font-medium">
          CTRL+K
        </div>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a Pokémon name..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <CommandItem key={i} className="flex items-center gap-3 cursor-pointer">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <span className="flex-1">
                    <Skeleton className="h-4 w-24 rounded" />
                  </span>
                </CommandItem>
              ))}
            </>
          ) : (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Pokémon">
                {filtered.map((p) => (
                  <CommandItem
                    key={p.id}
                    onSelect={() => {
                      setOpen(false)
                      router.push(`/pokemon/${p.id}`)
                    }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src={p.image} alt={p.name} />
                      <AvatarFallback>{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="capitalize font-medium">{p.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}