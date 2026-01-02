import { useNavigate, useParams } from "react-router-dom";
import styles from "./PokemonDetailPage.module.css";
import ArrowBack from "../../assets/Icons/arrow_back.svg?react";
import ChevronLeft from "../../assets/Icons/chevron_left.svg?react";
import ChevronRight from "../../assets/Icons/chevron_right.svg?react";
import Weight from "../../assets/Icons/weight.svg?react";
import Straighten from "../../assets/Icons/straighten.svg?react";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMON_BY_ID, GET_POKEMON_DESCRIPTION } from "../../api/queries";
import type { PokemonDetailResponse } from "../../api/types/pokemon.types";
import UnknownPokemon from "../../assets/Images/unknown-pokemon.png";
import PokeballImage from "../../assets/Images/Pokeball_big.svg?react";

interface PokemonDescriptionResponse {
  pokemon_v2_pokemonspecies: Array<{
    name: string;
    pokemon_v2_pokemonspeciesflavortexts: Array<{
      flavor_text: string;
    }>;
  }>;
}

const PokemonDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pokemonId = id ? parseInt(id, 10) : 0;

  const { data: pokemonData, loading: pokemonLoading, error: pokemonError } = useQuery<PokemonDetailResponse>(
    GET_POKEMON_BY_ID,
    {
      variables: { id: pokemonId },
      skip: !pokemonId || pokemonId <= 0,
    }
  );

  const pokemon = pokemonData?.pokemon_v2_pokemon?.[0];
  const speciesId = pokemon?.pokemon_species_id;

  const { data: descriptionData, loading: descriptionLoading } = useQuery<PokemonDescriptionResponse>(
    GET_POKEMON_DESCRIPTION,
    {
      variables: { speciesId },
      skip: !speciesId,
    }
  );

  const description =
    descriptionData?.pokemon_v2_pokemonspecies?.[0]?.pokemon_v2_pokemonspeciesflavortexts?.[0]?.flavor_text || "";


