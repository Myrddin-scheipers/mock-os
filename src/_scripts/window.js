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
        ui_warn("error", err);
      }
    }
    changetitle(windowname, windowurl, windowdesc, target) {
      null == windowname ? (this.title = "Home") : (this.title = windowname);
      null == windowurl ? (this.url = "about:blank") : (this.url = windowurl);
      null == windowdesc ? (this.desc = undefined) : (this.desc = windowdesc);
      target.querySelector(
        ".title"
      ).innerHTML = `<a tabindex="-1" target='_blank' href='${this.url}'>${this.title}: ${this.desc}</a> 🔍`;
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
        windows.forEach((element) => {
          element.classList.add("minimize");
        });
      } else {
        tab.closest(".window").classList.add("minimize");
      }
    }
    close(tab, isappname) {
      window.top[0].focus();
      this.title = "home";
      super.setwindowname(this.title);
      if (isappname) {
        tab = document.querySelector(`#window[data-window=${tab}]`);
      }
      if (tab == "all") {
        let windows = document.querySelectorAll(".window");
        windows.pop();
        windows.forEach((window) => {
          if (document.querySelectorAll(".window").length > 1) {
            window.remove();
          } else {
            window.querySelector("iframe").setAttribute("src", "about:blank")
            window.classList.add("minimize");
          }
        });
      } else if (document.querySelectorAll(".window").length > 1) {
        if(desktop.getActiveApp()){
          super.setwindowname(desktop.getActiveApp());
        }
        tab.closest(".window").remove();
      } else {
        console.log(tab);
        tab = tab.closest(".window");
        tab.classList.add("minimize");
        tab.querySelector("iframe").setAttribute("src", "about:blank")
        tab.setAttribute("data-window", "boot")
      }
    }
    load(target) {
      target.style.visibility = "visible";
    }
    setactive(parent) {
      let actives = document.querySelectorAll(".active");
      actives.forEach((element) => {
        element.classList.remove("active");
      });
      parent.classList.add("active");
      super.setwindowname(parent.dataset.window);
    }
  }