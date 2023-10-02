<div class="dock-parent">
</div>
<div class="dock">
  <div class="dock-container">
    <ul>
    </ul>
  </div>
</div>
<script>
  async function loadInstalledApps() {
    let applist = document.querySelector(".dock-container ul");
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
      liimg.setAttribute("src", `https://${window.location.host}/assets/frames/${app.developer}/${app.name}/${app.image}`);
      liitem.appendChild(liname);
      liitem.appendChild(liimg);
      applist.appendChild(liitem);
    });
  }
  loadInstalledApps();
</script>