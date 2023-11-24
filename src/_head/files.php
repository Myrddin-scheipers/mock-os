<?php 
  require_once($up . "_php/curl_check.php");
  $root = $protocol . $_SERVER["SERVER_NAME"] . "/";?>
<script>
        if(typeof Settings == 'undefined'){
            let script = document.createElement('script')
            script.src = "<?php echo $root . "_scripts/settings.js";?>";
            document.getElementsByTagName('head')[0].appendChild(script)
        }
    </script>
<link rel="stylesheet" href="<?php echo $root; ?>_styles/files.css">
<link rel="stylesheet" href="<?php echo $root; ?>_styles/iframes_content.css">
<link rel="stylesheet" href="<?php echo $root; ?>cursors.css">
<script defer src='<?php echo $root; ?>_scripts/files.js'></script>
<script>
  if (window.frameElement) {
    document.querySelector(".files.overflow").style.position = "static";
  }
</script>