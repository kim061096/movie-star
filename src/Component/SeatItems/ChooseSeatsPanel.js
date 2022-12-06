import React, { Component } from 'react'
import './ChooseSeatsPanel.css'
import { withRouter } from '../Login/withRouter'


class ChooseSeatsPanel extends Component {
  constructor() {
    super()
    this.state = {
      errMess: '',
      selectedSeats: [],
      seatAvailable: [],
      countTicket: Number(localStorage.getItem('counterVip')) + Number(localStorage.getItem('counterStandard')),
      lsSeat: [
        {
          id: 'A',
          seats: [
            { no: 'A1', isBooked: false },
            { no: 'A2', isBooked: true },
            { no: 'A3', isBooked: false },
            { no: 'A4', isBooked: false },
            { no: 'A5', isBooked: false },
            { no: 'A6', isBooked: true },
            { no: 'A7', isBooked: false },
            { no: 'A8', isBooked: true },
            { no: 'A9', isBooked: false },
            { no: 'A10', isBooked: true },
          ],
        },
        {
          id: 'B',
          seats: [
            { no: 'B1', isBooked: false },
            { no: 'B2', isBooked: true },
            { no: 'B3', isBooked: false },
            { no: 'B4', isBooked: false },
            { no: 'B5', isBooked: false },
            { no: 'B6', isBooked: true },
            { no: 'B7', isBooked: false },
            { no: 'B8', isBooked: true },
            { no: 'B9', isBooked: false },
            { no: 'B10', isBooked: true },
          ],
        },
        {
          id: 'C',
          seats: [
            { no: 'C1', isBooked: false },
            { no: 'C2', isBooked: true },
            { no: 'C3', isBooked: false },
            { no: 'C4', isBooked: false },
            { no: 'C5', isBooked: false },
            { no: 'C6', isBooked: true },
            { no: 'C7', isBooked: false },
            { no: 'C8', isBooked: true },
            { no: 'C9', isBooked: false },
            { no: 'C10', isBooked: true },
          ],
        },
        {
          id: 'D',
          seats: [
            { no: 'D1', isBooked: false },
            { no: 'D2', isBooked: true },
            { no: 'D3', isBooked: false },
            { no: 'D4', isBooked: false },
            { no: 'D5', isBooked: false },
            { no: 'D6', isBooked: true },
            { no: 'D7', isBooked: false },
            { no: 'D8', isBooked: true },
            { no: 'D9', isBooked: false },
            { no: 'D10', isBooked: true },
          ],
        },
        {
          id: 'E',
          seats: [
            { no: 'E1', isBooked: false },
            { no: 'E2', isBooked: true },
            { no: 'E3', isBooked: false },
            { no: 'E4', isBooked: false },
            { no: 'E5', isBooked: false },
            { no: 'E6', isBooked: true },
            { no: 'E7', isBooked: false },
            { no: 'E8', isBooked: true },
            { no: 'E9', isBooked: false },
            { no: 'E10', isBooked: true },
          ],
        },
        {
          id: 'F',
          seats: [
            { no: 'F1', isBooked: false },
            { no: 'F2', isBooked: true },
            { no: 'F3', isBooked: false },
            { no: 'F4', isBooked: false },
            { no: 'F5', isBooked: false },
            { no: 'F6', isBooked: true },
            { no: 'F7', isBooked: false },
            { no: 'F8', isBooked: true },
            { no: 'F9', isBooked: false },
            { no: 'F10', isBooked: true },
          ],
        },
        {
          id: 'G',
          seats: [
            { no: 'G1', isBooked: false },
            { no: 'G2', isBooked: true },
            { no: 'G3', isBooked: false },
            { no: 'G4', isBooked: false },
            { no: 'G5', isBooked: false },
            { no: 'G6', isBooked: true },
            { no: 'G7', isBooked: false },
            { no: 'G8', isBooked: true },
            { no: 'G9', isBooked: false },
            { no: 'G10', isBooked: true },
          ],
        },
        {
          id: 'H',
          seats: [
            { no: 'H1', isBooked: false },
            { no: 'H2', isBooked: true },
            { no: 'H3', isBooked: false },
            { no: 'H4', isBooked: false },
            { no: 'H5', isBooked: false },
            { no: 'H6', isBooked: true },
            { no: 'H7', isBooked: false },
            { no: 'H8', isBooked: true },
            { no: 'H9', isBooked: false },
            { no: 'H10', isBooked: true },
          ],
        },
        {
          id: 'I',
          seats: [
            { no: 'I1', isBooked: false },
            { no: 'I2', isBooked: true },
            { no: 'I3', isBooked: false },
            { no: 'I4', isBooked: false },
            { no: 'I5', isBooked: false },
            { no: 'I6', isBooked: true },
            { no: 'I7', isBooked: false },
            { no: 'I8', isBooked: true },
            { no: 'I9', isBooked: false },
            { no: 'I10', isBooked: true },
          ],
        },
        {
          id: 'J',
          seats: [
            { no: 'J1', isBooked: false },
            { no: 'J2', isBooked: true },
            { no: 'J3', isBooked: false },
            { no: 'J4', isBooked: false },
            { no: 'J5', isBooked: false },
            { no: 'J6', isBooked: true },
            { no: 'J7', isBooked: false },
            { no: 'J8', isBooked: true },
            { no: 'J9', isBooked: false },
            { no: 'J10', isBooked: true },
          ],
        },
      ],
    }
  }

