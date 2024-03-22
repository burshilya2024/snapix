import React from 'react'

import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import { MyCustomSpinner } from '@/6_shared/ui/CustomSpinner'
import Button from '@/6_shared/ui/ui-button'
import { useToast } from '@chakra-ui/react'

import { useDeleteAvatarMutation } from './api/Avatar_Api'
type DeleteAvatarProps = {
  // закрытие модального окна
  closeModal: () => void
  // функция обновление аватарки
  refetchAvatar: any
}

const DeleteAvatar: React.FC<DeleteAvatarProps> = ({ closeModal, refetchAvatar }) => {
  const [deleteAvatar, { isLoading }] = useDeleteAvatarMutation()
  const { t } = useTranslation()
  const toast = useToast()
  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar() // Вызов метода удаления аватара
      refetchAvatar()
      closeModal()
      toast({
        description: `${t.Avatar.SuccessDelete}`,
        duration: 5000,
        isClosable: true,
        status: 'success',
        title: '',
      })
    } catch (error) {
      toast({
        description: `${error}`,
        duration: 5000,
        isClosable: true,
        status: 'error',
        title: 'Error uploading avatar',
      })
    }
  }

  return (
    <div>
      <h1>{t.Avatar.youSure}</h1>
      {isLoading ? (
        <div>
          <MyCustomSpinner />
        </div>
      ) : (
        <div>
          <Button disabled={isLoading} onClick={handleDeleteAvatar} primary>
            yes
          </Button>
          <Button onClick={() => closeModal()} outline>
            no
          </Button>
        </div>
      )}
    </div>
  )
}

export default DeleteAvatar
