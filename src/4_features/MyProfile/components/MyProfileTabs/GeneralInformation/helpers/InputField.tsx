// InputField.tsx
import React from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'

import { Input } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'

import styles from '@/styles/MyProfile.module.scss'
interface InputFieldProps {
  label: string
  name: string
  rules?: RegisterOptions
  type?: string
}

export const InputField: React.FC<InputFieldProps> = ({ label, name, rules, type = 'text' }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext()

  return (
    <div className={styles.InputGroup}>
      <label htmlFor={name}>{label}</label>
      <Input size={'sm'} {...register(name, rules)} id={name} type={type} />
      <ErrorMessage errors={errors} name={name} render={({ message }) => <p>{message}</p>} />
    </div>
  )
}
