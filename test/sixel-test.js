'use strict'

const Jimp = require('jimp')
const sixel = require('sixel')
const hexdump = require('hexdump-nodejs')

;(async () => {
  // const buffer = fs.readFileSync('./test.jpg')

  const image = await Jimp.read('test.jpg')
  const { bitmap } = image
  // console.log(require('util').inspect(image, false, null, true))
  console.log(bitmap.width, bitmap.height, bitmap.data.length)
  console.log(sixel.image2sixel(
    Uint8ClampedArray.from(bitmap.data),
    bitmap.width,
    bitmap.height))
  // console.log(hexdump(bitmap.data.slice(0, 128)))
  console.log(Uint8ClampedArray.from(bitmap.data))
})()
  .catch(err => console.error(err))
