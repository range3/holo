# @range3/holo
[![npm version](https://badge.fury.io/js/%40range3%2Fholo.svg)](https://badge.fury.io/js/%40range3%2Fholo)
> Nyahello~~  
> The CLI tool to display the Hololive streaming schedule.

![](https://i.gyazo.com/72a938fcb99f9d562edd388546d85989.png)

## Usage
```bash
$ npm i -g @range3/holo
$ holo --help
```

### Using Docker
```bash
# For terminals that support true color (16m colors)
$ docker run --rm -it -e COLORTERM=truecolor range3/holo:latest --help

# others
$ docker run --rm -it -e TERM range3/holo:latest --help
```

### TimeZone
Use `TZ` environment variable or `--zone` option.
```bash
$ TZ=UTC holo
$ holo --zone Asia/Tokyo
```

## Sixel Graphics is supported !
If you use a SIXEL-supported terminal such as wsltty, you can see higher resolution thumbnails.

(I really hope Windows Terminal will support SIXEL.)
- https://github.com/microsoft/terminal/issues/448
