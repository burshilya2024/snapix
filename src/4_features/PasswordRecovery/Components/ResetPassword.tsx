import { FieldValues, useForm } from 'react-hook-form'

import Card from '@/6_shared/ui/Card'
import Button from '@/6_shared/ui/ui-button'
import { useRouter } from 'next/router'

import styles from '@/styles/ResetPassword.module.scss'

import { usePasswordRecoveryMutation, useResetPasswordMutation } from '../api/PasswordRecovery_Api'

const pattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*/

type IFormInput = {
  confirmedPassword: string
  newPassword: string
}

export const ResetPasswordComponents = () => {
  const { handleSubmit, register, reset } = useForm<IFormInput>()
  const router = useRouter()
  const { token } = router.query
  const [resetPassword, { error, isLoading }] = useResetPasswordMutation()

  const onSubmit = async (data: FieldValues) => {
    try {
      await resetPassword({ password: data.newPassword, token })

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
          <input
            {...register('newPassword', { maxLength: 20, minLength: 6, required: true })}
            className={styles.inputField}
            placeholder={'Password'}
            type={'password'}
          />
        </div>
        <div>
          <input
            {...register('confirmedPassword', { maxLength: 20, minLength: 6, required: true })}
            className={styles.inputField}
            placeholder={'Confirm Password'}
            type={'password'}
          />
        </div>
        <div>
          <Button primary type={'submit'}>
            Create New Password
          </Button>
        </div>
      </form>
    </Card>
  )
}
