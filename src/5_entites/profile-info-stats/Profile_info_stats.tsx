import React from 'react'

import { useGetUserQuery } from '@/4_features/MyProfile/components/UserAvatar/api/Avatar_Api'
import Button from '@/6_shared/ui/ui-button'
import Link from 'next/link'

import styles from '@/styles/MyProfile.module.scss'

const Profile_info_stats = () => {
  const { data: user } = useGetUserQuery()

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
