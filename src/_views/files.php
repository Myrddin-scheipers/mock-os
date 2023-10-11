<div class="openwith">
</div>
<div draggable="true" class="files overflow" data-filepath="unset">
  <?php
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
  require_once($up . "_php/curl_check.php");
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
  for ($i = 0; sizeof($files) > $i; $i++) {
    if (!str_starts_with($files[$i], ".")) {
      $file_for_path = $files[$i];
      $file_for_name = str_replace("." . pathinfo($file_for_path, PATHINFO_EXTENSION), "", $file_for_path);
      if (@is_array(getimagesize($up.$path . "/" . $file_for_path))) {
        echo "<div draggable='true' data-filepath='" . $path . "/" . $file_for_path . "' class='group'><img class='image' alt='image " . $file_for_name . "' src='" . $up . $path . "/".  $file_for_path . "'><p>".$file_for_name."</p></div>";
      } else {
        if (is_dir($path . "/". $file_for_path) || str_contains("/", pathinfo($file_for_path, PATHINFO_EXTENSION))) {
          echo '<div draggable="true" data-filepath="' . $path . "/" . $file_for_path . '" class="group"><img alt="folder ' . $file_for_name . '" class="folder image" src="' . $root . '/assets/images/folder.png"><p>' . $file_for_name . '</p></div>';
        } else if (in_array(pathinfo($file_for_path, PATHINFO_EXTENSION), $text_ext)) {
          echo "<div draggable='true' data-filepath='" . $path . "/" . $file_for_path . "' class='group text'><h1 class='image'>" . pathinfo($file_for_path, PATHINFO_EXTENSION) . "</h1><p>" . $file_for_name . "</p></div>";
        } else {
          echo "<div draggable='true' data-filepath='" . $path . "/" . $file_for_path . "' class='group text'><h1 class='image' alt='image " . $file_for_name . "'>" . pathinfo($file_for_path, PATHINFO_EXTENSION) . "</h1><p>" . $file_for_name . "</p></div>";
        }
      }
    }
  }
  ?>
</div>
<script>
  if (window.frameElement) {
    document.querySelector(".files.overflow").style.position = "static";
  }
</script>
<link rel="stylesheet" href="<?php echo $up; ?>/_styles/files.css">
<link rel="stylesheet" href="<?php echo $up; ?>/_styles/iframes_content.css">
<link rel="stylesheet" href="<?php echo $up; ?>/cursors.css">
<script defer src='<?php echo $root . "/_scripts/files.js"; ?>'></script>
<?php require_once($up."/_views/context.html") ?>