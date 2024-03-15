import React from 'react'

import { User } from '@/2_pages/MyProfile'
import { useFetchDataPhotoQuery } from '@/4_features/public/api/UnsplashTestApi'
import Profile_info_stats from '@/5_entites/profile-info-stats/Profile_info_stats'
import profile_avatar from '@public/assets/icons/profile_avatar.png'
import Image from 'next/image'

import styles from '@/styles/MyProfile.module.scss'

import { useGetAvatarQuery } from './MyProfileTabs/UserAvatar/Avatar_Api'

export const MyProfilePage: React.FC<{ user: User }> = ({ user }) => {
  return (
    <section className={styles.profile_wrapper}>
      <div className={styles.profile_top}>
        <AvatarDisplay />
        <Profile_info_stats user={user} />
      </div>
      <PhotoDisplay />
    </section>
  )
}

const AvatarDisplay: React.FC = () => {
  const { data: userAvatars } = useGetAvatarQuery()

  return (
    <div className={styles.profile_avatar}>
      {userAvatars ? (
        <img
          alt={'Avatar'}
          src={userAvatars[0]?.url}
          style={{ height: '200px', objectFit: 'cover', width: '200px' }}
        />
      ) : (
        <Image alt={'avatar'} height={204} src={profile_avatar} width={204} />
      )}
    </div>
  )
}

const PhotoDisplay: React.FC = () => {
  const { data: photos = [], isLoading } = useFetchDataPhotoQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.profile_photos}>
      {photos.map(photo => (
        <Image
          alt={'photo'}
          height={256}
          key={photo.id}
          src={photo.urls.small}
          style={{ height: '256px', objectFit: 'cover', width: '256px' }}
          width={256}
        />
      ))}
    </div>
  )
}
