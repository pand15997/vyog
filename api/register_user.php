<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, x-auth-token, X-Requested-With");
ini_set("log_errors", 1);
ini_set('error_log', 'Error_logs/register_user-php.log');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once 'Db.php';
    include_once 'ModelUsers.php';
    $_POST = json_decode(file_get_contents('php://input'), true);

    $name = $_POST['name'];
    $email = $_POST['email']; 
    $password = $_POST['password'];
    $date = gmdate('Y-m-d H:i:s');

    $obj_users = new ModelUsers();

    # check for existing user.
    $user_detail = $obj_users->getUserByEmail($email);

    if($user_detail) {
        echo json_encode(['error'=> 'true', 'notice'=> '', 'code'=> '200', 'msg'=> 'User found for given email']);
        exit;
    }

    $hashes_pwd = password_hash($password, PASSWORD_DEFAULT);

    $user_created = $obj_users->createUser($name, $email, $hashes_pwd, $date);
    error_log('user_created: '.var_export($user_created, true));
    
    if($user_created) {
        echo json_encode(['error'=> '', 'notice'=> 'true', 'code'=> '200', 'msg'=> 'Account created successfully']);
    }
    else {
        echo json_encode(['error'=> 'true', 'notice'=> '', 'code'=> '500', 'msg'=> 'Something went wrong']);
    }

   exit;
}
else
    echo 'unauthorized_access prevented';
    
exit;