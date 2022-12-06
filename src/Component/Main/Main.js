import React from 'react';
import './Main.css';
import ImageSlider from './SliderMain/ImageSlider';
import { SliderData } from './SliderMain/SliderData';
import Slider from 'react-slick';
import { connect } from 'react-redux'
import { Component } from 'react'
import { Link } from 'react-router-dom';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            filmName: [],
            GraphicUrl: [],
            ApiFilmId: [],
            user: localStorage.getItem('email')
        }
    }
    componentDidMount() {
        this.props.GetMovieNow()
    }
    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        const setting = {
            dots: true,
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 3000,
            autoplaySpeed: 5000,
            cssEase: "linear"
        };

        const HandleMovieNow = () => {
            this.props.GetMovieNow();
        }

        const HandleMovieSoon = () => {
            this.props.GetMovieSoon();
        }

        const HandleDetailMovie = (ApiFilmId, Title, GraphicUrl) => {
            this.props.getDetailMovie(ApiFilmId)
            this.setState({
                filmName: localStorage.setItem('filmName', Title),
                GraphicUrl: localStorage.setItem('GraphicUrl', GraphicUrl),
                ApiFilmId: localStorage.setItem('ApiFilmId', ApiFilmId)
            })
        }
        return (
            <div className='main'>
                <div>
                    <ImageSlider slides={SliderData} />
                    <div className='index'>
                        <div className='section--product-view'>
                            <h1 className='title--promotion'>
                                <strong className='promotion-1'>
                                    <span onClick={HandleMovieNow}>PHIM ĐANG CHIẾU</span>
                                </strong>
                                <span style={{color: "white", fontWeight: '700'}}>|</span>
                                <strong className='promotion-2'>
                                    <span onClick={HandleMovieSoon}>PHIM SẮP CHIẾU</span>
                                </strong>
                            </h1>
                            <Slider {...settings} >
                                {
                                    this.props.main.lsMovieNowDetail.map((n, i) => {
                                        return (
                                            <div key={i}>
                                                <Link className='fa-ticket' to={this.state.user ? '/DetailMovie' : '/Login'}>
                                                    <div className='slider--film--main--full' onClick={() => { HandleDetailMovie(n.ApiFilmId, n.Title, n.GraphicUrl) }}>
                                                        <div className='slider--film--mainn'>
                                                            <img alt='' src={n.GraphicUrl} />
                                                            <span className='movie--name'>{n.Title}</span>
                                                        </div>
                                                        <a className='btn--greenn'>MUA VÉ</a>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
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
                                    <img alt='' src={require('../Main/SliderMain/ImageSliderMain/1920x1080-10.10.jpg')} />
                                </div>
                                <div className='promotion'>
                                    <img alt='' src={require('../Main/SliderMain/ImageSliderMain/App.jpg')} />
                                </div>
                                <div className='promotion'>
                                    <img alt='' src={require('../Main/SliderMain/ImageSliderMain/B2S-WEBSITE-1.png')} />
                                </div>
                                <div className='promotion'>
                                    <img alt='' src={require('../Main/SliderMain/ImageSliderMain/TKH-website-1920x1080.png')} />
                                </div>
                                <div className='promotion'>
                                    <img alt='' src={require('../Main/SliderMain/ImageSliderMain/Vani_BHD_Web-banner-1920x1080@4x-1.jpg')} />
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        main: state.main,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        GetMovieNow: () => {
            dispatch({ type: "GetMovieNow" })
        },
        GetMovieSoon: () => {
            dispatch({ type: "GetMovieSoon" })
        },
        getDetailMovie: (ApiFilmId) => {
            dispatch({ type: "GetDetailMovie", payload: { ApiFilmId: ApiFilmId } })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)