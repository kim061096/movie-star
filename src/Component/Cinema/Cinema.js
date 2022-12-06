import React from 'react';
import './Cinema.css';
import { connect } from 'react-redux';
import { Component } from 'react'
import {Link} from "react-router-dom";

class Ticket extends Component {
  constructor() {
    super();
    var today = new Date();
    this.state = {
      cineplex: [],
      ApiCinemaId: [],
      date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
      cinName: [],
      cinAdd: []
    }
  }
  componentDidMount() {
    this.props.getCins()
  }


  render() {
    const getBranch = (cineplex) => {
      this.props.getBranch(cineplex)
      this.setState({
        cineplex: localStorage.setItem('cineplex', cineplex)
      })
    }

    const getSchedule = (ApiCinemaId, Name, Address) => {
      this.props.getSchedule(
        localStorage.getItem('cineplex'),
        ApiCinemaId,
        this.state.date
      )
      this.setState({
        ApiCinemaId: localStorage.setItem('ApiCinemaId', ApiCinemaId),
        cinName: localStorage.setItem('cinName', Name),
        cinAdd: localStorage.setItem('cinAdd', Address)
      })
    }

    return (
      <div className='cinema'>
        <ul className='film_list'>
          <li className='film_title' >
            <a href='/Ticket'>LỊCH CHIẾU THEO PHIM </a>
          </li>
          <span>|</span>
          <li className='list_cin'>
            <a href='#'>LỊCH CHIẾU THEO RẠP</a>
          </li>
        </ul>
        <div className='sub_cinema'>
          {this.props.uRdc.listCin.map((n, i) => {
            return (
              <ul className='cinema_name' key={i}>
                <li onClick={() => { getBranch(n.Id) }}>
                  <img src={n.Logo} />
                  <a>{n.Name}</a>
                </li>
              </ul>
            )
          })}
        </div>
        <div className='branchLs'>
          {this.props.uRdc.lsBranch.map((m, i2) => {
            return (
              <ul className='cinema_detail' key={i2}>
                <li >
                  <div className='info'>
                    <a className='subInfo'>
                      <h4><img src={m.Logo} />{m.Name}</h4>
                      <p>{m.Address}</p>
                    </a>
                  </div>
                </li>
                <Link className='xem' onClick={() => { getSchedule(m.ApiCinemaId, m.Name, m.Address) }} to='/DetailFilm'>Xem</Link>
              </ul>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState, ownProps) => {
  return {
    uRdc: reduxState.listCins,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCins: (val) => {
      dispatch({ type: "getCins", payload: val })
    },
    getBranch: (cineplex) => {
      dispatch({ type: "getLsBranch", payload: { cineplex: cineplex } })
    },
    getSchedule: (cineplex, ApiCinemaId, date) => {
      dispatch({ type: "getSchedule", payload: { cineplex: cineplex, ApiCinemaId: ApiCinemaId, date: date } })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket)
