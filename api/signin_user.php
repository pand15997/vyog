<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: *");
ini_set("log_errors", 1);
ini_set('error_log', 'Error_logs/signin_user-php.log');
error_log('hello ');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once 'Db.php';
    include_once 'ModelUsers.php';
    $_POST = json_decode(file_get_contents('php://input'), true);

    $email = $_POST['email']; 
    $password = $_POST['password'];
    $date = gmdate('Y-m-d H:i:s');

    $obj_users = new ModelUsers();
    $user_detail = $obj_users->getUserByEmail($email);

    if(!$user_detail) {
        echo json_encode(['error'=> 'true', 'notice'=> '', 'code'=> '404', 'msg'=> 'User not found']);
        exit;
    }

    $is_password_verify = password_verify($password, $user_detail['password']);
    
    if(!$is_password_verify) {
        echo json_encode(['error'=> 'true', 'notice'=> '', 'code'=> '404', 'msg'=> 'Email and Password does not match.']);
        exit;
    }
    
    session_start();
    $session_token = session_id();
    error_log('session_token: '.$session_token);
    // session token lifetime
    $session_lifetime = time() + (24 * 60 * 60); // 24 hours

    $obj_users->updateUserSession($session_token, $session_lifetime, $user_detail['id'], $date);

    echo json_encode(['error'=> '', 'notice'=> 'true', 'code'=> '200', 'msg'=> 'Account signin successfully', 'data'=> ['token'=> $session_token]]);
}
else
    echo 'unauthorized_access prevented';
    
exit;