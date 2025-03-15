import React from "react";

interface Pokemon {
    name: string;
    sprites: { front_default: string; back_default: string };
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    types: { type: { name: string } }[];
}

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
    const [isFront, setIsFront] = React.useState(true);
    return (
    <div>
    <h2 className="text-2xl font-bold capitalize text-gray-800 mb-2"> {pokemon.name}</h2>
    <div className="flex flex-row items-center justify-between bg-blue-300 shadow-md rounded-2xl p-2 w-full text-left gap-3">

        {/* pokemon description */}
        <div className="self-start p-4 bg-white rounded-lg shadow-md max-w-xs">
            <p className="text-sm text-gray-500 mb-1"><span className="font-semibold text-gray-700">Height:</span>{" "}{pokemon.height} m</p>
            <p className="text-sm text-gray-500 mb-1"><span className="font-semibold text-gray-700">Weight:</span>{" "}{pokemon.weight} kg</p>
            <p className="text-gray-700 text-sm"><span className="font-semibold text-gray-800">Abilities:</span>{" "}
                {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
            </p>
        </div>

        {/* sprite */}
        <div className="flex flex-col items-center justify-center">
            <img src={
                isFront ? pokemon.sprites.front_default : pokemon.sprites.back_default}
                alt={pokemon.name}
                className="w-24 h-24"
            />

            <div className="flex gap-1">
                <button
                    onClick={() => setIsFront(true)}
                    className={`px-3 py-1 text-xs rounded-lg text-white transition ${ isFront ? "bg-blue-500" : "bg-gray-300"}`}>
                    Front
                </button>
                <button
                    onClick={() => setIsFront(false)}
                    className={`px-3 py-1 text-xs rounded-lg text-white transition ${!isFront ? "bg-blue-500" : "bg-gray-300"}`}>
                    Back
                </button>
            </div>
        </div>
    </div>
    </div>
);
};

export default PokemonCard;
