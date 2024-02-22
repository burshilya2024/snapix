import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IUserData } from '@/4_features/Register_Login_User/types'
import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import { MyCustomSpinner } from '@/6_shared/ui/CustomSpinner'
import Button from '@/6_shared/ui/ui-button'
import { Spinner, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '@/styles/LogIn.module.scss'

import { useLoginMutation } from '../api/register_Login_Api'
import { ErrorMessage, SuccessResponse } from './RegisterUser'

export const LoginComponents: React.FC = () => {
  const [SuccessLogin, setSuccessLogin] = useState<boolean>(false)
  const router = useRouter()
  const { t } = useTranslation()
  const toast = useToast()
  const [Login, { isLoading: isLoadingLogin }] = useLoginMutation()
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<IUserData>({
    mode: 'onBlur',
  })

  const handleSubmitLogin: SubmitHandler<any> = async (data: FormData) => {
    await Login(data)
      .unwrap()
      .then((res: SuccessResponse) => {
        toast({
          description: res.message || 'successful registration',
          duration: 9000,
          isClosable: true,
          status: 'success',
          title: 'Successful!',
        })
        reset() // Сброс формы после успешной регистрации
        router.push('/MyProfile')
        setSuccessLogin(true)
      })
      .catch((error: ErrorMessage) => {
        const errorMessage = error?.data.errors.message

        toast({
          description: errorMessage,
          duration: 9000,
          isClosable: true,
          status: 'error',
          title: 'Ooops!',
        })
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
          {isLoadingLogin ? (
            <MyCustomSpinner />
          ) : (
            <Button disabled={!isValid} primary type={'submit'}>
              {t.signIn_SignUp.signIn}
            </Button>
          )}
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
