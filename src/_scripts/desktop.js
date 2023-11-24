
class Desktop extends Settings {
  constructor() {
    super();
    this.open = {
      context: false,
      dropdown: false,
    };
    this.amountloads = 0;
    this.frame = document.querySelector("iframe");
  }
  error(name, message, error) {
    console.log(error);
    let div = document.createElement("div");
    let text = document.createElement("p");
    text.style.fontSize = "4vw";
    text.style.textAlign = "justify";
    text.style.display = "flex";
    text.style.alignItems = "center";
    text.style.alignContent = "center";
    text.style.width = "75%";
    text.innerHTML = name + "<br>" + message + "<br><br>the system will reload in 5 seconds";
    div.appendChild(text);
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.height = "100vh";
    div.style.width = "100vw";
    div.style.position = "fixed";
    div.style.zIndex = "152";
    div.style.background = "var(--main-effect)";
    document.body.appendChild(div);
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
  loading(isLoading) {
    if (isLoading == true) {
      this.amountloads++;
    } else {
      this.amountloads--;
    }
    if (this.amountloads >= 1) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }
  reset() {
    let loader = document.querySelector(".loader");
    loader.querySelector("img").classList.add("pulse");
    loader.style.display = "flex";
    loader.querySelector("p").innerHTML = "clearing data";
    let width = 0;
    let interval = 100;
    localStorage.clear();
    eraseCookie("app_list");
    setInterval(() => {
      width = width + 100 / 20;
      loader.querySelector("#pc_loader").style.width = width + "%";
    }, interval);
    setTimeout(() => {
      window.location.reload();
    }, 20 * 60);
  }
  getActiveApp(needresult) {
    if (document.querySelector(".window.active")) {
      return document.querySelector(".window.active");
    } else {
      if (needresult) {
        return document.querySelector(".window");
      } else {
        return false;
      }
    }
  }
  async showNotifications(title, body, icon) {
    let notification = document.querySelector(".notification");
    if (icon == false || icon == "" || icon == undefined || icon == null) {
      icon = "./favicon.ico";
      notification.querySelector("a").href = "about:blank";
      notification.querySelector("img").style.display = "none";
    } else {
      notification.querySelector("a").href = icon;
      notification.querySelector("img").src = icon;
      notification.querySelector("img").style.display = "block";
    }
    notification.querySelector("h3").innerHTML = title;
    notification.querySelector("p").innerHTML = body;
    notification.classList.add("open");
    await sleep(5000);
    notification.classList.remove("open");
  }
  async openApp(name, event, data) {
    if (disabled.apps) {
      disabled_warn("apps");
      return;
    }
    let out = [];
    if (data) {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          out.push(key + "=" + encodeURIComponent(data[key]));
        }
      }
      out.join("&");
      out = "?" + out;
    }
    // get the active app
    windowelem = desktop.getActiveApp(true);
    // if the app exists
    if (
      event.altKey ||
      document.querySelector(".window").dataset.window == "boot"
    ) {
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
    await fetch("./assets/frames/frames.php?q=" + name)
      .then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data }))
      )
      .then((json) => {
        if (json.status == 200) {
          // app exists
          let app = json.body[0];
          if (app.specialsize == true) {
            // add custom style for special windows
            let style = document.createElement("link");
            style.setAttribute(
              "href",
              window.location.protocol +
              "//" +
              window.location.hostname +
              "/assets/frames/" +
              app.developer +
              "/" +
              app.name +
              "/" +
              app.custom_style
            );
            style.setAttribute("rel", "stylesheet");
            document.head.appendChild(style);
          }
          let source;
          let local = true;
          if (!app.source.startsWith("https://")) {
            // local app
            source =
              window.location.protocol +
              "//" +
              window.location.hostname +
              "/assets/frames/" +
              app.developer +
              "/" +
              app.name +
              "/" +
              app.source;
          } else {
            // external url
            local = false;
            source = app.source;
          }
          if (app.url == 0) {
            app.url = "about:blank";
          }
          appwindow.changetitle(app.title, app.url, app.desc, windowelem);
          let frame = windowelem.querySelector(".tab");
          if (local) {
            frame.setAttribute("src", "app_loader.html?app=" + source + out);
          } else {
            frame.setAttribute("src", source + out);
          }
          windowelem.classList.remove("minimize");
          frame.addEventListener("load", function () {
            frame.contentWindow.postMessage(deviceSettings, "*");
          });
        } else {
          // empty app
          let frame = windowelem.querySelector(".tab");
          frame.setAttribute("src", "./assets/frames/no_app.html");
          appwindow.changetitle(
            name,
            "about:blank",
            "this has not been made yet",
            windowelem
          );
          windowelem.classList.remove("minimize");
        }
        windowelem.focus();
      });
  }
  getOpenApps() {
    return document.querySelectorAll(".window:not(.minimize)");
  }
  setOpenApp(name, element) {
    if (name) {
      let app = document.querySelector(`.window[data-window='${name}']:not(.minimize)`);
      if (!app) {
        this.openApp(name, false);
        return;
      } else {
        app.classList.remove(".minimize");
        appwindow.setactive(app);
        return;
      }
    }
    if (element) {
      element = element.closest(".window");
      if (!element) {
        return false;
      } else {
        element.classList.remove(".minimize");
        return;
      }
    } else {
      ui_warn("error", "name or window cant be undefined");
    }
  }
  showFilepicker() {
    let backgroundinput = document.getElementById("fileupload");
    backgroundinput.click();
  }
  setNewBackground(file) {
    if (file == undefined) {
      desktop.showNotifications(
        "unable to save background",
        "background image not found",
        false,
        false
      );
      return;
    }
    if (file.size > Number(localStorage.getItem("size")) * 1024) {
      desktop.showNotifications(
        "background image '" + file.name + "' too big",
        "the file is too big to be saved, restarting will not keep this background",
        false,
        false
      );
    }
    if (file.type.match("image.*")) {
      document.querySelector(".videobg").src = "#";
      super.changeBackground(
        URL.createObjectURL(document.getElementById("fileupload").files[0])
      );
      const reader = new FileReader();

      reader.readAsDataURL(document.getElementById("fileupload").files[0]);

      reader.addEventListener("load", () => {
        if (!(file.size > Number(localStorage.getItem("size")) * 1024)) {
          localStorage.setItem("background", reader.result);
        }
      });
    } else if (file.type.match("video.*")) {
      readvideobg();
      return;
    } else {
      return;
    }
  }
  async load() {
    try {
      if (localStorage.getItem("version")) {
        if (localStorage.getItem("version") == version) {
          // current version
          document.querySelector(".loader img").classList.remove("pulse");
          document.querySelector(".loader p").innerHTML = "loading system";
        } else {
          // old version (check stuff)
          document.querySelector(".loader p").innerHTML = "updating system";
          localStorage.setItem("version", version);
        }
      } else {
        // first visit
        document.querySelector(".loader p").innerHTML = "preparing system";
        localStorage.setItem("version", version);
      }
      super.set();
      this.loading(true);
      if (disabled.system) {
        disabled_warn("system");
      }
      setInterval(menutime, 1000);
      // set background
      if (localStorage.getItem("background")) {
        fetch(localStorage.getItem("background"))
          .then((res) => res.blob())
          .then((blob) => {
            deviceSettings.changeBackground(URL.createObjectURL(blob));
          });
      }
      let loader = document.getElementById("pc_loader");
      document.querySelector(".loader p").style.display = "block";
      // set battery information
      this.battery();
      // show loader
      let i = 0;
      loader.style.width = 0;
      loader.style.backgroundColor = `#fff`;
      while (100 > i) {
        i = i + Math.random() * 5;
        loader.style.width = `${i}%`;
      }
      await sleep(200);
      loader.closest(".loader").style.display = "none";
      actionhistory.length = 0;
      this.loaded();
      window.onoffline = (event) => {
        let wifielem = document.getElementById("wifi");
        wifielem.innerHTML = '<i class="bi bi-wifi-off"></i>';
      };
      window.ononline = (event) => {
        let wifielem = document.getElementById("wifi");
        wifielem.innerHTML = '<i class="bi bi-wifi"></i>';
      };
    } catch (error) {
      this.error(error.name, error.message, error)
    }
  }
  loaded() {
    cursor.track();
    this.loading(false);
  }
  async battery() {
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
          batteryelem = document.getElementById("battery");
          let level = battery.level * 100;
          level = Math.round(Number(level));
          if (level < 10) {
            batteryelem.innerHTML =
              level + '<i class="fas fa-battery-empty"></i>';
          }
          if (level >= 10 && battery.level < 30) {
            batteryelem.innerHTML =
              level + '<i class="fas fa-battery-quarter"></i>';
          }
          if (level >= 30 && battery.level < 60) {
            batteryelem.innerHTML =
              level + '<i class="fas fa-battery-half"></i>';
          }
          if (level >= 60 && battery.level < 90) {
            batteryelem.innerHTML =
              level + '<i class="fas fa-battery-three-quarters"></i>';
          }
          if (level > 90) {
            batteryelem.innerHTML =
              level + '<i class="fas fa-battery-full"></i>';
          }
        }
      });
    } else {
      batteryelem.innerHTML = '<i class="fas fa-battery-empty"></i>';
    }
  }
  setwindowname(name) {
    if (typeof name == "object") {
      name = name.dataset.window
    }
    console.log(name);
    if (name.toLowerCase() == "home") {
      document.querySelector(".appname").style.display = "none";
    } else {
      document.querySelector(".appname").style.display = "block";
    }
    if (name == "active") {
      desktop.getActiveApp(true).dataset.window;
    } else {
      app_name_top.innerHTML = name;
      document.querySelector(".appname").innerHTML = "Force quit " + name;
    }
  }
  async share() {
    let shareData = {
      title: "Mock os",
      text: "Web based os",
      url: window.location.href,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      this.error(err.name, err.message);
    }
  }
  fullscreen_page(element) {
    if (document.fullscreenElement) {
      // exitFullscreen is only available on the Document object.
      document.exitFullscreen();
    } else {
      element.requestFullscreen();
    }
  }
  async screenShot() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
      video: { mediaSource: "screen" },
    });
    // get correct video track
    const track = stream.getVideoTracks()[0];
    // init Image Capture and not Video stream
    const imageCapture = new ImageCapture(track);
    // take first frame only
    const bitmap = await imageCapture.grabFrame();
    // destory video track to prevent more recording / mem leak
    track.stop();

    const canvas = document.createElement("canvas");
    // this could be a document.createElement('canvas') if you want
    // draw weird image type to canvas so we can get a useful image
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext("2d");
    context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
    const image = canvas.toDataURL();
    desktop.showNotifications(
      "screenshot made",
      "click to save",
      image,
      false
    );
    // this turns the base 64 string to a [File] object
    const res = await fetch(image);
    const buff = await res.arrayBuffer();
    // clone so we can rename, and put into array for easy proccessing
    const file = [
      new File([buff], `photo_${new Date()}.jpg`, {
        type: "image/jpeg",
      }),
    ];
    return file;
  }
}