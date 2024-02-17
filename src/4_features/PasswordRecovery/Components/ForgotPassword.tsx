import { FieldValues, useForm } from "react-hook-form";
import Card from "@/6_shared/ui/Card";
import Button from "@/6_shared/ui/ui-button";
import Link from "next/link";
import ReCAPTCHA from 'react-google-recaptcha'
import styles from '@/styles/ResetPassword.module.scss'
import { useState } from "react";
import { usePasswordRecoveryMutation } from "../api/PasswordRecovery_api";
import { IForgotPasswordErrorResponse, IForgotPasswordForm } from "../types";

export const ForgotPasswordComponent = () => {
  const { register, handleSubmit, reset } = useForm<IForgotPasswordForm>()
  const [captcha, setCaptcha] = useState<string | null>(null)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/g

  const [passwordRecovery, { }] = usePasswordRecoveryMutation()

  const onSubmit = async (email: FieldValues) => {
    try {
      await passwordRecovery(email).unwrap()
      alert(`We have sent a link to ${email.email}. Follow the link to create new password.`)
      localStorage.setItem('forgot_password_email', email.email)

    } catch (error) {
      console.log(error)
      const err = error as IForgotPasswordErrorResponse
      alert(JSON.stringify(err.data.errors.email.message))

    } finally {
      reset()
    }

  }

  return (
    <Card>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.tittle}>Forgot Password</div>
        <div>
          <input {...register("email", { required: true, pattern: emailRegex })} className={styles.inputField} type="email" placeholder="Email" />
        </div>
        <div>
          Enter your email and we will send you further instruction
        </div>
        <div>
          <ReCAPTCHA
            sitekey="6Lczb20pAAAAAF2H5j-PhmyWrZBkckqqUCR6cxoR"
            onChange={val => setCaptcha(val)} />
        </div>
        <div>
          <Button disabled={!captcha} primary type={'submit'}>Send Link</Button>
        </div>
        <div>
          <Link href="/LogIn">
            <Button outline type={'submit'}>Back to Sign In</Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}