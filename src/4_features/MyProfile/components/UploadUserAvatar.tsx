import React, { useState } from 'react'

import Button from '@/6_shared/ui/ui-button'
import dynamic from 'next/dynamic'
// TODO: завтра добавлю логику отправки на сервер
const AvatarUploader: React.FC = () => {
  const [avatar, setAvatar] = useState<null | string>(null)

  const onCrop = (croppedAvatar: string) => {
    setAvatar(croppedAvatar)
  }

  const onClose = () => {
    setAvatar(null)
  }

  return (
    <div>
      <DynamicAvatar
        height={350}
        label={'Выберите или перетащите изображение'}
        onClose={onClose}
        onCrop={onCrop}
        width={350}
      />
      {avatar ? <Button primary>Save</Button> : null}
    </div>
  )
}

const DynamicAvatar = dynamic(() => import('react-avatar-edit'), {
  ssr: false,
})

export default AvatarUploader
