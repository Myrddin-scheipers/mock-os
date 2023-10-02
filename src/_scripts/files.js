let dblclicktime = 800;
window.addEventListener("load", this.focus());
function replaceTag(target, changeto) {
  var that = target;

  var newtag = document.createElement(changeto);
  if (changeto == 'input') {
    newtag.setAttribute('value', that.innerHTML);
  }
  if (that.value) {
    newtag.innerHTML = that.value;
  }
  // move all elements in the other container.
  if (!(changeto == 'input' || changeto == 'img')) {
    while (that.firstChild) {
      newtag.appendChild(that.firstChild);
    }
  }
  that.parentNode.replaceChild(newtag, that);

}

function renamefile(e, target) {
  if (target == undefined) {
    return;
  }
  let file = target.closest(".group");
  if (target.classList.contains("group")) {
    file = target;
  }
  if (file == undefined) {
    if (e.type == "click") {

    } else {
      ui_warn("select file", "select a file to rename");
    }
    return;
  }
  if (e.type == "contextmenu") {

  } else {
    if (file.classList.contains("selected") || e == document.querySelector(".renamebutton")) {
      file.classList.remove("selected");
      let filenameelem;
      let input = file.querySelector("input");
      if (input == undefined) {
        filenameelem = file.querySelector("p");
        replaceTag(filenameelem, "input");
      } else {
        return;
      }
    } else {
      let selection = document.querySelectorAll(".selected");
      selection.forEach(selected => {
        selected.classList.remove("selected");
      });
      file.classList.add("selected");
    }
  }
}
document.querySelector(".files").addEventListener('keydown', function (e) {
  if (e.key == "Enter") {
    resetfiles();
  }
});
document.querySelector(".files").addEventListener('contextmenu', resetfiles);
if (window.matchMedia("(pointer: coarse)").matches) {
  document.querySelector(".files").addEventListener("touchend", tap);

} else {
  document.querySelector(".files").addEventListener("click", tap);
}
let lastclickedelem;
let doubletapTimer = null;

function singleclick(e) {
  doubletapTimer = null;
  renamefile(e, e.target);
}
let applist = document.querySelector(".openwith")
function resetfiles() {
  while (document.querySelector(".files input")) {
    replaceTag(document.querySelector(".files input"), "p");
  }
  while (document.querySelector(".rename")) {
    document.querySelector(".rename").classList.remove("rename");
  }
  while (document.querySelector(".selected")) {
    document.querySelector(".selected").classList.remove("selected");
  }
  while (document.querySelector('.context')) {
    document.querySelector('.context').classList.remove("context");
  }
  applist.style.display = "none"
  applist.innerHTML = "";
  element = document.querySelector(".toopen");
  if (element) {
    element.classList.remove("toopen");
  }
}

