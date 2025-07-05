// app/components/PokemonCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Pokemon } from "@/lib/fetchPokemon";

const typeEmojis: Record<string, string> = {
  fire: "🔥",
  water: "💧",
  grass: "🌿",
  electric: "⚡",
  normal: "🔘",
  poison: "☠️",
  fairy: "✨",
  bug: "🐛",
  ground: "🌍",
  psychic: "🔮",
  rock: "🪨",
  ghost: "👻",
  dragon: "🐉",
  dark: "🌑",
  steel: "⚙️",
  ice: "❄️",
  fighting: "🥊",
  flying: "🕊️",
};

// Add a mapping from type to Tailwind color classes
const typeColors: Record<string, string> = {
  fire: "bg-red-400 text-white",
  water: "bg-blue-400 text-white",
  grass: "bg-green-400 text-white",
  electric: "bg-yellow-300 text-gray-900",
  normal: "bg-gray-300 text-gray-900",
  poison: "bg-purple-500 text-white",
  fairy: "bg-pink-300 text-gray-900",
  bug: "bg-lime-400 text-gray-900",
  ground: "bg-yellow-700 text-white",
  psychic: "bg-pink-500 text-white",
  rock: "bg-yellow-800 text-white",
  ghost: "bg-indigo-700 text-white",
  dragon: "bg-indigo-400 text-white",
  dark: "bg-gray-800 text-white",
  steel: "bg-gray-400 text-gray-900",
  ice: "bg-cyan-200 text-gray-900",
  fighting: "bg-orange-700 text-white",
  flying: "bg-sky-300 text-gray-900",
};

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <Card className="bg-white border-2 border-gray-400 shadow-none hover:shadow-2xl transition cursor-pointer w-full min-w-0 h-[26rem] flex flex-col justify-between">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Top 50%: Image */}
          <div className="flex items-center justify-center bg-white" style={{ height: '50%' }}>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-28 h-28 object-contain"
              style={{ maxHeight: '110px' }}
            />
          </div>

          {/* Type */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {pokemon.type.map((t: string) => (
              <span
                key={t}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs md:text-sm font-semibold capitalize ${typeColors[t] || "bg-gray-200 text-gray-800"}`}
              >
                <span className="inline-block border border-white shadow-sm rounded-full bg-white/30 px-1 mr-1" style={{textShadow: '0 1px 4px #fff, 0 0 2px #fff'}}>
                  {typeEmojis[t] || ""}
                </span>
                {t}
              </span>
            ))}
          </div>

          {/* Name */}
          <h3 className="text-gray-900 text-center font-bold capitalize text-lg md:text-xl mt-1 mb-2">
            {pokemon.name}
          </h3>

          {/* Table-like structure: Height/Weight left, Stats right */}
          <div className="flex flex-row justify-between px-4 pb-4 flex-1">
            {/* Left: Height & Weight */}
            <div className="flex flex-col justify-center text-gray-700 text-xs md:text-sm gap-2 w-1/2 border-r border-gray-200 pr-2">
              <div>
                <span className="font-semibold">Height:</span> {pokemon.height}
              </div>
              <div>
                <span className="font-semibold">Weight:</span> {pokemon.weight}
              </div>
            </div>
            {/* Right: Stats */}
            <div className="flex flex-col justify-center text-gray-700 text-xs md:text-sm gap-1 w-1/2 pl-2">
              <span className="font-semibold mb-1">Stats:</span>
              <ul className="list-none pl-0">
                {pokemon.stats && pokemon.stats.slice(0, 4).map((s: any, idx: number) => (
                  <li key={idx} className="flex justify-between">
                    <span className="capitalize">{s.name}</span>
                    <span className="ml-2 font-mono">{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
