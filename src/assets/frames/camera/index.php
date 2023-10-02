<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Camera</title>
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

        .record {
              border-radius: var(--radius);
            height: 5vw;
            width: 5vw;
            position: fixed;
            border-color: #fefefe;
            border-width: 1vw;
            border-style: double;
            background: #ff6059;
            bottom: 5vw;
            left: 50vw;
            transform: translateX(-50%);
        }
        .record.active {
              border-radius: var(--radius);
        }
        div {
            position: fixed;
            z-index: 1;
        }
    </style>
    <link rel="stylesheet" href="../../css/iframes_content.css">
</head>

<body>
    <?php 
    require_once("../../../_views/permissions.php");
    ?>
    <video disablepictureinpicture disableremoteplayback x-webkit-airplay="deny" id='video' autoplay></video>
    <div class="record"></div>
</body>

</html>