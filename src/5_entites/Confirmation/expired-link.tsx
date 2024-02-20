import Button from '@/6_shared/ui/ui-button'
import { Heading } from '@chakra-ui/react'
import img from '@public/assets/images/expired.png'
import Image from 'next/image'

import style from '@/styles/ConfirmPage.module.scss'

export const ExpiredLink = () => {
  return (
    <>
      <div className={style.container}>
        <Heading>Email verification link expired</Heading>
        <Heading size={'md'}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Heading>
        <Button primary>Resend verification link</Button>
        <Image alt={'picture'} src={img} />
      </div>
    </>
  )
}
