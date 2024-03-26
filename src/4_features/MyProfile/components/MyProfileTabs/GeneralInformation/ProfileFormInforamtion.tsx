// ProfileFormInformation.tsx
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import {
  FormData,
  useGetUserProfileQuery,
  useProfileDataMutation,
} from '@/4_features/MyProfile/api/MyProfile_Api'
import Button from '@/6_shared/ui/ui-button'
import { Input, Textarea, useToast } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'

import styles from '@/styles/MyProfile.module.scss'

import { countryOptions } from '../../datalist/countryOptions'
import { InputField } from './helpers/InputField'
import { validationSchema } from './helpers/ValidationSheme'

//TODO: функционал работает, но нужно делать правки, а я ленивый.
export const ProfileFormInformation = () => {
  const [profileData, {}] = useProfileDataMutation()
  const { data: userProfile, error: ErrorPorfileSaved, isLoading } = useGetUserProfileQuery()
  const toast = useToast()

  console.log('userProfileDate', userProfile)

  const methods = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  })

  const {
    formState: { isValid },
    handleSubmit,
  } = methods

  const onSubmit: SubmitHandler<FormData> = async data => {
    // @ts-ignore
    const formattedBirthDate = format(data.birthDate, 'dd.MM.yyyy')

    try {
      const resp = await profileData({ ...data, birthDate: formattedBirthDate })

      toast({
        //@ts-ignore
        description: `${resp.data.message}`,
        duration: 3000,
        isClosable: true,
        status: 'success',
        title: '',
      })
    } catch (err) {
      toast({
        description: `${err}`,
        duration: 3000,
        isClosable: true,
        status: 'error',
        title: '',
      })
    }
  }

  return (
    <div className={styles.formWrapper}>
      <FormProvider {...methods}>
        <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            defaultValue={userProfile?.userName}
            label={'Username*'}
            name={'userName'}
            rules={validationSchema.fields['userName']}
          />
          <InputField
            defaultValue={userProfile?.firstName || ''}
            label={'Firstname*'}
            name={'firstName'}
            rules={validationSchema.fields['firstName']}
          />
          <InputField
            defaultValue={userProfile?.lastName || ''}
            label={'Lastname*'}
            name={'lastName'}
            rules={validationSchema.fields['lastName']}
          />

          <InputField
            defaultValue={userProfile?.city || ''}
            label={'city*'}
            name={'city'}
            rules={validationSchema.fields['city']}
          />
          <InputField
            // defaultValue={new Date()}
            label={'birthDate'}
            name={'birthDate'}
            rules={validationSchema.fields['birthDate']}
            type={'date'}
          />
          <div className={styles.group}>
            <label htmlFor={'aboutMe'}>About me</label>
            <div>
              <Textarea
                defaultValue={userProfile?.aboutMe || ''}
                id={'aboutMe'}
                resize={'none'}
                // @ts-ignore
                {...methods.register('aboutMe', validationSchema.fields['aboutMe'])}
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
      </FormProvider>
    </div>
  )
}
