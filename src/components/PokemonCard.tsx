import { PokemonInfo } from "../App";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
export type PokemonCardProps = {
  pokemonInfo?: PokemonInfo;
  onClickNext?: () => unknown;
  onClickPrevious?: () => unknown;
};
export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonInfo }) => {
  let avatar = pokemonInfo?.sprites.other["official-artwork"].front_default;
  let weightKg = pokemonInfo?.weight / 10;
  let heightM = pokemonInfo?.height / 10;
  return (
    <div className="text-slate-400 flex justify-between mb-5">
      <div className="previous flex">
        <Button variant="default" size="icon">
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="pokemon_info flex flex-col items-center">
        <div>#{pokemonInfo?.id}</div>
        <div>{pokemonInfo?.name}</div>
        <div>Weight {weightKg} kg</div>
        <div>Height {heightM} m</div>
        <div>
          <img className="h-[250px] w-[250px]" src={avatar} alt="" />
        </div>
      </div>
      <div className="next flex">
        <Button variant="default" size="icon">
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
