import React, { FormEventHandler, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import Button from '@/6_shared/ui/ui-button'
import { Spinner, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

import styles from '@/styles/LogIn.module.scss'

export const LoginComponents: React.FC = () => {
  //const { data: session } = useSession()
  const router = useRouter()
  const { t } = useTranslation()
  const toast = useToast()

  // console.log('data session', session)
  // useEffect(() => {
  //   if (session?.user?.name) {
  //     router.push('/MyProfile')
  //   }
  // })

  const {
    formState: { errors, isSubmitting },
    getValues,
    //?если будут ошибки, onSubmit не будет выполнена
    handleSubmit,
    register,
    reset,
  } = useForm()

  const handleSubmitLogin: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    }).then(callback => {
      if (callback?.error) {
        toast({
          description: `${callback.error}`,
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
      <form className={styles.loginForm} onSubmit={handleSubmitLogin}>
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
        <div>{t.signIn_SignUp.forgotPassword}</div>
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
