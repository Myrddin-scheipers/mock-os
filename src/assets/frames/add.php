<?php
function searchQuery($name, $ext, $src, $ref, $title, $desc, $dev, $styleurl)
{
    $sql = "INSERT INTO apps (name, extentions, source, ref, title, description, developer, custom_style)
    VALUES ('$name', '$ext', '$src', '$ref', '$title', '$desc', '$dev', '$styleurl');";
    query($sql);
}
function query($sql)
{
    $servername = "localhost:3306";
    $username = "mier_apps";
    //
    // DONT EVER SHARE YOUR OWN PASSWORD IN PRODUCTION
    //
    $password = "Vzvl76&44";
    // Create connection
    $conn = new mysqli($servername, $username, $password, "mier_mock_os");
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    if ($conn->query($sql) === TRUE) {
        http_response_code(200);
        echo "New record created successfully";
      } else {
        http_response_code(500);
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
}
?>
<?php
if (isset($_GET["name"])) {
    $a = urldecode($_GET["name"]);
    $a = filter_var($a, FILTER_SANITIZE_URL);
    $b = urldecode($_GET["ext"]);
    $b = filter_var($b, FILTER_SANITIZE_URL);
    $c = urldecode($_GET["src"]);
    $c = filter_var($c, FILTER_SANITIZE_URL);
    $d = urldecode($_GET["ref"]);
    $d = filter_var($d, FILTER_SANITIZE_URL);
    $e = urldecode($_GET["title"]);
    $e = filter_var($e, FILTER_SANITIZE_URL);
    $f = urldecode($_GET["desc"]);
    $f = filter_var($f, FILTER_SANITIZE_URL);
    $g = urldecode($_GET["dev"]);
    $g = filter_var($g, FILTER_SANITIZE_URL);
    if(isset($a) && isset($b) && isset($c) && isset($d) && isset($e) && isset($f) && isset($g)){
        searchQuery($a, $b, $c, $d, $e, $f, $g, false);
    }
}else{
}
echo "done";
die;
?>