let app_name_top;
let windowelem;
let dockparent;
let title;
let batteryelem;
let loader;
let data;
let movetoelem;
let version = 0.16;
const disabled = {
  sleepmode: false,
  filters: false,
  system: false,
  files: false,
  apps: false,
};
if (location.protocol !== 'https:') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
function eraseCookie(name) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}
function resetsystem(){
  system = true;
  if(system){
    let loader = document.querySelector(".loader");
    loader.style.display = "flex";
    loader.querySelector("p").innerHTML = "clearing data";
    let width = 0;
    localStorage.clear();
    eraseCookie("app_list")
    setInterval(() => {
      width = (width + (100 / 20));
      loader.querySelector("#pc_loader").style.width = width+"%";
    }, 60);
    setTimeout(() => {
      window.location.reload();
    }, 20*60);
  }
}
if (localStorage.getItem("version")) {
  if (localStorage.getItem("version") == version) {
    // current version
  } else {
    // old version (check stuff)
    document.querySelector(".loader p").innerHTML = "updating system";
    warn_link_button("new version", "check new features", `${window.location.protocol + "//" + window.location.host}/assets/update/log.json`);
    localStorage.setItem("version", version);
  }
} else {
  // first visit
  document.querySelector(".loader p").innerHTML = "preparing system";
  localStorage.setItem("version", version);
}
function closewindow(what, isappname) {
  appwindow.close(what, isappname);
}
window.addEventListener("contextmenu", e => e.preventDefault());
  app_name_top = document.querySelector("#app_name");
  windowelem = document.querySelector(".window");
  dockparent = document.getElementsByClassName("dock-parent")[0];
  title = document.querySelector(".title");
  close = document.querySelector(".close_tab");
  batteryelem = document.getElementById("battery");
  loader = document.getElementById("pc_loader");
  data = windowelem.getAttribute("data-window");
  movetoelem = document.querySelectorAll(`[data-window="${data}"]`)[0];

let gotopos = [movetoelem.getBoundingClientRect().left, movetoelem.getBoundingClientRect().top];
let dockelem = document.querySelector(".dock-container");
let checkboxes = document.querySelectorAll('input[type=checkbox]');
// logs actions to revert
const actionhistory = [];
/*-------------------------------------------*/
/*----------------functions------------------*/
/*-------------------------------------------*/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/*-------------------------------------------*/
/*------Stolen-functions---------------------*/
/*-------------------------------------------*/
function menutime() {

  // We create a new Date object and assign it to a letiable called "time".
  let time = new Date(),

    // Access the "getHours" method on the Date object with the dot accessor.
    hours = time.getHours(),

    // Access the "getMinutes" method with the dot accessor.
    minutes = time.getMinutes();

  document.querySelectorAll('.menutime')[0].innerHTML = harold(hours) + ":" + harold(minutes);

  function harold(standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn
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
    batteryelem.innerHTML = battery + ' <i class="fas fa-battery-three-quarters"></i>';
  }, 3000);
  setTimeout(() => {
    batteryelem.innerHTML = battery + ' <i class="fas fa-battery-full"></i>';
  }, 4000);
};
function dragElement(elmnt) {
  setactive(elmnt);
  elmnt.classList.add("grab");
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  // otherwise, move the DIV from anywhere inside the DIV:
  let iframes = document.querySelectorAll("iframe");
  for (let i = 0; iframes.length > i; i++) {
    iframes[i].style.pointerEvents = "none";
  }
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    if (pos3 < 10 || pos3 + 10 >= document.body.clientWidth || pos4 < 30) {

    }
    document.onmouseup = function (e) {
      closeDragElement(e, pos3, pos4);
    }
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
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
  }

  function closeDragElement(e, x, y) {
    let iframes = document.querySelectorAll("iframe");
    for (let i = 0; iframes.length > i; i++) {
      iframes[i].style.pointerEvents = "auto";
    }
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.classList.remove("grab");
    if (y <= 30) {
      appwindow.fullscreen(elmnt.firstElementChild);
    } else if (x <= 10) {
      resize_window(e, 50, 100, "%", 0, 30);
    } else if (x + 10 >= document.body.clientWidth) {
      resize_window(e, 50, 100, "%", 50, 30);
    }
  }
}
/*-------------------------------------------*/
/*------Event-Listeners----------------------*/
/*-------------------------------------------*/

