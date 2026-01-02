import styles from './AaboutSkillItem.module.css'

interface AboutSkillItemProps {
    icon?: React.ReactNode
    value: string
    label: string
}

const AboutSkillItem = ({ icon, value, label }: AboutSkillItemProps) => {
  const hasNoIcon = !icon;
  return (
    <div className={`${styles.aboutSkillItem} ${hasNoIcon ? styles.aboutSkillItemNoIcon : ''}`}>
        {icon && (
          <div className={styles.aboutSkillItemIcon}>
            {icon}
          </div>
        )}
        <div className={styles.aboutSkillItemValue}>{value}</div>
        <div className={styles.aboutSkillItemLabel}>{label}</div>
    </div>
  )
}

export default AboutSkillItem