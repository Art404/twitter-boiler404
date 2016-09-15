import * as types from '../constants/ActionTypes'

export default function app(state = {}, action) {
  const newState = {...state}

  switch (action.type) {
    case types.FETCH_USER_SUCCESS:
      newState.user = action.user
      return newState
    case types.FETCH_USER_FAILURE:
      newState.user = null
      return newState
    default:
      return state
  }
}