/*     useEffect(() => {
      if(pokemonData?.pokemon_v2_pokemon[0].id)
        setCurrentPokemonIndex(pokemonData.pokemon_v2_pokemon);
    }, [pokemonData]); */

    
  // Limpiar la descripción de caracteres especiales
  const cleanDescription = description
    .replace(/\f/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const loading = pokemonLoading || descriptionLoading;
  const error = pokemonError;
  const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`;

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Cargando...</div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error ? `Error: ${error.message}` : "Pokémon no encontrado"}
        </div>
        <button onClick={() => navigate("/pokedex")} className={styles.backButton}>
          Volver
        </button>
      </div>
    );
  }

  return (
    
    <div 
      className={styles.container}
      style={{
        backgroundColor: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`
      }}
    >
        {
          !pokemonData?.pokemon_v2_pokemon[0].id ? (
            <>
                  <div 
                    className={styles.header}
                    style={{
                      backgroundColor: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`
                    }}
                  >
        <button onClick={() => navigate("/pokedex")} className={styles.backButton}>
          <ArrowBack className={styles.backIcon} />
        </button>
        <h1 className={styles.pokemonName}>{pokemon.name}</h1>
        <div className={styles.pokemonNumber}>#{String(pokemon.id).padStart(3, "0")}</div>
      </div>

      {/* Pokemon Image Section */}
      <div 
        className={styles.imageSection}
        style={{
          backgroundColor: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`
        }}
      >
        <button className={styles.navButton}>
          <ChevronLeft className={styles.navIcon} />
        </button>
        <div className={styles.imageContainer}>
          <PokeballImage className={styles.pokeballBackground} />
          <img src={urlImage ? urlImage : UnknownPokemon} alt={pokemon.name} className={styles.pokemonImage} />
        </div>
        <button className={styles.navButton}>
          <ChevronRight className={styles.navIcon} />
        </button>
      </div>

      {/* Content Card */}
      <div className={styles.contentCard}>
        {/* Type Badges */}
        <div className={styles.typesSection}>
          <span className={styles.typeBadge}>Type</span>
          <span className={styles.typeBadge}>Type</span>
        </div>

        {/* About Section */}
        <div className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutItem}>
              <div className={styles.aboutIcon}>
                <Weight />
              </div>
              <div className={styles.aboutValue}>9,9 kg</div>
              <div className={styles.aboutLabel}>Weight</div>
            </div>
            <div className={styles.aboutItem}>
              <div className={styles.aboutIcon}>
                <Straighten />
              </div>
              <div className={styles.aboutValue}>9,9 m</div>
              <div className={styles.aboutLabel}>Height</div>
            </div>
            <div className={styles.aboutItem}>
              <div className={styles.abilitiesList}>
                <div className={styles.abilityItem}>Ability 1</div>
                <div className={styles.abilityItem}>Ability 2</div>
                <div className={styles.abilityItem}>Moves</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className={styles.description}>
          <p>
            {cleanDescription || "No hay descripción disponible para este Pokémon."}
          </p>
        </div>

        {/* Base Stats Section */}
        <div className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>Base Stats</h2>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>HP</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div className={styles.statBarFill} style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>ATK</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div className={styles.statBarFill} style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>DEF</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div className={styles.statBarFill} style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>SATK</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div className={styles.statBarFill} style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>SDEF</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div className={styles.statBarFill} style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>SPD</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div className={styles.statBarFill} style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
            
            </>
          ) : (
            <>
                  <div 
                    className={styles.header}
                    style={{
                      backgroundColor: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`
                    }}
                  >
        <button onClick={() => navigate("/pokedex")} className={styles.backButton}>
          <ArrowBack className={styles.backIcon} />
        </button>
        <h1 className={styles.pokemonName}>{pokemon.name}</h1>
        <div className={styles.pokemonNumber}>#{String(pokemon.id).padStart(3, "0")}</div>
      </div>

      {/* Pokemon Image Section */}
      <div 
        className={styles.imageSection}
        style={{
          backgroundColor: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`
        }}
      >
        <button className={styles.navButton}>
          <ChevronLeft className={styles.navIcon} />
        </button>
        <div className={styles.imageContainer}>
          <PokeballImage className={styles.pokeballBackground} />
          <img src={  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} className={styles.pokemonImage} />
        </div>
        <button className={styles.navButton}>
          <ChevronRight className={styles.navIcon} />
        </button>
      </div>

      {/* Content Card */}
      <div className={styles.contentCard}>
        {/* Type Badges */}
        <div className={styles.typesSection}>
          {
            pokemon.types.map((type) => (

              <span className={styles.typeBadge} style={{ backgroundColor: `var(--color-pokemon-${type.type.name.toLowerCase()})` }}>{type.type.name}</span>
            ))
          }

        </div>

        {/* About Section */}
        <div className={styles.aboutSection}>
          <h2 className={styles.sectionTitle} style={{ color: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})` }}>About</h2>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutItem}>
              <div className={styles.aboutIcon}>
                <Weight />
              </div>
              <div className={styles.aboutValue}>{pokemon.weight} kg</div>
              <div className={styles.aboutLabel}>Weight</div>
            </div>
            <div className={styles.aboutItem}>
              <div className={styles.aboutIcon}>
                <Straighten />
              </div>
              <div className={styles.aboutValue}>{pokemon.height / 10} m</div>
              <div className={styles.aboutLabel}>Height</div>
            </div>
            <div className={styles.aboutItem}>
              <div className={styles.abilitiesList} >
                {
                  pokemon.abilities.map((ability) => (
                    <div className={styles.abilityItem}>{ability.ability.name}</div>
                  ))
                }
                <div className={styles.aboutLabel}>Moves</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className={styles.description}>
          <p>
            {descriptionData?.pokemon_v2_pokemonspecies?.[0]?.pokemon_v2_pokemonspeciesflavortexts?.[0]?.flavor_text || "No hay descripción disponible para este Pokémon."}
          </p>
        </div>
        {/* Base Stats Section */}
        <div className={styles.statsSection}>
          <h2 className={styles.sectionTitle} style={{ color: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})` }}>Base Stats</h2>
          <div className={styles.statsList}>
              {pokemon.stats.map((stat) => {
                // Calcular el porcentaje basado en el máximo de stats (255 es el máximo en Pokémon)
                const maxStat = 255;
                const percentage = Math.min((stat.base_stat / maxStat) * 100, 100);
                
                return (
                  <div className={styles.statItem} key={stat.stat.name}>
                    <div className={styles.statLabel} style={{ color: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})` }}>{stat.stat.name}</div>
                    <div className={styles.statValue}>0{stat.base_stat}</div>
                    <div className={styles.statBar}>
                      <div 
                        className={styles.statBarBackground}
                        style={{
                          backgroundColor: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`,
                          opacity: 0.3
                        }}
                      ></div>
                      <div 
                        className={styles.statBarFill} 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: `var(--color-pokemon-${pokemon.types[0].type.name.toLowerCase()})`,
                          opacity: 1
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            
          </div>
        </div>
      </div>
            
            </>
          )
        }

    </div>
  );
};

export default PokemonDetailPage;
