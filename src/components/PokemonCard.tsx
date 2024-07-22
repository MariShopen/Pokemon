import { PokemonInfo } from "../App";
export type PokemonCardProps = {
  pokemonInfo?: PokemonInfo;
  onClickNext?: () => unknown;
  onClickPrevious?: () => unknown;
};
export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonInfo }) => {
  let avatar = pokemonInfo?.sprites.front_default;
  let weightKg = pokemonInfo?.weight / 10;
  let heightM = pokemonInfo?.height / 10;
  return (
    <div>
      <div>#{pokemonInfo?.id}</div>
      <div>{pokemonInfo?.name}</div>
      <div>Weight {weightKg} kg</div>
      <div>Height {heightM} m</div>
      {/* <div>{pokemonInfo?.abilities[0]}</div>
      <div>{pokemonInfo?.types}</div>
      <div>{pokemonInfo?.stats}</div> */}
      <div>
        <img src={avatar} alt="" />
      </div>
    </div>
  );
};
