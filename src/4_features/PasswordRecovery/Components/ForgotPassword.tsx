import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import Card from '@/6_shared/ui/Card'
import Button from '@/6_shared/ui/ui-button'
import { useToast } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import styles from '@/styles/ResetPassword.module.scss'

import { usePasswordRecoveryMutation } from '../api/PasswordRecovery_Api'
import { IErrorResponse, IForgotPasswordForm } from '../types'

export const ForgotPasswordComponent = () => {
  const { t }: any = useTranslation()
  const toast = useToast()
  const session = useSession()
  const router = useRouter()
  const [captcha, setCaptcha] = useState<null | string>(null)

  const [passwordRecovery, {}] = usePasswordRecoveryMutation()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<IForgotPasswordForm>({
    mode: 'onBlur',
  })

  if (session.status === 'authenticated') {
    router.push('/MyProfile')
  }

  const onSubmit = async (email: IForgotPasswordForm) => {
    try {
      await passwordRecovery(email).unwrap()
      toast({
        description: `We have sent a link to ${email.email}. Follow the link to create new password.`,
        duration: 9000,
        isClosable: true,
        status: 'success',
        title: 'Successfully sent!',
      })
      localStorage.setItem('forgot_password_email', JSON.stringify(email))
    } catch (error) {
      const err = error as IErrorResponse

      toast({
        description: `${JSON.stringify(err.data.errors.email?.message)}`,
        duration: 9000,
        isClosable: true,
        status: 'error',
        title: 'Ooops!',
      })
    } finally {
      reset()
    }
  }

  return (
    <Card>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.tittle}>{t.passwordRecovery.passwordRecovery}</div>
        <div>
          <input
            {...register('email', {
              pattern: {
                message: 'Must be a valid email',
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/g,
              },
              required: 'Please enter Your email adress',
            })}
            className={styles.inputField}
            placeholder={'Email'}
            type={'email'}
          />
          <ErrorMessage errors={errors} name={'email'} render={({ message }) => <p>{message}</p>} />
        </div>
        <div>{t.passwordRecovery.instructions}</div>
        <div>
          <ReCAPTCHA
            onChange={val => setCaptcha(val)}
            sitekey={'6Lczb20pAAAAAF2H5j-PhmyWrZBkckqqUCR6cxoR'}
          />
        </div>
        <div>
          <Button disabled={!captcha} primary type={'submit'}>
            {t.passwordRecovery.sendLink}
          </Button>
        </div>
        <div>
          <Link href={'/LogIn'}>
            <Button outline type={'submit'}>
              {t.passwordRecovery.backToSignIn}
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}
