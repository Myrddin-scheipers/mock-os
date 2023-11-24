<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(1);
function checkUrl($url)
{
    // Simple check
    if (!$url) {
        return FALSE;
    }
    if (function_exists('curl_init')) {
        // Create cURL resource using the URL string passed in
        $curl_resource = curl_init($url);
        curl_setopt($curl_resource, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl_resource, CURLOPT_SSL_VERIFYHOST, false);
        
        // Set cURL option and execute the "query"
        curl_setopt($curl_resource, CURLOPT_RETURNTRANSFER, true);
        curl_exec($curl_resource);
        // Check for the 404 code (page must have a header that correctly display 404 error code according to HTML standards
        if (curl_getinfo($curl_resource, CURLINFO_HTTP_CODE) == 404 || curl_getinfo($curl_resource, CURLINFO_HTTP_CODE) == 0) {
            // Code matches, close resource and return false
            curl_close($curl_resource);
            return FALSE;
        } else {
            // No matches, close resource and return true
            curl_close($curl_resource);
            return TRUE;
        }
        // Should never happen, but if something goofy got here, return false value
    }else{
        echo "<b>curl does not exist</b>";
        return false;
    }
}
require_once($_SERVER['DOCUMENT_ROOT'] . "/_php/protocol.php");
$root = $protocol . $_SERVER["SERVER_NAME"] . "/";
if (checkUrl($root . "/prod_check.php") == TRUE) {
} else {
    echo "<b>error: files not found</b>";
    die;
}