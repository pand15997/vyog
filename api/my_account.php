<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: * ");
ini_set("log_errors", 1);
ini_set('error_log', 'Error_logs/my_account-php.log');
// session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once 'Db.php';
    include_once 'ModelUsers.php';
    include 'Helper.php';
    // error_log(var_export($_POST, true));
    // error_log(var_export($_GET, true));
    error_log(var_export($_SERVER, true));
    $token = $_SERVER['HTTP_TOKEN'];

    $helper = new Helper();

    // foreach (getallheaders() as $name => $value) { 
    //     // echo "$name: $value <br>"; 
    //     error_log(var_export([$name, $value], true));
    // } 

    $is_user_verified = $helper->verifyToken($token);

    if(is_array($is_user_verified)) {
        echo json_encode($is_user_verified);
        exit;
    }

    $obj_users = new ModelUsers();
    $user_detail = $obj_users->getUserById($is_user_verified);
    $date = gmdate('Y-m-d');
    echo json_encode(['error'=> '', 'notice'=> 'true', 'code'=> '200', 'msg'=> '', 'data'=> $user_detail]);
}
else
    echo 'unauthorized_access prevented';
    
exit;