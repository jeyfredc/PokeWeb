import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMON_LIST_BY_ID } from "../../api/queries";
import styles from "./HomePage.module.css";
import Pokeball from "../../assets/Icons/pokeball.svg?react";
import InputSearch from "../../components/atoms/InputSearch/InputSearch";
import IconOrder from "../../components/atoms/IconOrder/IconOrder";
import PokemonCard from "../../components/molecules/PokemonCard";
import LoadPage from "../../components/atoms/LoadPage/LoadPage";
import Menu from "../../components/molecules/Menu/Menu";
import { usePokemonFilterStore } from "../../store/slices/pokemonSlice";
import { useFavoritesStore } from "../../store/slices/favoritesSlice";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { sortOrder, sortDirection, searchQuery } = usePokemonFilterStore();
  const { favorites } = useFavoritesStore();
  
  // Solo hacer la query si no estamos en modo "favorites"
  // En modo favorites, usamos los datos del store directamente
  const { data, loading, error } = useQuery<PokemonListResponse>(GET_POKEMON_LIST_BY_ID, {
    variables: {
      minId: 1,
      maxId: 1000,
    },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    skip: sortOrder === 'favorites', // No hacer query si estamos en modo favorites
  });

  const pokemonList = useMemo(() => {
    let list: PokemonListItem[] = [];
    
    // Si se seleccionó "favorites", usar directamente los datos del store
    if (sortOrder === 'favorites') {
      // Convertir favoritos del store al formato PokemonListItem
      list = favorites.map(fav => ({
        id: fav.id,
        name: fav.name,
        sprites: {
          front_default: fav.image
        }
      }));
    } else {
      // Para otros casos, usar los datos de la query
      list = data?.pokemon_v2_pokemon || [];
    }
    
    // Aplicar búsqueda (por número o nombre)
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      const queryNumber = parseInt(query, 10);
      
      list = list.filter((pokemon) => {
        // Buscar por número (ID)
        if (!isNaN(queryNumber) && pokemon.id === queryNumber) {
          return true;
        }
        // Buscar por nombre (búsqueda parcial, case-insensitive)
        if (pokemon.name.toLowerCase().includes(query)) {
          return true;
        }
        return false;
      });
    }
    
    // Aplicar ordenamiento
    if (sortOrder === 'number') {
      list = [...list].sort((a, b) => {
        return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
      });
    } else if (sortOrder === 'name') {
      list = [...list].sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    // Para favorites, ya están ordenados según se agregaron, pero podemos aplicar ordenamiento también
    else if (sortOrder === 'favorites') {
      if (sortDirection === 'asc') {
        list = [...list].sort((a, b) => a.id - b.id);
      } else {
        list = [...list].sort((a, b) => b.id - a.id);
      }
    }
    
    return list;
  }, [data, sortOrder, sortDirection, favorites, searchQuery]);

  // Solo mostrar loading si no estamos en modo favorites
  if (loading && sortOrder !== 'favorites') {
    return <LoadPage />;
  }
  if (error && sortOrder !== 'favorites') {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${styles.pokeballButton} ${isMenuOpen ? styles.menuActive : ''}`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <Pokeball className={styles.pokeball} />
        </button>
        <h1 className={styles.title}>Pokédex</h1>
      </div>
      <div className={styles.menuWrapper}>
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
      <div className={styles.containerSearch}>
        <InputSearch placeholder="Search" />
        <IconOrder />
      </div>
      <div className={styles.containerPokemonList}>
        {pokemonList.map((pokemon, index) => (
          <PokemonCard 
            key={`${pokemon.id}-${index}`} 
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
