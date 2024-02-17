import React, { FormEventHandler, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { IUserData } from '@/4_features/Register_Login_User/types'
import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import Button from '@/6_shared/ui/ui-button'
import { Spinner, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'

import styles from '@/styles/LogIn.module.scss'

export const LoginComponents: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { t } = useTranslation()
  const toast = useToast()

  useEffect(() => {
    if (session?.user?.name) {
      router.push('/MyProfile')
    }
  })

  const {
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    register,
    reset,
  } = useForm<IUserData>({
    mode: 'onBlur',
  })

  const handleSubmitLogin = async (data: IUserData) => {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then(callback => {
      if (callback?.error) {
        toast({
          description: `Invalid email or password`,
          duration: 9000,
          isClosable: true,
          status: 'error',
          title: 'Ooops!',
        })
      }

      if (callback?.ok && !callback?.error) {
        router.push('/MyProfile')
        toast({
          description: `Welcome!`,
          duration: 3000,
          isClosable: true,
          status: 'success',
        })
      }
    })
  }

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit(handleSubmitLogin)}>
        <div>
          <input
            {...register('email', {
              pattern: {
                message: 'Invalid email',
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/,
              },
              required: 'Email is required',
            })}
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
                message: 'Password must contain an uppercase letter and an underscore (_)',
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
        <div>
          <Link href={'/forgot-password'}>{t.signIn_SignUp.forgotPassword}</Link>
        </div>
        <div>
          <Button primary type={'submit'}>
            {t.signIn_SignUp.signIn}
          </Button>
        </div>
        <div> {t.signIn_SignUp.dontHaveAccount}</div>
        <div>
          <Link href={'/SignUp'}>
            <Button outline type={'submit'}>
              {t.signIn_SignUp.signUp}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
