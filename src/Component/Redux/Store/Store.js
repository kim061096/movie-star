import createSagaMiddleware from 'redux-saga'
import { applyMiddleware } from 'redux'
import MiddleReSa from '../Saga/MiddleReSa'
import FilmReducer from '../Reducer/FilmReducer/FilmReducer'
import CinemaReducer from '../Reducer/CinemaReducer/CinemaReducer'
import DetailMovieReducer from '../Reducer/DetailMovieReducer/DetailMovieReducer'
import MainReducer from '../Reducer/MainReducer/MainReducer'
import ManageReducer from '../Reducer/ManageReducer/ManageReducer'
import CommentReducer from '../Reducer/CommentReducer/CommentReducer'

var redux = require("redux")
const sagaMiddleware = createSagaMiddleware()

const allReducer = redux.combineReducers({
    main: MainReducer,
    filmsNow: FilmReducer,
    listCins: CinemaReducer,
    detailmovie: DetailMovieReducer,
    allInfo: ManageReducer,
    comment: CommentReducer
})

export default redux.createStore(
    allReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(MiddleReSa) 