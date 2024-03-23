// ProfileFormInformation.tsx
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { useProfileDataMutation } from '@/4_features/MyProfile/api/MyProfile_Api'
import Button from '@/6_shared/ui/ui-button'
import { Input, Textarea } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from '@/styles/MyProfile.module.scss'

import { countryOptions } from '../../datalist/countryOptions'
import { InputField } from './helpers/InputField'

// Схема валидации с помощью yup
const validationSchema = yup.object().shape({
  about: yup.string().max(200, 'No more than 200 characters'),
  dateOfBirth: yup
    .date()
    .max(new Date(Date.now() - 567648000000), 'User must be 13 or older!') // 13 лет в миллисекундах
    .required('Field is required'),
  firstname: yup
    .string()
    .min(1, 'At least 1 character')
    .max(50, 'No more than 50 characters')
    .matches(/^[a-zA-ZА-Яа-я]+$/, 'Must contain only letters')
    .required('Field is required'),
  lastname: yup
    .string()
    .min(1, 'At least 1 character')
    .max(50, 'No more than 50 characters')
    .matches(/^[a-zA-ZА-Яа-я]+$/, 'Must contain only letters')
    .required('Field is required'),
  username: yup
    .string()
    .min(6, 'At least 6 characters')
    .max(30, 'No more than 30 characters')
    .matches(/^[a-zA-Z0-9_-]+$/, 'Must contain only letters, digits and symbols -_')
    .required('Field is required'),
})

interface FormData {
  about?: string
  country?: string
  dateOfBirth: Date
  firstname: string
  lastname: string
  username: string
}

export const ProfileFormInformation = () => {
  const [profileData, {}] = useProfileDataMutation()
  const [error, setError] = useState<null | string>(null)
  const methods = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  })

  const {
    formState: { isValid },
    handleSubmit,
  } = methods

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      await profileData(data)
      setError(null)
    } catch (err) {
      setError('Failed to update profile data')
    }
  }

  return (
    <div className={styles.formWrapper}>
      <FormProvider {...methods}>
        <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label={'Username*'}
            name={'username'}
            rules={validationSchema.fields['username']}
          />
          <InputField
            label={'Lastname*'}
            name={'lastname'}
            rules={validationSchema.fields['lastname']}
          />
          <InputField
            label={'Firstname*'}
            name={'firstname'}
            rules={validationSchema.fields['firstname']}
          />
          <InputField
            label={'Date of Birth*'}
            name={'dateOfBirth'}
            rules={validationSchema.fields['dateOfBirth']}
            type={'date'}
          />
          <div className={styles.group}>
            <label htmlFor={'country'}>Select your country</label>
            <Input
              id={'country'}
              list={'countries'}
              style={{ background: 'white' }}
              {...methods.register('country')}
            />
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
                id={'about'}
                resize={'none'}
                {...methods.register('about', validationSchema.fields['about'])}
              />
            </div>
            <ErrorMessage
              errors={methods.formState.errors}
              name={'about'}
              render={({ message }) => <p>{message}</p>}
            />
          </div>
          <hr />
          <div className={styles.submitBtn_wrapper}>
            <Button disabled={!isValid} primary type={'submit'}>
              Save Changes
            </Button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
