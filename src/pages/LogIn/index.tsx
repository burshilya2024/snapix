import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'

import styles from '@/styles/LogIn.module.scss'

const LogIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm()
  const onSubmit = async (data: FieldValues) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    reset()
  }
  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div className={styles.tittle}>Sign In</div>
        <div>
          <input
            {...register('email', { required: 'Email is required' })}
            className={styles.inputField}
            placeholder="Email"
            type="email"
          />
          {errors.email && <p>{`${errors.email.message}`}</p>}
        </div>
        <div>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 10,
                message: 'Password must be at least 10 characters',
              },
            })}
            className={styles.inputField}
            placeholder="Password"
            type="password"
          />
          {errors.password && <p>{`${errors.password.message}`}</p>}
        </div>
        <div>Forgot Password</div>
        <div>
          <Button type="submit" primary>
            Sign in
          </Button>
        </div>
        <div> Dont have an account?</div>
        <div>
          <Button type="submit" outline>
            Sign up
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default LogIn
