<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Wnba";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if (mysqli_connect_error()) {
    die("Database connection failed: " . mysqli_connect_error());
  }

$sql = "SELECT * FROM MvpData";
$result = $conn->query($sql);

$mvp = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $mvp[] = $row;
    }
    echo json_encode($mvp);
} else {
    echo json_encode(array('error' => 'No data found'));
}

$conn->close();
?>
