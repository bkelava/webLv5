<?php
namespace db;
require_once __DIR__ . "./../env.php";

use db\DbConfig as Config;

class DbHandler
{
    public $connection;

    public function connect()
    {
        $this->connection = new \mysqli(
            Config::HOST,
            Config::USER,
            Config::PASS,
            Config::DB
        );
        if ($this->connection->connect_errno) {
            echo "FAIL";
        }
    }

    public function disconnect()
    {
        $this->connection->close();
    }


    public function insert($query)
    {
        $this->connect();
        $sql = $this->connection->query($query);
        $this->disconnect();
    }

    public function update($query)
    {
        $this->connect();
        $sqlQuery = $this->connection->query($query);
        $this->disconnect();
    }

    public function select($query)
    {
        $this->connect();

        $sqlQuery = $this->connection->query($query);
        $this->disconnect();

        return $sqlQuery;
    }

    public function delete($query) 
    {
        $this->connect();
        $sqlQuery = $this->connection->query("DELETE FROM cats WHERE id = '$query'");

        $this->disconnect();
    }
}