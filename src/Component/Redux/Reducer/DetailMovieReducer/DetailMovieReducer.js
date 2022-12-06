const InitialState = {
    contentDetailMovie: [],
    movieSchedule: [],
    lsCinBranch: []
}

const DetailMovieReducer = (state = InitialState, { type, payload }) => {
    switch (type) {
        case 'SetDetailMovie':
            return { ...state, contentDetailMovie: payload }
        case 'SetScheduleMovie':
            return {
                ...state,
                movieSchedule: {
                    ShowTimes: payload.ShowTimes,
                    ApiFilmId: payload.ApiFilmId,
                    date: payload.date,
                    Cineplexs: payload.Cineplexs,
                   }
            }
        case 'SetCinBranch':
            return { ...state, lsCinBranch: payload }
        default:
            return state
    }
}

export default DetailMovieReducer;