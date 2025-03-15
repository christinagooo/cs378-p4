import "./App.css";
import { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";

interface Pokemon {
  name: string;
  sprites: { front_default: string; back_default: string };
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemonByType("fire");
  }, []);

  const fetchPokemonByType = async (type: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      if (!response.ok) throw new Error("Type not found!");
      const data = await response.json();
      const pokemonNames = (data.pokemon as { pokemon: { name: string } }[])
        .slice(0, 10)
        .map((poke) => poke.pokemon.name);
      const pokemonDetails = await Promise.all(
        pokemonNames.map(async (name) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const pokeData = await res.json();
          return {
            name: pokeData.name,
            sprites: {
              front_default: pokeData.sprites.front_default,
              back_default: pokeData.sprites.back_default,
            },
            height: pokeData.height,
            weight: pokeData.weight,
            abilities: pokeData.abilities,
            types: pokeData.types,
          };
        })
      );
      setPokemonList(pokemonDetails);
    } catch (err) {
      setPokemonList([]);
      window.alert(`Error: ${(err as Error).message}`);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      fetchPokemonByType(searchTerm);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-600 text-center my-1 p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg">
        Pokemon Search
      </h1>

      {/* search */}
      <div className="flex justify-center items-center gap-4 p-3 bg-gray-300 rounded-lg shadow-md my-2">
        <input
          type="text"
          className="p-2 border rounded w-55 text-center bg-gray-100 text-gray-700"
          placeholder="Enter a type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => handleSearchClick()}
        >
          Search
        </button>
      </div>

      <hr className="border-t-2 border-gray-300 my-1 w-full" />
      {/* four given types */}
      <div className="flex justify-center gap-4">
        <button
          className="px-1 py-1 bg-red-500 text-white rounded-lg text-sm"
          onClick={() => fetchPokemonByType("fire")}
        >
          🔥 FIRE
        </button>
        <button
          className="px-1 py-1 bg-blue-500 text-white rounded-lg text-sm"
          onClick={() => fetchPokemonByType("water")}
        >
          💧 WATER
        </button>
        <button
          className="px-1 py-1 bg-green-500 text-white rounded-lg text-sm"
          onClick={() => fetchPokemonByType("grass")}
        >
          🌿 GRASS
        </button>
        <button
          className="px-1 py-1 bg-gray text-white rounded-lg text-sm"
          onClick={() => fetchPokemonByType("steel")}
        >
          🔩 STEEL
        </button>
      </div>
      <hr className="border-t-2 border-gray-300 my-1 w-full" />

      {/* populate 10 pokemon cards */}
      <div className=" p-4">
        <div className="grid gap-5">
          {pokemonList.map((poke) => (
            <PokemonCard pokemon={poke} />
          ))}
        </div>
      </div>
    </div>
  );
}
