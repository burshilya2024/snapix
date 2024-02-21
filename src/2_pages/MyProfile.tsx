import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import useWindowSize from '@/6_shared/lib/hooks/useWindowsSize'
import { Typography } from '@/6_shared/ui/Typography'
import { Skeleton } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import styles from '@/styles/MyProfile.module.scss'

export function MyProfile() {
  const session = useSession()
  const { t } = useTranslation()
  const isMobile = useWindowSize()

  return (
    <section className={styles.Profile}>
      <div className={styles.Profile_container}>
        {!isMobile ? (
          <>
            <div className={styles.Profile_photo}>
              <Image
                alt={session.data?.user?.name || ''}
                height={204}
                src={session?.data?.user?.image || 'Block.svg'}
                width={204}
              />
            </div>

            <div className={styles.Profile_info}>
              <div className={styles.Profile_info_title}>
                <Typography.H1 className={styles.name}>
                  {session.data?.user?.name
                    ? session.data?.user?.name
                    : `${t.profile.nameNotFound}`}
                </Typography.H1>
                <button className={styles.settings}>
                  <Typography.H3>{t.profile.profileSettings}</Typography.H3>
                </button>
              </div>
              <div className={styles.Profile_info_data}>
                <div className={styles.following}>
                  <div className={styles.following_number}>2 218</div>
                  <div className={styles.following_text}>{t.profile.following}</div>
                </div>
                <div className={styles.followers}>
                  <div className={styles.followers_number}>2 358</div>
                  <div className={styles.followers_text}>{t.profile.followers}</div>
                </div>
                <div className={styles.publications}>
                  <div className={styles.publications_number}>2 764</div>
                  <div className={styles.publications_text}>{t.profile.publications}</div>
                </div>
              </div>
              <div className={styles.Profile_info_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Ab, alias asperiores aspernatur
                assumenda deserunt eos ex{' '}
                <Link className={'link'} href={'/'}>
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={`${styles.Profile_photo} ${styles.Profile_mobile}`}>
              <div className={styles.photo_info_container}>
                <Image
                  alt={session.data?.user?.name || ''}
                  height={204}
                  src={session?.data?.user?.image || 'Block.svg'}
                  width={92}
                />

                <div className={styles.Profile_info_data}>
                  <div className={styles.following}>
                    <div className={styles.following_number}>2 218</div>
                    <div className={styles.following_text}>{t.profile.following}</div>
                  </div>
                  <div className={styles.followers}>
                    <div className={styles.followers_number}>2 358</div>
                    <div className={styles.followers_text}>{t.profile.followers}</div>
                  </div>
                  <div className={styles.publications}>
                    <div className={styles.publications_number}>2 764</div>
                    <div className={styles.publications_text}>{t.profile.publications}</div>
                  </div>
                </div>
              </div>

              <div className={styles.Profile_mobile_title}>
                <Typography.H1 className={styles.name}>
                  {session.data?.user?.name
                    ? session.data?.user?.name
                    : `${t.profile.nameNotFound}`}
                </Typography.H1>
              </div>

              <div className={styles.Profile_mobile_text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Distinctio, dolores.
                <Link className={'link'} href={'/'}>
                  quis nostrud exercitation ullamco.
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.Photos}>
        <div className={styles.Photos_container}>
          <Skeleton endColor={'gray.800'} startColor={'gray.700'}>
            <div className={styles.photo}>
              <img alt={''} className={styles.photo_img} src={'/'} />
            </div>
          </Skeleton>

          <Skeleton endColor={'gray.800'} startColor={'gray.700'}>
            <div className={styles.photo}>
              <img alt={''} className={styles.photo_img} src={'/'} />
            </div>
          </Skeleton>

          <Skeleton endColor={'gray.800'} startColor={'gray.700'}>
            <div className={styles.photo}>
              <img alt={''} className={styles.photo_img} src={'/'} />
            </div>
          </Skeleton>

          <Skeleton endColor={'gray.800'} startColor={'gray.700'}>
            <div className={styles.photo}>
              <img alt={''} className={styles.photo_img} src={'/'} />
            </div>
          </Skeleton>

          <Skeleton endColor={'gray.800'} startColor={'gray.700'}>
            <div className={styles.photo}>
              <img alt={''} className={styles.photo_img} src={'/'} />
            </div>
          </Skeleton>

          <Skeleton endColor={'gray.800'} startColor={'gray.700'}>
            <div className={styles.photo}>
              <img alt={''} className={styles.photo_img} src={'/'} />
            </div>
          </Skeleton>

          <Skeleton endColor={'gray.800'} startColor={'gray.700'}>
            <div className={styles.photo}>
              <img alt={''} className={styles.photo_img} src={'/'} />
            </div>
          </Skeleton>

          <Skeleton endColor={'gray.800'} startColor={'gray.700'}>
            <div className={styles.photo}>
              <img alt={''} className={styles.photo_img} src={'/'} />
            </div>
          </Skeleton>
        </div>
      </div>
    </section>
  )
}
