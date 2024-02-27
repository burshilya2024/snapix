import { FormEventHandler } from 'react'

import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import Card from '@/6_shared/ui/Card'
import Button from '@/6_shared/ui/ui-button'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import styles from '@/styles/ResetPassword.module.scss'

import { usePasswordRecoveryMutation } from '../api/PasswordRecovery_Api'

export const ResendEmailComponent = () => {
  const router = useRouter()

  const toast = useToast()
  const { t } = useTranslation()

  const [passwordRecovery, {}] = usePasswordRecoveryMutation()

  const onSubmit: FormEventHandler<HTMLElement> = async e => {
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
        duration: 5000,
        isClosable: true,
        onCloseComplete() {
          router.push('/forgot-password')
        },
        status: 'error',
        title: 'Ooops!',
      })
    }
  }

  return (
    <Card>
      <form className={styles.loginForm} onSubmit={onSubmit}>
        <div className={styles.resendEmailMessage}>
          {t.passwordRecovery.resendEmailInstructions}
        </div>
        <div>
          <Button primary type={'submit'}>
            {t.passwordRecovery.resendLink}
          </Button>
        </div>
      </form>
    </Card>
  )
}
