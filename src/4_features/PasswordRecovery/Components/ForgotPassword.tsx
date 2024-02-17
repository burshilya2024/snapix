import { useState } from 'react'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { FieldValues, useForm } from 'react-hook-form'

import Card from '@/6_shared/ui/Card'
import Button from '@/6_shared/ui/ui-button'
import Link from 'next/link'

import styles from '@/styles/ResetPassword.module.scss'

import { usePasswordRecoveryMutation } from '../api/PasswordRecovery_Api'

type IFormInput = {
  email: string
}

export const ForgotPasswordComponents = () => {
  const { handleSubmit, register, reset } = useForm<IFormInput>()
  const [captcha, setCaptcha] = useState<null | string>(null)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/g

  const [passwordRecovery, { error, isLoading }] = usePasswordRecoveryMutation()

  const onSubmit = async (email: FieldValues) => {
    try {
      const res = await passwordRecovery(email)

      if (!error) {
        alert(`We have sent a link to ${email.email}. Follow the link to create new password.`)
      }
    } catch (error) {
      alert(JSON.stringify(error))
      console.error(error)
    } finally {
      reset()
    }
  }

  return (
    <Card>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.tittle}>Forgot Password</div>
        <div>
          <input
            {...register('email', { pattern: emailRegex, required: true })}
            className={styles.inputField}
            placeholder={'Email'}
            type={'email'}
          />
        </div>
        <div>Enter your email and we will send you further instruction</div>
        <div>
          <ReCAPTCHA
            onChange={val => setCaptcha(val)}
            sitekey={'6Lczb20pAAAAAF2H5j-PhmyWrZBkckqqUCR6cxoR'}
          />
        </div>
        <div>
          <Button disabled={!captcha} primary type={'submit'}>
            Send Link
          </Button>
        </div>
        <div>
          <Link href={'/LogIn'}>
            <Button outline type={'submit'}>
              Back to Sign In
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}
