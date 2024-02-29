import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useRegisterMutation } from '@/4_features/Authorization/Register_Login_User/api/register_Login_Api' // 0_0
import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import Card from '@/6_shared/ui/Card'
import { MyCustomSpinner } from '@/6_shared/ui/CustomSpinner'
import Button from '@/6_shared/ui/ui-button'
import { useToast } from '@chakra-ui/react'
import Link from 'next/link'

import styles from '@/styles/LogIn.module.scss'

type FormData = {
  email: string
  password: string
  username: string
}
export type SuccessResponse = {
  message: string
}
export type ErrorMessage = {
  data: {
    errors: {
      message: string
    }
  }
}
export const SignUpComponent: React.FC<any> = () => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: 'onBlur',
  })
  const [registerForm, { isError: errorRegistery, isLoading: registerLoading }] =
    useRegisterMutation()
  const { t } = useTranslation()
  const toast = useToast()

  // TODO: Add TS
  const onSubmit: SubmitHandler<any> = async (data: FormData) => {
    await registerForm(data)
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
    <Card>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.tittle}>{t.signIn_SignUp.signUp}</div>
        <div>
          <>
            <input
              {...register('username', {
                minLength: {
                  message: 'мleast 6 characters',
                  value: 6,
                },
                pattern: /^[a-zA-Z]+$/,
                required: 'username is required',
              })}
              className={styles.inputField}
              placeholder={'username'}
              // placeholder={t.signIn_SignUp.username}
              type={'username'}
            />

            {errors.username && <p>{String(errors.username.message) || 'error is name'}</p>}
          </>
        </div>
        <div>
          <input
            {...register('email', { required: 'Email is required' })}
            className={styles.inputField}
            placeholder={'email'}
            //placeholder={t.signIn_SignUp.email}
            type={'email'}
          />
          {errors.email && <p>{`${errors.email.message}`}</p>}
        </div>
        <div>
          <input
            {...register('password', {
              minLength: { message: 'Password must be at least 6 characters', value: 6 },
              pattern: {
                message: t.signIn_SignUp.passwordRequirements,
                value:
                  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{6,20}$/,
              },
              required: 'Password is required',
            })}
            className={styles.inputField}
            placeholder={'password'}
            // placeholder={t.signIn_SignUp.password}
            type={'password'}
          />
          {errors.password && <p>{`${errors.password.message}`}</p>}
        </div>
        <div>
          {registerLoading ? (
            <MyCustomSpinner />
          ) : (
            <input
              className={styles.inputSubmit}
              disabled={!isValid}
              type={'submit'}
              value={t.signIn_SignUp.signUp}
            />
          )}
        </div>

        <div>{t.signIn_SignUp.haveAccount}</div>
        <div>
          <Link href={'/LogIn'}>
            <Button outline>{t.signIn_SignUp.signIn}</Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}
