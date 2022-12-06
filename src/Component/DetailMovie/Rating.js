import React, { Component } from 'react'
import './DetailMovie.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'


class Rating extends Component {
  constructor() {
    super()
    this.state = {
      ApiFilmId: localStorage.getItem("ApiFilmId")
    }
  }

  componentDidMount() {
    this.props.GetCommentMovie(
      this.state.ApiFilmId
    )
  }

  render() {

    const HandleCommentMovie = (ApiFilmId) => {
      this.props.GetCommentMovie(ApiFilmId)
    }

    return (
      <div>
        <div className='comment-detail-movie'>
          {
            this.props.comment.commentMovie.map((n, i) => {
              return (
                <div className='form-comment' key={i}>
                  <div className='comment--rating'>
                    <div className='comment--rating-left'>
                      <h3>{n.Rating?.MedalRating?.medal?.per}%</h3>
                      <h4>Điểm trung bình</h4>
                    </div>
                    <div className='comment--rating-right'>
                      <h3>{n.Rating?.CountUserRating} lượt</h3>
                      <h4>Đánh giá</h4>
                    </div>
                  </div>
                  {n.Rating.MedalRating?.userInsight?.map((n1, i1) => {
                    return (
                      <div className='comment--rating-left-cont' key={i1}>
                        <h2>{n1.percentage}% người yêu thích {n1.medalName} </h2>
                      </div>
                    )
                  })}
                  <div className='button--green'>
                    <button className='btn' onClick={() => { HandleCommentMovie(n.ApiFilmId) }}><Link to='/Comment'>Đến bình luận</Link></button>
                  </div>
                </div>
              )
            }
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comment: state.comment
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    GetCommentMovie: (ApiFilmId) => {
      dispatch({ type: "GetCommentMovie", payload: ApiFilmId })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rating)

