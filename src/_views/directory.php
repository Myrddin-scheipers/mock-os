<?php
  $count = 0;
  if (file_exists("./_php/curl_check.php")) {
    $up = "./";
  } else {
    $up = "../";
    if (!file_exists($up."_php/curl_check.php")) {
      $up .= "../";
      while (!file_exists($up . "_php/curl_check.php")) {
        $up .= "../";
        $count = $count + 1;
        if ($count > 10) {
          die("infinite loop");
        }
      }
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Directory reader</title>
  
  <script defer src="./_scripts/settings.js"></script>
  <script defer src="./_scripts/desktop.js"></script>
  <script defer src="./_scripts/window.js"></script>
  <script defer src="./_scripts/cursor.js"></script>
  <!-- head styles for require -->
  <?php require_once($up."_head/files.php") ?>
  <?php require_once($up."_head/permissions.php") ?>
  <?php require_once($up."_head/context.php") ?>
</head>
<body>
<div class="openwith">
</div>
<div draggable="true" class="files overflow" data-filepath="unset">
  <?php
  if (isset($_GET["path"]) && $_GET["path"] != null) {
    $path = $_GET["path"];
  } else {
    $path = "";
  }
  $path = filter_var($path, FILTER_SANITIZE_URL);
  // root of scandir
  $files = scandir($up.$path);
  natsort($files);
  $text_ext = ["html", "css", "js", "php", "txt"];
  $options = stream_context_create(array(
    "ssl" => array(
      "verify_peer" => false,
      "verify_peer_name" => false,
    ),
  ));
  require_once($_SERVER['DOCUMENT_ROOT'] . "/_php/protocol.php");
  $root = $protocol . $_SERVER["SERVER_NAME"] . "/";
  for ($i = 0; sizeof($files) > $i; $i++) {
    if (!str_starts_with($files[$i], ".")) {
      $file_for_path = $files[$i];
      $file_for_name = str_replace("." . pathinfo($file_for_path, PATHINFO_EXTENSION), "", $file_for_path);
      if (@is_array(getimagesize($up.$path . "/" . $file_for_path))) {
        echo "<div tabindex='0' draggable='true' data-filepath='" . $path . "/" . $file_for_path . "' class='group'><img class='image' alt='image " . $file_for_name . "' src='" . $up . $path . "/".  $file_for_path . "'><p>".$file_for_name."</p></div>";
      } else {
        if (is_dir($path . "/". $file_for_path) || str_contains("/", pathinfo($file_for_path, PATHINFO_EXTENSION))) {
          echo '<div tabindex="0" draggable="true" data-filepath="' . $path . "/" . $file_for_path . '" class="group"><div class="folder"></div><p>' . $file_for_name . '</p></div>';
        } else if (in_array(pathinfo($file_for_path, PATHINFO_EXTENSION), $text_ext)) {
          echo "<div tabindex='0' draggable='true' data-filepath='" . $path . "/" . $file_for_path . "' class='group text'><h1 class='image'>" . pathinfo($file_for_path, PATHINFO_EXTENSION) . "</h1><p>" . $file_for_name . "</p></div>";
        } else {
          echo "<div tabindex='0' draggable='true' data-filepath='" . $path . "/" . $file_for_path . "' class='group text'><h1 class='image' alt='image " . $file_for_name . "'>" . pathinfo($file_for_path, PATHINFO_EXTENSION) . "</h1><p>" . $file_for_name . "</p></div>";
        }
      }
    }
  }
  ?>
</div><?php
  require_once($up."/_views/context.html");
?>
</body>
</html>