import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { GitHubAuthButton } from '@/4_features/GitHubAuthButton/GitHubAuthButton'
import { GoogleButton } from '@/4_features/GoogleAuthButton/GoogleAuthButton'
import { useLoginMutation } from '@/4_features/Registery_Login_User/api/registery_Login_Api'
import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import Card from '@/6_shared/ui/Card'
import Button from '@/6_shared/ui/ui-button'
import EyeOff from '@public/assets/icons/eye-off.svg'
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
        <h1 className={styles.tittle}>{t.SignIn_SignUp.signIn}</h1>
        <div className={styles.icons}>
          <GoogleButton />
          <GitHubAuthButton />
        </div>
        <div className={styles.inputForms}>
          <div className={styles.inputForm}>
            <span className={styles.inputTitle}>Email</span>
            <input
              {...register('email', { required: 'Email is required' })}
              className={styles.inputField}
              placeholder={'Email'}
              type={'email'}
            />
            {errors.email && <p>{`${errors.email.message}`}</p>}
          </div>
          <div className={styles.inputForm}>
            <span className={styles.inputTitle}>Password</span>
            <div className={styles.inputContainer}>
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
              <span className={styles.eye}>
                <EyeOff />
              </span>
            </div>

            {errors.password && <p>{`${errors.password.message}`}</p>}
            <span className={styles.inputTitle}>{t.SignIn_SignUp.forgetPasswotd}</span>
          </div>
        </div>

        <div className={styles.btnSignIn}>
          <Button primary type={'submit'}>
            {t.SignIn_SignUp.signIn}
          </Button>
        </div>
        <div className={styles.infoAccount}> {t.SignIn_SignUp.dontHaveAccount}</div>
        <div className={styles.btnSignUp}>
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
