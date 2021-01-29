<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: * ");
ini_set("log_errors", 1);
ini_set('error_log', 'Error_logs/auth-php.log');
// session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once 'Db.php';
    include_once 'ModelUsers.php';
    include 'Helper.php';
    $token = $_SERVER['HTTP_TOKEN'];

    $helper = new Helper();

    $is_user_verified = $helper->verifyToken($token);

    if(is_array($is_user_verified))
        echo json_encode($is_user_verified);
    else
       echo json_encode(['error'=> '', 'notice'=> 'true', 'code'=> '200', 'msg'=> '', 'data'=> []]);
       
    exit;
}
else
    echo 'unauthorized_access prevented';
    
exit;