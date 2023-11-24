let app_name_top;
let windowelem;
let dockparent;
let title;
let batteryelem;
let loader;
let data;
let version = 0.19;
const disabled = {
  sleepmode: false,
  filters: false,
  system: false,
  files: false,
  apps: false,
};
// if (location.protocol !== "https:") {
//   location.replace(
//     `https:${location.href.substring(location.protocol.length)}`
//   );
// }
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}
// ** fallbacks ** //
// fallback for apps (to close themselves)
function closewindow(what, isappname) {
  appwindow.close(what, isappname);
}
// fallback to open apps from inside apps
function openapp(a, b, c) {
  desktop.openApp(a, b, c);
}
window.addEventListener("contextmenu", (e) => e.preventDefault());
let checkboxes, dockelem;
window.addEventListener("DOMContentLoaded", function () {
  app_name_top = document.querySelector("#app_name");
  windowelem = document.querySelector(".window");
  dockparent = document.getElementsByClassName("dock-parent")[0];
  title = document.querySelector(".title");
  close = document.querySelector(".close_tab");
  loader = document.getElementById("pc_loader");
  data = windowelem.getAttribute("data-window");
  dockelem = document.querySelector(".dock-container");
  checkboxes = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", function () {
      let checking;
      if (this.checked == true) {
        checking = true;
      } else {
        checking = false;
      }
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      this.checked = checking;
    });
  }
});
// logs actions to revert
const actionhistory = [];
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function menutime() {
  // We create a new Date object and assign it to a letiable called "time".
  let time = new Date(),
    // Access the "getHours" method on the Date object with the dot accessor.
    hours = time.getHours(),
    // Access the "getMinutes" method with the dot accessor.
    minutes = time.getMinutes();

  document.querySelectorAll(".menutime")[0].innerHTML =
    harold(hours) + ":" + harold(minutes);

  function harold(standIn) {
    if (standIn < 10) {
      standIn = "0" + standIn;
    }
    return standIn;
  }
}
function loop(battery) {
  batteryelem.innerHTML = battery + ' <i class="fas fa-battery-empty"></i>';
  setTimeout(() => {
    batteryelem.innerHTML = battery + ' <i class="fas fa-battery-quarter"></i>';
  }, 1000);
  setTimeout(() => {
    batteryelem.innerHTML = battery + ' <i class="fas fa-battery-half"></i>';
  }, 2000);
  setTimeout(() => {
    batteryelem.innerHTML =
      battery + ' <i class="fas fa-battery-three-quarters"></i>';
  }, 3000);
  setTimeout(() => {
    batteryelem.innerHTML = battery + ' <i class="fas fa-battery-full"></i>';
  }, 4000);
}
let dir = false;
function onborder(event) {
  let crop = event.target.closest(".crop");
  if (crop != undefined) {
    if (event.target.dataset.dir != undefined) {
      dir = event.target.dataset.dir;
      return dir;
    }
  }
  return false;
}
function dragElement(elmnt, event) {
  let dirhandler, horizontal, vertical, move, resize;
  appwindow.setactive(elmnt);
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  // otherwise, move the DIV from anywhere inside the DIV:
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    move = false;
    resize = false;
    if (onborder(e)) {
      resize = true;
      dir = onborder(e);
    } else {
      move = true;
      elmnt.classList.add("grab");
    }
    document.onmouseup = function (e) {
      closeDragElement(e, pos3, pos4);
    };
    dirhandler = elmnt.closest(".window").querySelector(`[data-dir='${dir}']`);
    if (move == true) {
      document.onmousemove = elementDrag;
    } else if (resize == true) {
      document.onmousemove = elementSize;
    } else {
      ui_warn("resize and move not set");
    }
    // call a function whenever the cursor moves:
  }
  function elementSize(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    // moved relative
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    // position abs
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new height & pos (if x or y got smaller)

    ////////////////////////////////
    /////  ADD CORRECT CHECKS //////
    ////////////////////////////////
    let x = elmnt.getBoundingClientRect().left + pos1;
    let y = elmnt.getBoundingClientRect().top + pos2;
    let w = elmnt.offsetWidth + pos1;
    let h = elmnt.offsetHeight + pos2;
    if (dir == "u" || dir == "d") {
      dirhandler.style.height = "50%";
      vertical = true;
      if (dir == "d") {
        h = h - 2 * pos2;
      } else {
        elmnt.style.top = pos4 + "px";
      }
      elmnt.style.height = h + "px";
    } else if (dir == "l" || dir == "r") {
      dirhandler.style.width = "50%";
      horizontal = true;

      if (dir == "r") {
        w = w - 2 * pos1;
      } else {
        elmnt.style.left = pos3 + "px";
      }
      elmnt.style.width = w + "px";
    } else {
      return;
    }
    ////////////////////////////////
    ///  END ADD CORRECT CHECKS ////
    ////////////////////////////////
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // show moving style
    elmnt.style.opacity = "0.7";
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    let pos5 = 30;
    let pos6 = 0;
    // set the element's new position:
    let heightfromtop = elmnt.offsetTop + elmnt.clientHeight;
    let widthfromleft = elmnt.offsetLeft + elmnt.clientWidth;
    if (elmnt.offsetTop - pos2 < 30) {
      pos5 = 30;
    } else {
      if (window.innerHeight <= heightfromtop - pos2) {
        pos5 = window.innerHeight - elmnt.clientHeight;
      } else {
        pos5 = elmnt.offsetTop - pos2;
      }
    }
    if (elmnt.offsetLeft - pos1 < 0) {
      pos6 = 0;
    } else {
      if (window.innerWidth <= widthfromleft - pos1) {
        pos6 = window.innerWidth - elmnt.clientWidth;
      } else {
        pos6 = elmnt.offsetLeft - pos1;
      }
    }
    if (elmnt.innerHeight + pos1 > window.innerHeight) {
      return;
    }
    elmnt.style.top = pos5 + "px";
    elmnt.style.left = pos6 + "px";
    for (let i = 0; i < resizezones.length; i++) {
      const resize = resizezones[i];
      if (
        resize.x.start <= pos3 &&
        resize.x.end >= pos3 &&
        resize.y.start <= pos4 &&
        resize.y.end >= pos4
      ) {
        let div = document.createElement("div");
        let r = resize.result;
        div.style.left = r.xpos + "px";
        div.style.top = r.ypos + 30 + "px";
        div.style.width = r.width + r.measure[0];
        div.style.height = `calc(${r.height + r.measure[1]} - 45px)`;
        div.style.borderTopLeftRadius = r.border[0] + "px";
        div.style.borderTopRightRadius = r.border[1] + "px";
        div.style.borderBottomLeftRadius = r.border[2] + "px";
        div.style.borderBottomRightRadius = r.border[3] + "px";
        div.setAttribute("class", "preview");
        let previews = document.querySelectorAll(".preview");
        previews.forEach((preview) => {
          preview.remove();
        });
        document.body.appendChild(div);
      } else {
        let previews = document.querySelectorAll(".preview");
        previews.forEach((preview) => {
          setTimeout(() => {
            preview.remove();
          }, 750);
        });
      }
    }
  }
  let resizezones = [
    {
      x: {
        start: 0,
        end: 30,
      },
      y: {
        start: (window.innerHeight / 100) * 15,
        end: (window.innerHeight / 100) * 85,
      },
      result: {
        measure: ["%", "px"],
        height: window.innerHeight - 45,
        width: 50,
        xpos: 0,
        ypos: 0,
        // top L, top R, Bottom L, bottom R
        border: [0, 8, 0, 8],
      },
    },
    {
      x: {
        start: 0,
        end: 30,
      },
      y: {
        start: 0,
        end: (window.innerHeight / 100) * 15,
      },
      result: {
        measure: ["%", "%"],
        height: 50,
        width: 50,
        xpos: 0,
        ypos: 0,
        border: [0, 8, 8, 8],
      },
    },
    {
      x: {
        start: 30,
        end: window.innerWidth - 30,
      },
      y: {
        start: 0,
        end: 30,
      },
      result: {
        measure: ["%", "px"],
        height: window.innerHeight - 45,
        width: 100,
        xpos: 0,
        ypos: 0,
        border: [0, 0, 0, 0],
      },
    },
    {
      x: {
        start: 0,
        end: 30,
      },
      y: {
        start: (window.innerHeight / 100) * 85,
        end: window.innerHeight,
      },
      result: {
        measure: ["%", "%"],
        height: 50,
        width: 50,
        xpos: 0,
        ypos: (window.innerHeight / 100) * 50 - 45,
        border: [8, 8, 0, 8],
      },
    },
    {
      x: {
        start: window.innerWidth - 30,
        end: window.innerWidth,
      },
      y: {
        start: (window.innerHeight / 100) * 85,
        end: window.innerHeight,
      },
      result: {
        measure: ["%", "%"],
        height: 50,
        width: 50,
        xpos: (window.innerWidth / 100) * 50,
        ypos: (window.innerHeight / 100) * 50 - 45,
        border: [8, 8, 8, 0],
      },
    },
    {
      x: {
        start: window.innerWidth - 30,
        end: window.innerWidth,
      },
      y: {
        start: 0,
        end: (window.innerHeight / 100) * 15,
      },
      result: {
        measure: ["%", "%"],
        height: 50,
        width: 50,
        xpos: (window.innerWidth / 100) * 50,
        ypos: 0,
        border: [8, 0, 8, 8],
      },
    },
    {
      x: {
        start: window.innerWidth - 30,
        end: window.innerWidth,
      },
      y: {
        start: (window.innerHeight / 100) * 15,
        end: (window.innerHeight / 100) * 85,
      },
      result: {
        measure: ["%", "px"],
        height: window.innerHeight - 45,
        width: 50,
        xpos: (window.innerWidth / 100) * 50,
        ypos: 0,
        border: [8, 0, 8, 0],
      },
    },
  ];
  function closeDragElement(e, x, y) {
    if (horizontal == true) {
      dirhandler.style.width = "10px";
      horizontal = false;
    }
    if (vertical == true) {
      dirhandler.style.height = "10px";
      vertical = false;
    }
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.classList.remove("grab");
    desktop.getActiveApp().style.opacity = "1";
    if (move == true) {
      // moved so resize ok
      for (let i = 0; i < resizezones.length; i++) {
        const resize = resizezones[i];
        if (
          resize.x.start <= x &&
          resize.x.end >= x &&
          resize.y.start <= y &&
          resize.y.end >= y
        ) {
          let the = resize.result;
          resize_window(
            e,
            the.width,
            the.height,
            the.measure,
            the.xpos,
            the.ypos
          );
          break;
        }
      }
    } else {
      // not moved so dont resize with shortcuts
    }
  }
}
/*-------------------------------------------*/
/*------Event-Listeners----------------------*/
/*-------------------------------------------*/
if (localStorage.getItem("background")) {
  fetch(localStorage.getItem("background"))
    .then((res) => res.blob())
    .then((blob) => {
      document
        .querySelector(":root")
        .style.setProperty(
          "--background",
          "url(" + URL.createObjectURL(blob) + ")"
        );
    });
}
function localStorageSpace(num) {
  return new Array(num * 1024 + 1).join("a");
}

