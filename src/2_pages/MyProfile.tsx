import { useSession } from 'next-auth/react'

export function MyProfile() {
  const session = useSession()
  const img = session.data?.user?.image

  return (
    <div>
      <div>{session.data?.user?.name ? session.data?.user?.name : 'нету имени'}</div>
      <div>
        {session.data?.user?.email ? session.data?.user?.email : 'от backend я ничего не вижу'}
      </div>
      <img alt={''} src={session?.data?.user?.image || '/default-image.jpg'} />
    </div>
  )
}
