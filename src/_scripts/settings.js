if (typeof window.Settings === 'undefined') {
window.Settings = class {
    constructor() {
      (this.dock = {
        float: false,
      }),
        (this.colors = {
          primary: {
            background: "#000000",
            text: "#eee",
          },
          effect: "#560cad",
          mainText: "#ffffff",
          reversedText: "#000000",
        }),
        (this.background = {
          color: "#212121",
          image: "./assets/images/bg.png",
        }),
        (this.screen = {
          radius: {
            main: "8px",
          },
          autoBrightness: false,
          brightness: [15, 0, 15],
          saturation: [100, 0, 200],
          contrast: false,
        }),
        (this.files = {
          size: [10, 15, 5],
          image: {
            folder: window.location.origin + "/assets/images/folder.svg",
            txt: "",
          },
        });
    }
    set(setting) {
      if (setting) {
        for (const [key, value] of Object.entries(setting)) {
          this[key] = value;
        }
      }
      this.changeBackground(this.background.image);
      document
        .querySelector(":root")
        .style.setProperty("--main-effect", this.colors.effect);
      document
        .querySelector(":root")
        .style.setProperty("--main-text", this.colors.mainText);
      document
        .querySelector(":root")
        .style.setProperty("--reversed-text", this.colors.reversedText);
      document
        .querySelector(":root")
        .style.setProperty("--file-columns", this.files.size[0]);
        document
        .querySelector(":root")
        .style.setProperty("--background-color", this.background.color);
        document
        .querySelector(":root")
        .style.setProperty("--color-bg-primary", this.colors.primary.background);
        document
        .querySelector(":root")
        .style.setProperty("--color-text-primary", this.colors.primary.text);
        document
        .querySelector(":root")
        .style.setProperty("--radius", this.screen.radius.main);
        document
        .querySelector(":root")
        .style.setProperty("--files-folder-icon", `url(${this.files.image.folder})`);
    }
    reset(prop) {
      let slider = document.querySelector(`.slider.${prop}`);
      if (slider != null || slider != undefined) {
        slider.value = slider.defaultValue;
        slider.oninput();
      }
    }
    changeBackground(background) {
      this.background.image = background;
      document
        .querySelector(":root")
        .style.setProperty("--background", `url(${this.background.image})`);
    }
    filterScreen(prop, value, type) {
      if (disabled.filters) {
        disabled_warn("filters");
      }
      if (type == "toggle") {
        // -1 means not found => confusing
        if (document.body.style.filter.indexOf(`${prop}(${value}%)`) !== -1) {
          document.body.style.filter = document.body.style.filter.replaceAll(
            `${prop}(${value}%)`,
            ""
          );
        } else {
          document.body.style.filter =
            document.body.style.filter + `${prop}(${value}%)`;
        }
      } else if (type == "add") {
        document.body.style.filter += `${prop}(${value}%)`;
      } else if (type == "remove") {
        document.body.style.filter = document.body.style.filter.replace(
          `${prop}(${value}%)`,
          ""
        );
      } else if (type == "replace") {
        let regex = prop + "\\(.+?%\\)";
        let tofind = new RegExp(regex, "g");
        document.body.style.setProperty(
          "filter",
          document.body.style.filter.replaceAll(tofind, "")
        );
        document.body.style.filter += `${prop}(${value}%)`;
      } else {
        return;
      }
    }
  }
var deviceSettings;
window.addEventListener("load", function(){
  deviceSettings = new Settings();
  if(window.frameElement){
    window.onmessage = function (message) {
      deviceSettings.set(message.data);
      };
  }else{
    deviceSettings.set();
  }
})
}