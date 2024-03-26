// Схема валидации с помощью yup
import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  aboutMe: yup
    .string()
    .min(1, 'At least 5 character')
    .max(50, 'No more than 200 characters')
    .required('Field is required'),
  birthDate: yup
    .date()
    .max(new Date(Date.now() - 567648000000), 'User must be 13 or older!') // 13 лет в миллисекундах
    .required('Field is required'),
  city: yup
    .string()
    .min(1, 'At least 1 character')
    .max(50, 'No more than 50 characters')
    .matches(/^[a-zA-ZА-Яа-я]+$/, 'Must contain only letters')
    .required('Field is required'),
  firstName: yup
    .string()
    .min(1, 'At least 1 character')
    .max(50, 'No more than 50 characters')
    .matches(/^[a-zA-ZА-Яа-я]+$/, 'Must contain only letters')
    .required('Field is required'),
  lastName: yup
    .string()
    .min(1, 'At least 1 character')
    .max(50, 'No more than 50 characters')
    .matches(/^[a-zA-ZА-Яа-я]+$/, 'Must contain only letters')
    .required('Field is required'),
  userName: yup
    .string()
    .min(6, 'At least 6 characters')
    .max(30, 'No more than 30 characters')
    .matches(/^[a-zA-Z0-9_-]+$/, 'Must contain only letters, digits and symbols -_')
    .required('Field is required'),
})
