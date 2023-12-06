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

$sql = "SELECT * FROM MvpData"; // Fetch data from MvpData table
$result = $conn->query($sql);

$players = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $players[] = $row;
    }
    echo json_encode($players);
} else {
    echo json_encode(array('error' => 'No players found'));
}

$conn->close();
?>
