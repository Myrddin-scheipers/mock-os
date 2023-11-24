<?php
    if(isset($_GET["file"])){
        $needfile = true;
        $file = "./".$_GET["file"];

    }else{
        $needfile = false;
        $file = "./";
    }
function getDirContents($dir, $dept, &$results = array()) {
    if($dept > 0){
        return;
    }
    $files = scandir($dir);
    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path)) {
            $path = str_replace(realpath($_SERVER['DOCUMENT_ROOT'])."\developers", "", $path);
            $results[] = $path;
        } else if ($value != "." && $value != "..") {
            var_dump($dept);
            $dept++;
            getDirContents($path, $dept, $results);
            $path = str_replace(realpath($_SERVER['DOCUMENT_ROOT'])."\developers", "", $path);
            $results[] = $path;
        }
    }

    return $results;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Developers guide</title>
    <link rel="stylesheet" href="/developers/nav.css">
</head>
<body>
    <nav>
    <a href="./index.php">HOME</a>
    <a href="./index.php?file=/guide">UI</a>
    <a href="./ndex.php?file=/ui">GUIDE</a>
    </nav>
    <?php
    echo is_dir($file);
    if(is_dir($file)){
        //dir or not existant
        listdir($file);
}else{
    if($needfile){
        if(str_contains($file ,"guide")){
            ?>
            <link rel="stylesheet" href="/developers/style.css">
<?php
        }
        require_once($file);
    }else{
        listdir($file);
    }
}
function listdir($dir){
    $dir = str_replace("\\", "/", $dir);
    $dir = str_replace("//", "/", $dir);
    $files = getDirContents($dir, 0);
    foreach($files as $file){
        $filename = str_replace(["/", "\\"], " > ", $file);
        $file = str_replace("\\", "/", $file);
        ?>
        <a href="?file=<?php echo $file;?>"><?php echo $filename;?></a><br>
        <?php
    }
}
    ?>
</body>
</html>