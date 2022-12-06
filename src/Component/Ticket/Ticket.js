import React from 'react';
import Slider from 'react-slick';
import './Ticket.css';
import { connect } from 'react-redux';
import { Component } from 'react'
import { Link } from "react-router-dom";

class Ticket extends Component {
  constructor() {
    super()
    this.state = {
      ApiFilmId: [],
      Title: [],
      GraphicUrl: []
    }
  }
  componentDidMount() {
    this.props.getFilms()
  }
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
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

    const getMovieDetail = (ApiFilmId, Title, GraphicUrl) => {
      this.props.GetMovieDetail(ApiFilmId)
      this.setState({
        ApiFilmId: localStorage.setItem('ApiFilmId', ApiFilmId),
        Title: localStorage.setItem("filmName", Title),
        GraphicUrl: localStorage.setItem("GraphicUrl", GraphicUrl)
      })
    }

    return (
      <div className='ticket'>
        <div className='section--product-view'>
          <ul className='film_list'>
            <li className='film_title' >
              <a href='/Ticket'>LỊCH CHIẾU THEO PHIM </a>
            </li>
            <span>|</span>
            <li className='list_cin'>
              <Link to='/Cinema'>LỊCH CHIẾU THEO RẠP</Link>
            </li>
          </ul>
          <Slider {...settings} style={{ width: '1200px', margin: 'auto' }}>
            {this.props.uRdc.listFilm.map((n, i) => {
              return <div className='slider--film--main' key={i} >
                <img alt='' src={n.GraphicUrl} />
                <span className='movie--name'>{n.Title}</span>
                <div className='btn--green'>
                  <Link className='fa-ticket' onClick={() => { getMovieDetail(n.ApiFilmId, n.Title, n.GraphicUrl) }} to='/DetailMovie'>MUA VÉ</Link>
                </div>
              </div>
            })}
          </Slider>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState, ownProps) => {
  return {
    uRdc: reduxState.filmsNow,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFilms: (val) => {
      dispatch({ type: "getFilms", payload: val })
    },
    GetMovieDetail: (ApiFilmId) => {
      dispatch({ type: "GetDetailMovie", payload: { ApiFilmId: ApiFilmId } })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket)
