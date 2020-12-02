const got = require('got')
const { DateTime } = require('luxon')
const SchedulePage = require('./schedule-page')

class ProgramSchedule {
  static get GROUP_ALL () {
    return '/'
  }

  static get GROUP_HOLOLIVE () {
    return '/lives/hololive'
  }

  static get GROUP_HOLOSTARS () {
    return '/lives/holostars'
  }

  static get GROUP_INNK () {
    return '/lives/innk'
  }

  static get GROUP_HOLOID () {
    return '/lives/indonesia'
  }

  static get GROUP_HOLOEN () {
    return '/lives/english'
  }

  constructor (options = {}) {
    this.zone = options.zone || process.env.TZ || 'Asia/Tokyo'
    this.group = options.group || ProgramSchedule.GROUP_ALL
    this.programs = []
    this.baseUrl = 'https://schedule.hololive.tv'
  }

  async fetch () {
    const res = await got(`${this.baseUrl}${this.group}`, {
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
        isOnAir: program.isOnAir,
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
