# ’Chromecast’ Reddit Slideshow

This repository provides a **Chromecast like** slideshow, written in HTML/CSS/Javascript. It displays various images from Reddit, such as [EarthPorn](https://www.reddit.com/r/EarthPorn/) subreddit.

![Preview](preview.gif)


A simple plugin also allow to show realtime Shairport metadata: please [see below](#shairport-metadata).


## Try it at home

In order to fetch the images, simply run `python3 fetch.py`. This script requires three librairies: `pip install Pillow python-resize-image tqdm`.

Several variables in `fetch.py` allow you to select subreddits, posts limit, timeranges... You can also, of course, edit the slideshow speed in `js/scripts.js`.

Then, just open *index.html* with your favorite browser!


## Kiosk mode *(Chromecast-like)*

This slideshow were initially meant to be displayed on a Raspberry Pi, launched fullscreen on startup. See [here](https://www.sylvaindurand.org/launch-chromium-in-kiosk-mode/) how to achieve it! 