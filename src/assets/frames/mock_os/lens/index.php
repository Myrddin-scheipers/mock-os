<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Camera</title>
    <?php require_once($_SERVER['DOCUMENT_ROOT']."/_head/permissions.php") ?>
    <script defer src="./script.js"></script>
    <style>
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        video {
            width: 100vw;
            height: 100vh;
            object-fit: cover;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .pip {
            background-image: url("picture_in_picture_alt_FILL0_wght400_GRAD0_opsz48.png");
              border-radius: var(--radius);
            background-size: cover;
            margin: 5px;
            position: absolute;
            left: 5vw;
            top: 5vw;
            height: 5vw;
            width: 5vw;
            background-color: #ffffff;
        }

        .controls {
            bottom: 5vw;
            width: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 10vh;
            overflow: hidden;
        }
        .controls .record {
            bottom: 5vw;
            left: 50vw;
              border-radius: var(--radius);
            height: 5vh;
            width: 5vh;
            border-color: #fefefe;
            border-width: 1vh;
            border-style: double;
            background: #ff6059;
        }

        .controls .record.active {
              border-radius: var(--radius);
            background-color: red;
        }

        .controls .pause {
            overflow: hidden;
            height: auto;
            width: 5vh;
            height: 5vh;
            position: relative;
            background-color: transparent;
            display: flex;
        }

        .controls .pause .line {
            background-color: #ffffff;
            width: 1vh;
            height: 100%;
            margin: 0px 1vh;
        }

        body>* {
            position: fixed;
            z-index: 1;
        }
        .speaker {
            height: 5vh;
            width: 5vh;
            position: relative;
            overflow: hidden;
            display: inline-block;
        }

        .speaker span {
            display: block;
            width: 8px;
            height: 8px;
            background: #fff;
            margin: 11px 0 0 2px;
        }

        .speaker span:after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            border-style: solid;
            border-color: transparent #fff transparent transparent;
            border-width: 10px 14px 10px 15px;
            left: -13px;
            top: 5px;
        }

        .speaker span:before {
            transform: rotate(45deg);
              border-radius: var(--radius);
            content: '';
            position: absolute;
            width: 5px;
            height: 5px;
            border-style: double;
            border-color: #fff;
            border-width: 7px 7px 0 0;
            left: 18px;
            top: 9px;
            transition: all 0.2s ease-out;
        }

        .speaker:hover span:before {
            transform: scale(0.8) translate(-3px, 0) rotate(42deg);
        }

        .speaker.mute span:before {
            transform: scale(0.5) translate(-15px, 0) rotate(36deg);
            opacity: 0;
        }

        body {
            color: #fff;
            font-family: arial, sans-sarif;
            background-color: #212121;
            text-align: center;
        }
    </style>
    <link rel="stylesheet" href="../../../../assets/css/iframes_content.css">
</head>

<body>
    <?php
    require_once("../../../../_views/permissions.php");
    ?>
    <video disableremoteplayback x-webkit-airplay="deny" id='video' autoplay></video>
    <div class="controls">
        <a onclick="mute()" href="#" class="speaker">
            <span></span>
        </a>
        <div class="record"></div>
        <div onclick="togglecam()" class="pause">
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</body>

</html>