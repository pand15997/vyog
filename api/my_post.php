<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: *");

ini_set("log_errors", 1);
ini_set('error_log', 'Error_logs/my_post-php.log');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once 'Db.php';
    include 'Helper.php';
    include 'ModelPost.php';
    $_POST = json_decode(file_get_contents('php://input'), true);
    $id = $_POST['id'];
    $callback = $_POST['callback'] ?? '';
    error_log('id: '.var_export($id, true));
    error_log('callback: '.var_export($callback, true));
    $date = gmdate('Y-m-d H:i:s');

    $token = $_SERVER['HTTP_TOKEN'];
    $helper = new Helper();
    $is_user_verified = $helper->verifyToken($token);

    if(is_array($is_user_verified)) {
        echo json_encode($is_user_verified);
        exit;
    }

    $user_id = $is_user_verified;

    $obj_post = new Modelpost();

    if($callback === 'delete_post') {
        $deleted = $obj_post->deletePostByUserIdNId($id, $user_id);

        if(!$deleted) {
            echo json_encode(['error'=> 'true', 'notice'=> '', 'code'=> '500', 'msg'=> 'Something went wrong']);
            exit;
        }

        echo json_encode(['error'=> '', 'notice'=> 'true', 'code'=> '200', 'msg'=> 'Post deleted successfully']);
        exit;
    }

    if($id != '') {
        $post = $obj_post->getPostById($id);

        if(!$post) {
            echo json_encode(['error'=> 'true', 'notice'=> '', 'code'=> '500', 'msg'=> 'Something went wrong']);
            exit;
        }

        echo json_encode(['error'=> '', 'notice'=> 'true', 'code'=> '200', 'msg'=> '', 'data'=> $post]);
        exit;
    }

    # check for existing user.
    $posts = $obj_post->getUserPosts($user_id);

    if(!$posts) {
        echo json_encode(['error'=> 'true', 'notice'=> '', 'code'=> '500', 'msg'=> 'Something went wrong']);
        exit;
    }

    echo json_encode(['error'=> '', 'notice'=> 'true', 'code'=> '200', 'msg'=> '', 'data'=> $posts]);
   exit;
}
else
    echo 'unauthorized_access prevented';
    
exit;