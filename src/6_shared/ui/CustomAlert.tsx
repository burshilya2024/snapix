import React, { useEffect, useState } from 'react'

import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react'

import styles from '@/styles/CustomAlert.module.scss'

type AlertProps = {
  alertMessage: null | string
  status: 'error' | 'info' | 'loading' | 'success' | 'warning' | undefined
}

const ProgressAlert: React.FC<AlertProps> = ({ alertMessage, status }) => {
  const [filled, setFilled] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setFilled(prev => (prev > 0 ? prev - 1 : prev))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <Alert status={status}>
        <AlertIcon />
        {alertMessage}
      </Alert>
      <div className={styles.progressbar}>
        <div
          style={{
            backgroundColor: '#4da8fc',
            height: '100%',
            transition: 'width 0.5s',
            width: `${filled}%`,
          }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressAlert
