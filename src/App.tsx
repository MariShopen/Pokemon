import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { PokemonCard } from "./components/PokemonCard";
import { Input } from "@/components/ui/input";

export type PokemonInfo = {
  id: number;
  name: string;
  weight: number;
  height: number;
  abilities: any[];
  sprites: any;
  stats: any[];
  types: any[];
};

export const pokemonFetch = async (searchPok: string) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchPok}`
    );
    const jsonData = await response.json();
    return jsonData;
  } catch {
    console.log("error");
  }
};

export function App() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<PokemonInfo | undefined>();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePokemonSearch = async () => {
    let searchLowCase = search.toLowerCase();
    let pokemonInfo: PokemonInfo = await pokemonFetch(searchLowCase);
    setPokemon(pokemonInfo);
  };

  return (
    <div className="flex min-w-full min-h-full h-screen items-center justify-center flex-col bg-slate-700">
      <div className="flex items-center content-around w-[720px] h-[480px] bg-slate-600 flex-col rounded-xl">
        <div className="flex flex-row justify-center h-1/3 mt-5">
          <Input
            placeholder="search pokemon"
            onChange={changeHandler}
            className="mx-2 my-4"
          ></Input>
          <Button onClick={handlePokemonSearch} className="mx-2 my-4">
            Search a pokemon
          </Button>
        </div>
        {pokemon ? (
          <PokemonCard pokemonInfo={pokemon} />
        ) : (
          <div className="h-3/4"></div>
        )}
      </div>
    </div>
  );
}