// Determine the size of localStorage if it's not set
if (!localStorage.getItem("size")) {
  localStorage.clear();
  let i = 0;
  try {
    // Test up to 20 MB
    for (i = 0; i <= 20000; i += 250) {
      localStorage.setItem("test", localStorageSpace(i));
    }
  } catch (e) {
    localStorage.removeItem("test");
    localStorage.setItem("size", i ? i - 250 : 0);
  }
}
/*-------------------------------------------*/
/*------Check-Some-Things-Before-Load--------*/
/*-------------------------------------------*/

/*-------------------------------------------*/
/*-----------No logging for production-------*/
/*-------------------------------------------*/
let DEBUG = true;
if (!DEBUG) {
  if (!window.console) window.console = {};
  let methods = ["log", "debug", "warn", "info", "table", "error"];
  for (let i = 0; i < methods.length; i++) {
    console[methods[i]] = function () {};
  }
}

/*-------------------------------------------*/
/*--------------Load-In-The-"os"-------------*/
/*-------------------------------------------*/
/*-------------------------------------------*/
/*--------------End of onload----------------*/
/*-------------------------------------------*/
window.addEventListener("keydown", shortcuts);
window.addEventListener("keyup", shortcuts);

const keys = {}

window.addEventListener('keydown', (ev) => {
  keys[ev.key] = true;
  if(keys['Control']){
    ev.preventDefault();
  }
})

