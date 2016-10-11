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

export function fetchUserFailure(errorCode) {
  return {
    type: types.FETCH_USER_FAILURE,
    errorCode,
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
      .then((resp) => {
        console.log('GOT RESP => ', resp)
        if (resp.status !== 200) {
           return dispatch(fetchUserFailure(resp.status))
        }

        return dispatch(fetchUserSuccess(resp.json()))
      })
      .catch((error) => {
        console.log(error)
        dispatch(fetchUserFailure())
      })
  )
}
