import React, { useState } from 'react'

import Button from '@/components/Button/Button'
import Form from '@/components/Form/Form'

import styles from '@/styles/LogIn.module.scss'

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Form onSubmit={handleLogin}>
      <div className={styles.tittle}>Sign In</div>
      <div className={styles.inputGroup}>
        <input
          className={styles.inputField}
          onChange={e => setEmail(e.target.value)}
          placeholder={'Email'}
          required
          type={'email'}
          value={email}
        />
      </div>
      <div className={styles.inputGroup}>
        <input
          className={styles.inputField}
          onChange={e => setPassword(e.target.value)}
          placeholder={'Password'}
          required
          type={'password'}
          value={password}
        />
        {/*TODO: make "input" be an single component*/}
      </div>
      <div>Forgot Password</div>
      <Button outline>Sign in</Button>
      <div> Dont have an account?</div>
      <Button outline>Sign up</Button>
    </Form>
  )
}

export default LogIn
