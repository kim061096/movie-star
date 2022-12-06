const InitialState = {
    commentMovie: []
}

const CommentReducer = (state = InitialState, { type, payload }) => {
    switch (type) {
        case 'SetCommentMovie':
            return { ...state, commentMovie: payload }
        default:
            return state
    }
}

export default CommentReducer;