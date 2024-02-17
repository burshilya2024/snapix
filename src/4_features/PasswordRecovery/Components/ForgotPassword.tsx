import { FieldValues, useForm } from "react-hook-form";
import Card from "@/6_shared/ui/Card";
import Button from "@/6_shared/ui/ui-button";
import Link from "next/link";
import ReCAPTCHA from 'react-google-recaptcha'
import styles from '@/styles/ResetPassword.module.scss'
import { useState } from "react";
import { usePasswordRecoveryMutation } from "../api/PasswordRecovery_api";
import { useTranslation } from "@/6_shared/config/i18n/hook/useTranslation";
import { IForgotPasswordErrorResponse, IForgotPasswordForm } from "../types";
import { ErrorMessage } from "@hookform/error-message";
import { useToast } from "@chakra-ui/react";

export const ForgotPasswordComponent = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IForgotPasswordForm>({
    mode: 'onBlur'
  })
  const { t }: any = useTranslation()
  const toast = useToast()
  const [passwordRecovery, { }] = usePasswordRecoveryMutation()
  const [captcha, setCaptcha] = useState<string | null>(null)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/g

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
      const err = error as IForgotPasswordErrorResponse
      toast({
        description: `${JSON.stringify(err.data.errors.email.message)}`,
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
          <input {...register("email", {
            required: true,
            pattern: {
              message: 'Must be a valid email',
              value: emailRegex,
            }
          })}
            className={styles.inputField} type="email" placeholder="Email" />
          <ErrorMessage errors={errors} name="email" render={({ message }) => <p>{message}</p>} />
        </div>
        <div>
          {t.passwordRecovery.instructions}
        </div>
        <div>
          <ReCAPTCHA
            sitekey="6Lczb20pAAAAAF2H5j-PhmyWrZBkckqqUCR6cxoR"
            onChange={val => setCaptcha(val)} />
        </div>
        <div>
          <Button disabled={!captcha} primary type={'submit'}>{t.passwordRecovery.sendLink}</Button>
        </div>
        <div>
          <Link href="/LogIn">
            <Button outline type={'submit'}>{t.passwordRecovery.backToSignIn}</Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}