import React, { useRef, useState } from 'react'

import Button from '@/6_shared/ui/ui-button'
import Image from 'next/image'

import styles from '@/styles/UploadAvatar.module.scss'

import { Avatar, useUploadAvatarMutation } from './Avatar_Api'

const AvatarUploader: React.FC = () => {
  const selectAvatarFile = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<null | string>(null)
  const [uploaded, setUploaded] = useState<Avatar[]>([])
  const [uploadAvatar, { isError, isLoading }] = useUploadAvatarMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      setAvatar(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }

  const handlePick = () => {
    selectAvatarFile.current?.click()
  }

  const handleUpload = async () => {
    if (!avatar) {
      alert('Please select a file')

      return
    }

    try {
      const formData = new FormData()

      formData.append('file', avatar)
      const { data } = await uploadAvatar(formData).unwrap()

      console.log('RESPONSE DATA POST AVATAR', data)

      setUploaded(data)
    } catch (error) {
      console.error('Error uploading avatar:', error)

      alert('Error uploading avatar. Please try again.')
    }
  }

  return (
    <div>
      {previewUrl && (
        <Image alt={'avatar'} height={200} src={previewUrl} width={200} /> // Отображаем превью изображения
      )}
      <Button onClick={handlePick}>select File</Button>
      <input
        accept={'image/*,.png,.jpg,.gif,.web,'}
        className={styles.hidden}
        onChange={handleChange}
        ref={selectAvatarFile}
        type={'file'}
      />
      <Button disabled={!avatar || isLoading} onClick={handleUpload} primary>
        {isLoading ? 'Uploading...' : 'Save'}
      </Button>
      {isError && <div>Error uploading avatar</div>}
    </div>
  )
}

export default AvatarUploader
