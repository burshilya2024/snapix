import React, { useState } from 'react'

import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import Modal from '@/6_shared/ui/ModalWindow'
import Button from '@/6_shared/ui/ui-button'
import FileImage from '@public/assets/icons/file.svg'

import styles from '@/styles/Avatar.module.scss'

import CropperPostAvatar from './CropperPostAvatar'
import { DefaultAvatar_Avatar } from './DefaultAvatar_Avatar'
import DeleteAvatar from './DeleteAvatar'
import { getUserIdFromToken, useGetAvatarQuery } from './api/Avatar_Api'

const WrapperAvatar = () => {
  const { t } = useTranslation()
  const userId = getUserIdFromToken()
  const { data: AvatarUser, refetch } = useGetAvatarQuery(userId)
  const avatarUrl = AvatarUser?.files[0]?.url || ''

  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const openUploadModal = () => setUploadModalOpen(true)
  const closeUploadModal = () => setUploadModalOpen(false)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const openDeleteModal = () => setDeleteModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  return (
    <div className={styles.upload_avatar_wrapper}>
      <div className={styles.avatar_wrapper}>
        {avatarUrl === '' ? (
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
            <span className={'svg'}>
              <FileImage />
            </span>
          </div>
        ) : (
          <div>
            <DefaultAvatar_Avatar />
            <div className={styles.avatar_delete_wrapper} onClick={openDeleteModal}>
              <div className={styles.avatar_delete}>x</div>
            </div>
          </div>
        )}
      </div>
      <Button onClick={openUploadModal}>{t.Avatar.UploadAvatar}</Button>
      <Modal isOpen={uploadModalOpen} onClose={closeUploadModal} title={t.Avatar.UploadAvatar}>
        <CropperPostAvatar closeModal={closeUploadModal} refetch={refetch} />
      </Modal>
      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal} title={t.Avatar.DeleteAvatar}>
        <DeleteAvatar closeModal={closeDeleteModal} refetchAvatar={refetch} />
      </Modal>
    </div>
  )
}

export default WrapperAvatar
