import Public from '@/common/components/PublicPage/Public'
import { useSession } from 'next-auth/react'

export default function Home() {
  const session = useSession()

  return (
    <>
      <div>{session.data ? <div>HOME PAGE</div> : <Public />}</div>
    </>
  )
}
