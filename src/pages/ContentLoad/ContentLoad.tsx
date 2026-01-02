
import styles from "./ContentLoad.module.css";
import ArrowBack from "../../assets/Icons/arrow_back.svg?react";
import ChevronLeft from "../../assets/Icons/chevron_left.svg?react";
import ChevronRight from "../../assets/Icons/chevron_right.svg?react";
import Weight from "../../assets/Icons/weight.svg?react";
import Straighten from "../../assets/Icons/straighten.svg?react";
import PokeballImage from "../../assets/Images/Pokeball_big.svg?react";
import UnknownPokemon from "../../assets/Images/unknown-pokemon.png";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button/Button";


const ContentLoad = ({ error }: { error: string }) => {
  
  const navigate = useNavigate(); 
  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        style={{
          backgroundColor: `var(--color-pokemon-bug)`,
        }}
      >
        <Button onClick={() => navigate("/pokedex")} variant="primary" size="medium" disabled={false} className={styles.backIcon}>
          <ArrowBack />
        </Button>
        <h1 className={styles.pokemonName}>Pokemon</h1>
        <div className={styles.pokemonNumber}>#001</div>
      </div>
      <div className={styles.error} style={{ color: "var(--color-primary)"  }}>{error}</div>

      {/* Pokemon Image Section */}
      <div
        className={styles.imageSection}
        style={{
          backgroundColor: `var(--color-pokemon-bug)`,
        }}
      >
        <button className={styles.navButton}>
          <ChevronLeft className={styles.navIcon} />
        </button>
        <div className={styles.imageContainer}>
          <PokeballImage className={styles.pokeballBackground} />
          <img
            src={UnknownPokemon}
            alt="Pokemon"
            className={styles.pokemonImage}
          />
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
                <div className={styles.aboutLabel}>Moves</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className={styles.description}>
          <p>"No hay descripción disponible para este Pokémon."</p>
        </div>

        {/* Base Stats Section */}
        <div className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>Base Stats</h2>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>HP</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div
                  className={styles.statBarFill}
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>ATK</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div
                  className={styles.statBarFill}
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>DEF</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div
                  className={styles.statBarFill}
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>SATK</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div
                  className={styles.statBarFill}
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>SDEF</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div
                  className={styles.statBarFill}
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>SPD</div>
              <div className={styles.statValue}>999</div>
              <div className={styles.statBar}>
                <div
                  className={styles.statBarFill}
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLoad;