window.addEventListener('keyup', (ev) => {
  if (keys['Control']){
    if(keys['ArrowLeft']){
      resize_window(null, 50, 100, ["%", "%"], 0, 0)
    }else if(keys['s']){
      ev.preventDefault();
      window.top.openapp('crApp store', false);
    }
  }else if (keys['Alt'] && keys['w']) {
    ev.preventDefault();
    appwindow.close(document.querySelector(".active"), 0);
  } else if (keys['Enter']) {
    if(document.activeElement){
      ev.preventDefault();
      document.activeElement.click();
      if(document.activeElement.closest(".group")){
        // click 2 times for files
        document.activeElement.click();
      }
    }
  }else if(keys['Delete']){
    ev.preventDefault();
    if(document.activeElement.closest(".files .group")){
      document.activeElement.closest(".files .group").remove();
    }
  }else{
    // no keys for it
  }
  keys[ev.key] = false
})

function shortcuts(event) {
  if (event.type == "keydown") {
    if (event.key.toLowerCase() == "escape") {
      resetfiles();
      hidecontext();
    } else if (event.shiftKey && event.key.toLowerCase() == "d") {
      // duplicate function
      duplicate();
      event.preventDefault();
    } else if (event.altKey && event.key.toLowerCase() == "b") {
      //background change
      event.preventDefault();
      desktop.showFilepicker();
    } else if (event.key == "Home") {
      event.preventDefault();
      appwindow.hidetab("all");
    } else if (
      (event.ctrlKey || event.altKey) &&
      event.key.toLowerCase() == "1"
    ) {
      event.preventDefault();
      desktop.share();
    }
  } else if (event.type == "keyup") {
    if (event.altKey && event.code == "KeyS") {
      event.preventDefault();
      desktop.screenShot();
    } else if (event.shiftKey && event.key.toLowerCase() == "f11") {
      appwindow.fullscreen(document.querySelector(".window.active"));
    }
  }
}
function duplicate() {
  let clone_origin;
  if (desktop.getActiveApp()) {
    clone_origin = desktop.getActiveApp();
  } else {
    // if none, select the firstly opened window
    clone_origin = document.querySelector(".window");
  }
  cloned = clone_origin.childNodes[0].parentNode.cloneNode(true);
  cloned.classList.add("active");
  clone_origin.classList.remove("active");
  cloned.style.width = "";
  cloned.style.height = "";
  cloned.style.left = "";
  cloned.style.top = "";
  document.body.appendChild(cloned);
}
function resize_window(target, xdim, ydim, units, xpos, ypos) {
  target = desktop.getActiveApp();
  windowelem.classList.remove("fullscreen");
  dockparent.classList.remove("animation");
  if (target == null || undefined) {
    target = document.querySelector(".window.active");
  } else {
    target.style.width = `${xdim}${units[0]}`;
    target.style.height = `calc(${ydim}${units[1]} - 45px)`;
    target.style.left = `${xpos}px`;
    target.style.top = `calc(${ypos}px + 30px)`;
  }
}
function disabled_warn(what) {
  let multiple;
  if (what.endsWith("s")) {
    multiple = "are";
  } else {
    multiple = "is";
  }
  systemerror(
    what + ` ${multiple} currently disabled`,
    `please check later for updates`
  );
  throw new Error("disabled");
  return;
}
// STYLING functions
function brightnesschange(e) {
  // while brightness found -> remove
  while (document.body.style.filter.indexOf(`brightness(90%)`) !== -1) {
    filter("brightness", 90, "remove");
  }
  for (let i = 0; e.max - e.value > i; i++) {
    filter("brightness", 90, "add");
  }
}
function invert(elem) {
  document.querySelector(elem).classList.toggle("inverted");
}
function filter(prop, value, type) {
  deviceSettings.filterScreen(prop, value, type);
}

