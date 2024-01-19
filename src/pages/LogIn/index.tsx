import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { GoogleButton } from '@/common/GoogleAuthButton/GoogleAuthButton'
import Button from '@/common/components/Button/Button'
import Card from '@/common/components/Card/Card'
import { useLoginMutation } from '@/features/auth/api/userApi'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import styles from '@/styles/LogIn.module.scss'

// ! Доработаю!!! еще не работает как нужно! Авторизация через гугл тестовая, и в будуем измениться
// ! на Swagger No parameters, не знаю что и как отправлять.
const LogIn: React.FC = () => {
  const session = useSession()
  const router = useRouter()

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
        <div className={styles.tittle}>Sign In</div>
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
        <div>Forgot Password?</div>
        <div>
          <Button primary type={'submit'}>
            Sign in
          </Button>
        </div>
        <div> Dont have an account?</div>
        <div>
          <Link href={'/SignUp'}>
            <Button outline type={'submit'}>
              Sign up
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}

export default LogIn
