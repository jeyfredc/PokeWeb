import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMON_LIST_BY_ID } from "../../api/queries";
import styles from "./HomePage.module.css";
import Pokeball from "../../assets/Icons/pokeball.svg?react";
import InputSearch from "../../components/atoms/InputSearch/InputSearch";
import IconOrder from "../../components/atoms/IconOrder/IconOrder";
import PokemonCard from "../../components/molecules/PokemonCard";

interface PokemonListItem {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonListResponse {
  pokemon_v2_pokemon: PokemonListItem[];
}

const HomePage = () => {
  const { data, loading, error } = useQuery<PokemonListResponse>(GET_POKEMON_LIST_BY_ID, {
    variables: {
      minId: 1,
      maxId: 1000,
    },
  });

  const pokemonList = useMemo(() => {
    return data?.pokemon_v2_pokemon || [];
  }, [data]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Pokeball className={styles.pokeball} aria-label="Pokéball" />
        <h1 className={styles.title}>Pokédex</h1>
      </div>
      <div className={styles.containerSearch}>
        <InputSearch placeholder="Search" />
        <IconOrder />
      </div>
      <div className={styles.containerPokemonList}>
        {pokemonList.map((pokemon) => (
          <PokemonCard 
            key={pokemon.id} 
            id={pokemon.id} 
            name={pokemon.name} 
            image={pokemon.sprites.front_default || ''} 
          />
        ))}


      </div>
    </div>
  );
};

export default HomePage;
