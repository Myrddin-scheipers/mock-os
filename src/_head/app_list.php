<?php require_once("_php/curl_check.php"); ?>
<link rel="stylesheet" href="<?php echo $root;?>/_styles/applist.css">

<script>
  async function loadInstalledApps() {
    let applist = document.querySelector(".dock-container ul");
    applist.innerHTML = "";
    const response = await fetch("../assets/frames/frames.php?installed=true");
    const apps = await response.json();
    apps.forEach(app => {
      let liitem = document.createElement("li");
      let liname = document.createElement("div");
      let liimg = document.createElement("img");
      liname.setAttribute("class", "name");
      liname.appendChild(document.createTextNode(app.title));
      liimg.setAttribute("data-window", app.name);
      liimg.setAttribute("data-id", app.id);
      liimg.setAttribute("class", "ico");
      liimg.setAttribute("alt", `${app.name} app icon`)
      liimg.setAttribute("src", `${window.location.protocol + "//" + window.location.host}/assets/frames/${app.developer}/${app.name}/${app.image}`);
      liitem.appendChild(liname);
      liitem.appendChild(liimg);
      applist.appendChild(liitem);
    });
    let liitem = document.createElement("li");
    let liname = document.createElement("div");
    liitem.addEventListener("click", function(e){
      e.preventDefault();
    })
  }
</script>