// event listeners
function nopurposeelent(element) {
  if (element.closest(".alerts")) {
    return true;
  }
  if (element.closest(".files")) {
    return true;
  }
  return false;
}
document.body.addEventListener("mousedown", function (e) {
  let element = e.target;
  if (element.closest(".window")) {
    dragElement(e.target.closest(".window"), e);
  } else if (e.target.tagName == "IFRAME") {
    let iframes = document.querySelectorAll("iframe");
    for (let i = 0; iframes.length > i; i++) {
      iframes[i].style.pointerEvents = "auto";
    }
  }
});
let autobrightness = false;
document.body.addEventListener("click", async function (e) {
  let element = e.target;
  let eclass = element.classList;
  if (eclass.contains("close_tab")) {
    appwindow.close(element);
  } else if (eclass.contains("sir")) {
    desktop.openApp("sir", e);
  } else if (eclass.contains("fullscreen_tab")) {
    appwindow.fullscreen(element);
  } else if (eclass.contains("invert")) {
    invert("body");
  } else if (e.target.closest("#fullscreen")) {
    desktop.fullscreen_page(document.body);
  } else if (e.target.closest(".auto_brightness")) {
    autobrightness = !autobrightness;
    let warn = autobrightness === true ? "enabled" : "disabled";
    ui_warn("brightness", "automatic brightness " + warn);
  } else if (element.closest("li")) {
    // opens an app from applist
    element = element.closest("li");
    let img = element.querySelector("img");
    if (img) {
      if (img.hasAttribute("data-window")) {
        if (img.getAttribute("data-window") !== "false") {
          desktop.openApp(img.getAttribute("data-window"), e);
        } else {
          ui_warn("not an app", "this is not an app and cant be opened");
        }
      }
    }
  }
});

