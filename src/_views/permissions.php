<link rel="stylesheet" href=<?php
                            $root = "https://" . $_SERVER["SERVER_NAME"] . "/";
                            echo $root . "/_styles/alert.css";
                            ?>>
<link rel="stylesheet" href=<?php
                            echo $root . "/cursors.css";
                            ?>>
<div id="coolal" class="yes-no hide">
    <h2 class="coolal-title" data-item="title">allow [item]</h2>
    <p class="coolal-text" data-item="desc">[app] would like to use [item] permissions for [usage]</p>
    <div id="coolal-btnWrapper" class="pointer">
        <a id="coolal-btn" class="coolal-yes-no coolal-yes" href="#">Yes</a>
        <a id="coolal-btn" class="coolal-yes-no coolal-no" href="#">No</a>
    </div>
</div>
<div id="warning" class="yes-no hide">
    <h2 class="warning-title" data-item="title">[placeholder]</h2>
    <p class="warning-text" data-item="desc">[placeholder]</p>
    <div id="warning-btnWrapper" class="pointer">
        <a id="warning-btn" class="warning-yes-no warning-ok" href="#">Close</a>
    </div>
</div>
<div id="warning_double" class="yes-no hide">
    <h2 class="coolal-title" data-item="title">allow [item]</h2>
    <p class="coolal-text" data-item="desc">[app] would like to use [item] permissions for [usage]</p>
    <div id="coolal-btnWrapper" class="pointer">
        <a id="coolal-btn" class="coolal-close-no coolal-close" href="#">Yes</a>
        <a id="coolal-btn" class="coolal-close-no coolal-no" href="#">No</a>
    </div>
</div>
<script>
    let refused;
    let wait;
    async function request() {
        console.log(requests);
        for (i = 0; requests.length > i; i++) {
            wait = await customPrompt(requests[i][0], requests[i][1], requests[i][2]);
        }
    }

    function customPrompt(app, permissions, acceptfunc) {
        return new Promise((resolve) => {
            let prompt = document.querySelector("#coolal");
            prompt.querySelector('.coolal-no').href = "#";
            prompt.querySelector('[data-item="title"]').innerText = "allow " + permissions;
            prompt.querySelector('[data-item="desc"]').innerHTML = `${app} would like to use ${permissions} permissions`;
            prompt.classList.remove("hide");

            prompt.querySelector('.coolal-yes').addEventListener('click', () => {
                prompt.classList.add("hide");
                window[acceptfunc]();
                resolve(true);
            })

            prompt.querySelector('.coolal-no').addEventListener('click', () => {
                prompt.classList.add("hide");
                resolve(false);
            })
        })
    }
    async function ui_warn(title, desc) {
        return new Promise((resolve) => {
            let prompt = document.querySelector("#warning");
            prompt.querySelector('[data-item="title"]').innerText = title;
            prompt.querySelector('[data-item="desc"]').innerHTML = desc;
            prompt.classList.remove("hide");
            prompt.querySelector('.warning-ok').addEventListener('click', () => {
                prompt.classList.add("hide");
            })
        })
    }
    async function warn_link_button(title, desc, btntext, acceptfunc) {
        return new Promise((resolve) => {
            let prompt = document.querySelector("#warning_double");
            prompt.querySelector('[data-item="title"]').innerText = title;
            prompt.querySelector('[data-item="desc"]').innerHTML = desc;
            prompt.classList.remove("hide");
            prompt.querySelector('.coolal-close').addEventListener('click', () => {
                prompt.classList.add("hide");
                resolve(true);
            })
            prompt.querySelector('.coolal-close').innerHTML = "Close";
            prompt.querySelector('.coolal-no').innerHTML = "Open";
            prompt.querySelector('.coolal-no').href = btntext;
        })
    }
</script>