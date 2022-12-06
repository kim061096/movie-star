const InitialState = {
    lsMovieNowDetail: []
}

const MainReducer = (state = InitialState, { type, payload }) => {
    switch (type) {
        case 'SetMovieNow':
            return { ...state, lsMovieNowDetail: payload }
        case 'SetMovieSoon':
            return { ...state, lsMovieNowDetail: payload }
        default:
            return state
    }
}

export default MainReducer;