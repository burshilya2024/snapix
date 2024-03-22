import React from 'react'

import Button from '@/6_shared/ui/ui-button'
import Link from 'next/link'

import styles from '@/styles/MyProfile.module.scss'

interface PropsUser {
  aboutMe?: null | string
  birthDate?: Date | null
  city?: null | string
  firstName?: null | string
  lastName?: null | string
  lastUpdate: string // Формат даты и времени в строке
  userName: string
}

const Profile_info_stats: React.FC<{ user: PropsUser }> = ({ user }) => {
  return (
    <div className={styles.profile_info}>
      <div className={styles.profile_info__heading}>
        <h1>{user?.userName}</h1>
        <Link href={'/MyProfile/general-information'}>
          <Button secondary>Profile Settings</Button>
        </Link>
      </div>
      <div className={styles.profile_info__stats}>
        <div>
          <span>2328</span>
          <p>Following</p>
        </div>
        <div>
          <span>2624</span>
          <p>Followers</p>
        </div>
        <div>
          <span>5234</span>
          <p>Publications</p>
        </div>
      </div>
      <div className={'profile_info__text'}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, perspiciatis earum!
        Exercitationem commodi reprehenderit, consequuntur ex provident magnam? Nobis deleniti magni
        asperiores nostrum rem error ipsam atque nesciunt quis eius.
      </div>
    </div>
  )
}

export default Profile_info_stats
