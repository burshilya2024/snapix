import React from 'react'

import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import Button from '@/6_shared/ui/ui-button'
import { Heading } from '@chakra-ui/react'
import img from '@public/assets/images/rafiki.png'
import Image from 'next/image'

import styles from '@/styles/Confirm.module.scss'

export function LinkExpiredComponent() {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <Heading size={'xl'}>Email verification link expired!</Heading>
      </div>
      <div className={styles.textContainer}>
        <Heading size={'lg'}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Heading>
      </div>
      <div className={styles.buttonContainer}>
        <Button primary>Resend verification link</Button>
      </div>
      <div className={styles.textContainer}>
        <Image alt={''} src={img} />
      </div>
    </div>
  )
}
