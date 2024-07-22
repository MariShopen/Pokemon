import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { PokemonCard } from "./components/PokemonCard";
import { Input } from "@/components/ui/input";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

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

export const pokemonFetch = async (searchPok: string | number) => {
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

  const handlePokemonPrevious = async () => {
    let previousPokemonId: number;
    previousPokemonId = pokemon.id - 1;
    if (pokemon.id === 1) {
      previousPokemonId = 1025;
    }
    try {
      let pokemonInfo: PokemonInfo = await pokemonFetch(previousPokemonId);
      setPokemon(pokemonInfo);
      setError(null);
    } catch {
      setError("something went wrong, please try again");
      setPokemon(undefined);
    }
  };

  const handlePokemonNext = async () => {
    let nextPokemonId: number;
    nextPokemonId = pokemon.id + 1;
    if (pokemon.id === 1025) {
      nextPokemonId = 1;
    }
    try {
      let pokemonInfo: PokemonInfo = await pokemonFetch(nextPokemonId);
      setPokemon(pokemonInfo);
      setError(null);
    } catch {
      setError("something went wrong, please try again");
      setPokemon(undefined);
    }
  };

  return (
    <div className="flex min-w-full min-h-full h-screen items-center justify-center flex-col bg-slate-700">
      <div className="flex w-[720px] h-[480px] bg-slate-600 flex-col rounded-xl p-5">
        <div className="flex flex-row justify-center mb-5">
          <Input
            placeholder="Pokemon name"
            onChange={changeHandler}
            className="mr-4"
          ></Input>
          <Button onClick={handlePokemonSearch}>Search</Button>
        </div>
        {Error ? <div className="text-slate-400">{error}</div> : <div></div>}
        {pokemon ? (
          <div className="flex flex-row justify-between">
            <Button
              variant="default"
              size="icon"
              onClick={handlePokemonPrevious}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <PokemonCard pokemonInfo={pokemon} />
            <Button variant="default" size="icon" onClick={handlePokemonNext}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="h-3/4"></div>
        )}
      </div>
    </div>
  );
}
