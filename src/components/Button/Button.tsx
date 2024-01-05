import React, { MouseEventHandler, ReactNode } from 'react'
import styles from '@/styles/Button.module.scss'

interface ButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  outline?: boolean
  primary?: boolean
  secondary?: boolean
}
const Button = ({ children, onClick, outline, primary, secondary }: ButtonProps) => {
  let buttonClass = styles.button

  if (primary) {
    buttonClass += ` ${styles.primary}`
  } else if (outline) {
    buttonClass += ` ${styles.outline}`
  } else if (secondary) {
    buttonClass += ` ${styles.secondary}`
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
