<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="../../../../cursors.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File reader</title>
    <link rel="stylesheet" href="../../../../_styles/iframes_content.css">
    <style>
        body {
            background-color: #000000;
            color: #babac0;
            min-height: 100%;
            height: fit-content;
        }
    </style>
</head>
<?php require_once("../../../../_php/curl_check.php") ?>

<body class="overflow">
    <?php
    $hasslider = false;
    $default_opactiy = 0;
    $filename = $_GET["path"];
    $file = "../" . $filename;
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    $file_url = $root . $filename;
    $options = stream_context_create(array(
        "ssl" => array(
            "verify_peer" => false,
            "verify_peer_name" => false,
        ),
    ));
    $type = get_headers($file_url, 1, $options)["Content-Type"];
    // do stuff with the info

    if (is_dir($file) || is_array($type)) {
        header('Location: ' . $root . '/app_loader.html?app=./_views/files.php?path=' . $filename);
        die;
    } else if (str_starts_with($type, "video/")) {
        $default_opactiy = 0;
        $hasslider = true;
        $type = "video";
    ?>
        <meta property="og:title" content="file reader || video" />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content="<?php echo $file_url ?>" />
        <meta property="og:video" content="<?php echo $file_url ?>" />
        <meta property="og:video:type" content="video/mp4" />
        <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content="file reader || video" />
        <meta name="twitter:description" content="embed goes nyoum" />
        <meta name="twitter:player" content="<?php echo $file_url ?>" />
        <meta name="twitter:player:stream" content="<?php echo $file_url ?>" />
        <meta name="twitter:player:stream:content_type" content="<?php echo $type; ?>" />
        <div class="video">
            <div class="controls">
                <input id="range" oninput="seekvideo(this)" type="range" min="0" max="0" value="0">
            </div>
            <video ondurationchange="setvideotime(this)" disablePictureInPicture controls="true" onerror="imgError(this);">
                <source src="<?php echo $file_url ?>" type="<?php echo $type ?>">
            </video>
            <h1 style="display: none;" class="text">video could not be loaded</h1>
        </div>
    <?php
    } else if (str_starts_with($type, "text/") || str_starts_with($type, "application/")) {
        $default_opactiy = 0;
    ?>
        <code>
            <pre>
        <?php
        $type = "text";
        $filecontent = file_get_contents($file_url);
        if ($filecontent) {
            echo htmlspecialchars(file_get_contents($file_url));
        } else {
            die("ERROR: ACCESS TO FILE REJECTED");
        }
        ?>
            </pre>
        </code>
    <?php
    } else if (str_starts_with($type, "image/")) {
        $default_opactiy = 0;
        $type = "image";
    ?>
        <script>
            let src = "<?php echo $file_url ?>";
            function setimg(source) {
                document.body.style.background = "url('"+source+"')";
                document.body.style.backgroundSize = "cover"
                document.body.style.backgroundRepeat = "no-repeat";
                document.body.backgroundPosition = "center";
            }
            setimg(src);
        </script>
        <div class="image">
            <h1 style="display: none;" class="text">image could not be loaded</h1>
        </div>
    <?php
    } else {
        echo "unsupported file header";
        $default_opactiy = 0;
        var_dump($type);
        die;
    }
    if ($type == "video") {
    } else if ($type == "image") {
    } else if ($type == "text") {
    }
    ?>
    <!-- styling -->
    <style>
        :root {
            --a: 1;
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

        img,
        video {
            max-width: 100%;
            max-height: 100%;
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-select: none;
            object-fit: contain;
        }

        <?php
        if ($type == "video") {
        ?>input[type='range'].slider::-ms-track {
            appearance: none;
            -webkit-appearance: none;
            height: 4px;
              border-radius: var(--radius);
        }

        input[type='range'].slider::-ms-thumb {
            appearance: none;
            -webkit-appearance: none !important;
            background-color: #FFFFFF;
            border: 0.5px solid rgba(0, 0, 0, 0.04);
            height: 10px;
            width: 10px;
            position: relative;
            top: 10px;
              border-radius: var(--radius);
            margin-top: -13px;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15), 0 1px 1px rgba(0, 0, 0, 0.16), 0 3px 1px rgba(0, 0, 0, 0.1);
        }

        /** FF*/
        input[type="range"].slider::-moz-range-progress {
            background-color: #007AFF;
              border-radius: var(--radius);
        }

        input[type="range"].slider::-moz-range-track {
            background-color: #C7C7CC;
        }

        /* IE*/
        input[type="range"].slider::-ms-fill-lower {
            background-color: #007AFF;
              border-radius: var(--radius);
        }

        input[type="range"].slider::-ms-fill-upper {
            background-color: #C7C7CC;
        }

        body .video {
            max-width: 100%;
            max-height: 100%;
            height: 100vh;
            overflow: hidden;
            width: auto;
            margin: auto;
            background-color: rgba(255, 255, 255, var(--a));
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        <?php
        } elseif ($type == "text") {
        ?>code {
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

        <?php
        }
        ?>
    </style>
    <!-- scripting -->

    <script>
        this.focus();
        let opacity = <?php echo $default_opactiy; ?>;
        document.addEventListener("wheel", event => {
            if (event.buttons == 4 || event.buttons == 1) {
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
        <?php
        if ($type == "video") {
        ?>

            function setvideotime(e) {
                document.querySelector("#range").max = e.duration * 1000;
            }

            function seekvideo(e) {
                document.querySelector("video").currentTime = e.value / 1000;
            }
        <?php
        } elseif ($type == "image") {
        ?>
            function imgError(image) {
                image.onerror = "";
                image.style.display = "none";
                let imgdiv = document.querySelector(".image");
                imgdiv.querySelector("img").style.display = "none";
                imgdiv.querySelector(".text").style.display = "block";
                return true;
            }
        <?php
        } elseif ($type == "text") {
        }
        ?>
    </script>
</body>

</html>