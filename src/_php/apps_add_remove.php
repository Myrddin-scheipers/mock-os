<?php
http_response_code(202);
$message = "app with id ";
if(isset($_GET["id"])){
    if(!is_numeric($_GET["id"])){
        die("id should be a number");
    }
    if(!isset($_COOKIE["app_list"])){
        die("no apps set");
    }
    $message .= $_GET["id"];
    $applist = json_decode($_COOKIE["app_list"], true);
    if(isset($_GET["add"])){
        array_push($applist, intval($_GET["id"]));
        var_dump($applist);
        echo "#1";
        if($applist !== array_unique($applist)){
            $applist = array_unique($applist);
            var_dump($applist);
            $message .= " was already installed";
        }else{
            $message .= " installed";
        }
    }else if(isset($_GET["remove"])){
        $message .= " removed";
        $key = array_search(intval($_GET["id"]), $applist);
        if ( FALSE !== $key ) {
            array_splice($applist, $key, 1);
        }else{
            // removed before -> not updated
            http_response_code(209);
            die("app not installed");
        }
    }else{
        http_response_code(400);
        die("should give add or remove");
    }
    echo htmlspecialchars($message);
    var_dump($applist);
    echo "#2";
    setcookie("app_list", json_encode($applist), time() + (86400 * 365), "/"); // 86400 = 1 day
    http_response_code(200);
}else{
    http_response_code(400);
    die("should give id");
}