dockelem.addEventListener('click', async event => {
  if (event.target.hasAttribute("data-window")) {
    openapp(event.target.getAttribute("data-window"), event);
  } else if (event.target.children[0].hasAttribute("data-window")) {
    openapp(event.target.childNodes[0].getAttribute("data-window"), event);
  }
});
if (localStorage.getItem('background')) {
  fetch(localStorage.getItem('background'))
    .then(res => res.blob())
    .then(blob => {
      document.querySelector(':root').style.setProperty('--background', "url(" + URL.createObjectURL(blob) + ")");
    })
  // document.querySelector("img").src = file//URL.createObjectURL(localStorage.getItem('background'));
}
function localStorageSpace(num) {
  return new Array((num * 1024) + 1).join('a')
}

// Determine the size of localStorage if it's not set

if (!localStorage.getItem('size')) {
  localStorage.clear();
  let i = 0;
  try {
    // Test up to 20 MB
    for (i = 0; i <= 20000; i += 250) {
      localStorage.setItem('test', localStorageSpace(i));
    }
  } catch (e) {
    localStorage.removeItem('test');
    localStorage.setItem('size', i ? i - 250 : 0);
  }
}
/*-------------------------------------------*/
/*------Call-Some-Functions-Before-Load------*/
/*-------------------------------------------*/
setInterval(menutime, 1000);
/*-------------------------------------------*/
/*------Check-Some-Things-Before-Load--------*/
/*-------------------------------------------*/
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('change', function () {
    let checking;
    if (this.checked == true) {
      checking = true;
    } else {
      checking = false;
    }
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    this.checked = checking;
  });
}
/*-------------------------------------------*/
/*--------------No logging for prod----------*/
/*-------------------------------------------*/


let DEBUG = true;
if (!DEBUG) {
  if (!window.console) window.console = {};
  let methods = ["log", "debug", "warn", "info", "table", "error"];
  for (let i = 0; i < methods.length; i++) {
    console[methods[i]] = function () { };
  }
}

