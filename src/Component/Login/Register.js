import React, { Component } from 'react'
import Slider from 'react-slick';
import './Login.css'
import { withRouter } from './withRouter'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        email: "",
        password: ""
      },
      errMess: "",
      showPass: false
    }
  }

  render() {
    const setting = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
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

    const handleInput = (event) => {
      this.setState({
        user: {
          ...this.state.user,
          [event.target.name]: event.target.value,
        }
      })
      console.log(this.state.user);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (Object.values(this.state.user).filter(n => n == "").length === 0) {

        fetch("http://localhost:3003/user/register",
          {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.state.user)
          })
          .then(res => {
            if (res.status == 200) {
              this.setState({
                errMess: "Đăng ký thành công",
              })
              // this.props.navigate('/Login')
            } else {
              this.setState({
                errMess: "Email hoặc password đã tồn tại"
              })
            }
          })
      }
      else {
        this.setState({
          errMess: "Vui lòng nhập đầy đủ"
        })
      }
    }

    const handleShowPass = (e) => {
      e.preventDefault();
      this.setState({
        showPass: !this.state.showPass
      })
    }
    return (
      <div className='warper-content-register'>
        <div className='page--member'>
          <div className='container'>
            <div className='product--title'>
              <h3 className='current'>
                <a href='#'>THÀNH VIÊN</a>
              </h3>
              <span>|</span>
              <h3 className='current'>
                <a href='#'>FAQ</a>
              </h3>
              <span>|</span>
              <h3 className='current'>
                <a href='#'>QUY ĐỊNH</a>
              </h3>
              <span>|</span>
            </div>
            <div className='bhd-page-user'>
              <div className='register-right'>
                <h4 className='title--member'>ĐĂNG KÝ MỚI</h4>
                <div className='member--login'>
                  <form className='form--inside' action=''>
                    {Object.keys(this.state.user).map((n, i) => {
                      return (
                        <div className='controls' key={i}>
                          <label className='txt--label'>{n}(*)</label>
                          {n === 'password' ?
                            <input className='inp--text' type={this.state.showPass ? "text" : "password"} value={this.state.user[n]} onChange={handleInput} name={n} />
                            :
                            <input className='inp--text--email' type='text' value={this.state.user[n]} onChange={handleInput} name={n} />
                          }
                        </div>
                      )
                    })}
                    <div className='btn-show-pass'>
                      <button className='show-pass' onClick={handleShowPass}>Hiển thị mật khẩu</button>
                    </div>
                    <div>
                      <label className='bhd-dieu-khoan'>
                        <input type='checkbox' className='inp--checkbox' />
                        <span>Tôi đã đọc, hiểu và đồng ý với các
                          <a>điều khoản</a>
                        </span>
                      </label>
                      <br />
                      <label className='bhd-dieu-khoan'>
                        <input type='checkbox' className='inp--checkbox' />
                        <span>Nhận thông tin chương trình khuyến mãi</span>
                      </label>
                    </div>
                    <div className='form--lasts'>
                      <button onClick={handleSubmit} type='submit' className='login-submit' to='/Login'> ĐĂNG KÝ</button>
                    </div>
                    <div className="messages">
                      <h1 style={{ color: "red" }}>{this.state.errMess}</h1>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div >
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
      </div >

    )
  }
}

export default withRouter(Register)

