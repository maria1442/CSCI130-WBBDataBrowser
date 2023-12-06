<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if (mysqli_connect_error()) {
  die("Database connection failed: " . mysqli_connect_error());
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS Wnba";
if ($conn->query($sql) === TRUE) {
  echo "Database created successfully\n";
} else {
  echo "Error creating database: " . $conn->error . "\n";
}


// selects the database
$conn->select_db('Wnba');

// sql to create table
$sql = "CREATE TABLE IF NOT EXISTS MvpData (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
year INT(4)NOT NULL,
team VARCHAR(50)NOT NULL,
position ENUM('PG','G', 'F', 'C')NOT NULL,
number INT(4)NOT NULL,
img VARCHAR(255)NOT NULL,
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table MvpData created successfully";
  } else {
    echo "Error creating table: " . $conn->error. "\n";
  }


  $jsonData = file_get_contents('data.json');
  $MvpData = json_decode($jsonData, true);
  
  // prepares the insert statement
  $stmt = $conn->prepare("INSERT INTO MvpData (name, year, team, position, number, img) VALUES (?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("sissis", $name, $year, $team, $position, $number, $img);
  
  foreach ($MvpData as $player) {
    $name = $player['name'];
    $year = $player['year'];
    $team = $player['team'];
    $position = $player['position'];
    $number = $player['number'];
    $img = $player['img'];

    if (!$stmt->execute()) {
        echo "Error inserting record: " . $stmt->error . "\n";
    }
}

$stmt->close();
$conn->close();
  
  ?>
  



