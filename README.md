# @range3/holo
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
$ docker run -it range3/holo:latest --help
```

### TimeZone
Use `TZ` environment variable or `--zone` option.
```bash
$ TZ=UTC holo
$ holo --zone Asia/Tokyo
```

## Sixel Graphics is supported !
If you use a SIXEL-supported terminal such as wsltty, you will see higher resolution thumbnails.

(I really hope Windows Terminal will support SIXEL.)
- https://github.com/microsoft/terminal/issues/448
