// Get Out Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build Out Functions
function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    if (isClicked) {
        video[this.name] = this.value;
    }
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

/* function scrub(e) {
    // if (e.type == 'mousemove')
    if (e.type == 'mousemove' && scrubClicked) {
        // console.log(e);
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }
    else if (e.type == 'click') {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }
} */

function scrub(e) {
    // if (e.type == 'mousemove')
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Hook up Event Listeners
toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));

let isClicked = false
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousedown', () => {
    isClicked = true;
}));

let scrubClicked = false
progress.addEventListener('click', (e) => scrub(e));
progress.addEventListener('mousemove', (e) => scrubClicked && scrub(e));
progress.addEventListener('mousedown', () => scrubClicked = true);
progress.addEventListener('mouseup', () => scrubClicked = false);

handleProgress();