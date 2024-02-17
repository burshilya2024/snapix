import Button from "@/6_shared/ui/ui-button";
import { usePasswordRecoveryMutation } from "../api/PasswordRecovery_api";
import Card from '@/6_shared/ui/Card';

import styles from '@/styles/ResetPassword.module.scss'

export const ResendEmailComponent = () => {

  const [passwordRecovery, { }] = usePasswordRecoveryMutation()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    if (localStorage.getItem('forgot_password_email')) {
      const email = localStorage.getItem('forgot_password_email')
      await passwordRecovery({email: email}).unwrap()
      alert(`We have sent a link to ${email}. Follow the link to create new password.`)
      localStorage.removeItem('forgot_password_email')
    }
  }

  return (
    <Card>
      <form onSubmit={onSubmit} className={styles.loginForm}>
        <div className={styles.resendEmailMessage}>Looks like the verification link has expired. Not to worry, we can send the link again</div>
        <div>
          <Button primary type={'submit'}>Resend Link</Button>
        </div>
      </form>
    </Card>
  );
}
