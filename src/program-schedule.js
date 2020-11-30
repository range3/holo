const got = require('got')
const { DateTime } = require('luxon')
const SchedulePage = require('./schedule-page')

class ProgramSchedule {
  constructor (zone = 'Asia/Tokyo') {
    this.zone = zone
    this.programs = []
  }

  async fetch () {
    const res = await got('https://schedule.hololive.tv', {
      headers: {
        cookie: `timezone=${this.zone}`,
      },
    })

    const schedulePage = SchedulePage.scrape(res.body)
    this.programs = schedulePage.programs.map(program => {
      return {
        dateTime: DateTime.fromObject({
          zone: this.zone,
          ...program.dateTime,
        }),
        link: program.link,
        name: program.name,
        thumbnail: program.thumbnail,
        avatars: program.avatars,
      }
    })
  }

  toArray () {
    return this.programs
  }
}

module.exports = ProgramSchedule
