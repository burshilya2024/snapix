import { FieldValues, useForm } from "react-hook-form";
import Card from "@/6_shared/ui/Card";
import Button from "@/6_shared/ui/ui-button";
import styles from '@/styles/ResetPassword.module.scss'
import { usePasswordRecoveryMutation, useResetPasswordMutation } from "../api/PasswordRecovery_api";
import { useRouter } from "next/router";

const pattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*/

type IFormInput = {
  newPassword: string
  confirmedPassword: string
}

export const ResetPasswordComponents = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>()
  const router = useRouter()
  let { token } = router.query
  const [resetPassword, { error, isLoading }] = useResetPasswordMutation()


  const onSubmit = async (data: FieldValues) => {

    try {
      await resetPassword({ password: data.newPassword, token, })

      if (!error) {
        alert(`Password successfully changed!`)
      }

    } catch (error) {
      alert(JSON.stringify(error))

    } finally {
      router.push('/LogIn')
    }

  }


  return (
    <Card>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.tittle}>Reset Password</div>
        <div>
          <input {...register("newPassword", { required: true, minLength: 6, maxLength: 20, })} className={styles.inputField} type="password" placeholder="Password" />
        </div>
        <div>
          <input {...register("confirmedPassword", { required: true, minLength: 6, maxLength: 20, })} className={styles.inputField} type="password" placeholder="Confirm Password" />
        </div>
        <div>
          <Button primary type={'submit'}>Create New Password</Button>
        </div>
      </form>
    </Card>
  )
}