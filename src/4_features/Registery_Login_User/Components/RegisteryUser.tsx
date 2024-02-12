import React, { useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useRegisterMutation } from '@/4_features/Registery_Login_User/api/registery_Login_Api'
import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import Button from '@/6_shared/ui/ui-button'
import { Spinner } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '@/styles/LogIn.module.scss'

type RegistrationData = FieldValues & {
  email: string
  password: string
  username: string
}

//TODO: компонента готова, можно будет поработать над уведомлениями сделай по макету фигмы и правильное отображение ошибок  при регистрации
export const SignUpCompontnts: React.FC<any> = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()
  // !State

  const [register, { error, isLoading }] = useRegisterMutation()

  const { t } = useTranslation()
  const router = useRouter()
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const registrationData: RegistrationData = {
      email: data.email,
      password: data.password,
      username: data.username,
    }

    try {
      await register(registrationData)
      toast.success('Registration successful! Redirecting to login page...')

      setTimeout(() => {
        router.push('/LogIn')
      }, 5000)
    } catch (e) {
      console.error('Registration error:', e)
      toast.error('An error occurred during registration. Please try again later.')
    }
  }

  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner
            color={'blue.500'}
            emptyColor={'gray.200'}
            size={'xl'}
            speed={'0.65s'}
            thickness={'4px'}
          />
        </div>
      ) : (
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.tittle}>{t.signIn_SignUp.signUp}</div>
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

          <div>
            <Button primary type={'submit'}>
              {t.signIn_SignUp.signUp}
            </Button>
          </div>
          <div>{t.signIn_SignUp.haveAccount}</div>
          <div>
            <Link href={'/LogIn'}>
              <Button outline type={'submit'}>
                {t.signIn_SignUp.signIn}
              </Button>
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
