import { FieldValues, useForm } from "react-hook-form";
import Card from "@/6_shared/ui/Card";
import Button from "@/6_shared/ui/ui-button";
import Link from "next/link";
import ReCAPTCHA from 'react-google-recaptcha'
import styles from '@/styles/ResetPassword.module.scss'
import { useState } from "react";
import { usePasswordRecoveryMutation } from "../api/PasswordRecovery_api";

type IFormInput = {
  email: string
}

export const ForgotPasswordComponents = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>()
  const [captcha, setCaptcha] = useState<string | null>(null)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/g

  const [passwordRecovery, { error, isLoading }] = usePasswordRecoveryMutation()

  const onSubmit = async (email: FieldValues) => {

    try {
      const res = await passwordRecovery(email).unwrap()
      console.log(res)

      if(!error) {
        alert(`We have sent a link to confirm your email to ${email.email}`)
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