<?php
include_once 'ModelUsers.php';

class Helper{
    public function verifyToken($token)
    {
        $token = trim($token);

        if($token == '') {
            return ['error'=> 'true', 'notice'=> '', 'code'=> '403', 'msg'=> 'Login required'];
        }

        $obj_users = new ModelUsers();
        $users = $obj_users->getUserByToken($token);
        $date = gmdate('Y-m-d');

        if(empty($users)) {
            return ['error'=> 'true', 'notice'=> '', 'code'=> '403', 'msg'=> 'Login required'];
        }

        if(count($users) > 1) {
            $obj_users->upsUserSession(NULL, NULL, $users[0]['id'], $date);
            return ['error'=> 'true', 'notice'=> '', 'code'=> '403', 'msg'=> 'Login required'];
        }

        $session_lifetime = $users[0]['session_lifetime'];
        $now = time();

        if($now >= $session_lifetime) {
            # unset token
            $obj_users->updateUserSession(NULL, NULL, $users[0]['id'], $date);
            return ['error'=> 'true', 'notice'=> '', 'code'=> '403', 'msg'=> 'Login required'];
        }

        $user_detail = $users[0];
        return $user_detail['id'];
    }
}