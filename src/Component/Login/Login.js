import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Login.css'
import { connect } from 'react-redux';

class Login extends Component {
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
        const handleInput = (event) => {
            this.setState({
                user: {
                    ...this.state.user,
                    [event.target.name]: event.target.value,
                }
            })
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (Object.values(this.state.user).filter(n => n == "").length === 0) {

                await fetch("http://localhost:3003/user/login",
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

        const handleShowPass = (e) => {
            e.preventDefault();
            this.setState({
                showPass: !this.state.showPass
            })
        }

        return (
            <div className='login-content'>
                <div className='page--member'>
                    <div className='container'>
                        <div className='product--title'>
                            <h3 className='current'>
                                <a>THÀNH VIÊN</a>
                            </h3>
                            <span>|</span>
                            <h3 className='current'>
                                <a>FAQ</a>
                            </h3>
                            <span>|</span>
                            <h3 className='current'>
                                <a>QUY ĐỊNH</a>
                            </h3>
                            <span>|</span>
                        </div>
                        <div className='bhd-page-user'>
                            <div className='login-left'>
                                <div className='widget--right'>
                                    <h4 className='title--member'>ĐĂNG NHẬP</h4>
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
                                                <button className='show-passs' onClick={handleShowPass}>Hiển thị mật khẩu</button>
                                            </div>
                                            <div className='form--last'>
                                                <button className='login-submit' onClick={handleSubmit}>ĐĂNG NHẬP</button>
                                                <Link className='sign-up' to='/Register'>Đăng ký</Link>
                                            </div>
                                            <div className="messages">
                                                <h1 style={{ color: "green" }}>{this.state.errMess}</h1>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        GetUser: (email) => {
            dispatch({ type: "SetUserInfo", payload: email })
        },
    }
}

export default connect(null, mapDispatchToProps)(Login)



