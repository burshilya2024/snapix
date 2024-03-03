import Button from "@/6_shared/ui/ui-button";
import Image from "next/image"
import profile_avatar from "@public/assets/icons/profile_avatar.png"
import styles from '@/styles/myProfile.module.scss'
import { Photo } from "../../public/type/photo";

import { useFetchDataPhotoQuery } from '@/4_features/public/api/UnsplashTestApi';
import Link from "next/link";

export const MyProfilePage = () => {

  const { data: photos = [], isLoading } = useFetchDataPhotoQuery()
  console.log(photos)

  return (
    <section className={styles.profile_wrapper}>
      <div className={styles.profile_top}>
        <div className={styles.profile_avatar}>
          <Image src={profile_avatar} alt="avatar" width={204} height={204} />
        </div>
        <div className={styles.profile_info}>
          <div className={styles.profile_info__heading}>
            <h1>URL Profile</h1>
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
          <div className="profile_info__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, perspiciatis earum! Exercitationem commodi reprehenderit, consequuntur ex provident magnam? Nobis deleniti magni asperiores nostrum rem error ipsam atque nesciunt quis eius.</div>
        </div>
      </div>
      <div className={styles.profile_photos}>
        {photos && photos.map((photo: Photo): any => (

          <Image key={photo.id} src={photo.urls.small} alt='photo' width={204} height={256} />
        )
        )}
      </div>
    </section>
  );
}
