const cheerio = require('cheerio')

class SchedulePage {
  static scrape (html) {
    const $ = cheerio.load(html)
  }
}

module.exports = SchedulePage
