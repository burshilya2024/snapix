import React, { useState } from 'react'

import clsx from 'clsx'

import styles from '@/styles/ModalWindow.module.scss'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title }) => {
  const [isMounted, setIsMounted] = useState(false)

  // Ensure modal content is mounted/unmounted correctly for animations
  React.useEffect(() => {
    setIsMounted(true)

    return () => setIsMounted(false)
  }, [])

  const overlayClasses = clsx(styles['modal_overlay'], { [styles['is_open']]: isOpen })
  const wrapperClasses = clsx(styles['modal_wrapper'], { [styles['is_open']]: isOpen })
  const modalTitle = clsx(styles['modal_title'])
  const modalClasses = styles['modal']
  const closeButtonClasses = styles['modal_close']
  const contentClasses = styles['modal_content']

  if (!isOpen && !isMounted) {
    return null
  }

  return (
    <>
      <div className={overlayClasses}></div>
      <div className={wrapperClasses} onClick={onClose}>
        <div className={modalClasses} onClick={e => e.stopPropagation()}>
          <div className={modalTitle}>
            <div>{title}</div>
            <div>
              <button className={closeButtonClasses} onClick={onClose}>
                &times;
              </button>
            </div>
          </div>
          <div className={contentClasses}>{children}</div>
        </div>
      </div>
    </>
  )
}

export default Modal
