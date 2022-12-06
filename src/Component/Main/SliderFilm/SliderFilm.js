import React from 'react'
import Slider from 'react-slick';
import './SliderFilm.css'
import { connect } from 'react-redux'

function SliderFilm(props) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };
    const setting = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };
    return (
        <div className='index'>
            <div className='section--product-view'>
                <h1 className='title--promotion'>
                    <strong className='promotion-1'>
                        <span>PHIM ĐANG CHIẾU</span>
                    </strong>
                    <strong className='promotion-2'>
                        <span>PHIM SẮP CHIẾU</span>
                    </strong>
                    <strong className='promotion-3'>
                        <span>VÉ BÁN TRƯỚC</span>
                    </strong>
                </h1>
                {
                    props.main.lsMovieNow.map((n, i) => {
                        return (
                            <Slider {...settings}>
                                <div className='slider--film--main' key={i}>
                                    <img alt='' src={require(n.BannerUrl)} />
                                    <span className='movie--name'>{n.Title}</span>
                                    <a className='btn--green'>
                                        <i className='fa-ticket'>MUA VÉ</i>
                                    </a>
                                </div>
                            </Slider>
                        )
                    })
                }
            </div>
            <div className='section--promotion'>
                <h1 className='title--promotion'>
                    <strong className='promotion-1'>
                        <span>Khuyến mãi</span>
                    </strong>
                    <span className='data-text'>|</span>
                    <strong className='promotion-2'>
                        <span>Sự kiện</span>
                    </strong>
                </h1>
                <Slider {...setting}>
                    <div className='promotion'>
                        <img alt='' src={require('../SliderMain/ImageSliderMain/1920x1080-10.10.jpg')} />
                    </div>
                    <div className='promotion'>
                        <img alt='' src={require('../SliderMain/ImageSliderMain/App.jpg')} />
                    </div>
                    <div className='promotion'>
                        <img alt='' src={require('../SliderMain/ImageSliderMain/B2S-WEBSITE-1.png')} />
                    </div>
                    <div className='promotion'>
                        <img alt='' src={require('../SliderMain/ImageSliderMain/TKH-website-1920x1080.png')} />
                    </div>
                    <div className='promotion'>
                        <img alt='' src={require('../SliderMain/ImageSliderMain/Vani_BHD_Web-banner-1920x1080@4x-1.jpg')} />
                    </div>
                </Slider>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        main: state.main
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        GetMovieNow: (value) => {
            dispatch({ type: "GetMovieNow", payload: value })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderFilm)
