import './DetailMovie.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Rating from './Rating';
import ReactPlayer from "react-player";

class DetailMovie extends Component {

    constructor() {
        super();
        var today = new Date();
        this.state = {
            ApiFilmId: localStorage.getItem("ApiFilmId"),
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            filmName: [],
            showTrailer: false
        }
    }

    componentDidMount() {
        this.props.GetMovieDetail(
            this.state.ApiFilmId
        )
    }


    render() {

        const getSchedule = () => {
            this.props.GetScheduleMovie(
                this.state.ApiFilmId,
                this.state.date,
            )
            this.setState({
                date: localStorage.setItem('date', this.state.date),
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

        const playTrailer = () => {
            this.setState({
                showTrailer: !this.state.showTrailer
            })
        }

        return (
            <div className='warper' >
                <div className='film'>
                    <div className='container'>
                        <div className='film--detail'>
                            <h3>
                                <Link to='/Main'>Trang chủ</Link>
                            </h3>
                            <h3>
                                <a className='spacing'>|</a>
                            </h3>
                            {
                                this.props.detailmovie.contentDetailMovie.map((n, i) => {
                                    return (
                                        <h3 className='active' key={i}>{n.Title}  </h3>
                                    )
                                })
                            }

                        </div>
                        {
                            this.props.detailmovie.contentDetailMovie.map((n, i) => {
                                return (
                                    <div className='film--detail-content' key={i}>
                                        <div className='row'>
                                            <div className='col-thubnail'>
                                                <a>
                                                    <img className='movie-full' src={n.GraphicUrl} />
                                                </a>
                                            </div>
                                            <div className='product'>
                                                <div className='sub'>
                                                    <div className='sub1'>
                                                        <div className='product-name'>
                                                            <h3 className=''>{n.TitleEn}</h3>
                                                        </div>
                                                        <div className='film-detail'>
                                                            {n.SynopsisEn}
                                                        </div>
                                                        <div className='sub2'>
                                                            <ul className='film-info'>
                                                                <li>
                                                                    Tổng lượt xem : {n.TotalViews}
                                                                </li>
                                                                <li>
                                                                    Kiểu phim : {n.ApiFilmType}
                                                                </li>
                                                                <li>
                                                                    Độ tuổi: {n.ApiRatingFormat}
                                                                </li>
                                                                <li>
                                                                    Thể loại: {n.ApiGenreName}
                                                                </li>
                                                                <li>
                                                                    Khởi chiếu: {DateTimeConvert(n.OpeningDate, '#DD#-#M#-#YYYY#')}
                                                                </li>
                                                                <li>
                                                                    Thời lượng: {n.Duration} phút
                                                                </li>
                                                                <li>
                                                                    Đánh giá: {n.Meta.RatingCount}
                                                                </li>
                                                                <li>
                                                                    Điểm: {n.Meta.RatingValue}
                                                                </li>

                                                            </ul>
                                                            <div>
                                                                <Rating />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='button--green'>
                                                    <button className='btn--green' onClick={() => { playTrailer() }}> XEM TRAILER</button>
                                                    <Link className='btn--green' onClick={() => { getSchedule(n.ApiFilmId) }} to='/MovieBooking'>MUA VÉ NGAY</Link>
                                                </div>
                                                {this.state.showTrailer && (
                                                    <ReactPlayer
                                                        className='trailer'
                                                        url={n.TrailerUrl}
                                                        width='840px'
                                                        height='500px'
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        detailmovie: state.detailmovie,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        GetMovieDetail: (ApiFilmId) => {
            dispatch({ type: "GetDetailMovie", payload: { ApiFilmId: ApiFilmId } })
        },
        GetScheduleMovie: (ApiFilmId, date) => {
            dispatch({ type: "GetMovieShedule", payload: { ApiFilmId: ApiFilmId, date: date } })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie)