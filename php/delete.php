<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

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

// Obtains id from AJAX call
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); // Convert JSON into an array

// Validate the input
if (!isset($input['id'])) {
    die(json_encode(array('error' => 'ID is missing')));
}

$id = $input['id'];

// Prepare and bind
$stmt = $conn->prepare("DELETE FROM MvpData WHERE id = ?");
$stmt->bind_param("i", $id);

// Execute and respond
if ($stmt->execute()) {
    echo json_encode(array('success' => 'Record deleted successfully'));
} else {
    echo json_encode(array('error' => 'Error: ' . $stmt->error));
}

$stmt->close();
$conn->close();
?>
