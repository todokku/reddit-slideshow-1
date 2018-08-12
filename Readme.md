# ’Chromecast’ Reddit Slideshow

This repository provides a **Chromecast like** slideshow, written in HTML/CSS/Javascript.

It displays various images from Reddit, such as [EarthPorn](https://www.reddit.com/r/EarthPorn/) subreddit.

![Preview](preview.gif)

A simple plugin also allow to show realtime Shairport metadata: please [see below](#shairport-metadata).


## Usage

Just open *index.html* with your favorite browser!

In order to fetch the images, simply run `python3 fetch.py`. This script requires three librairies: `pip install Pillow python-resize-image tqdm`.

Several variables in `fetch.py` allow you to select subreddits, posts limit, timeranges... You can also, of course, edit the slideshow speed in `js/scripts.js`.


## Kiosk mode *(Chromecast-like)*

This slideshow were initially meant to be displayed on a Raspberry Pi, launched fullscreen on startup.

![Preview](preview.jpg)

To do so, we will install X server, [Chromium](https://www.chromium.org) browser, and `unclutter` (in order to hide the cursor). On a [Debian](https://www.debian.org) based distribution (such as [Raspbian](https://www.raspberrypi.org/downloads/raspbian/)), we just have to use:

```
sudo apt-get install xserver-xorg-video-all xserver-xorg-input-all xserver-xorg-core xinit x11-xserver-utils
sudo apt-get install chromium-browser
sudo apt-get install unclutter
```



Then, we ask to load X on startup, by editing the `~/.bash_profile` file:

```bash
if [[ -z $DISPLAY ]] && [[ $(tty) = /dev/tty1 ]]; then
    startx
fi
```

Finally, edit the `~/.xinitrc` to load Chromium when X starts (edit with your current resolution):

```bash
#!/bin/sh
xset -dpms
xset s off
xset s noblank

unclutter &
chromium-browser /home/pi/earthporn-slideshow/index.html --window-size=1920,1080 --start-fullscreen --kiosk --incognito --noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars --disk-cache-dir=/dev/null
```


## Shairport metadata

*Coming soon*

