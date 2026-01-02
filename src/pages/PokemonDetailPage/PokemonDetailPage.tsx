import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./PokemonDetailPage.module.css";
import ArrowBack from "../../assets/Icons/arrow_back.svg?react";
import ChevronLeft from "../../assets/Icons/chevron_left.svg?react";
import ChevronRight from "../../assets/Icons/chevron_right.svg?react";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMON_BY_ID, GET_POKEMON_DESCRIPTION, GET_POKEMON_GENERATION } from "../../api/queries";
import type { PokemonDetailResponse } from "../../api/types/pokemon.types";
import PokeballImage from "../../assets/Images/Pokeball_big.svg?react";
import AboutPokemon from "../../components/molecules/AboutPokemon/AboutPokemon";
import ContentLoad from "../ContentLoad/ContentLoad";
import StatItem from "../../components/atoms/StatItem/StatItem";
import Button from "../../components/atoms/Button/Button";
import LoadPage from "../../components/atoms/LoadPage/LoadPage";
import TypeSection from "../../components/atoms/TypeSection/TypeSection";
import { useDescriptionsStore } from "../../store/slices/descriptionsSlice";

interface PokemonDescriptionResponse {
  pokemon_v2_pokemonspecies: Array<{
    name: string;
    pokemon_v2_pokemonspeciesflavortexts: Array<{
      flavor_text: string;
    }>;
  }>;
}

interface PokemonGenerationResponse {
  pokemon_v2_pokemonspecies: Array<{
    id: number;
    generation: {
      name: string;
    };
  }>;
}

const PokemonDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pokemonId = id ? parseInt(id, 10) : 0;
  const { getDescription, setDescription, hasDescription } = useDescriptionsStore();

  const {
    data: pokemonData,
    loading: pokemonLoading,
    error: pokemonError,
  } = useQuery<PokemonDetailResponse>(GET_POKEMON_BY_ID, {
    variables: { id: pokemonId },
    skip: !pokemonId || pokemonId <= 0,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  });

  const pokemon = pokemonData?.pokemon_v2_pokemon?.[0];
  const speciesId = pokemon?.pokemon_species_id;

  // Verificar si ya tenemos la descripción en el store
  const cachedDescription = speciesId ? getDescription(speciesId) : undefined;
  const hasCachedDescription = speciesId ? hasDescription(speciesId) : false;

  const { data: descriptionData, loading: descriptionLoading } =
    useQuery<PokemonDescriptionResponse>(GET_POKEMON_DESCRIPTION, {
      variables: { speciesId },
      skip: !speciesId || hasCachedDescription, // Skip si ya tenemos la descripción en el store
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-first',
    });

  const { data: generationData } =
    useQuery<PokemonGenerationResponse>(GET_POKEMON_GENERATION, {
      variables: { speciesId },
      skip: !speciesId,
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-first',
    });

  // Extraer la descripción de los datos de la query
  const descriptionFromQuery = descriptionData?.pokemon_v2_pokemonspecies?.[0]?.pokemon_v2_pokemonspeciesflavortexts?.[0]?.flavor_text;
  
  // Extraer la generación de los datos de la query
  const generationName = generationData?.pokemon_v2_pokemonspecies?.[0]?.generation?.name;

  // Guardar la descripción en el store cuando se obtiene
  useEffect(() => {
    if (descriptionFromQuery && speciesId) {
      // Solo guardar si no está en caché o si es diferente
      const currentCached = getDescription(speciesId);
      if (!currentCached || currentCached !== descriptionFromQuery) {
        setDescription(speciesId, descriptionFromQuery);
      }
    }
  }, [descriptionFromQuery, speciesId, getDescription, setDescription]);

  // Solo mostrar loading si no tenemos la descripción en caché
  const loading = pokemonLoading || (descriptionLoading && !hasCachedDescription && !descriptionFromQuery);
  const error = pokemonError;

  // Obtener la descripción: primero del store, luego de la query
  // Solo mostrar el mensaje por defecto si realmente no hay datos disponibles
  const flavorText = cachedDescription || descriptionFromQuery || "No hay descripción disponible para este Pokémon.";

  if (loading) {
    return <LoadPage />;
  }

  if (error || !pokemon) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <ContentLoad error={"Pokémon no encontrado"} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`,
      }}
    >
      <div
        className={styles.header}
        style={{
          backgroundColor: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`,
        }}
      >
        <Button
          onClick={() => navigate("/pokedex")}
          variant="primary"
          size="medium"
          disabled={false}
          className={styles.backIcon}
        >
          <ArrowBack />
        </Button>
        <div className={styles.pokemonNameContainer}>
          <h1 className={styles.pokemonName}>{pokemon.name}</h1>
          {generationName && (
            <span className={styles.pokemonGeneration}>
             {generationName.toUpperCase()}
            </span>
          )}
        </div>
        <div className={styles.pokemonNumber}>
          #{String(pokemon.id).padStart(3, "0")}
        </div>
      </div>

      {/* Pokemon Image Section */}
      <div
        className={styles.imageSection}
        style={{
          backgroundColor: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`,
        }}
      >
        <button className={styles.navButton}>
          <ChevronLeft className={styles.navIcon} />
        </button>
        <div className={styles.imageContainer}>
          <PokeballImage className={styles.pokeballBackground} />
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            className={styles.pokemonImage}
          />
        </div>
        <button className={styles.navButton}>
          <ChevronRight className={styles.navIcon} />
        </button>
      </div>


      <div className={styles.contentCard}>
        {/* Type Badges */}
        {pokemon.types.length > 0 && (
          <>
            <TypeSection types={pokemon.types.map((type) => type.type.name)} />
          </>
        )}

        {/* About Section */}
        <AboutPokemon
          weight={pokemon.weight}
          height={pokemon.height}
          abilities={pokemon.abilities.map((ability) => ability.ability.name)}
        />

        {/* Description */}
        <div className={styles.description}>
          <p>{flavorText}</p>
        </div>
        {/* Base Stats Section */}
        <StatItem
          stats={pokemon.stats}
          style={`var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`}
          backgroundColor={`var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`}
          opacity={0.3}
        />
      </div>
    </div>
  );
};

export default PokemonDetailPage;
