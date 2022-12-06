const InitialState = {
  listCin: [],
  lsBranch: [],
  lsSchedule: [],

}


const rdc = (state = InitialState, { type, payload }) => {
  switch (type) {
    case "SetCins":
      return {
        ...state,
        listCin: payload
      }
    case "SetBranch":
      return {
        ...state,
        lsBranch: payload
      }
    case "SetSchedule":
      return {
        ...state,
        lsSchedule: {
          ...state.lsSchedule,
          cinSchedule: payload.ShowTimes,
          filmSchedule: payload.Films,
          cineplex: payload.cineplex,
          ApiCinemaId: payload.ApiCinemaId,
          date: payload.date 
        }
      }
    default:
      return state
  }
}

export default rdc;