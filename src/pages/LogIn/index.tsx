import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import Button from '@/common/components/Button/Button'
import Card from '@/common/components/Card/Card'

import styles from '@/styles/LogIn.module.scss'

const LogIn: React.FC = () => {
  const {
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    register,
    reset,
  } = useForm()
  const onSubmit = async (data: FieldValues) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    reset()
  }

  return (
    <Card>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.tittle}>Sign In</div>
        <div>
          <input
            {...register('email', { required: 'Email is required' })}
            className={styles.inputField}
            placeholder={'Email'}
            type={'email'}
          />
          {errors.email && <p>{`${errors.email.message}`}</p>}
        </div>
        <div>
          <input
            {...register('password', {
              minLength: {
                message: 'Password must be at least 10 characters',
                value: 10,
              },
              required: 'Password is required',
            })}
            className={styles.inputField}
            placeholder={'Password'}
            type={'password'}
          />
          {errors.password && <p>{`${errors.password.message}`}</p>}
        </div>
        <div>Forgot Password</div>
        <div>
          <Button primary type={'submit'}>
            Sign in
          </Button>
        </div>
        <div> Dont have an account?</div>
        <div>
          <Button outline type={'submit'}>
            Sign up
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default LogIn
