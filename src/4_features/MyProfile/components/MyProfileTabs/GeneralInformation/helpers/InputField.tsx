// InputField.tsx
import React from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'

import { Input } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'

import styles from '@/styles/MyProfile.module.scss'
interface InputFieldProps {
  defaultValue?: any
  label: string
  name: string
  rules?: any
  type?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  defaultValue,
  label,
  name,
  rules,
  type = 'text',
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext()

  return (
    <div className={styles.InputGroup}>
      <label htmlFor={name}>{label}</label>
      <Input
        size={'sm'}
        {...register(name, rules)}
        defaultValue={defaultValue}
        id={name}
        type={type}
      />
      <ErrorMessage errors={errors} name={name} render={({ message }) => <p>{message}</p>} />
    </div>
  )
}
