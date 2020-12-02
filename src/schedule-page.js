const cheerio = require('cheerio')

class SchedulePage {
  static scrape (html) {
    const $ = cheerio.load(html)

    return new SchedulePage(
      $('.navbar-text, a.thumbnail')
        .toArray()
        .reduce((acc, el) => {
          const $i = $(el)

          if ($i.hasClass('navbar-text')) {
            const date = $i.text().match(/(?<month>\d+)\/(?<day>\d+)/)
            if (!date) throw new Error('parse error')

            acc.date = {
              month: Number(date.groups.month),
              day: Number(date.groups.day),
            }
          } else if (acc.date) {
            const images = $i.find('img').toArray().map(el => $(el).attr('src'))
            const time = $i.find('.datetime')?.text()?.match(/(?<hour>\d+):(?<minute>\d+)/)
            if (!time) {
              return acc
            }

            acc.programs.push({
              dateTime: {
                ...acc.date,
                hour: Number(time.groups.hour),
                minute: Number(time.groups.minute),
              },
              isOnAir: /red/.test($i.css('border')),
              link: $i.attr('href'),
              name: $i.find('.name')?.text()?.trim(),
              thumbnail: images.find(url => url.startsWith('https://img.youtube.com')),
              avatars: images.filter(url => url.startsWith('https://yt3.ggpht.com')),
            })
          }

          return acc
        }, { date: null, programs: [] }).programs,
    )
  }

  constructor (programs = []) {
    this.programs = programs
  }
}

module.exports = SchedulePage