/*-------------------------------------------*/
/*--------------Load-In-The-"os"-------------*/
/*-------------------------------------------*/
/*-------------------------------------------*/
/*--------------End of onload----------------*/
/*-------------------------------------------*/
window.onoffline = (event) => {
  let wifielem = document.getElementById("wifi");
  wifielem.innerHTML = '<i class="bi bi-wifi-off"></i>';
};
window.ononline = (event) => {
  let wifielem = document.getElementById("wifi");
  wifielem.innerHTML = '<i class="bi bi-wifi"></i>';
};
window.addEventListener("keydown", shortcuts);
window.addEventListener("keyup", shortcuts);
function shortcuts(event) {
  if (event.type == "keydown") {
    if ((event.shiftKey && event.key.toLowerCase() == "f4") || (event.altKey && event.key.toLowerCase() == "w")) {
      //close event
      appwindow.close(document.querySelector(".active"), 0);
      event.preventDefault();
    } /* else if (event.key == "F3" || (event.ctrlKey && event.key == "f")) {
      //search event
      event.preventDefault();
    } */ else if ((event.shiftKey && event.key.toLowerCase() == "d")) {
      // duplicate event
      duplicate();
      event.preventDefault();
    } else if ((event.shiftKey || event.ctrlKey) && event.key.toLowerCase() == "b") {
      //background change
      let backgroundinput = document.getElementById("fileupload");
      backgroundinput.click();
      event.preventDefault();
    } else if (event.key == "Home") {
      event.preventDefault();
      appwindow.hidetab("all");
    } /* else if ((event.ctrlKey || event.altKey) && event.key.toLowerCase() == "z") {
      event.preventDefault();
      actionhistory.push("revert");
    }*/ else if ((event.ctrlKey || event.altKey) && event.key.toLowerCase() == "1") {
      event.preventDefault();
      desktop.share();
    }
  } else {
    if (event.altKey && event.code == "KeyS") {
      event.preventDefault();
      takeScreenShot()
    }
    if (event.key.toLowerCase() == "tab") {
      event.preventDefault();
      if (document.querySelector(".active").nextElementSibling) {
        document.querySelector(".active").nextElementSibling.classList.add("active");
        document.querySelector(".active").classList.remove("active");

      } else {
        let active = document.querySelector(".active")
        active.classList.remove("active");
        active.parentElement.firstElementChild.classList.add("active");
      }
    }
  }
}
async function openapp(name, event, data) {
  if (disabled.apps) {
    disabled_warn("apps");
    return;
  }
  let out = [];
  if (data) {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        out.push(key + '=' + encodeURIComponent(data[key]));
      }
    }

    out.join('&');
    out = "?" + out;
  }
  if (desktop.getActiveApp()) {
    // select the active clicked app
    windowelem = desktop.getActiveApp();
  } else {
    // if none, select the first window element and make it active
    windowelem = document.querySelector(".window");
    setactive(windowelem);
  }
  if (document.querySelector(`.window[data-window='${name}']`)) {
  }
  if (event.altKey || document.querySelector(".window").dataset.window == "boot") {
    // alt click to open in current window, instead of a new one
  } else {
    // make new window
    duplicate();
    windowelem = desktop.getActiveApp();
  }
  windowelem.setAttribute("data-window", name);
  if (windowelem.classList.contains("fullscreen")) {
    dockparent.classList.add("animation");
  }
  await fetch('./assets/frames/frames.php?q=' + name)
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(json => {
      if (json.status == 200) {
        // app exists
        let app = json.body[0];
        if (app.specialsize == true) {
          console.log(app.specialsize);
          // add custom style for special windows
          let style = document.createElement("link");
          style.setAttribute("href", window.location.protocol + "//" + window.location.hostname + "/assets/frames/" + app.developer + "/" + app.name + "/" + app.custom_style);
          style.setAttribute("rel", "stylesheet");
          document.head.appendChild(style);
        }
        let source;
        if (!app.source.startsWith("https://")) {
          // local app or unsafe
          source = "https://" + window.location.hostname + "/assets/frames/" + app.developer + "/" + app.name + "/" + app.source;
        } else {
          // external url
          source = app.source;
        }
        appwindow.changetitle(app.title, app.url, app.desc, windowelem);
        let frame = windowelem.querySelector(".tab");
        frame.setAttribute("src", "app_loader.html?app=" + source + out);
        windowelem.classList.remove("minimize");
      } else {
        // empty app
        let frame = windowelem.querySelector(".tab")
        frame.setAttribute("src", "./assets/frames/no_app.html");
        appwindow.changetitle(name, "about:blank", "this has not been made yet", windowelem);
        windowelem.classList.remove("minimize");
      }
    })
}
const takeScreenShot = async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    preferCurrentTab: true,
    video: { mediaSource: 'screen' },
  })
  // get correct video track
  const track = stream.getVideoTracks()[0]
  // init Image Capture and not Video stream
  const imageCapture = new ImageCapture(track)
  // take first frame only
  const bitmap = await imageCapture.grabFrame()
  // destory video track to prevent more recording / mem leak
  track.stop()

  const canvas = document.createElement('canvas');
  // this could be a document.createElement('canvas') if you want
  // draw weird image type to canvas so we can get a useful image
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const context = canvas.getContext('2d')
  context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
  const image = canvas.toDataURL();
  desktop.showNotifications("screenshot taken", "screenshot made", image, false)
  // this turns the base 64 string to a [File] object
  const res = await fetch(image)
  const buff = await res.arrayBuffer()
  // clone so we can rename, and put into array for easy proccessing
  const file = [
    new File([buff], `photo_${new Date()}.jpg`, {
      type: 'image/jpeg',
    }),
  ]
  return file
}
function setactive(parent) {
  let actives = document.querySelectorAll(".active");
  actives.forEach(element => {
    element.classList.remove("active");
  });
  parent.classList.add("active");
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
  document.body.appendChild(cloned);
}
function resize_window(target, xdim, ydim, unit, xpos, ypos) {
  target = desktop.getActiveApp();
  windowelem.classList.remove("fullscreen");
  dockparent.classList.remove("animation");
  if (target == null || undefined) {
    target = document.querySelector(".active")
  } else {
    target.style.width = `${xdim}${unit}`;
    target.style.left = `${xpos}${unit}`;
    target.style.height = `calc(${ydim}${unit} - 30px)`;
    target.style.top = `${ypos}px`;
  }
}
function disabled_warn(what) {
  let multiple;
  if (what.endsWith("s")) {
    multiple = "are";
  } else {
    multiple = "is";
  }
  systemerror(what + ` ${multiple} currently disabled`, `please check later for updates`);
  throw (
    new Error("disabled")
  );
  return;
}
// STYLING functions
function brightnesschange(e) {
  // while brightness found -> remove
  while (document.body.style.filter.indexOf(`brightness(90%)`) !== -1) {
    filter('brightness', 90, 'remove');
  }
  for (let i = 0; e.max - e.value > i; i++) {
    filter('brightness', 90, 'add');
  }
}
function invert(elem) {
  document.querySelector(elem).classList.toggle("inverted");
}
function reset(prop) {
  let slider = document.querySelector(`.slider.${prop}`);
  if (slider != null || slider != undefined) {
    slider.value = slider.defaultValue;
    slider.oninput();
  }
}
function filter(prop, value, type) {
  settings.filterScreen(prop, value, type);
}

