import React, { Component } from 'react'
import './DetailUser.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class DetailUser extends Component {
    constructor() {
        super()
        this.state = {
            email: localStorage.getItem('email')
        }
    }

    componentDidMount() {
        this.props.getUserInfo(
            this.state.email
        )
    }
    render() {

        const handleLgOut = () => {
            localStorage.clear()
        }

        return (
            <div className='user-detail'>
                <div className='bhd-page-user-detail'>
                    <div className='info-user-detail'>
                        <div className='member--edit'>
                            <div className='member--info'>
                                <a className='avatar'>
                                    <img alt='' src={require('./ImageDetailUser/avatar.png')} />
                                </a>
                                <h4 className='title'>{localStorage.getItem('email')}</h4>
                                <ul className='meta'>
                                    <li>
                                        <strong>Tổng visit: </strong>
                                        <strong className='point'>0</strong>
                                    </li>
                                    <li>
                                        <strong>Active visit: </strong>
                                        <strong className='point'>0</strong>
                                    </li>
                                    <li>
                                        <strong>Expried visit: </strong>
                                        <strong className='point'>0</strong>
                                    </li>
                                </ul>
                                <ul className='meta'>
                                    <li>
                                        <strong>Điểm thưởng: </strong>
                                        <strong className='point'>0</strong>
                                    </li>
                                    <li>
                                        <strong>Tổng chi tiêu trong tháng: </strong>
                                        <strong className='point'>0</strong>
                                    </li>
                                    <li>
                                        <strong>Expried visit: </strong>
                                        <strong className='point'>0</strong>
                                        <sup>đ</sup>
                                    </li>
                                </ul>
                            </div>
                            <form className='form--inside'>
                                <label className='controls'>
                                    <span className='txt--label'>Email</span>
                                    <input type='email' className='inp--text' value={this.props.uRdc.userInfo.email} />
                                </label>

                                <label className='controls'>
                                    <span className='txt--label'>Họ (*)</span>
                                    <input type='email' className='inp--text' />
                                </label>
                                <label className='controls'>
                                    <span className='txt--label'>Tên (*)</span>
                                    <input type='email' className='inp--text' />
                                </label>
                                <label className='controls'>
                                    <span className='txt--label'>Số điện thoại (*)</span>
                                    <input type='email' className='inp--text' />
                                </label>
                                <label className='controls'>
                                    <span className='txt--label'>Giới tính (*)</span>
                                    <input type='email' className='inp--text' />
                                </label>
                                <label className='controls'>
                                    <span className='txt--label'>Địa chỉ</span>
                                    <input type='email' className='inp--text' />
                                </label>
                                <label className='controls'>
                                    <span className='txt--label'>Thành phố</span>
                                    <input type='email' className='inp--text' />
                                </label>
                            </form>
                        </div>
                    </div>
                    <div className='cardinfo-user-detail'>
                        <div className='member-card'>
                            <h3>Thông tin vé</h3>
                            <ul>
                                <li>Phim: {localStorage.getItem('filmName')}</li>
                                <li>Suất chiếu:
                                    <span className='no'>{localStorage.getItem('time')}</span>
                                </li>
                                <li>Số vé: {localStorage.getItem('countTicket')}</li>
                                <li>Số ghế: {localStorage.getItem('seats')}</li>
                                <li>Rạp:
                                    <span className='lv'>{localStorage.getItem('cinName')}</span>
                                </li>
                                <li>Địa chỉ: {localStorage.getItem('cinAdd')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='transactions'>
                    <div className='transactions-detail'>
                        <div className='member-history'>
                            <h3>Vé đã đặt gần đây</h3>
                            <table className='table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Phim</th>
                                        <th>Suất chiếu</th>
                                        <th>Số vé</th>
                                        <th>Số ghế</th>
                                        <th>Rạp</th>
                                        <th>Địa chỉ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.uRdc.userInfo.ticket?.map((n, i) => {
                                        return (
                                            <tr key={i}>
                                                <td style={{ display: 'flex' }}>
                                                    <img src={n.avatar} style={{ width: '100px', paddingRight: '5px' }} />
                                                    <p>{n.filmName}</p>
                                                </td>
                                                <td>{n.date}</td>
                                                <td>{n.ticketNum}</td>
                                                <td>{n.seatCode}</td>
                                                <td>{n.cinema}</td>
                                                <td>{n.cinAdd}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='sign-out-cover'>
                    <Link to='/Main'><button className='sign-out' onClick={handleLgOut}>ĐĂNG XUẤT</button></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState, ownProps) => {
    return {
        uRdc: reduxState.allInfo,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserInfo: (email) => {
            console.log(email);
            dispatch({ type: "GetUserInfo", payload: email })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailUser)

