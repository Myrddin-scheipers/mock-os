<?php
 header("Access-Control-Allow-Origin: *");
try {
    //code...
    $apps = array();
    function searchQuery($what, $search, $exact, $amount)
    {
        if ($exact == 1) {
            $sql = "SELECT * FROM apps WHERE $what = '$search'";
        } else if ($exact == 2) {
            $sql = "SELECT * FROM apps WHERE $what like '%" . '"' . $search . "%'";
        } else if ($exact == 3) {
            $search = implode(',', $search);
            $sql = "SELECT * FROM apps WHERE $what in ($search)";
        }
        if ($what == "extentions") {
            $sql .= " OR name = 'file editor'";
        }
        $sql .= " LIMIT $amount";
        query($sql);
    }
    function getAll()
    {
        $sql = "SELECT * FROM apps";
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
            backupjson();
            die;
        }
        $apps = [];
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                $app = new stdClass();
                $app->id = $row["id"];
                $app->name = $row["name"];
                $app->title = $row["title"];
                $app->desc = urldecode($row["description"]);
                $app->ext = urldecode($row["extentions"]);
                $app->image = urldecode($row["icon_path"]);
                $app->source = $row["source"];
                $app->url = $row["ref"];
                $app->developer = $row["developer"];
                $app->specialsize = $row["verified"];
                if ($app->specialsize == true) {
                    $app->custom_style = $row["custom_style"];
                }
                array_push($apps, $app);
            }
        } else {
            // output data of each row
            $app = new stdClass();
            $app->name = "unknown app";
            $app->title = "unknown app";
            $app->desc = "stay tuned for more";
            $app->ext = [];
            $app->source = "assets/frames/no_app.html";
            $app->url = "about:blank";
            $app->specialsize = false;
            array_push($apps, $app);
        }
        $conn->close();
        http_response_code(200);
        echo json_encode($apps);
    }
    if (isset($_GET["q"])) {
        $name = htmlspecialchars($_GET["q"]);
        $name = filter($name);
        searchQuery("name", urldecode($name), 1, 100);
        header('Content-Type: application/json; charset=utf-8');
    } else if (isset($_GET["ext"])) {
        $ext = urldecode($_GET["ext"]);
        $ext = filter($ext);
        searchQuery("extentions", $ext, 2, 100);
        header('Content-Type: application/json; charset=utf-8');
    } else if (isset($_GET["id"])) {
        $id = urldecode($_GET["id"]);
        $id = filter($id);
        searchQuery("id", $id, 1, 1);
        header('Content-Type: application/json; charset=utf-8');
    } else if (isset($_GET["installed"])) {
        if (!isset($_COOKIE["app_list"])) {
            $apps = [1, 2, 4, 9, 10, 15];
            setcookie("app_list", json_encode($apps), time() + (86400 * 365), "/", false, false); // 86400 = 1 day
            searchQuery("id", $apps, 3, count($apps));
            header('Content-Type: application/json; charset=utf-8');
        } else {
            $applist = json_decode($_COOKIE["app_list"]);
            $applist = filter($applist);
            searchQuery("id", $applist, 3, count($applist));
            
            header('Content-Type: application/json; charset=utf-8');
        }
    } else {
        getAll();
        header('Content-Type: application/json; charset=utf-8');
    }
    return;
} catch (\Throwable $th) {
    backupjson();
}
function filter($var){
    $var = urlencode($var);
    return filter_var($var, FILTER_SANITIZE_URL);
}
function backupjson()
{
    header('Content-Type: application/json; charset=utf-8');
?>
    [
    {
    "id": "1",
    "name": "safeari",
    "title": "safeari",
    "desc": "BiNg SeArCh BcS iT iS gOoD",
    "ext": "[]",
    "image": "favicon.png",
    "source": "https://bing.com",
    "url": "https://bing.com",
    "developer": "mock_os",
    "specialsize": "0"
    },
    {
    "id": "2",
    "name": "icould",
    "title": "Icould",
    "desc": "Could i?",
    "ext": "[]",
    "image": "favicon.png",
    "source": "login.html",
    "url": "https://www.icloud.com/",
    "developer": "mock_os",
    "specialsize": "0"
    },
    {
    "id": "4",
    "name": "cripple music",
    "title": "Cripple Music",
    "desc": "Lose yourself in 50 million songs",
    "ext": "[]",
    "image": "favicon.png",
    "source": "cripple_music.html",
    "url": "https://www.apple.com/benl/apple-music/",
    "developer": "mock_os",
    "specialsize": "0"
    },
    {
    "id": "9",
    "name": "lens",
    "title": "Lens",
    "desc": "I'm watching you :-)",
    "ext": "[]",
    "image": "favicon.png",
    "source": "index.php",
    "url": "0",
    "developer": "mock_os",
    "specialsize": "0"
    },
    {
    "id": "10",
    "name": "finder",
    "title": "Finder",
    "desc": "What About you find some bitches",
    "ext": "[]",
    "image": "favicon.png",
    "source": "index.php",
    "url": "https://www.apple.com/macos/ventura/",
    "developer": "mock_os",
    "specialsize": "0"
    },
    {
    "id": "15",
    "name": "about",
    "title": "System info",
    "desc": "info about the system",
    "ext": "[]",
    "image": "favicon.png",
    "source": "about/index.html",
    "url": "0",
    "developer": "mock_os",
    "specialsize": "0"
    }
    ]
<?php
}
