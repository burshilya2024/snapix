import { FieldValues, useForm } from "react-hook-form";
import Card from "@/6_shared/ui/Card";
import Button from "@/6_shared/ui/ui-button";
import styles from '@/styles/ResetPassword.module.scss'
import { useResetPasswordMutation, useVerifyTokenMutation } from "../api/PasswordRecovery_api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "@/6_shared/config/i18n/hook/useTranslation";
import { IResetPasswordErrorResponse, IResetPasswordForm } from "../types";
import { ErrorMessage } from '@hookform/error-message';
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";

export const ResetPasswordComponent: React.FC = () => {
  const toast = useToast()
  const { t }: any = useTranslation()
  const router = useRouter()
  const session = useSession()
  const { token } = router.query
  const [resetPassword, { }] = useResetPasswordMutation()
  const [verifyToken, { }] = useVerifyTokenMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<IResetPasswordForm>({
    mode: 'onBlur'
  })

  if (session.status === 'authenticated') router.push('/MyProfile')

  useEffect(() => {
    const checkTokenIsValid = async (token: string) => {
      try {
        const res = await verifyToken(token).unwrap()
        console.log('token fresh: ', res)
      } catch (error) {
        router.push('/ResendEmail')
      }
    }
    // AWAITING FOR ENDPOINT '/verify-token'
    // if (typeof token === 'string') {
    //   checkTokenIsValid(token)
    // }

  }, [])

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
        if (typeof token === 'string') await resetPassword({ password: data.newPassword, token, }).unwrap()
        toast({
          description: `Password successfully changed!`,
          isClosable: true,
          status: 'success',
          title: 'Success!',
        })
        router.push('/LogIn')

      } catch (error) {
        const err = error as IResetPasswordErrorResponse
        toast({
          description: `${JSON.stringify(err.data.errors.token.message)}`,
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
              value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*/,
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
              value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*/,
            }
          })}
            className={styles.inputField} type="password" placeholder="Confirm Password" />
          <ErrorMessage errors={errors} name="confirmedPassword" render={({ message }) => <p>{message}</p>} />
        </div>
        <div>
          <Button primary type={'submit'}>{t.passwordRecovery.createNewPassword}</Button>
        </div>
      </form>
    </Card>
  )
}