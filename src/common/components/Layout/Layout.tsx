import { ReactNode } from 'react'

import Header from '@/common/components/Header/Header'

interface LayoutProps {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className={'container'}>{children}</main>
      {/* <Footer/> */}
    </>
  )
}
