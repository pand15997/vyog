<?php
include_once 'Db.php';

class ModelPost extends Db{
    protected $db, $id, $title, $content, $user_id, $date_add;

    public function __construct() {
        $db = new Db();
        $this->db = $db;
    }
    
    public function createPost($title, $content, $user_id, $date_add) {
        $sql = "INSERT INTO posts (title, content, user_id, date_add) VALUES (:title, :content, :user_id, :date_add)";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':title', $title, PDO::PARAM_STR);
        $stmt->bindParam(':content', $content, PDO::PARAM_STR);
        $stmt->bindParam(':date_add', $date_add, PDO::PARAM_STR);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : $this->db->lastInsertId();
    }   

    public function getUserPostById($id, $user_id) {
        $sql = "SELECT id, title, content FROM posts WHERE id = :id AND user_id = :user_id LIMIT 1";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function deletePostByUserIdNId($id, $user_id) {
        $sql = "DELETE FROM posts WHERE user_id = :user_id AND id = :id LIMIT 1";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : true;
    }

    public function getUserPosts($user_id) {
        $sql = "SELECT id, title, content, date_add FROM posts WHERE user_id = :user_id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPosts() {
        $sql = "SELECT id, title, content, date_add FROM posts";
        
        $stmt = $this->db->prepare($sql);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPostById($id) {
        $sql = "SELECT id, title, content, date_add FROM posts WHERE id = :id LIMIT 1";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updatePost($id, $user_id, $title, $date_upd, $content) {
        $sql = "UPDATE posts SET title = :title, content = :content, date_upd = :date_upd WHERE id = :id AND user_id = :user_id LIMIT 1";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':title', $title, PDO::PARAM_STR);
        $stmt->bindParam(':content', $content, PDO::PARAM_STR);
        $stmt->bindParam(':date_upd', $date_upd, PDO::PARAM_STR);

        $stmt->execute();
        $num_rows = $stmt->rowCount();

        return !$num_rows ? false : true;
    }
}