'use strict'

const got = require('got')

const SchedulePage = require('./schedule-page')

;(async () => {
  try {
    const res = await got('https://schedule.hololive.tv')
    // console.log(res.body)

    SchedulePage.scrape(res.body)
  } catch (error) {
    console.log(error.response.body)
  }
})()
