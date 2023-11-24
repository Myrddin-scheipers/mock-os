<!DOCTYPE html>
<html translate="no" lang="en-US">
<?php
    header("Cache-Control: max-age=2592000"); //30days (60sec * 60min * 24hours * 30days)
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(1);
  ?>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Mock os</title>
  <script defer src="./script.js"></script>
  <script defer src="./_scripts/settings.js"></script>
  <script defer src="./_scripts/desktop.js"></script>
  <script defer src="./_scripts/window.js"></script>
  <script defer src="./_scripts/cursor.js"></script>
  <script defer src="./_scripts/accessibility.js"></script>

  <!-- head styles for require -->
  <?php require_once("./_head/app_list.php") ?>
  <?php require_once("./_head/files.php") ?>
  <?php require_once("./_head/permissions.php") ?>
  <?php require_once("./_head/context.php") ?>
  <!-- other styles -->
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="./_styles/accessibility.css">
  <link rel="stylesheet" href="./cursors.css">
  <link rel="stylesheet" href="./_styles/inputs.css">
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"></noscript>

  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css"></noscript>

  <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></noscript>

  <!-- screenshots requirement -->
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
</head>

<body id="body" class="body loading accessibility">
<div class="cursor" style="
    height: 25px;
    width: 25px;
    z-index: 149;
    position: absolute;
    pointer-events:none;
">
<img alt="mouse cursor" src="./assets/cursors/posy/PosyBlackPoint.cur" style="max-height:100%;max-width:100%;pointer-events:none;">
</div>
  <div class="loader max_size">
    <img src="./assets/images/cripple_white.svg" class="cripple-logo pulse" alt="cripple logo loading">
    <p style="
    color: white;
    height: 6vh;
    display: flex;
    justify-content: center;
    margin: 2vh;
">initializing system</p>
    <div>
      <div id="pc_loader" class="pc_loader"></div>
    </div>
    <p style="
    position: fixed;
    height: 100px;
    color: #fff;
    bottom: 70px;
    text-align: center;
    display: flex;
    align-items: flex-end;