document.addEventListener("dblclick", async function (e) {
  let element = e.target;
  let eclass = element.classList;
  if (eclass.contains("title")) {
    appwindow.fullscreen(element);
  } else {
    e.preventDefault();
  }
});
let brightness = document.querySelector(".name .auto_brightness");
brightness.style.display = "none";
if ("AmbientLightSensor" in window) {
  brightness.style.display = "block";
  const sensor = new AmbientLightSensor();
  sensor.addEventListener("reading", (event) => {
    if (autobrightness == true) {
      filter("brightness", 50 + sensor.illuminance / 1000, "replace");
    }
  });
  sensor.start();
} else {
  document.body.querySelector(".auto_brightness").style.display = "none";
  // hide auto brightness
}

document.addEventListener("fullscreenchange", function (e) {
  if (document.fullscreenElement) {
    document.querySelector("#fullscreen").innerText = "close fullscreen";
  } else {
    document.querySelector("#fullscreen").innerText = "open fullscreen";
  }
});
// When the toggle button is clicked, enter/exit fullscreen
document.addEventListener("change", function (e) {
  if (e.target.closest("#logo")) {
    desktop.setwindowname(appwindow.title);
  } else if (e.target.closest("#fileupload")) {
    desktop.setNewBackground(document.querySelector("#fileupload").files[0]);
  }
});

window.onmessage = function (message) {
  if (message.data == "settings") {
    // requested current settings
    appwindow
      .getActiveApp()
      .querySelector("iframe")
      .contentWindow.postMessage(deviceSettings, "*");
  } else {
    // change settings -> know its not secure
    deviceSettings.set(message.data);
  }
};
function readvideobg(evt) {
  let video = document.querySelector(".videobg");
  //Retrieve the first (and only!) File from the FileList object
  let f = evt.target.files[0];

  if (f) {
    let r = new FileReader();
    r.onload = function (e) {
      let contents = e.target.result;
      let uint8Array = new Uint8Array(contents);

      let arrayBuffer = uint8Array.buffer;
      let blob = new Blob([arrayBuffer]);
      video.src = URL.createObjectURL(blob);
    };
    r.readAsArrayBuffer(f);
  } else {
    alert("Failed to load file");
  }
}
//### LOAD DESKTOP ###//
let desktop, appwindow;
window.addEventListener("load", async function () {
  desktop = new Desktop();
  try {
    await desktop.load();
  } catch (error) {
    desktop.error(error.name, error.message, error);
  }
  appwindow = new Window("Home", "about:blank", "Home");
  appwindow.load(document.querySelector("iframe"));
});
