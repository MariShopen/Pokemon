import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { PokemonCard } from "./components/PokemonCard";
import { Input } from "@/components/ui/input";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Fuse from "fuse.js";
import { pokemonList } from "./components/pokemonList_ad";
import { pokemonList1 } from "src/components/pokemonList";

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

type SearchSimilarInfo = {
  item: string[];
  refIndex: number;
  score?: number;
};

export const pokemonFetch = async (searchPok: string | number) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchPok}`,
  );
  const jsonData = await response.json();
  return jsonData;
};

export function App() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<PokemonInfo | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [searchSimilar, setSearchSimilar] = useState<SearchSimilarInfo[]>();

  const searchFilter = () => {
    const options = {
      includeScore: true,
      keys: ["0"],
    };
    const fuse = new Fuse(pokemonList, options);
    const result = fuse.search(search);
    return result;
  };

  useEffect(() => {
    setSearchSimilar(searchFilter());
  }, [search]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    handlePokemonSearch(search);
  };

  const handlePokemonSearch = async (search: string) => {
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-row justify-center mb-3"
        >
          <Input
            placeholder="Pokemon name"
            value={search}
            onChange={changeHandler}
            className="mr-4"
            data-testid="input"
          ></Input>
          <Button type="submit" data-testid="button">
            Search
          </Button>
        </form>
        <div className="flex flex-row">
          <Button
            onClick={() => {
              setSearch(searchSimilar?.[0]?.item?.[0]);
              handlePokemonSearch(searchSimilar?.[0]?.item?.[0]);
            }}
            data-testid="hitButton"
            variant="ghost"
            className="mb-3"
          >
            {searchSimilar?.[0]?.item?.[0]}
          </Button>
          <Button
            onClick={() => {
              setSearch(searchSimilar?.[1]?.item?.[0]);
              handlePokemonSearch(searchSimilar?.[1]?.item?.[0]);
            }}
            variant="ghost"
            className="mb-3"
          >
            {searchSimilar?.[1]?.item?.[0]}
          </Button>
          <Button
            onClick={() => {
              setSearch(searchSimilar?.[2]?.item?.[0]);
              handlePokemonSearch(searchSimilar?.[2]?.item?.[0]);
            }}
            variant="ghost"
            className="mb-3"
          >
            {searchSimilar?.[2]?.item?.[0]}
          </Button>
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
