import styles from '@/styles/Form.module.scss'
import {ReactNode} from "react";

interface FormProps {
    children: ReactNode
}
const Form = ({children}:FormProps) => {
    return (
        <div className={styles.formContainer}>
       <div className={styles.form}>
           {children}
       </div > 
        </div>
    )
}

export default Form;
