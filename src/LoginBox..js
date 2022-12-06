import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';


class LoginBox extends Component {
  constructor() {
    super()
    this.state = {
      userEmail: localStorage.getItem("email"),
      user: {
        email: "",
        password: ""
      },
      errMess: "",
      showPass: false
    }
  }


  render() {

    const handleInput = (event) => {
      this.setState({
        user: {
          ...this.state.user,
          [event.target.name]: event.target.value,
        }
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (Object.values(this.state.user).filter(n => n === "").length === 0) {

        fetch("http://localhost:3003/user/login",
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
                errMess: "Đăng nhập thành công",
                user: {
                  email: localStorage.setItem("email", this.state.user.email),
                }
              })
              window.location.href = '/'
            } else {
              this.setState({
                errMess: "Email hoặc password không đúng"
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

    const handleLgOut = (e) => {
      e.preventDefault();
      localStorage.clear()
      window.location.href = '/'
    }

    const handleShowPass = (e) => {
      e.preventDefault();
      this.setState({
        showPass: !this.state.showPass
      })
    }

    return (
      this.state.userEmail === null ?
        <form className='bhd-form-login-top'>
          {Object.keys(this.state.user).map((n, i) => {
            return (
              <div className='controls' key={i}>
                {n === 'password' ?
                  <input placeholder='Password' className='user_login_email' type={this.state.showPass ? "text" : "password"} value={this.state.user[n]} onChange={handleInput} name={n} />
                  :
                  <input placeholder='Email' className='user_login_email' type='text' value={this.state.user[n]} onChange={handleInput} name={n} />
                }
              </div>
            )
          })}
          <div className='dn--sp'>
            <div className='btn-show-pass'>
              <button className='show-pass' onClick={handleShowPass}>Hiển thị mật khẩu</button>
            </div>
            <div className='controls--submit'>
              <a onClick={handleSubmit}>
                <span className='login-submit'>ĐĂNG NHẬP</span>
              </a>
            </div>
          </div>
          <Link className='bhd-dang-ky' to='/Register'>Đăng ký thành viên</Link>
        </form>
        :
        <div style={{width: "auto"}}>
          <button style={{ background: "red", borderRadius: "8px" }} className='log-out' onClick={handleLgOut}>ĐĂNG XUẤT</button>
        </div>
    )
  }
}



export default LoginBox