">this project is to test the limits of the web<br>
      All copyrighted content (i.e. images & fonts) on this site are owned by their respective owners.<br>
      this projec is in no way affiliated with Apple Inc or any other brand.</p>
  </div>
  <div class="max_size">
    <video class="videobg" autoplay loop muted poster="#"></video>
  </div>
  <div class="menu-bar">
    <div class="left">
      <div class="dropdown">
        <input type="checkbox" id="logo">
        <label tabindex="0" for="logo" class="menus"><img src="./assets/images/cripple_white.svg" class="cripple-logo" alt="cripple logo"></label>
        <div class="name">
          <span tabindex="0" onclick="desktop.share()">share Mock os</span>
          <span tabindex="0" onclick="appwindow.close(desktop.getActiveApp(true));" class="appname">Force quit [app]</span>
          <span class="disabled">About this mock</span>
          <span tabindex="0" onclick="window.top.openapp('settings', false)">System preferences</span>
          <span tabindex="0" onclick="desktop.reset()">Reset</span>
          <span class="disabled">Recent items</span>
          <span class="disabled">Sleep</span>
          <span tabindex="0" onclick="window.location.reload()">Restart</span>
          <span class="disabled">Shutdown</span>
          <span class="disabled">Log out</span>
        </div>
      </div>
      <div class="dropdown">
        <label id="app_name" class="menus">Home</label>
      </div>
      <div class="dropdown file">
        <input type="checkbox" id="file">
        <label tabindex="0" for="file" class="menus">File</label>
        <div class="name">
          <span tabindex="0" onclick="renamefile(this, document.querySelector('.files .active'));" data-action="rename" class="disabled">rename</span>
          <span class="disabled">New File</span>
          <span class="disabled">Select Multiple</span>
          <span class="disabled">Copy</span>
          <span class="disabled">Paste</span>
        </div>
      </div>
      <div class="dropdown">
        <label class="menus disabled">Edit</label>
      </div>
      <div class="dropdown">
        <input type="checkbox" id="view">
        <label tabindex="0" for="view" class="menus">View</label>
        <div class="name">
          <div class="group">
            <p>brightness</p>
            <input class="slider brightness" oninput="brightnesschange(this)" type="range" min="0" max="10" value="10" />
            <span class="auto_brightness">Auto</span>
            <span tabindex="0" onclick="deviceSettings.reset('brightness')">reset</span>
          </div>
          <div class="group">
            <p>saturation</p>
            <input class="slider saturate" oninput="filter('saturate', this.value, 'replace')" type="range" min="0" max="200" value="100" />
            <span tabindex="0" onclick="deviceSettings.reset('saturate')">reset</span>
          </div>
          <div class="group">
            <p>screen filters</p>
            <span class="contrast" data-filter="toggle" onclick="filter('contrast', 150, 'toggle')">contrast mode</span>
            <span class="invert">Inverted mode</span>
          </div>
        </div>
      </div>
      <div class="dropdown">
        <input type="checkbox" id="windowsettings">
        <label tabindex="0" for="windowsettings" class="menus">system</label>
        <div class="name">
        <label tabindex="0" for="windowsettings" onclick="window.top.openapp('settings', false)">settings</label>
          <form method="post" enctype="multipart/form-data">
            <label for="fileupload">Change background</label>
            <input accept="video/*, image/*" id="fileupload" type="file" name="files[]" multiple>
          </form>
          <span id="fullscreen">open fullscreen</span>
          <div class="group">
            <span>files display size</span>
            <input class="slider filesize" oninput="filecountchange(this)" type="range" min="-150" max="-50" value="-100" />
            <span tabindex="0" onclick="deviceSettings.reset('filesize')">reset</span>
          </div>
        </div>
      </div>

      <div class="dropdown">
        <input type="checkbox" id="credits">
        <label tabindex="0" for="credits" class="menus">Credits</label>
        <div class="name">

              <span><a target="_blank" href="http://www.michieldb.nl/other/cursors/">Cursor images <b>Posy</b> - michiel de boer</a></span>
              <span><a target="_blank" href="https://apps.apple.com/nl/app/macos-big-sur/id1526878132?mt=12">background
              image <b>Apple</b> - macOS Big Sur</a></span>
        </div>
      </div>
      <div class="dropdown">
        <label id="helpdropdown" class="menus disabled">Help</label>
        <div class="name">Finder</div>
      </div>
    </div>
    <div class="right">
      <div class="menu-ico">
        <img src="./assets/images/76187-sound-information-united-business-states-address-email.png" alt="sound information" class="vol">
      </div>
      <div class="menu-ico" id="battery">
        <i class="fas fa-battery-empty"></i>
      </div>
      <div id="wifi" class="menu-ico">
        <i class="bi bi-wifi"></i>
      </div>
      <div class="menu-ico">
        <i class="fas fa-search"></i>
      </div>
      <div class="menu-ico">
        <img src="./assets/images/control-center-icon.png" alt="control center" class="control-center">
      </div>
      <div class="menu-ico">
        <img data-window="sir" id="sircon_top" src="./assets/frames/mock_os/sir/favicon.svg" alt="sir icon" class="sir">
      </div>

      <label class="menutime">

      </label>

    </div>
  </div>
  <?php require_once("./_views/window.html") ?>
  <div class="alerts">
    <?php
    require_once("./_views/permissions.php");
    ?>
  </div>
  <?php require_once("./_views/app_list.php") ?>
  <?php require_once("./_views/context.html") ?>
  <?php require_once("./_views/directory.php") ?>
  <div class="notification">
    <a tabindex="-1" download="screenshot.jpg" target="_blank" href="about:blank">
      <h3>screenshot took</h3>
      <p>the screenshot has been made</p>
      <img src="./favicon.ico" alt="notification img">  
    </a>
  </div>
</body>

</html>