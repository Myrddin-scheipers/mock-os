let dblclicktime = 800;
// window.addEventListener("load", this.focus());
function select(file){
  if(file.closest(".group")){
      file.closest(".group").classList.add("active");
      document.querySelector(".dropdown.file *[data-action='rename']").classList.remove("disabled");
    }
  }
function replaceTag(target, changeto) {
  let that = target;

  let newtag = document.createElement(changeto);
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
  newtag.focus();
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
    if (file.classList.contains("active") || e == document.querySelector(".renamebutton")) {
      file.classList.remove("active");
      let filenameelem;
      let input = file.querySelector("input");
      if (input == undefined) {
        filenameelem = file.querySelector("p");
        replaceTag(filenameelem, "input");
      } else {
        return;
      }
    } else {
      let selection = document.querySelectorAll(".active");
      selection.forEach(selected => {
        selected.classList.remove("active");
      });
      file.classList.add("active");
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
let applist = document.querySelector(".openwith");
function resetfiles() {
  let files = document.querySelector(".files")
  while(document.querySelector(".dropdown input:checked")){
    document.querySelector(".dropdown input:checked").checked = false;
  }
  while (document.querySelector(".files input")) {
    replaceTag(document.querySelector(".files input"), "p");
  }
  while (document.querySelector(".rename")) {
    document.querySelector(".rename").classList.remove("rename");
  }
  while (files.querySelector(".active")) {
    files.querySelector(".active").classList.remove("active");
  }
  while (document.querySelector('.context')) {
    document.querySelector('.context').classList.remove("context");
  }
  applist.style.display = "none"
  applist.innerHTML = "";
  element = document.querySelector(".action");
  if (element) {
    element.classList.remove("action");
  }
}

function tap(e) {
  // check if tapped same element as last time
  if (e.target != lastclickedelem) {
    // clicked diffrent element
    lastclickedelem = e.target;
    doubletapTimer = null;
  }
  if (e.target.closest(".group") == undefined) {
    // not clicked on a file
    resetfiles();
    return;
  }
  if (e.target.closest(".group").querySelector("input")) {
    //clicked on an input (when renaming)
    return;
  }
  if (!e.target.closest(".group").classList.contains("active")) {
    // when your files are not selected already (click on diffrent file)
    resetfiles();
  }
  if (doubletapTimer == null) {
    // clicked more then 1 sec ago on a file or not clicked at all
    if (document.querySelector(".files .active") != e.target.closest(".group")) {
      // First tap, we wait X ms to the second tap
      doubletapTimer = setTimeout(function () {
        // idk what this does 
        // should just set active does in testing but idk in code
        singleclick(e);
      }, dblclicktime);
    } else {
      // clicked more then 1 sec ago
      // rename file
      singleclick(e);
    }
  } else {
    // double tap withing dblclicktime
    // open the file
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
  if (document.querySelector(".action")) {
    // opened with "open with" button
    element = document.querySelector(".action");
    element.classList.remove("action");
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
    if (window.top.localStorage.getItem("ext_" + ext) && specialopen == false) {
      openfile(element, window.top.localStorage.getItem("ext_" + ext));
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
function deletefile(e, target){
  console.log(target, e);
  if(target.closest(".group")){
    target.closest(".group").remove();

  }
}
window.addEventListener("load", function () {
  if (document.querySelector(".renamebutton")) {
    document.querySelector(".renamebutton").addEventListener("click", function (e) {
      renamefile(this, document.querySelector('.rename'));
    })
  }
  if (document.querySelector(".deletebutton")) {
    document.querySelector(".deletebutton").addEventListener("click", function (e) {
      deletefile(this, document.querySelector('.action'));
    })
  }
  if (document.querySelector(".openwith_btn")) {
    let openwith_btn = document.querySelector(".openwith_btn");
    let where;
    openwith_btn.addEventListener("click", function (e) {
      where = document.querySelector('.action');
      openfile(where, false);
    })
  }
});
async function get_openwith(elem, path, thewindow) {
  if(this.frameElement){
    window.top.get_openwith(elem, path, this.window);
  }
  elem.classList.add("action");
  let apps = [];
  let ext = path.split('.').pop();
  if (ext.includes("/")) {
    //folder
    ext = "directory";
  }
  //file & folder
  await fetch(window.location.protocol + "//" + window.location.host + '/assets/frames/frames.php?ext=' + ext)
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(json => {
      if (json.status == 200) {
        apps = json.body;
      } else {
        ui_warn("serious issue");
      }
    });
  window.top.showopenwith(apps, ext, thewindow);
  return;
}

function showopenwith(apps, ext, thewindow) {
  if(this.window == window.top){
    thewindow = this.window;
  }else{
    thewindow = window.top;
  }
  applist.style.display = "block";
  applist.innerHTML = "";
  let i = 0;
  apps.forEach(app => {
    let app_to_use = document.createElement("div");
    let text = document.createTextNode(`open with ${app.title}`);
    app_to_use.appendChild(text);
    app_to_use.setAttribute("data-app", app.name)
    app_to_use.setAttribute("tabindex", "0");
    applist.appendChild(app_to_use);
  });
  let alwaysbtn = document.createElement("div");
  let alwaystxt = document.createTextNode(`use always`);
  alwaysbtn.appendChild(alwaystxt);
  alwaysbtn.classList.add("always")
  alwaysbtn.style.display = "none";
  alwaysbtn.setAttribute("tabindex", "0")
  applist.appendChild(alwaysbtn);
  applist.firstElementChild.focus();
  alwaysbtn.addEventListener("click", function (e) {
    alwaysbtn.classList.remove("use");
    if (applist.querySelector(".use")) {
      thewindow.openfile(e, applist.querySelector(".use").dataset.app);
      window.top.localStorage.setItem("ext_" + ext, applist.querySelector(".use").dataset.app);
      applist.style.display == "none";
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
  deviceSettings.set({"files": {"size": [value,15,5],}})
}
let items = document.querySelectorAll('.files .group');
let dragSrcEl = null;
function handleDragStart(e) {
  resetfiles();
  this.style.opacity = '0.4';
  
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  e.preventDefault();
  if(!dragSrcEl){
    return;
  }
  if (dragSrcEl.closest(".group") != this.closest(".group")) {
    select(this);
  }
  if(this.closest(".group")){
    if (dragSrcEl.closest(".group") != this.closest(".group")) {
      select(this);
    }
  }
}

function handleDragLeave(e) {
  if(e.target != this.closest(".group")){
    resetfiles();
  }
}

function handleDrop(e) {
  console.log(this);
  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }
  if(this.closest(".group")){
    if (dragSrcEl.closest(".group") != this.closest(".group")) {
      dragSrcEl.innerHTML = this.closest(".group").innerHTML;
      this.closest(".group").innerHTML = e.dataTransfer.getData('text/html');
    }
  }else if(this.closest("#bin")){
    dragSrcEl.remove();
  }
  return false;
}

function handleDragEnd(e) {
  this.style.opacity = '1';
  items.forEach(function (item) {
    item.classList.remove('over');
  });
}
document.addEventListener('DOMContentLoaded', async function(event){  
    items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, true);
    item.addEventListener('dragover', handleDragOver, true);
    item.addEventListener('dragleave', handleDragLeave, true);
    item.addEventListener('dragenter', handleDragEnter, true);
    item.addEventListener('drop', handleDrop, true);
    item.addEventListener('dragend', handleDragEnd, true);
  });
  let applist = document.querySelector(".dock-container ul");
  let liitem = document.createElement("li");
  let liname = document.createElement("div");
  liitem.addEventListener("click", function(e){
    e.preventDefault();
  })
  await loadInstalledApps();
  showbin();
});
function showbin(){
  let applist = document.querySelector(".dock-container ul");
  let liitem = document.createElement("li");
  let liname = document.createElement("div");
  let liimg = document.createElement("img");
  liname.setAttribute("class", "name");
  liname.appendChild(document.createTextNode("bin"));
  liimg.setAttribute("data-window", false);
  liimg.setAttribute("data-id", false);
  liimg.setAttribute("class", "ico");
  liitem.setAttribute("id", "bin");
  liimg.setAttribute("src", `${window.location.protocol + "//" + window.location.host}/assets/images/binary.png`);
  liitem.appendChild(liname);
  liitem.appendChild(liimg);
  applist.appendChild(liitem);
  liitem.addEventListener('dragstart', handleDragStart, true);
  liitem.addEventListener('dragover', handleDragOver, true);
  liitem.addEventListener('dragleave', handleDragLeave, true);
  liitem.addEventListener('dragenter', handleDragEnter, true);
  liitem.addEventListener('drop', handleDrop, true);
  liitem.addEventListener('dragend', handleDragEnd, true);
}