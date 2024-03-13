import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Modal from '@/6_shared/ui/ModalWindow'
import Button from '@/6_shared/ui/ui-button'
import { Input, Select, Textarea } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import { DatePicker } from '@orange_digital/chakra-datepicker'
import accountEllipse from '@public/assets/icons/Ellipse.png'
import Image from 'next/image'

import styles from '@/styles/MyProfile.module.scss'

import { MyProfile_Api, useProfileDataMutation } from '../../api/MyProfile_Api'
import { MyProfileTanLinks } from '../../hoc/MyProfileTabLinks'
import { countryOptions } from '../datalist/countryOptions'

const validateAge = (value: any) => {
  const selected = new Date(value).getFullYear()
  const now = new Date().getFullYear()

  return now - selected >= 13
}

export const GeneralInformation = () => {
  const [profileData, {}] = useProfileDataMutation()
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = async (data: any) => {
    console.log(data)
    await profileData(data)
  }

  return (
    <MyProfileTanLinks>
      {/* <DatePicker initialValue={new Date()} /> */}
      <div></div>
      <div className={styles.genInfo_wrapper}>
        <div className={styles.genInfo_profile}>
          <div className={styles.profile_img}>
            <Image alt={'acc_logo'} src={accountEllipse} />
          </div>
          <Button onClick={openModal} outline>
            Add a Profile Photo
          </Button>
          <Modal isOpen={isOpen} onClose={closeModal} title={'Add a Profile Photo'}>
            логика загрузки фото
          </Modal>
        </div>
        <div className={styles.formWrapper}>
          <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.group}>
              <label htmlFor={'username'}>Username*</label>
              <Input
                size={'sm'}
                {...register('username', {
                  maxLength: {
                    message: 'No more than 30 characters',
                    value: 30,
                  },
                  minLength: {
                    message: 'At least 6 characters',
                    value: 6,
                  },
                  pattern: {
                    message: 'Must contain only letters, digits and symbols -_',
                    value: /^[a-zA-Z0-9_-]+$/,
                  },
                  required: 'Field is required',
                })}
                id={'username'}
              />
              <ErrorMessage
                errors={errors}
                name={'username'}
                render={({ message }) => <p>{message}</p>}
              />
            </div>
            <div className={styles.group}>
              <label htmlFor={'firstname'}>Firstname*</label>
              <Input
                size={'sm'}
                {...register('firstname', {
                  maxLength: {
                    message: 'No more than 50 characters',
                    value: 50,
                  },
                  minLength: {
                    message: 'At least 1 characters',
                    value: 1,
                  },
                  pattern: {
                    message: 'Must contain only letters',
                    value: /^[a-zA-ZА-Яа-я]+$/,
                  },
                  required: 'Field is required',
                })}
                id={'firstname'}
              />
              <ErrorMessage
                errors={errors}
                name={'firstname'}
                render={({ message }) => <p>{message}</p>}
              />
            </div>
            <div className={styles.group}>
              <label htmlFor={'lastname'}>Lastname*</label>
              <Input
                size={'sm'}
                {...register('lastname', {
                  maxLength: {
                    message: 'No more than 50 characters',
                    value: 50,
                  },
                  minLength: {
                    message: 'At least 1 characters',
                    value: 1,
                  },
                  pattern: {
                    message: 'Must contain only letters',
                    value: /^[a-zA-ZА-Яа-я]+$/,
                  },
                  required: 'Field is required',
                })}
                id={'lastname'}
              />
              <ErrorMessage
                errors={errors}
                name={'lastname'}
                render={({ message }) => <p>{message}</p>}
              />
            </div>
            <div className={styles.group}>
              <label htmlFor={'dateOfBirth'}>Date of Birth*</label>
              <Input
                size={'sm'}
                {...register('dateOfBirth', {
                  required: 'Field is required',
                  validate: validateAge,
                })}
                id={'dateOfBirth'}
                type={'date'}
              />
              {errors?.dateOfBirth?.type === 'validate' && <p>User must be 13 or older!</p>}
            </div>
            <div className={styles.group}>
              <label htmlFor={'country'}>Select your country</label>
              <Input {...register('country', {})} id={'country'} list={'countries'} />
              <datalist id={'countries'}>
                {countryOptions.map(country => (
                  <option key={country.value} value={country.value}>
                    {country.value}
                  </option>
                ))}
              </datalist>
            </div>
            <div className={styles.group}>
              <label htmlFor={'about'}>About me</label>
              <div>
                <Textarea
                  {...register('about', {
                    maxLength: {
                      message: 'No more than 200 characters',
                      value: 200,
                    },
                  })}
                  id={'about'}
                  resize={'none'}
                />
              </div>
            </div>
            <hr />
            <div className={styles.submitBtn_wrapper}>
              <Button disabled={!isValid} primary type={'submit'}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MyProfileTanLinks>
  )
}
