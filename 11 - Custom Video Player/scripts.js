/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function toggleVideo() {
  return video.paused ? video.play() : video.pause();
}

function toggleButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.innerHTML = icon;
}

function updateRange() {
  video[this.name] = this.value;
}

function updateProgessBar() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function skipTime() {
  const time = parseInt(this.dataset.skip, 10);
  video.currentTime += time;
}

function scrubTime(e) {
  const time = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = time;
}

toggle.addEventListener('click', toggleVideo);

video.addEventListener('click', toggleVideo);
video.addEventListener('play', toggleButton);
video.addEventListener('pause', toggleButton);
video.addEventListener('timeupdate', updateProgessBar);

ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange));

skipButtons.forEach(skip => skip.addEventListener('click', skipTime));

let mousedown = false;
progress.addEventListener('click', scrubTime);
progress.addEventListener('mousemove', (e) => mousedown && scrubTime(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
