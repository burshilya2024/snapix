import Button from '@/6_shared/ui/ui-button'
import { Heading } from '@chakra-ui/react'
import img from '@public/assets/images/confirm.png'
import Image from 'next/image'
import Link from 'next/link'

import style from '@/styles/ConfirmPage.module.scss'
export const ConfirmPass = () => {
  return (
    <>
      <div className={style.container}>
        <Heading>Congratulations!</Heading>
        <Heading size={'md'}>Your email has been confirmed</Heading>
        <Link href={'/LogIn'}>
          <Button primary>Sign In</Button>
        </Link>
        <Image alt={'picture'} src={img} />
      </div>
    </>
  )
}
