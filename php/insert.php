<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database Connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Wnba";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die(json_encode(array('error' => 'Connection failed: ' . $conn->connect_error)));
}

// Preparing for Ajax Call
$inputJSON = file_get_contents('php://input');

$input = json_decode($inputJSON, TRUE); // convert JSON object to an array

// Check if $input is valid
if (is_null($input)) {
    die(json_encode(array('error' => 'Invalid JSON')));
}

// Check required fields
$requiredFields = ['name', 'year', 'team', 'position', 'number', 'img'];
foreach ($requiredFields as $field) {
    if (!isset($input[$field])) {
        die(json_encode(array('error' => "Missing field: $field")));
    }
}

// Sanitize input
$name = $input['name'];
$year = $input['year'];
$team = $input['team'];
$position = $input['position'];
$number = $input['number'];
$img = $input['img'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO MvpData (name, year, team, position, number, img) VALUES (?, ?, ?, ?, ?, ?)");
if (!$stmt) {
  die(json_encode(array('error' => 'Statement preparation failed: ' . $conn->error)));
}
$stmt->bind_param("sissis", $name, $year, $team, $position, $number, $img);

// Execute and respond
if ($stmt->execute()) {
    echo json_encode(array('success' => 'Player created successfully'));
} else {
    echo json_encode(array('error' => 'Error: ' . $stmt->error));
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
