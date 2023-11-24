<?php 
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
error_reporting(0);
require_once($_SERVER['DOCUMENT_ROOT'] . "/_php/protocol.php");
$root = $protocol . $_SERVER["SERVER_NAME"] . "/";
?>
<!DOCTYPE html>
<html lang="en">

<head>
<link rel="stylesheet" href="../../../../cursors.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File editor - mock os</title>
    <script>
        if(typeof Settings == 'undefined'){
            let script = document.createElement('script')
            script.src = "<?php echo $root . "_scripts/settings.js";?>";
            document.getElementsByTagName('head')[0].appendChild(script)
        }
    </script>    <link rel="stylesheet" href="<?php echo $root;?>_styles/iframes_content.css">
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
    $filename = str_replace(" ", "%20", $filename);
    $file = "../" . $filename;
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    $file_url = $root . $filename;
    $file_url = filter_var($file_url, FILTER_SANITIZE_URL);
    $options = stream_context_create(array(
        "ssl" => array(
            "verify_peer" => false,
            "verify_peer_name" => false,
        ),
    ));
    $type = get_headers($file_url, 1, $options)["Content-Type"];
    // do stuff with the info

    if (is_dir($file) || is_array($type)) {
        header('Location: ' . $root . '/app_loader.html?app=./_views/directory.php?path=' . $filename);
        die;
    } else if (str_starts_with($type, "video/")) {
        $videotype = $type;
        $default_opactiy = 0;
        $hasslider = true;
        $type = "video";
    ?>
        <link rel="preload" href="<?php echo $root;?>/_styles/inputs.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="<?php echo $root;?>/_styles/inputs.css"></noscript>

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
        <meta name="twitter:player:stream:content_type" content="<?php echo $videotype; ?>" />
        <div class="video">
            <div class="controls">
                <input id="range" class="slider" oninput="seekvideo(this)" type="range" min="0" max="0" value="0">
            </div>
            <video ontimeupdate="settime(this)" ondurationchange="setvideotime(this)" disablePictureInPicture controls="true" onerror="imgError(this);">
                <source src="<?php echo $file_url ?>" type="<?php echo $videotype ?>">
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
        echo $filecontent;
        echo $file_url;
        if ($filecontent) {
            echo htmlspecialchars($filecontent);
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
            function settime(e){
                document.querySelector("#range").value = e.currentTime * 1000;
            }
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