import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

export function setClient(client) {
  return (dispatch) => (
     dispatch({
      type: types.SET_CLIENT,
      client,
    })
  )
}

export function toggleSidebar(sideOpen) {
  return (dispatch) => (
    dispatch({
      type: types.TOGGLE_SIDEBAR,
      sideOpen,
    })
  )
}

export function fetchUserSuccess(user) {
  return {
    type: types.FETCH_USER_SUCCESS,
    user,
  }
}

export function fetchUser(cookie) {
  const API = process.env.API || 'http://localhost:3000/api'

  return (dispatch) => (
    fetch(`${API}/getUser/${cookie}`)
      .then((response) => response.json())
      .then((json) => dispatch(fetchUserSuccess(json)))
      .catch((error) => console.log(error))
  )
}
