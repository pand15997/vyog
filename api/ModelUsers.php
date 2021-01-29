<?php
include_once 'Db.php';

class ModelUsers extends Db{
    protected $db, $id, $name, $email, $password, $date_add;

    public function __construct() {
    }
    
    public function createUser($name, $email, $password, $date_add) {
        $sql = "INSERT INTO users (name, email, password, date_add) VALUES (:name, :email, :password, :date_add)";
        
        $db = new Db();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $stmt->bindParam(':date_add', $date_add, PDO::PARAM_STR);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : $db->lastInsertId();
    }   

    public function getUserByEmail($email) {
        $sql = "SELECT id, password FROM users WHERE email = :email LIMIT 1";
        
        $db = new Db();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserById($id) {
        $sql = "SELECT id, name, email, date_add FROM users WHERE id = :id LIMIT 1";
        
        $db = new Db();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateUserSession($session_token, $session_lifetime, $id, $date_upd) {
        $sql = "UPDATE users SET session_token = :session_token, session_lifetime = :session_lifetime, date_upd = :date_upd WHERE id = :id LIMIT 1";
        
        $db = new Db();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':session_token', $session_token, PDO::PARAM_STR);
        $stmt->bindParam(':session_lifetime', $session_lifetime, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':date_upd', $date_upd, PDO::PARAM_STR);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : true;
    }

    public function getUserByToken($token) {
        $sql = "SELECT id, session_lifetime FROM users WHERE session_token = :session_token";
        
        $db = new Db();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':session_token', $token, PDO::PARAM_STR);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function unsetUserSessionByToken($token, $date) {
        $sql = "UPDATE users SET session_token = :session_token, session_lifetime = :session_lifetime, date_upd = :date_upd WHERE session_token = :token";
        
        $db = new Db();
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':session_token', NULL, PDO::PARAM_STR);
        $stmt->bindValue(':session_lifetime', NULL, PDO::PARAM_STR);
        $stmt->bindValue(':token', $token, PDO::PARAM_STR);
        $stmt->bindValue(':date_upd', $date, PDO::PARAM_STR);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : true;
    }
}