  render() {

    const toGetSeat = (no) => {
      if (this.state.selectedSeats.indexOf(no) > -1) {
        this.setState({
          seatAvailable: this.state.seatAvailable.concat(no),
          selectedSeats: this.state.selectedSeats.filter(res => res !== no),
        })

      } else {
        this.setState({
          selectedSeats: this.state.selectedSeats.concat(no),
          seatAvailable: this.state.seatAvailable.filter(res => res !== no),
        })
      }
    }

    const count = this.state.selectedSeats.length

    const getChoosenSeats = () => {
        this.setState({
          selectedSeats: localStorage.setItem('seats', this.state.selectedSeats),
          countTicket: localStorage.setItem('countTicket', this.state.countTicket)
        })
        this.props.navigate('/Payment')
    }

    return (
      <div className='SelectSeatsPanel'>
        <h1>CHỌN GHẾ</h1>
        <div className='cus-iframe'>
          Vui lòng chọn ghế trong sơ đồ ghế phía dưới.
        </div>
        <div className='select-seats-container'>
          <div className='divLegend'>
            <span className='legend-container'>
              <img alt='seat' src={require('./ImageButton/standard_selected.png')} />
              <span className='legend'>Ghế đang chọn</span>
            </span>
            <span className='legend-container'>
              <img alt='seat' src={require('./ImageButton/standard_available.png')} />
              <span className='legend'>Ghế trống</span>
            </span>
            <span className='legend-container'>
              <img alt='seat' src={require('./ImageButton/sold.png')} />
              <span className='legend'>Ghế đã bán</span>
            </span>
          </div>
          <div className='divSeatMap' >
            <div>
              <div className='Seating-Control'>
                <div className='Seating-Screen'>
                  <img alt='seat' src={require('../SeatItems/ImageBooking/SeatScreen.png')} />
                  <span>SCREEN</span>
                </div>
                <div className='Seating-Container'>
                  {this.state.lsSeat.map((seat, index) => {
                    return (
                      <div className='Seating' key={index}>
                        <ul className='Seating-RowLabelContainer-Left'>
                          <li>{seat.id}</li>
                        </ul>
                        <div className='Seating-Theatre'>
                          {this.state.lsSeat[index].seats.map((m, l) => {
                            return (
                              <ul className='Seating-Area' key={l} onClick={() => { toGetSeat(m.no) }}>
                                <li>
                                  <button
                                    style={{
                                      background: this.state.selectedSeats?.includes(m.no) ? "red" : " ",
                                      color: "white",
                                      fontWeight: "bolder"
                                    }}>{m.no}</button>
                                </li>
                              </ul>
                            )
                          })}
                        </div>
                        <div className='Seating-RowLabelContainer-Right'>
                          <ul>
                            <li>{seat.id}</li>
                          </ul>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          {this.state.countTicket === count ?
            <div className='confirm'>
              <button className='page-action' type='button' onClick={getChoosenSeats}>
                TIẾP THEO
              </button>
            </div>
            :
            <p></p>
          }
          <h2 className='err'>{this.state.errMess}</h2>
        </div>
      </div>

    )
  }
}


export default withRouter(ChooseSeatsPanel)