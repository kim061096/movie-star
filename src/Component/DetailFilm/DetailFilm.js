import React from 'react'
import './DetailFilm.css'
import { connect } from 'react-redux'
import { Component } from 'react'
import { Link } from "react-router-dom";


class DetailFilm extends Component {
    constructor() {
        super();
        var today = new Date();
        this.state = {
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            cineplex: [],
            ApiCinemaId: [],
            newDate: [],
            GraphicUrl: [],
            filmName: [],
            ApiFilmId: []
        }
    }

    componentDidMount() {
        this.props.getSchedule(
            localStorage.getItem('cineplex'),
            localStorage.getItem('ApiCinemaId'),
            this.state.date,
        )
    }
    render() {
        const DateTimeConvert = (time, format) => {
            const date = new Date(time)
            return date.customFormat(format);
        }

        Date.prototype.customFormat = function (formatString) {
            var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
            YY = ((YYYY = this.getFullYear()) + "").slice(-2);
            MM = (M = this.getMonth() + 1) < 10 ? ('0' + M) : M;
            MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
            DD = (D = this.getDate()) < 10 ? ('0' + D) : D;
            DDD = (DDDD = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"][this.getDay()]).substring(0, 3);
            th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) === 1) ? 'st' : (dMod === 2) ? 'nd' : (dMod === 3) ? 'rd' : 'th';
            formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
            h = (hhh = this.getHours());
            if (h === 0) h = 24;
            if (h > 12) h -= 12;
            hh = h < 10 ? ('0' + h) : h;
            hhhh = hhh < 10 ? ('0' + hhh) : hhh;
            AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
            mm = (m = this.getMinutes()) < 10 ? ('0' + m) : m;
            ss = (s = this.getSeconds()) < 10 ? ('0' + s) : s;
            return formatString.replace("#hhhh#", hhhh).replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
        };

        const getFilmSchedule = (n) => {
            this.setState({
                date: localStorage.setItem('date', DateTimeConvert(n, '#DD#-#M#-#YYYY#'))
            })
            this.props.getSchedule1(
                localStorage.getItem('cineplex'),
                localStorage.getItem('ApiCinemaId'),
                DateTimeConvert(n, '#YYYY#-#M#-#DD#'),
            )
        }

        const moveToDetailMovie = (ApiFilmId) => {
            this.setState ({
                ApiFilmId: localStorage.setItem('ApiFilmId', ApiFilmId)
            })
        }
        const goPayment = (ShowTime, Title, GraphicUrl, ApiFilmId) => {
            this.setState({
                newDate: localStorage.setItem('time', DateTimeConvert(ShowTime, '#hhhh#:#mm# #AMPM# - #DDDD#, #DD#/#M#/#YYYY#')),
                filmName: localStorage.setItem('filmName', Title),
                GraphicUrl: localStorage.setItem('GraphicUrl', GraphicUrl),
                ApiFilmId: localStorage.setItem('ApiFilmId', ApiFilmId)
            })
        }

        return (
            this.props.uRdc.lsSchedule &&
            <div className='warper-content'>
                <div className='lich-chieu-phim'>
                    <h3 className='mua_ve'>VUI LÒNG CHỌN THÔNG TIN VÉ</h3>
                    <div className='list--times'>
                        <div className='flexslider '>
                            <div className='flex-viewport'>
                                {this.props.uRdc.lsSchedule.cinSchedule?.map((n, i) => {
                                    return (
                                        <ul className='tab--showtimes-controls' key={i} onClick={() => { getFilmSchedule(n) }}>
                                            <li>
                                                <a className='tab--control'>
                                                    <span className='week'>{DateTimeConvert(n, '#DDDD#')}</span>
                                                    <span className='day'>{DateTimeConvert(n, '#DD#-#M#-#YYYY#')}</span>
                                                </a>
                                            </li>
                                        </ul>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='film--wrapper'>
                    {this.props.uRdc.lsSchedule.filmSchedule &&
                        <div className='container'>
                            {this.props.uRdc.lsSchedule.filmSchedule.map((n2, i2) => {
                                return (
                                    <div className='film--detail-content-top' key={i2}>
                                        <div className='row'>
                                            <div className='col-thubnail-bhd'>
                                                    <Link onClick={() => (moveToDetailMovie(n2.ApiFilmId))} to = '/DetailMovie'><img className='movie-full' src={n2.GraphicUrl}/></Link>
                                            </div>
                                            <div className='product--view'>
                                                <div className='product--name'>
                                                    <h2>{n2.ApiRatingFormat}</h2>
                                                    <h3 className=''>{n2.Title}</h3>
                                                </div>
                                                <div className='film--detail'>
                                                    <p>{n2.ApiGenreName}</p>
                                                    <h2>2D Phụ đề</h2>
                                                </div>
                                                <div className='time'>
                                                    {this.props.uRdc.lsSchedule.filmSchedule[i2].VersionsCaptions[0].ShowTimes.map((m, i) => {
                                                        return (
                                                            <div key={i}>
                                                                <ul className='film--info' onClick={() => { goPayment(m.ShowTime, n2.Title, n2.GraphicUrl, n2.ApiFilmId) }}>
                                                                    <li>
                                                                        <a className='col-left'><Link to='/Booking'>{m.ShowTimeDuration}</Link></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    }
                </div>

            </div >

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
        getSchedule: (cineplex, ApiCinemaId, date) => {
            dispatch({ type: "getSchedule", payload: { cineplex: cineplex, ApiCinemaId: ApiCinemaId, date: date } })
        },
        getSchedule1: (cineplex, ApiCinemaId, date) => {
            dispatch({ type: "getSchedule1", payload: { cineplex: cineplex, ApiCinemaId: ApiCinemaId, date: date } })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailFilm)

