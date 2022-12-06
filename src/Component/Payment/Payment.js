import React, { Component } from 'react'
import './Payment.css'
import { withRouter } from '../Login/withRouter'

class Payment extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                email: localStorage.getItem('email'),
                card: {
                    cardNum: "",
                    CardName: "",
                    exDate: "",
                    cvc: ""
                },
                ticket: {
                    cineplex: localStorage.getItem('cineplex'),
                    apiCinemaId: localStorage.getItem('ApiCinemaId'),
                    apiFilmId: localStorage.getItem('ApiFilmId'),
                    seatCode: localStorage.getItem('seats'),
                    date: localStorage.getItem('date'),
                    filmName: localStorage.getItem('filmName'),
                    ticketNum:localStorage.getItem('countTicket'),
                    cinema: localStorage.getItem('cinName'),
                    cinAdd: localStorage.getItem('cinAdd'),
                    avatar: localStorage.getItem('GraphicUrl')
                }
            },
            errMess: ""
        }
    }

    render() {
        const handleInput = (event) => {
            this.setState({
                user: {
                    ...this.state.user,
                    card: {
                        ...this.state.user.card,
                        [event.target.name]: event.target.value,
                    }
                }
            })
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            if (Object.values(this.state.user.card).filter(n => n === "").length === 0) {

                fetch("http://localhost:3003/user/payment",
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify(this.state.user)
                    })
                    .then(res => {
                        if (res.status === 200) {
                            this.setState({
                                errMess: "Thanh toán thành công",
                            })
                            this.props.navigate('/PaymentSuccess')
                        } else {
                            this.setState({
                                errMess: "Thanh toán không thành công"
                            })
                        }
                    })
            }
            else {
                this.setState({
                    errMess: "Vui lòng nhập đầy đủ thông tin thanh toán"
                })
            }
        }

        const handleLgOut = () => {
            const keys = ['cinName', 'date', 'ApiFilmId', 'filmName', 'time', 'counterVip',
                'totalStand', 'totalVip', 'counterStandard', 'GraphicUrl', 'cinAdd', 'totalAmount'
            ]
            keys.forEach(k =>
                localStorage.removeItem(k)
            )
            this.props.navigate('/Main')
        }

        return (
            <section className='content'>
                <article>
                    <form className='confirmForm'>
                        <div className='cart-summary'>
                            <h2>GIỎ HÀNG CỦA BẠN</h2>
                            <div className='cart-summary-order'>
                                <ul className='cart-sessions'>
                                    <li className='cart-session'>
                                        <button className='icon-clear'></button>
                                        <dl>
                                            <div className='bhds-car-cus-filmname'>
                                                <span className='bhds-car-cus-MovieTitle'>
                                                    <span className='bhds-car-cus-tt'>Phim:</span>
                                                    {localStorage.getItem("filmName")}
                                                </span>
                                                <br />
                                                <span className='bhds-car-cus-Cinema'>
                                                    <span className='bhds-car-cus-tt'>Rạp:</span>
                                                    <p>{localStorage.getItem("cinName")}</p>
                                                    <p className='cinAdd'>{localStorage.getItem("cinAdd")}</p>
                                                </span>
                                                <span>
                                                    <span className='bhds-car-cus-tt'>Suất chiếu:</span>
                                                    <h1>{localStorage.getItem('time')}</h1>
                                                </span>
                                                <span className='bhds-car-cus-Seat'>
                                                    <span className='bhds-car-cus-tt'>Ghế:</span>
                                                    {localStorage.getItem('seats')}
                                                </span>
                                                <br />
                                                <span className='bhds-car-cus-TotalAmount'>
                                                    <span className='bhds-car-cus-tt'>Thành tiền:</span>
                                                    {localStorage.getItem('totalAmount')} VND
                                                </span>
                                                <br />
                                                <span>
                                                    Quý khách vui lòng kiểm tra lại thông tin trước khi thanh toán.
                                                    <br />
                                                </span>
                                                <span className='bhds-car-cus-mess'>
                                                    Vé mua rồi sẽ không được đổi hoặc trả lại
                                                </span>
                                            </div>
                                        </dl>
                                        <table className='info-payment'>
                                            <thead>
                                                <tr>
                                                    <th class="name">Mục</th>
                                                    <th class="number-cost">Giá</th>
                                                    <th class="name">Số lượng</th>
                                                    <th class="name">Cộng</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='cart-ticket'>
                                                    <td className='name'>Adult-Stand-2D</td>
                                                    <td className='number-cost'>80,000.00</td>
                                                    <td className='number-quantity'>{localStorage.getItem('counterStandard')}</td>
                                                    <td className='number-subtotal'>
                                                        <span className='price'>{localStorage.getItem('totalStand')}</span>
                                                    </td>
                                                </tr>
                                                <tr className='cart-ticket-alt'>
                                                    <td className='name'>Adult-Vip-2D</td>
                                                    <td className='number-cost'>90,000.00</td>
                                                    <td className='number-quantity'>{localStorage.getItem('counterVip')}</td>
                                                    <td className='number-subtotal'>
                                                        <span className='price'>{localStorage.getItem('totalVip')}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                </ul>
                                <dl className='total'>
                                    <dt>Tổng cộng</dt>
                                    <dd className='price'>{localStorage.getItem('totalAmount')} VND</dd>
                                </dl>
                            </div>
                        </div>
                        <h2>CHI TIẾT CÁ NHÂN</h2>
                        <div className='personal-details'>
                            {Object.keys(this.state.user.card).map((n, i) => {
                                return (
                                    <div className='form-line' key={i}>
                                        <label style={{textTransform: "capitalize"}}>{n}:</label>
                                        <input type='text' value={this.state.user.card[n]} onChange={handleInput} name={n} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='button-list'>
                            <button className='cancelOrder' type='button' onClick={handleLgOut}>
                                <span>HỦY ĐẶT VÉ</span>
                            </button>
                            <button className='bt-payment' type='button' onClick={handleSubmit}>
                                <span>THANH TOÁN</span>
                            </button>
                            <h1 style={{ color: "red" }}>{this.state.errMess}</h1>
                        </div>
                    </form>
                </article>
            </section>
        )
    }
}




export default withRouter(Payment)