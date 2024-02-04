import React, { MouseEventHandler, ReactNode } from 'react'

import clsx from 'clsx'

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
  disabled = false,
  onClick,
  outline = false,
  primary = false,
  secondary = false,
  type,
}: ButtonProps) => {
  const buttonClass = clsx(styles.button, {
    [styles.outline]: outline,
    [styles.primary]: primary,
    [styles.secondary]: secondary,
  })

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
