import { fetchPokemonByIdOrName } from '@/lib/fetchPokemon';
import React from 'react';
import Link from 'next/link';
import { Suspense } from "react";

const typeEmojis: Record<string, string> = {
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  normal: '🔘',
  poison: '☠️',
  fairy: '✨',
  bug: '🐛',
  ground: '🌍',
  psychic: '🔮',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚙️',
  ice: '❄️',
  fighting: '🥊',
  flying: '🕊️',
};

const typeColors: Record<string, string> = {
  fire: 'bg-red-400 text-white',
  water: 'bg-blue-400 text-white',
  grass: 'bg-green-400 text-white',
  electric: 'bg-yellow-300 text-gray-900',
  normal: 'bg-gray-300 text-gray-900',
  poison: 'bg-purple-500 text-white',
  fairy: 'bg-pink-300 text-gray-900',
  bug: 'bg-lime-400 text-gray-900',
  ground: 'bg-yellow-700 text-white',
  psychic: 'bg-pink-500 text-white',
  rock: 'bg-yellow-800 text-white',
  ghost: 'bg-indigo-700 text-white',
  dragon: 'bg-indigo-400 text-white',
  dark: 'bg-gray-800 text-white',
  steel: 'bg-gray-400 text-gray-900',
  ice: 'bg-cyan-200 text-gray-900',
  fighting: 'bg-orange-700 text-white',
  flying: 'bg-sky-300 text-gray-900',
};

function LoadingSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 px-2 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          {/* Photo skeleton */}
          <div className="flex-shrink-0 border-2 border-gray-300 rounded-xl bg-white p-4 flex items-center justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-200 animate-pulse" />
          </div>
          {/* Info skeleton */}
          <div className="flex-1 flex flex-col gap-2 items-center sm:items-start w-full">
            <div className="flex flex-wrap gap-2 mb-1">
              <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
            </div>
            <div className="h-8 w-40 rounded bg-gray-200 animate-pulse mb-1" />
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-700 text-xs sm:text-sm mb-1">
              <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
            </div>
            <div className="h-4 w-24 rounded bg-gray-200 animate-pulse mb-1" />
          </div>
        </div>
        {/* Abilities skeleton */}
        <div className="w-full">
          <div className="font-semibold text-gray-700 mb-1">Abilities</div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 w-16 rounded bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
        {/* Stats skeleton */}
        <div className="w-full">
          <div className="font-semibold text-gray-700 mb-1">Stats</div>
          <ul className="space-y-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="flex justify-between text-xs sm:text-sm">
                <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-8 rounded bg-gray-200 animate-pulse" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

async function PokemonDetailServer({ id }: { id: string }) {
  const pokemon = await fetchPokemonByIdOrName(id);
  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Pokémon Not Found</h2>
        <Link href="/" className="text-blue-600 underline">Back to Pokédex</Link>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-gray-50 px-2 py-6">
      {/* Back button */}
      <div className="max-w-2xl mx-auto mb-6 px-2">
        <Link href="/" className="inline-block bg-white border border-gray-300 text-black px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition">
          ← Back to Pokédex
        </Link>
      </div>
      {/* Main card */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          {/* Photo */}
          <div className="flex-shrink-0 border-2 border-gray-300 rounded-xl bg-white p-4 flex items-center justify-center">
            <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
          </div>
          {/* Info */}
          <div className="flex-1 flex flex-col gap-2 items-center sm:items-start w-full">
            {/* Type badges */}
            <div className="flex flex-wrap gap-2 mb-1">
              {pokemon.type.map((t: string) => (
                <span
                  key={t}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold capitalize ${typeColors[t] || 'bg-gray-200 text-gray-800'}`}
                >
                  <span className="inline-block border border-white shadow-sm rounded-full bg-white/30 px-1 mr-1" style={{textShadow: '0 1px 4px #fff, 0 0 2px #fff'}}>
                    {typeEmojis[t] || ''}
                  </span>
                  {t}
                </span>
              ))}
            </div>
            {/* Name */}
            <h1 className="text-xl sm:text-2xl font-bold capitalize mb-1 text-center sm:text-left">{pokemon.name}</h1>
            {/* Height & Weight */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-700 text-xs sm:text-sm mb-1">
              <div><span className="font-semibold">Height:</span> {pokemon.height}</div>
              <div><span className="font-semibold">Weight:</span> {pokemon.weight}</div>
            </div>
            {/* Base Exp */}
            <div className="text-gray-700 text-xs sm:text-sm mb-1"><span className="font-semibold">Base Exp:</span> {pokemon.base_experience}</div>
          </div>
        </div>
        {/* Abilities */}
        <div className="w-full">
          <div className="font-semibold text-gray-700 mb-1">Abilities</div>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((a: string) => (
              <span key={a} className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs capitalize">{a}</span>
            ))}
          </div>
        </div>
        {/* Stats */}
        <div className="w-full">
          <div className="font-semibold text-gray-700 mb-1">Stats</div>
          <ul className="space-y-1">
            {pokemon.stats.map((s: any, idx: number) => (
              <li key={idx} className="flex justify-between text-xs sm:text-sm">
                <span className="capitalize">{s.name}</span>
                <span className="font-mono">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default async function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = params ? await params : { id: '' };
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PokemonDetailServer id={resolvedParams.id} />
    </Suspense>
  );
} 