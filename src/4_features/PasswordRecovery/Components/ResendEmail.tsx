import Button from "@/6_shared/ui/ui-button";
import Card from '@/6_shared/ui/Card';
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "@/6_shared/config/i18n/hook/useTranslation";
import { usePasswordRecoveryMutation } from "../api/PasswordRecovery_api";

import styles from '@/styles/ResetPassword.module.scss'
import { FormEventHandler } from "react";

export const ResendEmailComponent = () => {
  const toast = useToast()
  const { t }: any = useTranslation()

  const [passwordRecovery, { }] = usePasswordRecoveryMutation()

  const onSubmit: FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault()
    if (localStorage.getItem('forgot_password_email')) {
      const email = localStorage.getItem('forgot_password_email')
      if (typeof email === 'string') {
        await passwordRecovery({ email: email }).unwrap()
        toast({
          description: `We have sent a link to ${email}.Follow the link to create new password.`,
          duration: 9000,
          isClosable: true,
          status: 'success',
          title: 'Successfully sent!... again.',
        })
        localStorage.removeItem('forgot_password_email')
      }
    }
  }

  return (
    <Card>
      <form onSubmit={onSubmit} className={styles.loginForm}>
        <div className={styles.resendEmailMessage}>{t.passwordRecovery.resendEmailInstructions}</div>
        <div>
          <Button primary type={'submit'}>{t.passwordRecovery.resendLink}</Button>
        </div>
      </form>
    </Card>
  );
}
