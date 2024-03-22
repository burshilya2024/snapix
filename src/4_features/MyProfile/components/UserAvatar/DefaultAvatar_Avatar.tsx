import { MyCustomSpinner } from '@/6_shared/ui/CustomSpinner'
import FileImage from '@public/assets/icons/file.svg'

import styles from '@/styles/MyProfile.module.scss'

import { getUserIdFromToken, useGetAvatarQuery } from './api/Avatar_Api'

export const DefaultAvatar_Avatar: React.FC = () => {
  const userId = getUserIdFromToken()
  const { data: AvatarUser, isLoading } = useGetAvatarQuery(userId)
  const avatarUrl = AvatarUser?.files[0]?.url || ''

  return (
    <div
      style={{
        alignItems: 'center',
        border: '1px solid gray',
        borderRadius: '50%',
        display: 'flex',
        height: '200px',
        justifyContent: 'center',
        width: '200px',
      }}
    >
      {avatarUrl ? (
        <img alt={'Avatar'} className={styles.My_Profile_Avatar} src={avatarUrl} />
      ) : (
        <div>
          <span className={'svg'}>
            {isLoading ? (
              <div style={{ background: 'white' }}>
                <MyCustomSpinner />
              </div>
            ) : (
              <FileImage />
            )}
          </span>
        </div>
      )}
    </div>
  )
}
