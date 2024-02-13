import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRegisterMutation } from '@/4_features/Registery_Login_User/api/registery_Login_Api'
import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import Card from '@/6_shared/ui/Card'
import Button from '@/6_shared/ui/ui-button'
import { Spinner, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import styles from '@/styles/LogIn.module.scss'

export const SignUpComponent: React.FC<any> = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()
  const [register] = useRegisterMutation()
  const { t } = useTranslation()
  const toast = useToast()

  // TODO: Add TS
  const onSubmit = async (data: any) => {
    await register(data)
      .unwrap()
      .then((res: any) => {
        toast({
          description: res.message || 'успешно!',
          duration: 9000,
          isClosable: true,
          status: 'success',
          title: 'Successful!',
        })
      })
      .catch((error: any) => {
        toast({
          description: `${error?.data?.errors?.username?.message}`,
          duration: 9000,
          isClosable: true,
          status: 'error',
          title: 'Ooops!',
        })
      })
      .finally(() => {
        reset({ email: '', password: '', username: '' })
      })
  }

  return (
    <Card>
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
              pattern: {
                message: 'Username must be one word without spaces',
                value: /^[a-zA-Zа]+$/,
              },
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

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {isSubmitting ? (
            <div style={{ height: '2px', width: '2px' }}>
              {isSubmitting && (
                <Spinner
                  color={'blue.500'}
                  emptyColor={'gray.200'}
                  size={'lg'}
                  speed={'0.65s'}
                  thickness={'4px'}
                />
              )}
            </div>
          ) : (
            <Button primary type={'submit'}>
              {t.signIn_SignUp.signUp}
            </Button>
          )}
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
    </Card>
  )
}
