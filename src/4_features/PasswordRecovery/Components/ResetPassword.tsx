import { FieldValues, useForm } from "react-hook-form";
import Card from "@/6_shared/ui/Card";
import Button from "@/6_shared/ui/ui-button";
import styles from '@/styles/ResetPassword.module.scss'
import { useResetPasswordMutation, useVerifyTokenMutation } from "../api/PasswordRecovery_api";
import { useRouter } from "next/router";
import { IResetPasswordErrorResponse, IResetPasswordForm } from "../types";
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from "react";
import { ParsedUrlQuery } from "querystring";

export const ResetPasswordComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IResetPasswordForm>({
    mode: 'onBlur'
  })

  const router = useRouter()
  const { token }: ParsedUrlQuery = router.query
  const [resetPassword, { }] = useResetPasswordMutation()
  const [verifyToken, { }] = useVerifyTokenMutation()

  const pattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*/

  useEffect(() => {
    const checkTokenFresh = async (token: string) => {
      try {
        const res = await verifyToken(token).unwrap()
        console.log('token fresh', res)
      } catch (error) {
        router.push('/ResendEmail')
      }
    }
    if (typeof token === 'string') {
      checkTokenFresh(token)
    }

  }, [])


  const onSubmit = async (data: FieldValues) => {

    if (data.newPassword !== data.confirmedPassword) {
      alert('Passwords do not match!')
    } else {
      try {
        await resetPassword({ password: data.newPassword, token, }).unwrap()
        alert(`Password successfully changed!`)
        router.push('/LogIn')

      } catch (error) {
        const err = error as IResetPasswordErrorResponse
        alert(JSON.stringify(err.data.errors.token.message))
      }
    }

  }

  return (
    <Card>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.tittle}>Reset Password</div>
        <div>
          <input {...register("newPassword", {
            required: true,
            minLength: {
              message: 'Password must be at least 10 symbols long',
              value: 10
            },
            maxLength: {
              message: 'Password must be less than 20 symbols long',
              value: 20
            },
            pattern: {
              message: 'Password must contain an underscore, at least one letter and at least one capital letter',
              value: pattern,
            }
          })}
            className={styles.inputField} type="password" placeholder="New Password" />
          <ErrorMessage errors={errors} name="newPassword" render={({ message }) => <p>{message}</p>} />
        </div>
        <div>
          <input {...register("confirmedPassword", {
            required: true,
            minLength: {
              message: 'Password must be at least 10 characters long',
              value: 10
            },
            maxLength: {
              message: 'Password must be less than 20 characters long',
              value: 20
            },
            pattern: {
              message: 'Password must contain an underscore, at least one letter and at least one capital letter',
              value: pattern,
            }
          })}
            className={styles.inputField} type="password" placeholder="Confirm Password" />
          <ErrorMessage errors={errors} name="confirmedPassword" render={({ message }) => <p>{message}</p>} />
        </div>
        <div>
          <Button primary type={'submit'}>Create New Password</Button>
        </div>
      </form>
    </Card>
  )
}