<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="../cursors.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File reader</title>
    <link rel="stylesheet" href="../assets/css/iframes_content.css">
    <style>
        body {
            background-color: #000000;
            color: #babac0;
            min-height: 100%;
            height: fit-content;
        }

        code {
            max-width: 100%;
            max-height: 100%;
            min-height: 100%;
            overflow: hidden;
            width: auto;
            margin: auto;
            color: #babac0;
            background-color: rgba(255, 255, 255, var(--a));
            display: block;
            -webkit-user-modify: read-write;
            -moz-user-modify: read-write;
        }
    </style>
</head>
<?php require_once("./curl_check.php")?>
<body class="overflow">
    <?php
    $filename = $_GET["path"];
    $filename = filter_var($filename, FILTER_SANITIZE_URL);
    $file = "../" . $filename;
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    $file_url = "https://localhost/" . $filename;
    if (checkUrl($file_url) == true) {
    } else {
        $file_url = "https://mier.helioho.st/" . $filename;
    }
    $options = stream_context_create(array(
        "ssl" => array(
            "verify_peer" => false,
            "verify_peer_name" => false,
        ),
    ));
    $type = get_headers($file_url, 1, $options)["Content-Type"];
    if (is_dir($file) || is_array($type)) {
        header('Location: ../app_loader.html?app=./files.php?path=' . $filename);
        die;
    } else {
        if (str_starts_with($type, "text/") || str_starts_with($type, "application/")) {
            $default_opactiy = 0;
            header("Content-type: $type");
            echo htmlspecialchars(file_get_contents($file));
        } else if (str_starts_with($type, "image/")) {
            $default_opactiy = 0;
        ?>
            <script>
                function imgError(image) {
                    image.onerror = "";
                    image.style.display = "none";
                    let imgdiv = document.querySelector(".image");
                    imgdiv.querySelector("img").style.display = "none";
                    imgdiv.querySelector(".text").style.display = "block";
                    return true;
                }
            </script>
            <div class="image">
                <img onerror="imgError(this);" src="<?php echo $file_url ?>">
                <h1 style="display: none;" class="text">image could not be loaded</h1>
            </div>
    <?php
        } else {
            $default_opactiy = 0;
            var_dump($type);
            die;
        }
    }
    ?>
    <script defer>
        this.focus();
        let save = document.querySelector(".save");
        if (save) {
            save.addEventListener("dblclick", async function() {
                let data = document.querySelector("code").innerText;
                await fetch('../_php/savefile.php?path=<?php echo $file ?>&data=' + encodeURIComponent(data)).then(response => console.log(response))
            })
        }
        let opacity = <?php echo $default_opactiy; ?>;
        document.addEventListener("wheel", event => {
            if (event.buttons == 4 || event.buttons == 1) {
                console.log(event.buttons)
                if (document.documentElement.style.getPropertyValue("--a") == '') {
                    opacity = <?php echo $default_opactiy; ?>;
                } else {
                    opacity = Number(document.documentElement.style.getPropertyValue("--a"));
                }
                const delta = Math.sign(event.deltaY);
                opacity -= (delta / 100);
                if (opacity > 1) {
                    opacity = 0;
                } else if (opacity < 0) {
                    opacity = 1;
                }
                document.documentElement.style
                    .setProperty('--a', opacity);
            }
        });
        document.documentElement.style
            .setProperty('--a', opacity);
    </script>
    <style>
        :root {
            --a: 1;
        }

        .save {
            color: red;
            background-color: #212221;
        }

        body .image {
            max-width: 100%;
            max-height: 100%;
            height: 100vh;
            overflow: hidden;
            width: auto;
            margin: auto;
            background-color: rgba(255, 255, 255, var(--a));
            display: flex;
            align-items: center;
            justify-content: center;
        }
        img {
            max-width: 100%;
            max-height: 100%;
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-select: none;
        }
    </style>
</body>

</html>