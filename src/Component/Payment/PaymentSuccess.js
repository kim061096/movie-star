import React, { Component } from 'react'
import './PaymentSuccess.css'
import { Link } from 'react-router-dom';

export default class PaymentSuccess extends Component {
  render() {
    return (
      <div className='payment-success'>
        <div className='success-inline'>
          <div className='success'>
            <img alt='success' src={require('./ImageButton/correct.png')} />
            <h1>Đặt vé thành công</h1>
          </div>
          <div className='success-message'>
            <button><Link to='/DetailUser'>XEM VÉ ĐÃ ĐẶT</Link></button>
          </div>
        </div>
      </div>
    )
  }
}
