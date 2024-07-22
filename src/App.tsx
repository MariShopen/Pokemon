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
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchPok}`
  );
  const jsonData = await response.json();
  return jsonData;
};

export function App() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<PokemonInfo | undefined>();
  const [error, setError] = useState<string | null>(null);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePokemonSearch = async () => {
    let searchLowCase = search.toLowerCase();
    try {
      let pokemonInfo: PokemonInfo = await pokemonFetch(searchLowCase);
      setPokemon(pokemonInfo);
      setError(null);
    } catch {
      setError("Sorry, there is no such pokemon name");
      setPokemon(undefined);
    }
  };

  return (
    <div className="flex min-w-full min-h-full h-screen items-center justify-center flex-col bg-slate-700">
      <div className="flex w-[720px] h-[480px] bg-slate-600 flex-col rounded-xl p-5">
        <div className="flex flex-row justify-center my-5">
          <Input
            placeholder="Pokemon name"
            onChange={changeHandler}
            className="mr-4 my-4"
          ></Input>
          <Button onClick={handlePokemonSearch} className="my-4">
            Search
          </Button>
        </div>
        {Error ? <div className="text-slate-400">{error}</div> : <div></div>}
        {pokemon ? (
          <PokemonCard pokemonInfo={pokemon} />
        ) : (
          <div className="h-3/4"></div>
        )}
      </div>
    </div>
  );
}
