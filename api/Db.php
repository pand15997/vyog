<?php

class Db extends PDO{
    protected  $host = '127.0.0.1';
    protected  $user = 'root';
    protected  $database = 'vyog';
    protected  $password = 'PSH1234';
    protected  $charset = 'utf8mb4';
    private $db;

    public function __construct() {
        try{
            $options = [
                \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                \PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            $dsn = "mysql:host={$this->host};dbname={$this->database};charset={$this->charset}";
            
            parent::__construct($dsn, $this->user, $this->password, $options);
            // error_log('Connection created successfully');
        }
        catch (\PDOException $e) {
            error_log('Connection cannot create: '.$e->getMessage());
            return false;
        }
    }
}