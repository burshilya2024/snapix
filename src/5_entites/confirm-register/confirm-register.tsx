import React from 'react'

import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import Button from '@/6_shared/ui/ui-button'
import { Heading } from '@chakra-ui/react'
import img from '@public/assets/images/confirm-success.png'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/styles/Confirm.module.scss'

export function ConfirmPasswordComponent() {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <Heading size={'xl'}>Congratulations!</Heading>
      </div>
      <div className={styles.textContainer}>
        <Heading size={'lg'}>Your email has been confirmed</Heading>
      </div>
      <div className={styles.buttonContainer}>
        <Link href={'/LogIn'}>
          <Button primary>{t.signIn_SignUp.signIn}</Button>
        </Link>
      </div>
      <div className={styles.textContainer}>
        <Image alt={''} src={img} />
      </div>
    </div>
  )
}
