const InitialState = {
  listFilm: [],
}

const rdc = (state = InitialState, { type, payload }) => {
  switch (type) {
    case "SetFilms":
      return {
        ...state,
        listFilm: payload
      }
    case "LogOut":
      return { loginStatus: false }
    default:
      return state
  }
}

export default rdc;