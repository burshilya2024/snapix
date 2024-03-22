import { useForm } from 'react-hook-form'

import { useProfileDataMutation } from '@/4_features/MyProfile/api/MyProfile_Api'
import Button from '@/6_shared/ui/ui-button'
import { Input, Textarea } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from '@/styles/MyProfile.module.scss'

import { countryOptions } from '../../datalist/countryOptions'

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

const InputField = ({
  label,
  name,
  type = 'text',
  ...rest
}: {
  [key: string]: any
  label: string
  name: keyof FormData
  type?: string
}) => {
  const {
    formState: { errors },
    register,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  })

  return (
    <div className={styles.InputGroup}>
      <label htmlFor={name}>{label}</label>
      <Input size={'sm'} {...register(name)} id={name} type={type} {...rest} />
      <ErrorMessage errors={errors} name={name} render={({ message }) => <p>{message}</p>} />
    </div>
  )
}

export const ProfileFormInformation = () => {
  const [profileData, {}] = useProfileDataMutation()
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data: any) => {
    await profileData(data)
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <InputField label={'Username*'} name={'username'} />
        <InputField label={'Lastname*'} name={'lastname'} />
        <InputField label={'Firstname*'} name={'firstname'} />
        <InputField label={'Date of Birth*'} name={'dateOfBirth'} type={'date'} />
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
          <ErrorMessage errors={errors} name={'about'} render={({ message }) => <p>{message}</p>} />
        </div>
        <hr />
        <div className={styles.submitBtn_wrapper}>
          <Button disabled={!isValid} primary type={'submit'}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
