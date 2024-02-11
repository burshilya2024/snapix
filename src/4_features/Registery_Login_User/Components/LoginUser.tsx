import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { GoogleButton } from '@/4_features/GoogleAuthButton/GoogleAuthButton'
import { useLoginMutation } from '@/4_features/Registery_Login_User/api/registery_Login_Api'
import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import Card from '@/6_shared/ui/Card'
import Button from '@/6_shared/ui/ui-button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import styles from '@/styles/LogIn.module.scss'

// ! Доработаю!!! еще не работает как нужно! Авторизация через гугл тестовая, и в будушем изменится
// ! на Swagger No parameters, не знаю что и как отправлять.
export const LoginComponents: React.FC = () => {
  const session = useSession()
  const router = useRouter()
  const { t } = useTranslation()

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
  const [login, { error, isLoading }] = useLoginMutation()
  const onSubmit = async (data: FieldValues) => {
    try {
      if (isLoading) {
        return <div>Loading...</div>
      }

      //! Отправляем данные на сервер
      await login(data)

      if (!error) {
        alert('Login successful!')
      }
    } catch (error) {
      alert(JSON.stringify(error || 'Error during login'))
      console.error('Login failed:', error)
    } finally {
      // Очищаем форму
      reset()
    }
  }

  return (
    <Card>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.tittle}>{t.SignIn_SignUp.signIn}</div>
        <GoogleButton />
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
        <div><Link href={'/ForgotPassword'}>{t.SignIn_SignUp.forgetPasswotd}</Link></div>
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
    </Card>
  )
}
