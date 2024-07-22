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
    let pokemonInfo: PokemonInfo = await pokemonFetch(search);
    setPokemon(pokemonInfo);
  };

  return (
    <div>
      <div>
        <Input placeholder="search pokemon" onChange={changeHandler}></Input>
        <Button onClick={handlePokemonSearch}>Search a pokemon</Button>
      </div>
      <PokemonCard pokemonInfo={pokemon} />
    </div>
  );
}
