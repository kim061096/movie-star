import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './Comment.css'

function Comment(props) {
    const [lsComment, SetlsComment] = useState(0);

    useEffect (() => {
        props.GetCommentMovie (localStorage.getItem("ApiFilmId"))
    }, [])

    return (
            <div className='comment'>
                <div className='left-comment'>
                    {props.comment?.commentMovie?.map((n, i) => {
                        return (
                            <div className='left-tag' key={i}>
                                {
                                    n.Comment.map((n1, i1) => {
                                        return (
                                            <div className='tag' key={i1} onClick={() => SetlsComment(i1)}>
                                                <a >{n1.TagName}</a>
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>
                        )
                    })
                    }
                </div>
                <div className='right-comment'>
                    {props.comment?.commentMovie?.map((n, i) => {
                        return (
                            n.Comment[lsComment]?.Items ?
                                <div className='right-content' key={i}>
                                    {
                                        n.Comment[lsComment]?.Items?.map((n2, i2) => {
                                            return (
                                                <div className='content-comment' key={i2}>
                                                    <div className='avatar'>
                                                        <img src={n2.Avatar} alt='avatar' />
                                                    </div>
                                                    <div className='info-user-comment'>
                                                        <p className='ShowName-Comment'>{n2.ShowName}</p>
                                                        <p>{n2.Comment}</p>
                                                        <p>Updated: {n2.UpdatedAt}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                                :
                                <h1  key={i} className='no-comment'>Chưa có bình luận</h1>
                        )
                    })
                    }
                </div>
            </div >
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        comment: state.comment
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        GetCommentMovie: (apiFilmId) => {
            dispatch({ type: "GetCommentMovie", payload: apiFilmId })
        },
        GetDetailComment: (n) => {
            dispatch({ type: "SetCommentMovie", payload: n })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
