
function sirlisten() {
  let listeningstatus = document.getElementById("listeningstatus");
  /* JS comes here */
  // get output div reference
  let output = document.getElementById("speech_value");
  // get action element reference
  // new speech recognition object
  let recognition;
  if ('SpeechRecognition' in window){
    let speechrec = SpeechRecognition;
    recognition = new speechrec();
  }else if( 'webkitSpeechRecognition' in window) {
    let speechrec = webkitSpeechRecognition;
    recognition = new speechrec();
  } else {
    listeningstatus.innerHTML = "Sorry, we have no support on your browser";
    return;
  }
  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    listeningstatus.innerHTML = "listening, please speak...";
  };

  recognition.onspeechend = function () {
    listeningstatus.innerHTML = "stopped listening";
    recognition.stop();
  }
  recognition.onerror = async function (event) {
    let debugtext;
    let moreinfo = "";
    listeningstatus.innerHTML = "stopped listening";
    if (event.error == "network") {
      if (navigator.brave && await navigator.brave.isBrave() || false) {
        debugtext += "<a target='_blank' href='https://github.com/brave/brave-browser/issues/2690'>it also seems like you are using brave, please click <b>here</b> for more info</a>";
      }else {
        debugtext += event.error + " error";
      }
    } else if (event.error == "no-speech") {
      let msg2 = new SpeechSynthesisUtterance();
      msg2.lang = 'en-US';
      debugtext = "i could not understand what you said, please speak a little bit louder";
      msg2.text = debugtext;
      window.speechSynthesis.speak(msg2);
    } else if (event.error == "not-allowed") {
      let msg2 = new SpeechSynthesisUtterance();
      msg2.lang = 'en-US';
      debugtext = "Microphone permissions denied";
      msg2.text = debugtext;
      window.speechSynthesis.speak(msg2);
    } else {
      debugtext = "error: " + event.error;
    }
    output.innerHTML += "<span class='left'>" + debugtext + "</span>";
    output.innerHTML += moreinfo;
  };
  // This runs when the speech recognition service returns result
  recognition.onresult = async function (event) {
    let transcript = event.results[0][0].transcript;
    // transcript = thing for testing;
    // let transcript = "Tell me a word";
    let msg = new SpeechSynthesisUtterance();
    msg.lang = 'en-US';
    output.innerHTML += "<span class='right'>" + transcript + "</span>";
    if (transcript.toLowerCase().includes("joke")) {
      try {
        await fetch('./reddit_jokes.json')
          .then(response => response.json())
          .then(json => {
            let number = Math.floor(Math.random() * json.length);
            let span = document.createElement("span");
            span.classList.add("left");
            span.innerText = json[number]["title"];
            output.appendChild(span);
            msg.text = json[number]["title"];
            window.speechSynthesis.speak(msg);
            let span2 = document.createElement("span");
            span2.innerText = json[number]["body"];
            output.appendChild(span2);
            let msg2 = new SpeechSynthesisUtterance();
            msg2.lang = 'en-US';
            msg2.text = json[number]["body"];
            window.speechSynthesis.speak(msg2);
          })
      } catch (e) {
      }
    } else {
      if (transcript.toLowerCase().includes("fact")) {
        try {
          await fetch('./facts.json')
            .then(response => response.json())
            .then(json => {
              let msg2 = new SpeechSynthesisUtterance();
              msg2.lang = 'en-US';
              msg2.text = "i will give you a useless fact, here you go";
              output.innerHTML += "<span>useless fact:</span><span>";
              window.speechSynthesis.speak(msg2);
              let number = Math.floor(Math.random() * json["facts"].length);
              output.innerHTML += "<span class='right'>" + json["facts"][number] + "</span>";
              msg.text = json["facts"][number];
              window.speechSynthesis.speak(msg);
            })
        } catch (e) {
        }
      } else {
        if (transcript.toLowerCase().includes("color") || transcript.toLowerCase().includes("colour")) {
          try {
            await fetch('./colors.json')
              .then(response => response.json())
              .then(json => {
                let number = Math.floor(Math.random() * json.length);
                let color = json[number]["name"];
                textvar = "i've chosen to give you the color " + color;
                let msg2 = new SpeechSynthesisUtterance();
                msg2.lang = 'en-US';
                msg2.text = textvar;
                window.speechSynthesis.speak(msg2);
                output.innerHTML += "<span class='left'>" + textvar + "</span>";
                output.innerHTML += "<span class='left'>" + json[number]["hex"] + " is the hex color</span>"
                output.innerHTML += "<span class='left'>" + color + "exists of " + json[number]["red"] / 255 * 100 + " red";
                output.innerHTML += json[number]["green"] / 2.55 + " green";
                output.innerHTML += json[number]["blue"] / 2.55 + " blue </span>";
                msg.text = "fun fact: " + json[number]["fact"];
                window.speechSynthesis.speak(msg);
              })
          } catch (e) {
          }
        } else if ((transcript.toLowerCase().includes("tell") || transcript.toLowerCase().includes("give")) && transcript.toLowerCase().includes("word")) {
          try {
            await fetch('./lem.json')
              .then(response => response.json())
              .then(json => {
                let number = Math.floor(Math.random() * json["words"].length);
                let word = json["words"][number];
                textvar = "i've chosen to give you the word '" + word + "'";
                output.innerHTML += "<span class='left'>" + textvar + "</span>";
                output.innerHTML += "<a target='_blank' href='https://google.com/search?q=" + '"' + word + '"' + "' class='left'>for more info click here</span>";
                msg.text = textvar;
                window.speechSynthesis.speak(msg);
              })
          } catch (e) {
          }
        } else {
          let response = "Sorry, i dont understand what you mean with " + transcript;
          output.innerHTML += "<span class='left'>" + response + "</span>";
          msg.text = response;
          window.speechSynthesis.speak(msg);
        }
      }
    }
    window.scrollTo(0, output.parentElement.scrollHeight);
  };
  recognition.start();
  // start recognition
}
let sirclose = document.querySelector("#sirclose");
let sircon = document.querySelector(".sircon");
sircon.addEventListener("click", sirlisten);
sirclose.addEventListener("click", () => {
  const arr = window.location.href.split('/');
  let appclose = arr[arr.length - 2];
  window.top.closewindow(appclose, true);
});