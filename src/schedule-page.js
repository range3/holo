const cheerio = require('cheerio')

class SchedulePage {
  static scrape (html) {
    const $ = cheerio.load(html)
    const $rows = $('#all > .container > .row')

    $rows.toArray().forEach(el => {
      const $row = $(el)
      const $programs = $row.find('a.thumbnail')

      $programs.toArray().forEach(el2 => {
        const $program = $(el2)
        // console.log(
        //   $thumbnail.css(),
        // )

        const link = $program.attr('href')
        const datetime = $program.find('.datetime')?.text()?.trim()
        const name = $program.find('.name')?.text()?.trim()
        const images = $program.find('img').toArray().map(el => $(el).attr('src'))

        const thumbnail = images.find(url => url.startsWith('https://img.youtube.com'))
        const avatars = images.filter(url => url.startsWith('https://yt3.ggpht.com'))

        console.log({
          name,
          datetime,
          link,
          thumbnail,
          avatars,
        })
      })
    })
  }
}

module.exports = SchedulePage
