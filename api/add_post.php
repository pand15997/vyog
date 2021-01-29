<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: *");

ini_set("log_errors", 1);
ini_set('error_log', 'Error_logs/add_post-php.log');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once 'Db.php';
    include 'Helper.php';
    include 'ModelPost.php';
    $_POST = json_decode(file_get_contents('php://input'), true);

    $id = $_POST['id'] ?? '';
    $title = $_POST['title'];
    $content = $_POST['content']; 
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

    if($id != '') {
        $post = $obj_post->getUserPostById($id, $user_id);

        if(!$post) {
            echo json_encode(['error'=> 'true', 'notice'=> '', 'code'=> '404', 'msg'=> 'Post not found']);
            exit;
        }

        $post_detail = $obj_post->updatePost($id, $user_id, $title, $date, $content);
        if(!$post_detail) {
            echo json_encode(['error'=> 'true', 'notice'=> '', 'code'=> '500', 'msg'=> 'Something went wrong']);
            exit;
        }
    
        echo json_encode(['error'=> '', 'notice'=> 'true', 'code'=> '200', 'msg'=> 'Post updated successfully']);
        exit;
    }
    else {
        # check for existing user.
        $post_detail = $obj_post->createPost($title, $content, $user_id, $date);
        
        if(!$post_detail) {
            echo json_encode(['error'=> 'true', 'notice'=> '', 'code'=> '500', 'msg'=> 'Something went wrong']);
            exit;
        }
    
        echo json_encode(['error'=> '', 'notice'=> 'true', 'code'=> '200', 'msg'=> 'Post created successfully']);
        exit;
    }
}
else
    echo 'unauthorized_access prevented';
    
exit;