import React, { Component } from 'react'
import './Booking.css'
import { withRouter } from '../Login/withRouter'

class Booking extends Component {
    constructor() {
        super()
        this.state = {
            counterStandard: 0,
            counterVip: 0,
            disable: false,
            total: 0,
            totalStand: 0,
            totalVip: 0,
            errMess: ''
        }
    }

    increaseCounterVip = (e) => {
        e.preventDefault()
        this.setState({
            counterVip: this.state.counterVip + 1
        })
    }

    decreaseCounterVip = (e) => {
        e.preventDefault()
        if (this.state.counterVip > 0)
            this.setState({
                counterVip: this.state.counterVip - 1
            });
        else this.setState({ disable: true })
    }


    increaseCounterStandard = (e) => {
        e.preventDefault()
        this.setState({
            counterStandard: this.state.counterStandard + 1
        })
    }

    decreaseCounterStandard = (e) => {
        e.preventDefault()
        if (this.state.counterStandard > 0)
            this.setState({
                counterStandard: this.state.counterStandard - 1
            });
        else this.setState({ disable: true })
    }

    render() {
        const selectSeat = (e) => {
            e.preventDefault();
            if (this.state.counterStandard || this.state.counterVip !== 0) {
                this.props.navigate('/ChooseSeatsPanel')
            this.setState({
                total: localStorage.setItem('totalAmount', total.toLocaleString(navigator.language, { minimumFractionDigits: 2 })),
                totalStand: localStorage.setItem('totalStand', totalStand.toLocaleString(navigator.language, { minimumFractionDigits: 2 })),
                totalVip: localStorage.setItem('totalVip', totalVip.toLocaleString(navigator.language, { minimumFractionDigits: 2 })),
                counterStandard: localStorage.setItem('counterStandard', this.state.counterStandard),
                counterVip: localStorage.setItem('counterVip', this.state.counterVip)
            })
        } else {
            this.setState ({
                errMess: 'Vui lòng chọn số lượng vé muốn đặt'
            })
        }
        }

        const totalStand = this.state.counterStandard * 80000
        const totalVip = this.state.counterVip * 90000
        const total = totalStand + totalVip

        return (
            <section className='content1'>
                <section className='content'>
                    <article>
                        <div className='select-tickets'>
                            <form>
                                <div className='breadcrumb'>
                                    <span className='selected'>
                                        <span>1. Chọn vé</span>
                                    </span>
                                </div>
                                <div className='order-details'>
                                    <section className='cart-order'>
                                        <h2>GIỎ HÀNG CỦA BẠN</h2>
                                        <ul className='cart-sessions'>
                                            <li className='cart-current-session'>
                                                <div className='cart-session-information'>
                                                    <span className='name'>{localStorage.getItem('filmName')}</span>
                                                </div>
                                                <ul className='cart-tickets'>
                                                    <li className='cart-ticket'>
                                                        <div className='item-detail'>
                                                            <span className='name'>Adult-Stand-2D</span>
                                                        </div>
                                                        <span className='quantity'>{this.state.counterStandard}</span>
                                                        <div className='cost'>
                                                            <span className='price'>80,000.000</span>
                                                        </div>
                                                    </li>
                                                    <li className='cart-ticket alt'>
                                                        <div className='item-detail'>
                                                            <span className='name'>Adult-Vip-2D</span>
                                                        </div>
                                                        <span className='quantity'>{this.state.counterVip}</span>
                                                        <div className='cost'>
                                                            <span className='price'>90,000.000</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <div className='cart-footer'>
                                            <ul>
                                                <li className='total'>
                                                    <span className='names'>Tổng cộng</span>
                                                    <span className='price'>VND {total.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>
                                </div>

                                <div className='session-overview'>
                                    <img alt='' className='movie-poster' src={localStorage.getItem("GraphicUrl")} />
                                    <h4 className='movie-title'>{localStorage.getItem("filmName")}</h4>
                                    <div className='session-time'>Suất chiếu:  {localStorage.getItem('time')}</div>
                                    <div className='cinema-screen-name'>{localStorage.getItem('cinName')} : {localStorage.getItem('cinAdd')}</div>
                                </div>
                                <div className='SelectTicketsPanel'>
                                    <h3>LƯU Ý</h3>
                                    <article className='main-page-blurb'>
                                        <p>
                                            - Hãy chọn kỹ loại vé và số lượng bạn muốn mua
                                        </p>
                                    </article>
                                    <div className='category-tabs'>
                                        <ol className='categories-ui-corner-all'>
                                            <li className='tab-list-item-standard'>
                                                <a>Standard</a>
                                            </li>
                                        </ol>
                                        <div className='ticket-list'>
                                            <div className='tab'>
                                                <h6 className='desc'>Vé</h6>
                                                <h6 className='cost-header'>Giá</h6>
                                                <h6 className='quantity-header'>Số lượng</h6>
                                                <h6 className='sub-total-header'>Tổng</h6>
                                                <ul>
                                                    <li className='item'>
                                                        <label className='desc'>
                                                            <span className='ticket-description'>Adult-Stand-2D</span>
                                                        </label>
                                                        <span className='price '>  80,000.00</span>
                                                        <span className='ticket-quantity'>
                                                            <button className='icon-minus' onClick={this.decreaseCounterStandard} disabled={this.state.disable}></button>
                                                            <span className='quantity-valid'>{this.state.counterStandard}</span>
                                                            <button className='icon-plus' onClick={this.increaseCounterStandard}></button>
                                                        </span>
                                                        <span className='sub-total'>{totalStand.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</span>
                                                    </li>
                                                    <li className='item'>
                                                        <label className='desc'>
                                                            <span className='ticket-description'>Adult-Vip-2D</span>
                                                        </label>
                                                        <span className='price '>  90,000.00</span>
                                                        <span className='ticket-quantity'>
                                                            <button className='icon-minus' onClick={this.decreaseCounterVip} disabled={this.state.disable}></button>
                                                            <span className='quantity-valid'>{this.state.counterVip}</span>
                                                            <button className='icon-plus' onClick={this.increaseCounterVip}></button>
                                                        </span>
                                                        <span className='sub-total'>{totalVip.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='divOrderTickets'>
                                            <button className='page-action' onClick={selectSeat}>
                                                <span>CHỌN GHẾ</span>
                                            </button>
                                            <h1 style={{ color: "red" }}>{this.state.errMess}</h1>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </article>
                </section>
            </section>
        )
    }
}

export default withRouter (Booking)