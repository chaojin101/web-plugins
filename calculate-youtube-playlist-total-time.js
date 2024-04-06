// ==UserScript==
// @name         calculate-youtube-playlist-total-time
// @namespace    http://tampermonkey.net/
// @version      2024-04-06
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/playlist?list=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

const toSeconds = (duration) => {
  let hours = 0
  let minutes = 0
  let seconds = 0
  const times = duration.split(':')
  if (times.length === 3) {
    hours = parseInt(times[0])
    minutes = parseInt(times[1])
    seconds = parseInt(times[2])
  } else if (times.length === 2) {
    minutes = parseInt(times[0])
    seconds = parseInt(times[1])
  } else {
    seconds = parseInt(times[0])
  }

  return hours * 3600 + minutes * 60 + seconds
}

const toTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const sec = seconds % 60
  return `${hours}:${minutes}:${sec}`
}

(function () {
  'use strict';

  const timer = setInterval(() => {
    // console.log('timer')

    const contents = document.querySelector('#contents')
    if (!contents) return
    // console.log(`contents`, contents)

    const entries = contents.querySelectorAll('#time-status')
    if (!entries) return
    // console.log(`entries`, entries)

    let totalSeconds = 0
    for (const entry of entries) {
      const duration = entry.querySelector('#text').innerText
      // console.log(duration)

      totalSeconds += toSeconds(duration)
    }

    clearInterval(timer)
    // console.log('timer cleared')

    const totalDuration = toTime(totalSeconds)
    console.log(`totalDuration`, totalDuration)
  }, 2000);

})();