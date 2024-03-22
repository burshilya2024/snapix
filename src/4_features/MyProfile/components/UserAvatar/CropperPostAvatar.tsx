import React, { useRef, useState } from 'react'
// eslint-disable-next-line import/no-named-as-default
import ReactCrop, { Crop, centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'

import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import { MyCustomSpinner } from '@/6_shared/ui/CustomSpinner'
import Button from '@/6_shared/ui/ui-button'
import { useToast } from '@chakra-ui/react'

import styles from '@/styles/Avatar.module.scss'

import { useUploadAvatarMutation } from './api/Avatar_Api'
import { CropperAvatarToFile } from './helper/CrooperAvatarToFile'
import setCanvasPreview from './helper/setCanvasPreview'

// высота и ширина будет одинакого соотношения
const ASPECT_RATIO = 1
// минимальный размер изображение
const MIN_DIMENSION = 150

interface CropperAvatarProps {
  closeModal: () => void
  // обновление аватарки
  refetch: any
}
// TODO: компонента обрезает фото через библиотеку React-image-crop и меняе формат на string а потом преобразовывает обратно в File для backend
const CropperPostAvatar: React.FC<CropperAvatarProps> = ({ closeModal, refetch }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const [uploadAvatarToServer, { isError: uploadError, isLoading, isSuccess }] =
    useUploadAvatarMutation()
  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [SelectImage, setSelectImage] = useState<string>('')
  const [crop, setCrop] = useState<Crop>({
    // @ts-ignore
    aspect: ASPECT_RATIO,
    height: MIN_DIMENSION,
    unit: '%',
    width: MIN_DIMENSION,
  })
  const [error, setError] = useState<string>('')

  // Функция для обработки выбора файла пользователем
  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const imageElement = new Image()
      const imageUrl = reader.result as string

      imageElement.src = imageUrl

      imageElement.addEventListener('load', () => {
        setError('')
        const { naturalHeight, naturalWidth } = imageElement

        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError('Image must be at least 150 x 150 pixels.')
          setSelectImage('')
        } else {
          setSelectImage(imageUrl)
        }
      })
    })

    reader.readAsDataURL(file)
  }

  // Функция для обработки загрузки изображения
  const onImageLoad = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const { height, width } = e.currentTarget
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100

    const newCrop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    )
    const centeredCrop = centerCrop(newCrop, width, height)

    setCrop(centeredCrop)
  }

  //! Функция для обработки обрезки изображения
  const handleCropImage = async () => {
    if (!imgRef.current || !previewCanvasRef.current) {
      return
    }

    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    )
    const dataUrl = previewCanvasRef.current.toDataURL()

    try {
      const formData = new FormData()
      //! Преобразование обрезанного изображения в файл и отправка на сервер
      const CrooperAvatar = CropperAvatarToFile(dataUrl)

      formData.append('file', CrooperAvatar)
      await uploadAvatarToServer(formData).unwrap()
      closeModal()
      toast({
        description: `${t.Avatar.SuccessUpload}`,
        duration: 5000,
        isClosable: true,
        status: 'success',
        title: '',
      })
      refetch()
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
    <div className={styles.wrapper_CropperAvatar}>
      <label className={styles.file_input_label}>
        <span className={styles.sr_only}>{t.Avatar.Choose}</span>
        <input
          accept={'image/*'}
          className={styles.file_input}
          onChange={onSelectFile}
          type={'file'}
        />
      </label>
      {error && <p className={styles.error}>{error}</p>}
      {isLoading ? (
        <MyCustomSpinner />
      ) : (
        <div>
          {SelectImage && (
            <div className={styles.cropper_container}>
              <ReactCrop
                aspect={ASPECT_RATIO}
                circularCrop
                crop={crop}
                keepSelection
                minWidth={MIN_DIMENSION}
                onChange={newCrop => setCrop(newCrop)}
                // @ts-ignore
                onImageLoaded={onImageLoad}
              >
                <img
                  alt={'Upload'}
                  className={styles.cropper_image}
                  onLoad={onImageLoad}
                  ref={imgRef}
                  src={SelectImage}
                  style={{ maxHeight: '70vh' }}
                />
              </ReactCrop>
              <div style={{ display: 'flex', justifyContent: 'end', margin: '20px' }}>
                <Button onClick={handleCropImage}>{t.Avatar.save}</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {crop && <canvas className={styles.preview_canvas} ref={previewCanvasRef} />}
    </div>
  )
}

export default CropperPostAvatar
