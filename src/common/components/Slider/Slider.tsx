import React, { useState } from 'react'

import { Photo } from '@/common/types/photo'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

import styles from '@/styles/Slider.module.scss'

//?description:native slider for publickPage

interface SliderProps {
  photos: Photo[]
}
const TextBlock = ({ maxLength, text }: { maxLength: number; text: string }) => {
  const [showMore, setShowMore] = useState(false)
  const truncatedText = showMore ? text : `${text.slice(0, maxLength)} ...`

  const handleShowMoreClick = () => {
    setShowMore(!showMore)
  }

  return (
    <div className={`${styles.description} ${showMore ? styles.expanded : ''}`}>
      <p>{truncatedText}</p>
      {text.length > maxLength && (
        <a className={styles.description_link}>{showMore ? 'скрыть' : 'Show more'}</a>
      )}
    </div>
  )
}
const Slider: React.FC<SliderProps> = ({ photos }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  if (!photos || photos.length === 0) {
    return <p>No photos available</p>
  }

  const nextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === photos.length - 1 ? 0 : prevSlide + 1))
  }

  const prevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? photos.length - 1 : prevSlide - 1))
  }

  const loremIpsumText =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum ea eligendi quis placeat repudiandae quasi unde ut beatae velit, eaque, non veniam voluptas quaerat maiores enimsit id voluptatum exercitationem fuga totam assumenda amet. Esse sequi nobis temporibusblanditiis in sed quaerat aliquid sit, consequuntur odit mollitia veniam, unde errorplaceat quibusdam numquam. Debitis quas, reiciendis quod nihil, necessitatibus cumvoluptatem libero minima doloremque unde, ipsam labore placeat! Ad sequi quia nulla quod.Voluptatibus quo sunt quasi tenetur pariatur nemo voluptatum fugiat possimus quos delenitieveniet laboriosam sequi laudantium rerum, libero vero illum accusamus! Accusantiumtemporibus, velit animi perspiciatis nobis, cumque aut sequi hic consequatur aodioconsequuntur nostruodit quasi quis soluta repellat itaque! Corporis similique magni enimquas'

  return (
    <div className={styles.slider_wrapper}>
      <div className={styles.slider}>
        <button className={styles.slider_arrow_left} onClick={prevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className={styles.slideContainer}>
          <div className={styles.image_container}>
            <Image
              alt={`Slide ${currentSlide + 1}`}
              height={240}
              objectFit={'cover'}
              src={`${photos[currentSlide].urls.small}`}
              width={250}
            />
          </div>
          <div className={styles.overlay}></div>
          <div className={styles.indicators}>
            {photos.map((photo: Photo, index: number) => (
              <div
                className={`${styles.indicator} ${index === currentSlide && styles.active}`}
                key={index}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
        <button className={styles.slider_arrow_right} onClick={nextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className={styles.Wrapper_low_block}>
        <div className={styles.img_img_url_wrapper}>
          <div className={styles.image_wrapper}>
            <Image
              alt={`Slide ${currentSlide + 1}`}
              className={styles.rounded_image}
              height={40}
              objectFit={'cover'}
              src={`${photos[currentSlide].urls.small}`}
              width={40}
            />
          </div>
          <span>URLProfile</span>
        </div>
        <div className={styles.timeAgo}>22 min ago</div>
        <TextBlock maxLength={150} text={loremIpsumText} />
      </div>
    </div>
  )
}

export default Slider
