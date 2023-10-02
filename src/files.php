<div class="openwith">
</div>
<div class="files overflow" data-filepath="unset">
  <?php
  $root = "https://" . $_SERVER["SERVER_NAME"] . "/";
  if (isset($_GET["path"]) && $_GET["path"] != null) {
    $path = $_GET["path"];
  } else {
    $path = "./";
  }
 $path = ltrim($path, '/');
  $path = $path . "/";
  $files = scandir($path);
  $text_ext = ["html", "css", "js", "php", "txt"];
  $image_ext = ["jpg", "jpeg", "png", "ico"];
  for ($i = 0; sizeof($files) > $i; $i++) {
    if (!str_starts_with($files[$i], ".")) {
      if (@is_array(getimagesize($files[$i]))) {
        echo "<div data-filepath='" . $path . "/" . $files[$i] . "' class='group'><img class='image' alt='image " . $files[$i] . "' src='" . $path . $files[$i] . "'><p>$files[$i]</p></div>";
      } else {
        if (is_dir($path . $files[$i])) {
          echo '<div data-filepath="' . $path . "/" . $files[$i] . '" class="group"><img alt="folder ' . $files[$i] . '" class="folder image" src="' . $root . 'assets/images/folder.png"><p>' . $files[$i] . '</p></div>';
        } else if (in_array(pathinfo($files[$i], PATHINFO_EXTENSION), $text_ext)) {
          echo "<div data-filepath='" . $path . "/" . $files[$i] . "' class='group text'><h1 class='image' alt='image " . $files[$i] . "' src='" . $path . $files[$i] . "'>" . pathinfo($files[$i], PATHINFO_EXTENSION) . "</h1><p>" . str_replace("." . pathinfo($files[$i], PATHINFO_EXTENSION), "", $files[$i]) . "</p></div>";
        } else {
          echo "<div data-filepath='" . $path . "/" . $files[$i] . "' class='group text'><h1 class='image' alt='image " . $files[$i] . "' src='" . $path . $files[$i] . "'>" . "?" . "</h1><p>" . $files[$i] . "</p></div>";
        }
      }
    }
  }
  ?>
</div>
<link rel="stylesheet" href="<?php echo $root;?>_styles/files.css">
<script defer src='<?php echo $root."_scripts/files.js";?>'></script>