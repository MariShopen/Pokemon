import { PokemonInfo } from "../App";
export type PokemonCardProps = {
  pokemonInfo?: PokemonInfo;
};
export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonInfo }) => {
  const avatar = pokemonInfo?.sprites.other["official-artwork"].front_default;
  const weightKg = pokemonInfo?.weight / 10;
  const heightM = pokemonInfo?.height / 10;
  return (
    <div className="pokemon_info flex flex-col items-center text-slate-400  mb-5">
      <div data-testid="pokemonID">#{pokemonInfo?.id}</div>
      <div>{pokemonInfo?.name}</div>
      <div>Weight {weightKg} kg</div>
      <div>Height {heightM} m</div>
      <div className="mt-5">
        <img
          className="h-[250px] w-[250px]"
          src={avatar}
          alt="pokemon image"
          data-testid="pokemonImg"
        />
      </div>
    </div>
  );
};
