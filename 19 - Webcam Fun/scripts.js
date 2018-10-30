const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch((error) => {
      console.error(error);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0);
    let pixels = ctx.getImageData(0, 0, width, height);

    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);

    ctx.globalAlpha = 0.5;
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome photo"/>`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // BLUE
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // GREEN
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 200] = pixels.data[i + 0]; // RED
    pixels.data[i + 100] = pixels.data[i + 1]; // BLUE
    pixels.data[i - 200] = pixels.data[i + 2]; // GREEN
  }
  return pixels;
}

getVideo();
video.addEventListener('canplay', paintToCanvas);
