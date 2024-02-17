import Button from "@/6_shared/ui/ui-button";
import Card from '@/6_shared/ui/Card';
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "@/6_shared/config/i18n/hook/useTranslation";
import { usePasswordRecoveryMutation } from "../api/PasswordRecovery_Api";
import { FormEventHandler } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import styles from '@/styles/ResetPassword.module.scss'

export const ResendEmailComponent = () => {
  const router = useRouter()
  const session = useSession()
  const toast = useToast()
  const { t }: any = useTranslation()

  const [passwordRecovery, { }] = usePasswordRecoveryMutation()

  if (session.status === 'authenticated') router.push('/MyProfile')

  const onSubmit: FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault()

    if (localStorage.getItem('forgot_password_email')) {

      const userEmail = localStorage.getItem('forgot_password_email')

      if (typeof userEmail === 'string') {
        const email = JSON.parse(userEmail)
        await passwordRecovery(email).unwrap()
        toast({
          description: `We have sent a link to ${email.email}. Follow the link to create new password.`,
          duration: 9000,
          isClosable: true,
          status: 'success',
          title: 'Successfully sent!!!... again.',
        })
      }
    } else {
      toast({
        description: `No user email saved in localStorage. Please go back to password recovery page`,
        duration: 9000,
        isClosable: true,
        status: 'error',
        title: 'Ooops!',
        onCloseComplete() {
          router.push('/forgot-password')
        },
      })
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
