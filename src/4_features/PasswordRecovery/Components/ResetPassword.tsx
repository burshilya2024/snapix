import { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import Card from '@/6_shared/ui/Card'
import Button from '@/6_shared/ui/ui-button'
import { useToast } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import { useRouter } from 'next/router'

import styles from '@/styles/ResetPassword.module.scss'

import { useResetPasswordMutation, useVerifyTokenMutation } from '../api/PasswordRecovery_Api'
import { IErrorResponse, IResetPasswordForm } from '../types'

export const ResetPasswordComponent: React.FC = () => {
  const toast = useToast()
  const { t } = useTranslation()
  const router = useRouter()

  const { token } = router.query
  const [resetPassword, {}] = useResetPasswordMutation()
  const [verifyToken, {}] = useVerifyTokenMutation()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IResetPasswordForm>({
    mode: 'onBlur',
  })

  const checkTokenIsValid = async (token: string) => {
    try {
      await verifyToken({ token }).unwrap()
    } catch (error) {
      router.push('/forgot-password/resend-email')

      return error
    }
  }

  useEffect(() => {
    if (typeof token === 'string') {
      checkTokenIsValid(token)
    }
  }, [token])

  const onSubmit = async (data: FieldValues) => {
    if (data.newPassword !== data.confirmedPassword) {
      toast({
        description: 'Passwords must match!',
        isClosable: true,
        status: 'warning',
        title: 'Warning!!!',
      })
    } else {
      try {
        if (typeof token === 'string') {
          await checkTokenIsValid(token)
          await resetPassword({ password: data.newPassword, token }).unwrap()
          toast({
            description: `Password successfully changed!`,
            isClosable: true,
            status: 'success',
            title: 'Success!',
          })
          router.push('/LogIn')
        }
      } catch (error) {
        const err = error as IErrorResponse

        toast({
          description: `${JSON.stringify(err.data.errors.token?.message)}`,
          isClosable: true,
          status: 'error',
          title: 'Ooops!',
        })
      }
    }
  }

  return (
    <Card>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.tittle}>{t.passwordRecovery.resetPassword}</div>
        <div>
          <input
            {...register('password', {
              maxLength: {
                message: 'Password must be less than 20 symbols long',
                value: 20,
              },
              minLength: {
                message: 'Password must be at least 10 symbols long',
                value: 10,
              },
              pattern: {
                message:
                  'Password must contain an underscore, at least one letter and at least one capital letter',
                value:
                  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*/,
              },
              required: true,
            })}
            className={styles.inputField}
            placeholder={'New Password'}
            type={'password'}
          />
          <ErrorMessage
            errors={errors}
            name={'password'}
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div>
          <input
            {...register('confirmedPassword', {
              maxLength: {
                message: 'Password must be less than 20 characters long',
                value: 20,
              },
              minLength: {
                message: 'Password must be at least 10 characters long',
                value: 10,
              },
              pattern: {
                message:
                  'Password must contain an underscore, at least one letter and at least one capital letter',
                value:
                  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*/,
              },
              required: true,
            })}
            className={styles.inputField}
            placeholder={'Confirm Password'}
            type={'password'}
          />
          <ErrorMessage
            errors={errors}
            name={'confirmedPassword'}
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div>
          <Button primary type={'submit'}>
            {t.passwordRecovery.createNewPassword}
          </Button>
        </div>
      </form>
    </Card>
  )
}
