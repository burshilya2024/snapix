import { FormEvent, ReactNode } from 'react'

import styles from '@/styles/Form.module.scss'

interface FormProps {
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}
const Form = ({ children }: FormProps) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>{children}</div>
    </div>
  )
}

export default Form
