'use strict'

const commander = require('commander')
const chalk = require('chalk')
const { DateTime } = require('luxon')
const terminalImage = require('terminal-image')
const got = require('got')
const ProgramSchedule = require('./program-schedule')

const now = DateTime.local()
const groupIds = {
  all: ProgramSchedule.GROUP_ALL,
  live: ProgramSchedule.GROUP_HOLOLIVE,
  stars: ProgramSchedule.GROUP_HOLOSTARS,
  innk: ProgramSchedule.GROUP_INNK,
  id: ProgramSchedule.GROUP_HOLOID,
  en: ProgramSchedule.GROUP_HOLOEN,
}

commander
  .name('holo')
  .option('-z, --zone <value>', 'TimeZone', process.env.TZ || 'Asia/Tokyo')
  .option('-g, --group <type>', `Group Names (${Object.keys(groupIds).join(' | ')})`, 'live')
  .option('-n, --num <number>', 'Print n programs', Number, 100)
  .option('-b, --before <number>', 'Print programs that started later than N hours ago', Number, 1)
  .option('-a, --after <number>', 'Print programs whose broadcast start is earlier than N hours later', Number, 1)
  .option('--no-current', 'Disable printing current programs on air')
  .option('--no-thumbnail', 'Disable printing thumbnails')
  .option('--height <number>', 'Height of thumbnails', Number, 20)
  .parse(process.argv)

if (!groupIds[commander.group]) {
  commander.help()
}

;(async () => {
  try {
    const schedule = new ProgramSchedule({
      group: groupIds[commander.group],
      zone: commander.zone,
    })
    await schedule.fetch()
    const programs = await Promise.all(
      schedule
        .toArray()
        .filter(program =>
          (program.isOnTheAir && commander.current) ||
          (program.dateTime <= now.plus({ hours: commander.after }) &&
            program.dateTime >= now.minus({ hours: commander.before })),
        )
        .slice(0, commander.num)
        .map(async program => {
          const thumbnailBuffer = commander.thumbnail ? await got(program.thumbnail).buffer() : null
          return {
            thumbnailBuffer,
            ...program,
          }
        }))
    for await (const program of programs) {
      const onTheAir = program.isOnTheAir ? chalk.white.bgRed('ON THE AIR') : ''
      if (commander.thumbnail) {
        process.stdout.write(await terminalImage.buffer(program.thumbnailBuffer, { height: commander.height }))
      }
      console.log(program.dateTime.toLocaleString(DateTime.DATETIME_SHORT), program.name, onTheAir)
      console.log('(', program.link, ')\n')
    }
  } catch (error) {
    console.error(error)
  }
})()
