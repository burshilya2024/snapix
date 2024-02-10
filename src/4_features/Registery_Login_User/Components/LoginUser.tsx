import React, { FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import Button from '@/6_shared/ui/ui-button'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'

import styles from '@/styles/LogIn.module.scss'

import { useLoginMutation, useRefreshMutation } from '../api/registery_Login_Api'

export const LoginComponents: React.FC = () => {
  const session = useSession()
  const router = useRouter()
  const { t } = useTranslation()
  // !рабочий логин к серверу.(но есть нюансы, надо работать)
  const [loginMutation, { error, isError, isLoading }] = useLoginMutation()

  if (session.data) {
    router.push('/MyProfile')
  }
  const {
    formState: { errors, isSubmitting },
    getValues,
    //?если будут ошибки, onSubmit не будет выполнена
    handleSubmit,
    register,
    reset,
  } = useForm()
  // Тестовый вход по логину и паролю
  const handleSubmitLogin: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    if (res && !res.error) {
      router.push('/profile')
    } else {
      console.log(res)
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmitLogin}>
      <div className={styles.tittle}>{t.SignIn_SignUp.signIn}</div>
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
              message: 'Password must be at least 6 characters заглавная буква и нижнее тире',
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
      <div>{t.SignIn_SignUp.forgetPasswotd}</div>
      <div>
        <Button primary type={'submit'}>
          {t.SignIn_SignUp.signIn}
        </Button>
      </div>
      <div> {t.SignIn_SignUp.dontHaveAccount}</div>
      <div>
        <Link href={'/SignUp'}>
          <Button outline type={'submit'}>
            {t.SignIn_SignUp.signUp}
          </Button>
        </Link>
      </div>
    </form>
  )
}
