import styles from './StatItem.module.css'
import type { PokemonStat } from '../../../api/types/pokemon.types'


interface StatItemProps {
  stats: PokemonStat[]
  style?: string
  backgroundColor?: string
  opacity?: number
}
const StatItem = ({ stats, style, opacity = 0.3 }: StatItemProps) => {
  return (
    <div className={styles.statsSection}>
    <h2
      className={styles.sectionTitle}
      style={{
        color: style,
      }}
    >
      Base Stats
    </h2>
    <div className={styles.statsList}>
      {stats.map((stat) => {
        const maxStat = 255;
        const percentage = Math.min(
          (stat.base_stat / maxStat) * 100,
          100
        );

        return (
          <div className={styles.statItem} key={stat.stat.name}>
            <div
              className={styles.statLabel}
              style={{
                color: style,
              }}
            >
              {stat.stat.name}
            </div>
            <div className={styles.statValue}>0{stat.base_stat}</div>
            <div className={styles.statBar}>
              <div
                className={styles.statBarBackground}
                style={{
                  backgroundColor: style,
                  opacity: opacity,
                }}
              ></div>
              <div
                className={styles.statBarFill}
                style={{ 
                  width: `${percentage}%`, 
                  backgroundColor: style, 
                  opacity: 1 
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>  
  </div>
  )
}

export default StatItem