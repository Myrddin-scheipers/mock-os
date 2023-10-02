let settings, capabilities;
let requests = [
  ["lens", "audio", "requestaudio"],
  ["lens", "camera", "requestcamera"]
];
request();


function requestaudio() {
  navigator.mediaDevices.getUserMedia({
    audio: true,
  })
}
function requestcamera() {
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment", pan: true, tilt: true, zoom: true }
  }).then((mediaStream) => {
    const video = document.querySelector('video');
    video.srcObject = mediaStream;
    video.onloadedmetadata = () => {
      video.play();
      video.muted = true;
    };


    const [videoTrack] = mediaStream.getVideoTracks();
    capabilities = videoTrack.getCapabilities();
    settings = videoTrack.getSettings();
  })
    .catch((err) => {
      // always check for errors at the end.
      if (err.name == "NotAllowedError") {
        document.body.innerHTML = "<h1>Please allow your camera access</h1>";
      }
      alert(`${err.name}: ${err.message}`);
    });
}
async function changeZoom(capabilities, settings, videoTrack) {
  await videoTrack.applyConstraints({
    advanced: [{ zoom: capabilities.zoom.max }]
  })
}
function togglePictureInPicture() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else if (document.pictureInPictureEnabled) {
    document.querySelector("video").requestPictureInPicture();
  }
}
document.addEventListener("click", function () {
  //togglePictureInPicture();
})

async function recordScreen() {
  return await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: { mediaSource: "screen" }
  });
}
async function recordCamera() {
  return await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  });
}




function createRecorder(stream, mimeType) {
  // the stream data is stored in this array
  let recordedChunks = [];

  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };
  mediaRecorder.onstop = function () {
    saveFile(recordedChunks);
    recordedChunks = [];
  };
  mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
  return mediaRecorder;
}
function saveFile(recordedChunks) {

  const blob = new Blob(recordedChunks, {
    type: 'video/webm'
  });
  let filename = Date.now(),
    downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${filename}.webm`;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  URL.revokeObjectURL(blob); // clear from memory
  document.body.removeChild(downloadLink);
}
let mediaRecorder, recording;
recording = false;
document.querySelector(".record").addEventListener("click", async function (e) {
  if (recording == true) {
    recording = false;
    mediaRecorder.stop(); // this will ask for file name and save video 
  } else {
    let stream = await recordCamera();
    let mimeType = 'video/webm';
    mediaRecorder = createRecorder(stream, mimeType);
    recording = true;
  }
});
document.addEventListener("keydown", function (event) {
  if (event.isComposing || event.code === 229) {
    return;
  }
  if (event.key == "+") {
    if ('zoom' in settings) {
      changeZoom();
    } else {
      alert("no zoom");
    }
  }
})