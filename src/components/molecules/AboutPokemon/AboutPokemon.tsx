import styles from './AboutPokemon.module.css'
import Weight from '../../../assets/Icons/weight.svg?react'
import Straighten from '../../../assets/Icons/straighten.svg?react'
import AboutSkillItem from '../../atoms/AboutSkillItem/AboutSkillItem'

interface AboutPokemonProps {
  weight: number
  height: number
  abilities: string[]
}


const AboutPokemon = ({ weight, height, abilities }: AboutPokemonProps) => {
  return (
    <div className={styles.aboutSection}>
    <h2 className={styles.sectionTitle}>About</h2>
    <div className={styles.aboutGrid}>
      <AboutSkillItem icon={<Weight />} value={weight.toString()} label="Weight" />
      <AboutSkillItem icon={<Straighten />} value={height.toString()} label="Height" />
      {abilities.length > 0 && (
        <AboutSkillItem value={abilities.join(', ')} label="Moves" />
      )}
      
    </div>
  </div>
  )
}

export default AboutPokemon