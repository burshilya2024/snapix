import React, { MouseEventHandler, ReactNode } from 'react'

import clsx from 'clsx'

import styles from '@/styles/Button.module.scss'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  fullWidth?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  outline?: boolean
  primary?: boolean
  secondary?: boolean
  text?: boolean
  type?: string
}

const Button = ({
  children,
  disabled = false,
  fullWidth = false,
  onClick,
  outline = false,
  primary = false,
  secondary = false,
  text = false,
  type,
}: ButtonProps) => {
  const buttonClass = clsx(styles.button, {
    [styles.fullWidth]: fullWidth,
    [styles.outline]: outline,
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.text]: text,
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