// event listeners

document.body.addEventListener("mousedown", function (e) {
  let element = e.target;
  if (element.classList.contains("title") || element.classList.contains("actions")) {
    dragElement(e.target.parentElement.parentElement);
  } else if (element.parentElement.classList.contains("title") || element.parentElement.classList.contains("actions")) {
    dragElement(e.target.parentElement.parentElement.parentElement);
  }
});
let autobrightness = false;
document.body.addEventListener("click", async function (e) {
  let element = e.target;
  let eclass = element.classList;
  if (eclass.contains("close_tab")) {
    appwindow.close(element);
  } else if (eclass.contains("sir")) {
    openapp("sir", e);
  } else if (eclass.contains("fullscreen_tab")) {
    appwindow.fullscreen(element);
  } else if (eclass.contains("invert")) {
    invert('body');
  } else if (e.target.closest("#fullscreen")) {
    desktop.fullscreen_page(document.body);
  } else if (e.target.closest(".auto_brightness")) {
    autobrightness = !autobrightness;
    ui_warn('brightness', autobrightness);
  }
});

document.addEventListener("dblclick", async function (e) {
  let element = e.target;
  let eclass = element.classList;
  if (eclass.contains("title")) {
    appwindow.fullscreen(element);
  }
});
let brightness = document.querySelector(".name .auto_brightness");
brightness.style.display = "none";
if ("AmbientLightSensor" in window) {
  brightness.style.display = "block";
  const sensor = new AmbientLightSensor();
  sensor.addEventListener("reading", (event) => {
    if (autobrightness == true) {
      filter('brightness', 50 + (sensor.illuminance / 1000), 'replace');
    }
    console.log(event, sensor);
  });
  sensor.start();
} else {
}

