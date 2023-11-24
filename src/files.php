<div class="openwith">
</div>
<div class="files overflow" data-filepath="unset">
  <?php
  require_once($_SERVER['DOCUMENT_ROOT'] . "/_php/protocol.php");
  $root = $protocol . $_SERVER["SERVER_NAME"] . "/";
  if (isset($_GET["path"]) && $_GET["path"] != null) {
    $path = $_GET["path"];
  } else {
    $path = "./";
  }
  function filter($var)
  {
    return filter_var($var, FILTER_SANITIZE_URL);
  }
  $path = ltrim($path, '/');
  $path = $path . "/";
  $path = filter($path);
  $files = scandir($path);
  $text_ext = ["html", "css", "js", "php", "txt"];
  $image_ext = ["jpg", "jpeg", "png", "ico"];
  for ($i = 0; sizeof($files) > $i; $i++) {
    if (!str_starts_with($files[$i], ".")) {
      if (@is_array(getimagesize($files[$i]))) {
        echo "<div tabindex='0' aria-label='".$files[$i]."' data-filepath='" . $path . "/" . $files[$i] . "' class='group'><img class='image' alt='image " . $files[$i] . "' src='" . $path . $files[$i] . "'><p contenteditable='true'>$files[$i]</p></div>";
      } else {
        if (is_dir($path . $files[$i])) {
          echo '<div tabindex="0" aria-label="'.$files[$i].'" data-filepath="' . $path . "/" . $files[$i] . '" class="group"><img alt="folder ' . $files[$i] . '" class="folder image" src="' . $root . 'assets/images/folder.svg"><p contenteditable="true">' . $files[$i] . '</p></div>';
        } else if (in_array(pathinfo($files[$i], PATHINFO_EXTENSION), $text_ext)) {
          echo "<div tabindex='0' aria-label='".$files[$i]."' data-filepath='" . $path . "/" . $files[$i] . "' class='group text'><h1 class='image' alt='image " . $files[$i] . "' src='" . $path . $files[$i] . "'>" . pathinfo($files[$i], PATHINFO_EXTENSION) . "</h1><p contenteditable='true'>" . str_replace("." . pathinfo($files[$i], PATHINFO_EXTENSION), "", $files[$i]) . "</p></div>";
        } else {
          echo "<div tabindex='0' aria-label='".$files[$i]."' data-filepath='" . $path . "/" . $files[$i] . "' class='group text'><h1 class='image' alt='image " . $files[$i] . "' src='" . $path . $files[$i] . "'>" . "?" . "</h1><p contenteditable='true'>" . $files[$i] . "</p></div>";
        }
      }
    }
  }
  ?>
</div>