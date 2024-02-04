import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useRegisterMutation } from '@/4_features/Registery_Login_User/api/registery_Login_Api'
import Card from '@/6_shared/ui/Card'
import Button from '@/6_shared/ui/ui-button'
import Link from 'next/link'

import styles from '@/styles/LogIn.module.scss'

// !Регистрация работает! statusCode 201. нужно будет сделать красивые уведомления и логику при успешной регистрации.
export const SignUpCompontnts: React.FC<any> = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()
  const [register, { error, isLoading }] = useRegisterMutation()

  const onSubmit = async (data: any) => {
    try {
      if (isLoading) {
        return <div>Loading...</div>
      }

      await register(data)

      // Если успешно зарегистрировались, показываем уведомление
      if (!error) {
        alert('Registration successful!')
      }
    } catch (error) {
      alert(JSON.stringify(error || 'Error during registration'))
      console.error('Registration failed:', error)
    } finally {
      // Сбрасываем форму в любом случае
      reset({ email: '', password: '', username: '' })
    }
  }

  return (
    <Card>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.tittle}>Sign Up</div>
        <div>
          <Controller
            control={control}
            name={'username'}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className={styles.inputField}
                  placeholder={'Username'}
                  type={'text'}
                />
                {errors.username && <p>{`${errors.username.message}`}</p>}
              </>
            )}
            rules={{
              minLength: { message: 'Username must be at least 6 characters', value: 6 },
              required: 'Username is required',
            }}
          />
        </div>
        <div>
          <Controller
            control={control}
            name={'email'}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className={styles.inputField}
                  placeholder={'Email'}
                  type={'email'}
                />
                {errors.email && <p>{`${errors.email.message}`}</p>}
              </>
            )}
            rules={{ required: 'Email is required' }}
          />
        </div>
        <div>
          <Controller
            control={control}
            name={'password'}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className={styles.inputField}
                  placeholder={'Password'}
                  type={'password'}
                />
                {errors.password && <p>{`${errors.password.message}`}</p>}
              </>
            )}
            rules={{
              minLength: { message: 'Password must be at least 6 characters', value: 6 },
              pattern: {
                message: 'Password must contain an uppercase letter and an underscore (_)',
                value: /^(?=.*[A-Z])(?=.*_)/,
              },
              required: 'Password is required',
            }}
          />
        </div>
        <div>Forgot Password?</div>
        <div>
          <Button primary type={'submit'}>
            Sign Up
          </Button>
        </div>
        <div>Уже есть аккаунт?</div>
        <div>
          <Link href={'/LogIn'}>
            <Button outline type={'submit'}>
              Sign In
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}