function tap(e) {
  if (e.target != lastclickedelem) {
    lastclickedelem = e.target;
    doubletapTimer = null;
  }
  if (e.target.closest(".group") == undefined) {
    resetfiles();
    return;
  }
  if (e.target.closest(".group").querySelector("input")) {
    return;
  }
  if (!e.target.closest(".group").classList.contains("selected")) {
    resetfiles();
  }
  if (doubletapTimer == null) {
    // check already clicked that element once
    if (document.querySelector(".files .selected") != e.target.closest(".group")) {
      // First tap, we wait X ms to the second tap
      doubletapTimer = setTimeout(function () {
        singleclick(e);
      }, dblclicktime);
    } else {
      // skip the wait if already clicked before -> option 3
      singleclick(e);
    }
  } else {
    // Second tap
    clearTimeout(doubletapTimer);
    openfile(e);
    doubletapTimer = null;
  }
}
function openfile(e, app) {
  applist.style.display = "none";
  let element;
  if (e == undefined) {
    return;
  }
  if (e.target == undefined) {
    element = e;
  } else {
    element = e.target;
  }
  let specialopen = false;
  if (app == false) {
    specialopen = true;
  }
  if (document.querySelector(".toopen")) {
    // opened with "open with" button
    element = document.querySelector(".toopen");
    element.classList.remove("toopen");
    specialopen = true;
  }
  eclass = element.classList;
  if (eclass.contains("group")) {

  } else if (element.closest(".group") != undefined) {
    element = element.closest(".group");
  } else {
    // no element
    return;
  }
  let data = {
    'path': "/" + element.dataset.filepath
  };
  // just clicked open
  if (app == undefined || app == false) {
    // no app to use set -> get default usage app
    let ext = data.path.split('.').pop();
    if (ext.includes("/")) {
      ext = "directory";
    }
    if (localStorage.getItem("ext_" + ext) && specialopen == false) {
      openfile(element, localStorage.getItem("ext_" + ext));
    } else {
      // no default usage app or special open
      get_openwith(element, data.path);
    }
    return;
  }
  /* 
    should only reach here if 
      1. an app is set
      2. element has the "group" class -> data attribute filepath
      3. data has a valid path of which app to open

  */
  if (typeof openapp === "function") {
    // safe to use the function
    openapp(app, element, data);
  } else if (typeof window.top.openapp === "function") {
    window.top.openapp(app, element, data);
  } else {
    window.top.ui_warn("missing function", "no function named openapp");
  }
}
window.addEventListener("load", function () {
  if (document.querySelector(".renamebutton")) {
    document.querySelector(".renamebutton").addEventListener("click", function (e) {
      renamefile(this, document.querySelector('.rename'));
    })
  }
  if (document.querySelector(".openwith_btn")) {
    let openwith_btn = document.querySelector(".openwith_btn");
    let where;
    // if (openwith_btn.classList.contains("frame")) {
    //   whatframe = document.querySelector(".window.active");
    //   if (whatframe) {
    //     whatframe = whatframe.querySelector("iframe");
    //     where = whatframe.contentWindow.document.querySelector('.toopen');
    //   } else {
    //     where = document.querySelector('.toopen');
    //   }
    // } else {
    // }
    openwith_btn.addEventListener("click", function (e) {
      where = document.querySelector('.toopen');
      openfile(where, false);
    })
  }
});
async function get_openwith(elem, path) {
  elem.classList.add("toopen");
  let apps = [];
  let ext = path.split('.').pop();
  if (ext.includes("/")) {
    //folder
    ext = "directory";
  }
  //file & folder
  await fetch("https://" + window.location.host + '/assets/frames/frames.php?ext=' + ext)
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(json => {
      if (json.status == 200) {
        apps = json.body;
      } else {
        ui_warn("serious issue");
      }
    });
  showopenwith(apps, ext);
  return;
}

function showopenwith(apps, ext) {
  applist.style.display = "block";
  applist.innerHTML = "";
  apps.forEach(app => {
    let app_to_use = document.createElement("div");
    let text = document.createTextNode(`open with ${app.title}`);
    app_to_use.appendChild(text);
    app_to_use.setAttribute("data-app", app.name)
    applist.appendChild(app_to_use);
  });
  let alwaysbtn = document.createElement("div");
  let alwaystxt = document.createTextNode(`use always`);
  alwaysbtn.appendChild(alwaystxt);
  alwaysbtn.classList.add("always")
  alwaysbtn.style.display = "none";
  applist.appendChild(alwaysbtn);
  alwaysbtn.addEventListener("click", function (e) {
    alwaysbtn.classList.remove("use");
    if (applist.querySelector(".use")) {
      localStorage.setItem("ext_" + ext, applist.querySelector(".use").dataset.app);
      openfile(e, applist.querySelector(".use").dataset.app);
    }
  });
}
applist.addEventListener("click", function (e) {
  if (e.target !== this) {
    if (e.target.dataset.app == undefined) {
      return;
    }
    while (applist.querySelector(".use")) {
      applist.querySelector(".use").classList.remove("use")
    }
    // bubbled -> what we need
    if (e.target.classList.contains("use")) {
      applist.lastElementChild.style.display = "none";
    } else {
      e.target.classList.add("use");
      applist.lastElementChild.style.display = "flex";
    }
  }
})
applist.addEventListener("dblclick", function (e) {
  if (e.target !== this) {
    // bubbled -> what we need
    openfile(e, e.target.dataset.app);
  }
})
function filecountchange(e) {
  value = e.value;
  value = Math.abs(value) / 10;
  document.querySelector(':root').style.setProperty('--file-columns', value);
}