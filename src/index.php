<!DOCTYPE html>
<html translate="no" lang="en-US">

<head>
  <?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(1);
  ?>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Mock os</title>
  <script defer src="./script.js"></script>
  <!-- app list style -->
  <?php require_once("./_head/app_list.php") ?>
  <!-- other styles -->
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="./cursors.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
  <!-- screenshots requirement -->
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
</head>

<body id="body" class="body loading">
  <div class="loader max_size">
    <img src="./assets/images/cripple_white.svg" class="cripple-logo" alt="cripple logo while loading">
    <p style="
    color: white;
    height: 6vh;
    display: flex;
    justify-content: center;
    margin: 2vh;
">starting system</p>
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
    <video class="videobg" autoplay loop muted poster="#">
  </div>
  </video>
  <div class="menu-bar">
    <div class="left">
      <div class="dropdown">
        <input type="checkbox" id="logo">
        <label for="logo" class="menus"><img src="./assets/images/cripple_white.svg" class="cripple-logo" alt="cripple logo"></label>
        <div class="name">
          <span class="disabled">About this mock</span>
          <span class="disabled">System preferences</span>
          <span onclick="resetsystem()">Reset</span>
          <span class="disabled">Crapp store</span>
          <span class="disabled">Recent items</span>
          <label for="logo" onclick="appwindow.close(desktop.getActiveApp(true));" class="appname">Force quit [app]</label>
          <span class="disabled">Sleep</span>
          <span onclick="window.location.reload()">Restart</span>
          <span class="disabled">Shutdown</span>
          <span class="disabled">Log out</span>
        </div>
      </div>
      <div class="dropdown">
        <label id="app_name" class="menus">Home</label>
        <div class="name">Finder</div>
      </div>
      <div class="dropdown">
        <input type="checkbox" id="file">
        <label for="file" class="menus">File</label>
        <div class="name">
          <span class="disabled">New File</span>
          <span class="disabled">Select Multiple</span>
          <span class="disabled">Copy</span>
          <span class="disabled">Paste</span>
        </div>
      </div>
      <div class="dropdown">
        <label class="menus disabled">Edit</label>
        <div class="name">Finder</div>
      </div>
      <div class="dropdown">
        <input type="checkbox" id="view">
        <label for="view" class="menus">View</label>
        <div class="name">
          <div class="group">
            <p>brightness</p>
            <input class="slider brightness" oninput="brightnesschange(this)" type="range" min="0" max="10" value="10" />
            <span class="auto_brightness">Auto</span>
            <span onclick="settings.reset('brightness')">reset</span>
          </div>
          <div class="group">
            <p>saturation</p>
            <input class="slider saturate" oninput="filter('saturate', this.value, 'replace')" type="range" min="0" max="200" value="100" />
            <span onclick="settings.reset('saturate')">reset</span>
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
        <label for="windowsettings" class="menus">system</label>
        <div class="name">
        <label for="windowsettings" onclick="openapp('settings', false)">settings</label>
          <form method="post" enctype="multipart/form-data">
            <label for="fileupload">Change background</label>
            <input accept="video/*, image/*" id="fileupload" type="file" name="files[]" multiple>
          </form>
          <span id="fullscreen">open fullscreen</span>
          <div class="group">
            <span>files display size</span>
            <input class="slider filesize" oninput="filecountchange(this)" type="range" min="-150" max="-50" value="-100" />
            <span onclick="settings.reset('filesize')">reset</span>
          </div>
        </div>
      </div>

      <div class="dropdown">
        <input type="checkbox" id="credits">
        <label for="credits" class="menus">Credits</label>
        <div class="name">
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
        <img data-window="sir" id="sircon_top" src="./assets/images/sir.png" alt="sir icon" class="sir">
      </div>

      <label class="menutime">

      </label>

    </div>
  </div>
  <div class="alerts">
    <?php
    require_once("./_views/permissions.php");
    ?>
  </div>
  <?php require_once("./_views/app_list.php") ?>
  <?php require_once("./_views/context.html") ?>
  <?php require_once("./_views/files.php") ?>
  <div class="notification">
    <h3>screenshot took</h3>
    <p>the screenshot has been made</p>
    <img src="./favicon.ico" alt="notification img">
  </div>
  <?php require_once("./_views/window.html") ?>
</body>

</html>