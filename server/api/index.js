import express from 'express'
import {login} from './twitter'

const router = new express.Router()
const oAuth = login()

function handleError(err, res) {
  if (JSON.stringify(err).indexOf('no token') > -1) {
    res.redirect('/api/login-twitter')
  } else if (err.statusCode === 429) {
    res.status(429).send('RATE LIMIT EXCEEEDED')
  } else {
    res.status(500).send('INTERNAL SERVER ERROR')
  }
}

router.get('/login-twitter', (req, res) => {
  oAuth.getAccessToken(req, res, (error, newToken) => {
    if (newToken) {
      res.redirect('/setup')
    } else {
      res.send(JSON.stringify(error)).end()
    }
  })
})

router.get('/logout-twitter', (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME)
  res.redirect('/')
})

router.get('/fetchUser/:cookie', (req, res) => {
  const {cookie} = req.params
  if (cookie) req.cookies[process.env.COOKIE_NAME] = cookie

  oAuth.apiCall(req, 'GET', '/account/verify_credentials.json', {}, (err, resp, json) => {
    if (err) handleError(err, res)
    else res.json(json).end()
  })
})

export default router
