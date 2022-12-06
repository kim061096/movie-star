import './MovieBooking.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class MovieBooking extends Component {

    constructor() {
        super();
        this.state = {
            ApiFilmId: localStorage.getItem("ApiFilmId"),
            date: localStorage.getItem("date"),
            Cineplex: [],
            time: [],
            cinName: [],
            cinAdd: []
        }
    }

    componentDidMount() {
        this.props.GetScheduleMovie(
            this.state.ApiFilmId,
            this.state.date
        )
    }

    render() {

        const getCinLs = (n) => {
            this.props.GetScheduleMovie(
                this.state.ApiFilmId,
                DateTimeConvert(n, '#YYYY#-#M#-#DD#'),
            )
            this.setState({
                date: DateTimeConvert(n, '#YYYY#-#M#-#DD#'),
            })
        }

        const getLsBranch = (Cineplex) => {
            this.props.GetCinLs(
                this.state.ApiFilmId,
                this.state.date,
                Cineplex
            )

        }

        const handleLocation = (ShowTime, Name, Address) => {
            this.props.goPayment(
                ShowTime,
                Name,
                Address
            )
            this.setState({
                time: localStorage.setItem("time", DateTimeConvert(ShowTime, '#hhhh#:#mm# #AMPM# - #DDDD#, #DD#/#M#/#YYYY#')),
                cinName: localStorage.setItem("cinName", Name),
                cinAdd: localStorage.setItem("cinAdd", Address)
            })
        }


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

        return (
            <div className='booking-info' >
                <div className='movie-schedule'>
                    <h3 className='ticket-info'>VUI LÒNG CHỌN THÔNG TIN VÉ</h3>
                    <div className='list-times'>
                        <div className='flexslider '>
                            <div className='viewport'>
                                {
                                    this.props.detailmovie.movieSchedule.ShowTimes?.map((n, i) => {
                                        return (
                                            <ul key={i} className='tab-showtimes-controls' value={n} onClick={() => getCinLs(n)}>
                                                <li>
                                                    <a className='tab-control' key={i}>
                                                        <span className='week'>{DateTimeConvert(n, '#DDDD#')}</span>
                                                        <span className='day'>{DateTimeConvert(n, '#DD#-#M#-#YYYY#')}</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='tab-showtimes-contents'>
                            <div className='tab-content'>
                                <div className='lsCin'>
                                    {this.props.detailmovie.movieSchedule.Cineplexs?.map((m, i2) => {
                                        return (
                                            <ul className='cinemaList' key={i2} onClick={() => getLsBranch(m.Id)}>
                                                <li >
                                                    <div className='cinInfo'>
                                                        <a className='subCinInfo'>
                                                            <img src={m.Logo} />
                                                            <h4>{m.Name}</h4>
                                                        </a>
                                                    </div>
                                                </li>
                                            </ul>
                                        )
                                    })}
                                </div>
                                <ul className='list-showtimes-cinema'>
                                    {this.props.detailmovie.lsCinBranch.Items?.map((m1, l) => {
                                        return (
                                            <li className='item-showtimes-cinema' key={l}>
                                                <div className='info'>
                                                    <div className='inside'>
                                                        <h4 className='title'>{m1.Name}</h4>
                                                        <p>{m1.Address}</p>
                                                    </div>
                                                </div>
                                                <div className='date'>
                                                    <ul className='list-film-type'>
                                                        <li className='item--film-type'>
                                                            <div className='type'>
                                                                <span className='type-span'>
                                                                    2D
                                                                    <br />
                                                                    SUB
                                                                </span>
                                                                <span className='film-rating'>P</span>
                                                            </div>
                                                            <div className='lsTime'>
                                                                {this.props.detailmovie.lsCinBranch.Items[l].VersionsCaptions[0].ShowTimes.map((n, l1) => {
                                                                    return (
                                                                        <ul className='times' key={l1} onClick={() => { handleLocation(n.ShowTime, m1.Name, m1.Address) }}>
                                                                            <li>
                                                                                <Link className='time' to="/Booking">{n.ShowTimeDuration}</Link>
                                                                            </li>
                                                                        </ul>
                                                                    )
                                                                })}
                                                            </div>

                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='film--detail-bottom'>

                </div>
            </div >
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        detailmovie: state.detailmovie
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        GetScheduleMovie: (ApiFilmId, date) => {
            dispatch({ type: "GetMovieShedule", payload: { ApiFilmId: ApiFilmId, date: date } })
        },
        GetCinLs: (ApiFilmId, date, Cineplex) => {
            dispatch({ type: "GetCinBranch", payload: { ApiFilmId: ApiFilmId, date: date, Cineplex: Cineplex } })
        },
        goPayment: (ShowTime, date, Name, Address) => {
            dispatch({ type: "GetAll", payload: { ShowTime: ShowTime, date: date, Name: Name, Address: Address } })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieBooking)