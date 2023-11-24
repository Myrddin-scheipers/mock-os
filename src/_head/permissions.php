<?php require_once($_SERVER['DOCUMENT_ROOT'] . "/_php/protocol.php");?>
<link rel="stylesheet" href=<?php
                            $root = $protocol . $_SERVER["SERVER_NAME"] . "/";
                            echo $root . "/_styles/alert.css";
                            ?>>
<link rel="stylesheet" href=<?php
                            echo $root . "/cursors.css";
                            ?>>
                            
<script>
    let refused;
    let wait;
    function isframe(){
        if (window.frameElement) {
            return true;
        }else{
            return false;
        }
    }
    async function request(requests, thewindow) {
        if(isframe()){
            window.top.request(requests, this.window);
            return;
        }
        for (i = 0; requests.length > i; i++) {
            wait = await customPrompt(requests[i][0], requests[i][1], requests[i][2], thewindow);
        }
    }
    function customPrompt(app, permissions, acceptfunc, thewindow) {
        return new Promise((resolve) => {
            let prompt = document.querySelector("#coolal");
            prompt.querySelector('.coolal-no').href = "#";
            prompt.querySelector('[data-item="title"]').innerText = "allow " + permissions;
            prompt.querySelector('[data-item="desc"]').innerHTML = `${app} would like to use ${permissions} permissions`;
            prompt.classList.remove("hide");

            prompt.querySelector('.coolal-yes').addEventListener('click', () => {
                prompt.classList.add("hide");
                thewindow[acceptfunc]();
                resolve(true);
            })
            prompt.querySelector('.coolal-no').addEventListener('click', () => {
                prompt.classList.add("hide");
                resolve(false);
            })
        })
    }
    async function ui_warn(title, desc) {
        if(isframe()){
            window.top.ui_warn(title, desc);
            return;
        }
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
        if(isframe()){
            window.top.warn_link_button(title, desc, btntext, acceptfunc);
            return;
        }
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