import styles from './TypeSection.module.css';


const TypeSection = ({ types }: { types: string[] }) => {
    return (    
        <div className={styles.typeSection}>
            {types.map((type, index) => (
                <div 
                    key={`${type}-${index}`}
                    className={styles.typeBadge} 
                    style={{ backgroundColor: `var(--color-pokemon-${type.toLowerCase()})` }}
                >
                    {type}
                </div>
            ))}
        </div>
    )
}

export default TypeSection;