# Reddit Slideshow

This repository shows a HTML/Javascript slideshow displaying images from Reddit, such as [EarthPorn](https://www.reddit.com/r/EarthPorn/). The goal is to provide a Chromecast-like slideshow on a TV screen using a Raspberry Pi.


## Fetching images

Simply run `python fetch.py` with Python 3 to fetch the images.

It requires three librairies: `pip install Pillow python-resize-image tqdm`.




## Displaying the slideshow on a Raspberry Pi (kiosk mode)

We will install X server, [Chromium](https://www.chromium.org) browser, and `unclutter` (in order to hide the cursor). 

On a [Debian](https://www.debian.org) based distribution (such as [Raspbian](https://www.raspberrypi.org/downloads/raspbian/)), we just have to use:

```
sudo apt-get install xserver-xorg-video-all xserver-xorg-input-all xserver-xorg-core xinit x11-xserver-utils
sudo apt-get install chromium-browser
sudo apt-get install unclutter
```



Then, we ask to load X on startup, by editing the `~/.bash_profile` file:

```
if [[ -z $DISPLAY ]] && [[ $(tty) = /dev/tty1 ]]; then
    startx
fi
```

Finally, edit the `~/.xinitrc` to load Chromium when X starts (edit with your current resolution):

```
#!/bin/sh
xset -dpms
xset s off
xset s noblank

unclutter &
chromium-browser /home/pi/earthporn-slideshow/index.html --window-size=1920,1080 --start-fullscreen --kiosk --incognito --noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars --disk-cache-dir=/dev/null
```
