import { SubmitHandler, useForm } from "react-hook-form";
import Card from "@/6_shared/ui/Card";
import Button from "@/6_shared/ui/ui-button";
import Link from "next/link";
import ReCAPTCHA from 'react-google-recaptcha'
import styles from '@/styles/ResetPassword.module.scss'
import { FormEvent, useState } from "react";
import Email from "next-auth/providers/email";

type IFormInput = {
  email: string
}

export const ResetPasswordComponents = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: any) => console.log(data)

  const [captcha, setCaptcha] = useState<string | null>(null)
  const siteKey = '6Lczb20pAAAAAF2H5j-PhmyWrZBkckqqUCR6cxoR'
  const secretKey = '6Lczb20pAAAAAKSxqx9bPHz3ZBd__ELfAY-3gPCX'
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/g
  return (
    <Card>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.tittle}>Reset Password</div>
        <div>
          <input {...register("email", { required: true, pattern: emailRegex })} className={styles.inputField} type="email" placeholder="Email" />
        </div>
        <div>
          Enter your email and we will send you further instruction
        </div>
        <div className={styles.recaptcha}>
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