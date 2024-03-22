import styles from '@/styles/MyProfile.module.scss'

import { MyProfileTabLinks } from '../../../hoc/MyProfileTabLinks'
import Avatar from '../../UserAvatar/WrapperAvatar'
import { ProfileFormInformation } from './ProfileFormInforamtion'

const GeneralInformation = () => {
  return (
    <MyProfileTabLinks>
      <div className={styles.genInfo_wrapper}>
        <div className={styles.genInfo_profile}>
          <div className={styles.upload_avatar_wrapper}>
            <div className={styles.avatar_wrapper}>
              <Avatar />
            </div>
          </div>
        </div>
        <ProfileFormInformation />
      </div>
    </MyProfileTabLinks>
  )
}

export default GeneralInformation
