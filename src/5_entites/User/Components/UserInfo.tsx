import { useSession } from 'next-auth/react'

export function UserInfo() {
  const session = useSession()
  const img = session.data?.user?.image

  return (
    <div>
      <div>{session.data?.user?.name}</div>
      <div>{session.data?.user?.email}</div>
      <img alt={''} src={session?.data?.user?.image || '/default-image.jpg'} />
    </div>
  )
}
