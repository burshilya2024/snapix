import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import Card from '@/6_shared/ui/Card'
import Button from '@/6_shared/ui/ui-button'
import { useToast } from '@chakra-ui/react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage } from '@hookform/error-message'
import { useRouter } from 'next/router'

import styles from '@/styles/ResetPassword.module.scss'

import { useResetPasswordMutation, useVerifyTokenMutation } from '../api/PasswordRecovery_Api'
import { IErrorResponse, IResetPasswordForm } from '../types'

export const ResetPasswordComponent: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
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
    if (data.password !== data.confirmedPassword) {
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
          await resetPassword({ password: data.password, token }).unwrap()
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
          <div className={styles.inputGroup}>
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
                    'Password must contain an underscore, at least one digit, one letter and at least one capital letter',
                  value:
                    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*/,
                },
                required: 'Field is required',
              })}
              className={styles.inputField}
              placeholder={'New Password'}
              type={passwordVisible ? 'text' : 'password'}
            />
            <span
              onClick={() => {
                setPasswordVisible(prev => !prev)
              }}
              title={'show password'}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>
          <ErrorMessage
            errors={errors}
            name={'password'}
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div>
          <div className={styles.inputGroup}>
            <input
              {...register('confirmedPassword', {
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
                    'Password must contain an underscore, at least one digit, one letter and at least one capital letter',
                  value:
                    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*/,
                },
                required: 'Field is required',
              })}
              className={styles.inputField}
              placeholder={'Confirm Password'}
              type={passwordVisible ? 'text' : 'password'}
            />
            <span
              onClick={() => {
                setPasswordVisible(prev => !prev)
              }}
              title={'show password'}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>
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
