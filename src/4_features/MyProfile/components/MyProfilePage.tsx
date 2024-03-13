import { useFetchDataPhotoQuery } from '@/4_features/public/api/UnsplashTestApi'
import Profile_info_stats from '@/5_entites/profile-info-stats/Profile_info_stats'
import Button from '@/6_shared/ui/ui-button'
import profile_avatar from '@public/assets/icons/profile_avatar.png'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/styles/MyProfile.module.scss'

import { Photo } from '../../public/type/photo'

export const MyProfilePage = () => {
  const { data: photos = [], isLoading } = useFetchDataPhotoQuery()

  console.log(photos)

  return (
    <section className={styles.profile_wrapper}>
      <div className={styles.profile_top}>
        <div className={styles.profile_avatar}>
          <Image alt={'avatar'} height={204} src={profile_avatar} width={204} />
        </div>
        <Profile_info_stats />
      </div>
      <div className={styles.profile_photos}>
        {photos &&
          photos.map((photo: Photo): any => (
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
    </section>
  )
}
