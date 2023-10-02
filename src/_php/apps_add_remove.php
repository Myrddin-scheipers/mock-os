<?php
http_response_code(400);
if(isset($_GET["id"])){
    if(!is_numeric($_GET["id"])) die("id should be a number");
    if(!isset($_COOKIE["app_list"])){
        setcookie("app_list", json_encode([1, 2, 3, 5, 6, 9]), time() + (86400 * 365), "/"); // 86400 = 1 day
    }
    $applist = json_decode($_COOKIE["app_list"]);
    if(isset($_GET["add"])){
        array_push($applist, intval($_GET["id"]));
        $applist = array_unique($applist);
    }else if(isset($_GET["remove"])){
        $key = array_search(intval($_GET["id"]), $applist);
        if ( FALSE !== $key ) {
            array_splice($applist, $key, 1);
        }else{
            die("app not installed");
        }
    }else{
        die("should give add or remove");
    }
    setcookie("app_list", json_encode($applist), time() + (86400 * 365), "/"); // 86400 = 1 day
    http_response_code(200);
}else{
    die("should give id");
}
