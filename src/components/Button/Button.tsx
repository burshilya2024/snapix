import React, { MouseEventHandler, ReactNode } from 'react'

import styles from '@/styles/Button.module.scss'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  outline?: boolean
  primary?: boolean
  secondary?: boolean
  type?: string
}
const Button = ({
  children,
  disabled,
  onClick,
  outline,
  primary,
  secondary,
  type,
}: ButtonProps) => {
  let buttonClass = styles.button

  if (primary) {
    buttonClass += ` ${styles.primary}`
  } else if (outline) {
    buttonClass += ` ${styles.outline}`
  } else if (secondary) {
    buttonClass += ` ${styles.secondary}`
  }

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      type={type ? 'submit' : 'button'}
    >
      {children}
    </button>
  )
}

export default Button
