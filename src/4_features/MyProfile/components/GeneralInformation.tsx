import Button from "@/6_shared/ui/ui-button"
import { Input, Select, Textarea } from '@chakra-ui/react'
import Image from "next/image"
import accountEllipse from "@public/assets/icons/Ellipse.png"
import { useForm } from "react-hook-form"
import { TabLinks } from "../hoc/TabLinks"
import { DatePicker } from '@orange_digital/chakra-datepicker';
import styles from '@/styles/MyProfile.module.scss'
import styles2 from '@/styles/ResetPassword.module.scss'




export const GeneralInformation = () => {

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = () => {

  }

  return (
    <TabLinks>
      {/* <DatePicker initialValue={new Date()} /> */}
      <div className={styles.genInfo_wrapper}>
        <div className="genInfo_profile">
          <div className={styles.profile_img}>
            < Image src={accountEllipse} alt='acc_logo' />
          </div>
          <Button outline >Add a Profile Photo</Button>
        </div>
        <div className={styles.formWrapper}>
          <form className={styles2.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles2.inputGroup}>
              <label htmlFor="username">Username*</label>
              <Input size='sm'
                {...register('username', {
                  required: 'Field is required',
                })}
                id="username"
              />
            </div>
            <div className={styles2.inputGroup}>
              <label htmlFor="firstname">Firstname*</label>
              <Input size='sm'
                {...register('firstname', {
                  required: 'Field is required',
                })}
                id="firstname"
              />
            </div>
            <div className={styles2.inputGroup}>
              <label htmlFor="lastname">Lastname*</label>
              <Input size='sm'
                {...register('lastname', {
                  required: 'Field is required',
                })}
                id="lastname"
              />
            </div>
            <div className={styles2.inputGroup}>
              <label htmlFor="date">Date of Birth*</label>
              <Input size='sm'
                {...register('dateOfBirth', {})}
                id="date"
                type="date"
              />
            </div>
            <div className={styles2.inputGroup}>
              <label htmlFor="country">Select your country</label>
              <Select width='auto'
                {...register('country', {})}
                id="country"
              />
            </div>
            <div className={styles2.inputGroup}>
              <label htmlFor="about">About me</label>
              <div>
                <Textarea {...register('about', {})} id="about" resize="none" />
              </div>
            </div>
            <hr />
            <div className={styles.submitBtn_wrapper}>
              <Button primary type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
    </TabLinks>
  );
}
