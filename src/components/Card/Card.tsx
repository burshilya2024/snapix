import { ReactNode } from 'react'

import styles from '@/styles/Card.module.scss'

interface CardProps {
  children: ReactNode
}
const Card = ({ children }: CardProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>{children}</div>
    </div>
  )
}

export default Card
