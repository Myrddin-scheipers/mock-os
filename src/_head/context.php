
<script>
    document.addEventListener("click", hidecontext);
    function hidecontext() {
        if (window.frameElement) {
            window.top.hidecontext();
            return;
        }
        let hover = document.querySelector(".hover");
        if(hover){
            hover.classList.remove("hover");
        } 
        document.querySelector(".menu.first").style.display = "none";
        document.querySelector(".menu.context_window").style.display = "none";
        document.querySelector(".menu.context_files").style.display = "none";
    }
    document.addEventListener('contextmenu', contextmenu);
    function contextmenu(event, frameElement) {
        if (window.frameElement) {
            window.top.contextmenu(event, window.frameElement);
            return;
        }
        hidecontext();

        document.querySelector(".menu.first").style.display = "none";
        document.querySelector(".menu.context_window").style.display = "none";
        document.querySelector(".menu.context_files").style.display = "none";
        event.preventDefault();
        let context;
        if (event.target) {
            if (event.target.closest(".window") != undefined) {
                // clicked in the window element
                context = document.querySelector(".menu.context_window");
            } else if (event.target.closest(".files") != undefined) {
                // clicked on home files list
                if (event.target.closest(".group") != undefined) {
                    event.target.closest(".group").classList.add("rename");
                    event.target.closest(".group").classList.add("action");
                }
                context = document.querySelector(".menu.context_files");
            } else {
                context = document.querySelector(".menu.first");
            }
        } else {
            return;
        }
        let x = event.pageX;
        let y = event.pageY;
        if (frameElement != undefined) {
            let boundingrect = frameElement.getBoundingClientRect();
            if (boundingrect) {
                x += boundingrect["left"];
                y += boundingrect["top"];
            }
        }
        context.style.position = "absolute";
        context.style.display = "block";
        context.querySelector("button:not(.disabled)").focus();
        if (document.body.clientHeight < context.childNodes[0].parentNode.clientHeight + event.clientY) {
            y = y - context.childNodes[0].parentNode.clientHeight;
        }
        if (document.body.clientWidth < context.childNodes[0].parentNode.clientWidth + event.clientX) {
            x = x - context.childNodes[0].parentNode.clientWidth;
        }
        context.style.left = `${x}px`;
        context.style.top = `${y}px`;
    }
