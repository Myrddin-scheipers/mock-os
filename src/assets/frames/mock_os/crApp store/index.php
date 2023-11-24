<?php
if(isset($_GET["s"])){
    $query = urlencode(filter_var($_GET["s"], FILTER_SANITIZE_URL));
}else{
    $query = "";
}
$sortq = "id";
$z_a = false;
?>
    <script>
        async function searchApps(){
          await fetch(window.location.protocol + "//"+ window.location.host+"/assets/frames/frames.php?q=<?php echo $query; ?>&like").then((response) =>
            response.json().then((data) => ({ status: response.status, body: data })).then((json) => {
            if (json.status == 200) {
                let apps = json.body.slice(0);
apps.sort(function(a,b) {
    let tosearch = "<?php echo $sortq;?>";
    var x;
    var y;
    if(Number(a[tosearch]) && Number(b[tosearch])){
        x = Number(a[tosearch]);
        y = Number(b[tosearch]);
    }else{
        x = a[tosearch].toString().toLowerCase();
        y = b[tosearch].toString().toLowerCase();
    }
    return x < y ? -1 : x > y ? 1 : 0;
});
<?php
if($z_a == true){
    ?>
            apps.reverse();
<?php
}
?>
                apps.forEach(app => {
                    let appimage =document.createElement("img");
                    if (!ImageExist(`${window.location.protocol}//${window.location.host}/assets/frames/${app.developer}/${app.name}/${app.image}`)) {
                        console.log(app.name, app.image, app, "does not exist");
                        appimage.setAttribute("src", `${window.location.protocol}//${window.location.host}/assets/images/placeholder-icon.png`);
                    }else{
                        appimage.setAttribute("src", `${window.location.protocol}//${window.location.host}/assets/frames/${app.developer}/${app.name}/${app.image}`);
                    }
                    let appdiv = document.createElement("div");
                    let appbuttondiv = document.createElement("div");
                    appbuttondiv.classList.add("buttondiv");
                    appdiv.classList.add("app");
                    let appdetails = document.createElement("div");
                    let appbutton = document.createElement("p");
                    appbutton.classList.add("button");
                    let appname = document.createElement("p");
                    let appdev = document.createElement("p");
                    appname.innerText = app.name;
                    appdev.innerText = app.developer;
                    appbutton.setAttribute("data-id", app.id);
                    appbutton.addEventListener("click", appToggle);
                    if(app.installed){
                        appbutton.classList.add("installed");
                        appbutton.innerText = "uninstall";
                    }else{
                        appbutton.innerText = "install";
                    }
                    appdiv.appendChild(appimage);
                    appbuttondiv.appendChild(appbutton);
                    appdetails.appendChild(appname);
                    appdetails.appendChild(appdev);
                    appdiv.appendChild(appdetails);
                    appdiv.appendChild(appbuttondiv);
                    document.body.appendChild(appdiv);
                });
            }
        })
      );
    }
    function ImageExist(image_url){

var http = new XMLHttpRequest();

http.open('HEAD', image_url, false);
http.send();

return http.status != 404;

}
    document.addEventListener("load", searchApps());
    async function appToggle(e){
        if(!e){
            return;
        }
        if(e.target.classList.contains("waiting")){
            return;
        }
        e.target.classList.add("waiting");
        task = "add";
        if(e.target.classList.contains("installed")){
            task = "remove";
            e.target.innerText = "removing";
        }else{
            e.target.innerText = "installing";
        }
        await fetch(window.location.protocol+"//"+window.location.host+"/_php/apps_add_remove.php?id="+e.target.dataset.id+"&"+task).then((json) => {
            // why fast if you can do slow adding a 1 second delay
            setTimeout(() => {
            e.target.classList.remove("waiting");
            if(json.status == 209){
                task = "remove"
            }
            if(json.status == 200 || json.status == 209){
                if(task == "add"){
                    e.target.classList.add("installed");
                    e.target.innerText = "uninstall";
                }else if(task == "remove"){
                    e.target.classList.remove("installed");
                    e.target.innerText = "install";
                }
            }else{
                e.target.innerText = "failed, try again";
            }
            }, 1000);
        })
        await window.top.loadInstalledApps();
        window.top.showbin();
    }
    </script>
        <script>
        if(typeof Settings == 'undefined'){
            let script = document.createElement('script')
            script.src = window.location.origin + "/_scripts/settings.js";
            document.getElementsByTagName('head')[0].appendChild(script)
        }
    </script>
<style>
    body {
        background-color: #000;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0;
    align-content: flex-start;
    }
    img {
        max-width: calc(100% - 16px);
        max-height: calc(100% - 16px);
        margin: 8px;
    }
    .app *:not(img){
        margin: 16px;
    }
    p.button.waiting {
        filter: brightness(0.6);
    }
    p.button {
        position: relative;
        right: 8px;
        display: flex;
        width: fit-content;
        background-color: #3f38ca;
        padding: 8px;
        border-radius: 8px;
        width: 100%;
        justify-content: center;
    }
    p.button.installed {
        background-color: var(--main-effect);
    }
    .buttondiv {
        width: 20%;
        align-items: center;
        justify-content: center;
    }
    body div {
        display: flex;
    height: 100%;
    flex-direction: column;
    }
    body .app {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 20%;
        border: 1px solid #000;
    border-radius: 8px;
    margin: 8px;
    background-color: #212121;
    color: #fff;
    width: calc(50vw - 2 * 16px);
    justify-content: space-between;
    }
    .buttondiv {
        margin: 0
    }
</style>