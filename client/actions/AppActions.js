import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

const API = process.env.API || 'http://localhost:3000/api'

export function setClient(client) {
  return (dispatch) => (
     dispatch({
      type: types.SET_CLIENT,
      client,
    })
  )
}

export function fetchUserSuccess(user) {
  return {
    type: types.FETCH_USER_SUCCESS,
    user,
  }
}

export function fetchUserFailure() {
  return {
    type: types.FETCH_USER_FAILURE,
  }
}

export function fetchUserData(cookie) {
  if (!cookie) {
    return (dispatch) => (
      dispatch(fetchUserFailure())
    )
  }

  return (dispatch) => (
    fetch(`${API}/fetchUser/${cookie}`)
      .then((resp) => resp.json())
      .then((json) => dispatch(fetchUserSuccess(json)))
      .catch((error) => {
        console.log(error)
        dispatch(fetchUserFailure())
      })
  )
}
