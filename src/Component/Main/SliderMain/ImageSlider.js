import React, { useState } from 'react'
import { SliderData } from './SliderData'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
        console.log(current);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
        console.log(current);
    }

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null
    }
    return (
        <section>
            <FaArrowLeft className='left-arrow' onClick={prevSlide} />
            <FaArrowRight className='right-arrow' onClick={nextSlide} />
            {SliderData.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (<img src={slide.image} alt="slider image" className='images-slider' />)}
                    </div>
                )
            })}
        </section>
    )
}

export default ImageSlider