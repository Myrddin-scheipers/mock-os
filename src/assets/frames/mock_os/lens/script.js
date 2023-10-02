let settings, capabilities;
let mediaRecorder, recording;
let requests = [
  ["lens", "audio & camera", "allowperms"],
];
log = console.log;
document.querySelector(".controls").style.display = "none";
request();
function mute() {
  document.querySelector(".speaker").classList.toggle("mute");
  video.muted = isMicrophoneActive;
  // Eventually update the microphone state.
  isMicrophoneActive = !isMicrophoneActive;
  navigator.mediaSession.setMicrophoneActive(isMicrophoneActive);
}
async function allowperms() {
  try {
    const constraints = { video: true, audio: true };
    const video = document.querySelector('video');
    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    document.querySelector(".controls").style.display = "block";
    video.srcObject = stream;
    try {
      // Activate the microphone and the camera.
      isMicrophoneActive = true;
      isCameraActive = true;
      navigator.mediaSession.setMicrophoneActive(isMicrophoneActive);
      navigator.mediaSession.setCameraActive(isCameraActive);
    } catch (error) {
      log(`> Argh! ${error}`);
    }
    try {
      recording = false;
      document.querySelector(".record").addEventListener("click", async function (e) {
        if (recording == true) {
          recording = false;
          document.querySelector(".record").classList.remove("active")
          mediaRecorder.stop(); // this will ask for file name and save video 
        } else {
          let mimeType = 'video/webm';
          document.querySelector(".record").classList.add("active")
          mediaRecorder = createRecorder(stream, mimeType);
          recording = true;
        }
      });
    } catch (error) {
      log(`> Argh! ${error}`);
    }
    video.onloadedmetadata = () => {
      video.play();
    };
    video.addEventListener("click", async () => {
      try {
        if (video !== document.pictureInPictureElement) {
          await video.requestPictureInPicture();
        } else {
          await document.exitPictureInPicture();
        }
      } catch (error) {
        log(`> Argh! ${error}`);
      }
    });
    try {
      navigator.mediaSession.setActionHandler('togglemicrophone', () => {
        log('> User clicked "Toggle Mic" icon.');
        // TODO: Handle muting or unmuting the microphone.
        mute();
      });
    } catch (error) {
      log('Warning! The "togglemicrophone" media session action is not supported.');
    }

    try {
      navigator.mediaSession.setActionHandler('togglecamera', () => {
        log('> User clicked "Toggle Camera" icon.');
        // TODO: Handle turning on or off the camera.
        // Eventually update the camera state.
        togglecam();
      });
    } catch (error) {
      log('Warning! The "togglecamera" media session action is not supported.');
    }

    try {
      navigator.mediaSession.setActionHandler("hangup", () => {
        log('> User clicked "Hang Up" icon.');
        // Stop video stream.
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => {
          track.stop();
        });
        video.srcObject = null;
        // Exit Picture-in-Picture.
        document.exitPictureInPicture();
      });
    } catch (error) {
      log('Warning! The "hangup" media session action is not supported.');
    }
  } catch (error) {
    console.table(error);
    if(error.name == "NotAllowedError"){
      ui_warn("camera or microphone error", "Camera or micro " + error.message.toLowerCase());
    }else {
      ui_warn(error.name, error.message);
    }
  }
}
function togglecam() {
  isCameraActive = !isCameraActive;
  if (isCameraActive) {
    video.play();
  } else {
    video.pause();
  }
  navigator.mediaSession.setCameraActive(isCameraActive);
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
    type: 'video/mp4'
  });
  let filename = Date.now(),
    downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${filename}.mp4`;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  URL.revokeObjectURL(blob); // clear from memory
  document.body.removeChild(downloadLink);
}
document.addEventListener("keydown", function (event) {
  if (event.isComposing || event.code === 229) {
    return;
  }
})