document.addEventListener("fullscreenchange", function (e) {
  if (document.fullscreenElement) {
    document.querySelector("#fullscreen").innerText = "close fullscreen"
  } else {
    document.querySelector("#fullscreen").innerText = "open fullscreen"
  }
})
// When the toggle button is clicked, enter/exit fullscreen
document.addEventListener("change", function (e) {
  if (e.target.closest("#logo")) {
    let name = document.querySelector("#app_name").innerText;
    document.querySelector(".appname").innerHTML = "Force quit " + name;
    if (name.toLowerCase() == "home") {
      document.querySelector(".appname").style.display = "none";
    } else {
      document.querySelector(".appname").style.display = "block";
    }
  }else if(e.target.closest("#fileupload")){
    desktop.setNewBackground();
  }
});
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        // console.log("Service worker installing");
      } else if (registration.waiting) {
        // console.log("Service worker installed");
      } else if (registration.active) {
        // console.log("Service worker active");
      }
    } catch (error) {
      // console.error(`Registration failed with ${error}`);
    }
  }
};
function iframeload(target) {
  target.contentWindow.focus();
  target.style.visibility = 'visible';
}
let desktop, settings, appwindow;
window.addEventListener("load", function () {
  settings = new Settings()
  desktop = new Desktop();
  desktop.load();
  iframeload(document.querySelector("iframe"));
  appwindow = new Window("Home", "about:blank", "Home");
  registerServiceWorker();
});
class Settings {
  constructor() {
    this.brightness = 100,
    this.filesize = 5,
    this.background = 'url("./assets/images/bg.png")';
  }
  changeBackground(background){
    this.background = "url(" +  background + ")";
  }
  filterScreen(prop, value, type) {
    if (disabled.filters) {
      disabled_warn("filters");
    }
    if (type == "toggle") {
      // -1 means not found => confusing
      if (document.body.style.filter.indexOf(`${prop}(${value}%)`) !== -1) {
        document.body.style.filter = document.body.style.filter.replaceAll(`${prop}(${value}%)`, "");
      } else {
        document.body.style.filter = document.body.style.filter + `${prop}(${value}%)`;
      }
    } else if (type == "add") {
      document.body.style.filter += `${prop}(${value}%)`;
    } else if (type == "remove") {
      document.body.style.filter = document.body.style.filter.replace(`${prop}(${value}%)`, "");
    } else if (type == "replace") {
      let regex = prop + "\\(.+?%\\)";
      let tofind = new RegExp(regex, "g");
      console.log(tofind.toString(), document.body.style.filter.match(tofind), document.body.style.filter)
      document.body.style.setProperty("filter", document.body.style.filter.replaceAll(tofind, ""));
      document.body.style.filter += `${prop}(${value}%)`;
    } else {
      return;
    }
    }
}
class Desktop extends Settings {
  constructor() {
    super();
    this.amountloads = 0;
    this.frame = document.querySelector("iframe");
  }
  loading(isLoading){
    if(isLoading == true){
      this.amountloads++;
    }else{
      this.amountloads--;
    }
    if(this.amountloads >= 1){
      document.body.classList.add("loading");
    }else{
      document.body.classList.remove("loading");
    }
  }
  getActiveApp(needresult) {
    if(document.querySelector(".window.active")){
      return document.querySelector(".window.active");
    }else{
      if(needresult){
        return document.querySelector(".window");
      }else{
        return false;
      }
    }
  }
  showNotifications(title, body, icon, interaction) {
    console.log(icon, interaction)
    if (icon == false || icon == "") {
      icon = "./favicon.ico";
    }
    Notification.requestPermission(async function (result) {
      if (result === 'granted' && document.hasFocus()) {
        if (interaction == true) {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, {
              body: body,
              icon: icon,
              requireInteraction: true,
              tag: 'mock os'
            });
          });
        } else {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, {
              body: body,
              icon: icon,
              requireInteraction: false,
              tag: 'mock os'
            });
          });
        }
      } else {
        let notification = document.querySelector(".notification");
        notification.querySelector("img").src = icon;
        notification.classList.add("open");
        await sleep(5000);
        notification.classList.remove("open");
      }
    });
  }
  getOpenApps() {

  }
  setOpenApps() {

  }
  setNewBackground() {
    let file = document.querySelector("#fileupload").files[0];
    if (file == undefined) {
      ui_warn("unable to save background", "no file found");
      return;
    }
    if (file.size > Number(localStorage.getItem('size')) * 1024) {
      ui_warn("unable to save background", "restarting the pc will not keep this background");
    };
    if (file.type.match('image.*')) {
      document.querySelector('.videobg').src = "about:blank";
      document.querySelector("body").style.background = "rebeccapurple";
      this.changeBackground(URL.createObjectURL(document.getElementById("fileupload").files[0]))
      const reader = new FileReader();

      reader.readAsDataURL(document.getElementById("fileupload").files[0]);

      reader.addEventListener('load', () => {
        if (!(file.size > Number(localStorage.getItem('size')) * 1024)) {
          localStorage.setItem('background', reader.result);
        }
      });
    } else if (file.type.match('video.*')) {
      readvideobg(event);
      return;
    } else {
      return;
    }
  }
  async load() {
    this.loading(true);
    // check if system is disabled or not
    if (disabled.system) {
      disabled_warn("system");
    }
    // set background
    if (localStorage.getItem('background')) {
      fetch(localStorage.getItem('background'))
        .then(res => res.blob())
        .then(blob => {
          document.querySelector(':root').style.setProperty('--background', "url(" + URL.createObjectURL(blob) + ")");
        })
    }
    document.querySelector(".loader p").style.display = "block";
    // set battery information
    this.batteryinfo();
    // show loader
    let i = 0;
    loader.style.width = 0;
    let loaderwidth = (loader.style.width.replace("%", ""));
    loaderwidth = (loaderwidth.replace("px", ""));
    loaderwidth = Number(loaderwidth);
    while (100 > i) {
      i = i + (Math.random() * 5);
      await sleep(0);
      loader.style.width = `${i}%`;
    }
    await sleep(200);
    loader.parentElement.parentElement.style.display = "none";
    actionhistory.length = 0;
    this.loading(false);
  }
  async batteryinfo() {
    if (navigator.getBattery != null) {
      await navigator.getBattery().then((battery) => {
        function updateAllBatteryInfo() {
          updateLevelInfo();
        }
        updateAllBatteryInfo();
        battery.addEventListener("levelchange", () => {
          updateLevelInfo();
        });
        setInterval(checkbattery, 5000);

        function checkbattery() {
          if (battery.charging && Math.round(battery.level * 100) != 100) {
            loop(Math.round(battery.level * 100));
          }
        }
        function updateLevelInfo() {
          let level = battery.level * 100;
          level = Math.round(Number(level));
          if (level < 10) {
            batteryelem.innerHTML = level + '<i class="fas fa-battery-empty"></i>';
          }
          if (level >= 10 && battery.level < 30) {
            batteryelem.innerHTML = level + '<i class="fas fa-battery-quarter"></i>'
          }
          if (level >= 30 && battery.level < 60) {
            batteryelem.innerHTML = level + '<i class="fas fa-battery-half"></i>'
          }
          if (level >= 60 && battery.level < 90) {
            batteryelem.innerHTML = level + '<i class="fas fa-battery-three-quarters"></i>'
          }
          if (level > 90) {
            batteryelem.innerHTML = level + '<i class="fas fa-battery-full"></i>'
          }
        }
      });
    } else {
      batteryelem.innerHTML = '<i class="fas fa-battery-empty"></i>';
    }
  }
  setwindowname(data) {
    app_name_top.innerHTML = data;
  }
  async share() {
    let shareData = {
      title: "Mock os",
      text: "check this out",
      url: window.location.href,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      ui_warn("error", err)
    }
  }
  fullscreen_page(element){
    if (document.fullscreenElement) {
      // exitFullscreen is only available on the Document object.
      document.exitFullscreen();
    } else {
      element.requestFullscreen();
    }
  }
}
class Window extends Desktop {
  constructor(title, desc, url, style) {
    super();
    this.title = title;
    this.desc = desc;
    this.url = url;
    this.style = style;
  }
  async share(target) {
    if (e.target.closest(".window")) {
      target = e.target.closest(".window");
    } else {
      return "not valid shared";
    }
    let shareData = {
      title: target.dataset.window,
      text: "check this out",
      url: window.location.href,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      ui_warn("error", err)
    }
  }
  changetitle(windowname, windowurl, windowdesc, target) {
    null == windowname ? this.title = "Home" : this.title = windowname;
    null == windowurl ? this.url = "about:blank" : this.url = windowurl;
    null == windowdesc ? this.desc = undefined : this.desc = windowdesc;
    target.querySelector(".title").innerHTML = `<a target='_blank' href='${this.url}'>${this.title}: ${this.desc}</a> 🔍`;
    super.setwindowname(this.title);
    return;
  }
  fullscreen(event) {
    event = event.closest(".window");
    event.setAttribute("style", "");
    if (dockparent.classList.contains("animation")) {
      event.classList.remove("fullscreen");
      dockparent.classList.remove("animation");
    } else {
      event.classList.add("fullscreen");
      dockparent.classList.add("animation");
    }
  }
  hidetab(tab) {
    if (tab == "all") {
      let windows = document.querySelectorAll(".window");
      windows.forEach(element => {
        element.classList.add("minimize")
      });
    } else {
      tab.closest(".window").classList.add("minimize");
    }
  }
  close(tab, isappname) {
    if (isappname) {
      tab = document.querySelector(`#window[data-window=${tab}]`);
    }
    if (tab == "all") {
      super.setwindowname("Home");
      let windows = document.querySelectorAll(".window");
      windows.pop();
      windows.forEach(window => {
        if (document.querySelectorAll(".window").length > 1) {
          window.remove();
        } else {
          window.classList.add("minimize");
        }
      });
    } else if (document.querySelectorAll(".window").length > 1) {
      tab.closest(".window").remove();
    } else {
      super.setwindowname("Home");
      tab.closest(".window").classList.add("minimize");
    }
  }
}



function readvideobg(evt) {
  let video = document.querySelector('.videobg')
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
    }
    r.readAsArrayBuffer(f);

  } else {
    alert("Failed to load file");
  }
}
function systemerror(name, message){
  let div = document.createElement("div");
  let text = document.createElement("p");
  text.style.fontSize = "4vw";
  text.style.textAlign = "justify"
  text.style.display = "flex";
  text.style.alignItems = "center";
  text.style.alignContent = "center";
  text.style.width = "75%";
  text.innerHTML = name + "<br>" + message;
  div.appendChild(text);
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.top = "0px";
  div.style.left = "0px";
  div.style.height = "100vh";
  div.style.width = "100vw";
  div.style.position = "fixed";
  div.style.zIndex = "152"
  div.style.background = "var(--main-effect)";
  document.body.appendChild(div);
}