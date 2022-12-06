import React, { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Main from './Component/Main/Main'
import Ticket from './Component/Ticket/Ticket';
import './App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from './Component/Login/Login';
import Cinema from './Component/Cinema/Cinema';
import DetailFilm from './Component/DetailFilm/DetailFilm';
import DetailMovie from './Component/DetailMovie/DetailMovie';
import ChooseSeatsPanel from './Component/SeatItems/ChooseSeatsPanel';
import Booking from './Component/Booking/Booking';
import MovieBooking from './Component/MovieBooking/MovieBooking';
import Payment from './Component/Payment/Payment';
import Register from './Component/Login/Register';
import { connect } from 'react-redux';
import LoginBox from './LoginBox.';
import PaymentSuccess from './Component/Payment/PaymentSuccess';
import DetailUser from './Component/DetailUser/DetailUser';
import Comment from './Component/Comment/Comment'



class App extends Component {
  constructor() {
    super()
    this.state = {
      user: localStorage.getItem("email"),
    }
  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <div className='main_header'>
            <div className='menu'>
              <button className='btn--menu'>
                <span className='span--menu'>
                  <img alt='' src={require('./Images/bg-button-menu.jpg')} />
                </span>
                <span className='span--menu'>
                  <img alt='' src={require('./Images/bg-button-menu.jpg')} />
                </span>
                <span className='span--menu'>
                  <img alt='' src={require('./Images/bg-button-menu.jpg')} />
                </span>
                <span className='txt--menu'><Link to='./Main'>MENU</Link></span>
                <div class="menu-content">
                  <Link to='./Ticket'>LỊCH CHIẾU</Link>
                  <Link to='./Cinema'>HỆ THỐNG RẠP</Link>
                  <a href="#">KHUYẾN MÃI | SỰ KIỆN</a>
                  <a href="#">DỊCH VỤ QUẢNG CÁO</a>
                  <a href="#">TUYỂN DỤNG</a>
                  <a href="#">VỀ CHÚNG TÔI</a>
                </div>
              </button>
            </div>
            <div className='header'>
              <div className='header--top'>
                <a href='https://www.bhdstar.vn' className='logo'>
                  <Link to='/'><img alt='logo' className='logo' src={require('./Images/logo.png')} /></Link>
                </a>
                <div className='header--left'>
                  <div className='btn--buy'>
                    <Link className='buy' to={this.state.user ? '/Ticket' : '/Login'} >MUA VÉ</Link>
                  </div>
                </div>
                <img alt='line-header' className='line-header' src={require('./Images/line-header1.png')} />
                <div className='header--right'>
                  <div className='btn--login'>
                    <Link to={this.state.user?'/DetailUser' : '/Login'}><span className='login'>{this.state.user? this.state.user : "ĐĂNG NHẬP"}</span></Link>
                    <div class='box--login'>
                      <form className='bhd-form-login-top'>
                        <LoginBox />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/Ticket" element={<Ticket />} />
            <Route path="/Cinema" element={<Cinema />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/DetailFilm" element={<DetailFilm />} />
            <Route path="/DetailMovie" element={<DetailMovie />} />
            <Route path="/MovieBooking" element={<MovieBooking />} />
            <Route path="/ChooseSeatsPanel" element={<ChooseSeatsPanel />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
            <Route path="/DetailUser" element={<DetailUser />} />
            <Route path="/Comment" element={<Comment />} />
          </Routes>
          <div className='footer'>
            <div className='container'>
              <div className='row'>
                <div className='row--left'>
                  <h3 className='title'>VỀ BHD STAR</h3>
                  <div className='menu-gioi-thieu-container'>
                    <ul className='menu-gioi-thieu'>
                      <li className='menu-item'>
                        <a href='https://www.bhdstar.vn/he-thong-rap/'>Hệ Thống Rạp</a>
                      </li>
                      <li className='menu-item'>
                        <a href='https://www.bhdstar.vn/he-thong-rap/'>Tuyển dụng</a>
                      </li>
                      <li className='menu-item'>
                        <a href='https://www.bhdstar.vn/he-thong-rap/'>Liên hệ</a>
                      </li>
                      <a href='http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=46613'>
                        <img alt='Đã thông báo Bộ Công Thương' src={require('./Images/dathongbao-1.png')} />
                      </a>
                    </ul>
                  </div>
                </div>
                <div className='row--right'>
                  <h3 className='title'>QUI ĐỊNH & ĐIỀU KHOẢN</h3>
                  <div className='menu-gioi-thieu-container'>
                    <ul className='menu-gioi-thieu'>
                      <li className='menu-item'>
                        <a href='https://www.bhdstar.vn/he-thong-rap/'>Quy định thành viên</a>
                      </li>
                      <li className='menu-item'>
                        <a href='https://www.bhdstar.vn/he-thong-rap/'>Điều khoản</a>
                      </li>
                      <li className='menu-item'>
                        <a href='https://www.bhdstar.vn/he-thong-rap/'>Hướng dẫn đặt vé trực tiếp</a>
                      </li>
                      <li className='menu-item'>
                        <a href='https://www.bhdstar.vn/he-thong-rap/'>Quy định và chính sách chung</a>
                      </li>
                      <li className='menu-item'>
                        <a href='https://www.bhdstar.vn/he-thong-rap/'>Chính sách bảo vệ thông tin cá nhân của người tiêu dùng</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='copyright'>© 2015 BHD Star Cineplex</div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    GetMovieDetail: (ApiFilmId) => {
      console.log(ApiFilmId);
      dispatch({ type: "GetDetailMovie", payload: { ApiFilmId: ApiFilmId } })
    },
    GetScheduleMovie: (ApiFilmId, date) => {
      console.log(ApiFilmId, date);
      dispatch({ type: "GetMovieShedule", payload: { ApiFilmId: ApiFilmId, date: date } })
    },
  }
}

export default connect(null, mapDispatchToProps)(App)