</script>
<style>
    .menu {
        height: auto;
        z-index: 148;
        display: none;
        position: absolute;
        flex-direction: column;
        background-color: var(--color-bg-secondary);
        border-radius: var(--radius);
        box-shadow: 0 10px 20px rgba(64, 64, 64, 0.15);
        top: 10px;
        left: 10px;
        width: 208px;

    }

    .menu-list+.menu-list {
        border-top: 1px solid #ddd;
    }

    .menu-item {
        position: relative;
    }

    .menu-button {
        font: inherit;
        color: inherit;
        outline: none;
        border: 0;
        padding: 8px 8px;
        width: 100%;

        border-radius: var(--radius);
        display: flex;
        align-items: center;
        position: relative;
        background-color: var(--color-bg-secondary);
        overflow: hidden;
    }

    .menu-button:hover {
        background-color: var(--color-bg-primary);
    }

    .menu-button:hover+.menu-sub-list {
        display: flex;
    }

    .menu-button:hover svg {
        stroke: var(--color-text-primary);
    }

    .menu-button:hover svg.fa {
        color: var(--color-text-primary);
    }

    .menu-button svg {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        stroke: var(--color-text-primary-offset);
        display: none;
    }

    .menu-button svg.fa {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        color: var(--color-text-primary-offset);
    }





    .menu.settings {
        width: 300px;
    }

    .menu-list {
        max-width: calc(100% - 20px);
        margin: 0;
        display: block;
        width: 100%;
        padding: 8px;
    }

    .menu-list,
    ul {
        list-style-type: none;
    }

    .menu-item {
        position: relative;
    }

    .menu-button {
        font: inherit;
        color: inherit;
        outline: none;
        border: 0;
        padding: 8px 8px;
        width: 100%;

        border-radius: var(--radius);
        display: flex;
        align-items: center;
        position: relative;
        background-color: var(--color-bg-secondary);
        overflow: hidden;
    }

    .menu-button:hover {
        background-color: var(--color-bg-primary);
    }

    .menu-button:hover+.menu-sub-list {
        display: flex;
    }

    .menu-button:hover svg {
        stroke: var(--color-text-primary);
    }

    .menu-button:hover svg.fa {
        color: var(--color-text-primary);
    }

    .context-button:hover svg.fa {
        color: var(--color-text-primary);
    }

    .menu-button svg {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        stroke: var(--color-text-primary-offset);
        display: none;
    }

    .menu-button svg.fa {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        color: var(--color-text-primary-offset);
    }

    .context-button svg.fa {
        height: 30px;
        margin-right: 10px;
        color: var(--color-text-primary-offset);
    }

    .menu-button svg:nth-of-type(2) {
        margin-right: 0;
        position: absolute;
        right: 8px;
    }

    .menu-button span:nth-of-type(2) {
        margin-right: 0;
        position: absolute;
        right: 8px;
        font-size: x-small;
        margin-top: 20px;
    }

    .menu-button span.second {
        color: var(--color-text-primary-offset);
        font-size: small;
        margin-left: 5px;
    }

    .menu-button.tor span:nth-of-type(1) {
        color: var(--color-text-primary-offset);
        font-size: small;
        margin-left: 5px;
    }

    .menu-button--delete:hover {
        color: var(--color-red);
    }

    .menu-button--delete:hover svg:first-of-type {
        stroke: var(--color-red);
    }

    .menu-button--orange svg:first-of-type {
        stroke: var(--color-orange);
        color: var(--color-orange);
    }

    .menu-button--green svg:first-of-type {
        stroke: var(--color-green);
    }

    .menu-button--purple svg:first-of-type {
        stroke: var(--color-purple);
    }

    .menu-button--black svg:first-of-type {
        stroke: var(--color-black);
    }

    .menu-button--checked svg:nth-of-type(2) {
        stroke: var(--color-purple);
    }

    .menu-button:hover:disabled,
    .context-button:hover:disabled {
        background-color: var(--color-bg-secondary);
    }

    .context-button p {
        height: 10px;
    }
</style>
<script>
    let context_options = {
        desktop: {
            undo: {
                name: "undo",
                shortcut_name: "CTRL+Z",
                shortcut_keys: ["ctrlKey", "z"],
                disabled: true,
                function: false,
                importance: 9,
            },
            change_backround: {
                name: "change background",
                shortcut_name: "CTRL+B",
                shortcut_keys: ["altKey", "b"],
                disabled: true,
                function: false,
                importance: 6
            },
            settings: {
                name: "settings",
                shortcut_name: false,
                shortcut_keys: false,
                disabled: true,
                function: false,
                importance: 7
            },
            fullscreen: {
                name: "fullscreen",
                shortcut_name: "F11",
                shortcut_keys: ["f11"],
                disabled: false,
                function: 'desktop.fullscreen_page(document.body)',
                importance: 10
            },
        },
        appwindow: {
            duplicate: {
                name: "duplicate",
                shortcut_name: "alt+D",
                shortcut_keys: ["altKey", "D"],
                disabled: true,
                function: false,
                importance: 5
            },
            fullscreen: {
                name: "fullscreen",
                shortcut_name: "F11",
                shortcut_keys: ["f11"],
                disabled: false,
                function: 'appwindow.fullscreen(document.querySelector(".window.active"))',
                importance: 8,
            }
        },
        files: {
            create_folder: {
                name: "new folder",
                shortcut_name: false,
                shortcut_keys: false,
                disabled: true,
                function: false,
                importance: 4
            },
            create_file: {
                name: "new file",
                shortcut_name: false,
                shortcut_keys: false,
                disabled: true,
                function: false,
                importance: 5
            },
            select_files: {
                name: "select files",
                shortcut_name: false,
                shortcut_keys: false,
                disabled: true,
                function: false,
                importance: 3
            }
        }
    };
</script>
