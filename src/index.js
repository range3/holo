'use strict'

const got = require('got')

;(async () => {
  try {
    const response = await got('https://schedule.hololive.tv')
    console.log(response.body)
    //= > '<!doctype html> ...'
  } catch (error) {
    console.log(error.response.body)
    //= > 'Internal server error ...'
  }
})()
