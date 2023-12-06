
<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');


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

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);


// Now, check each field
$expectedFields = ['name', 'year', 'team', 'position', 'number', 'img', 'id'];
foreach ($expectedFields as $field) {
    if (!isset($input[$field])) {
        die(json_encode(array('error' => "Missing field: $field")));
    }
}
// Assign values
$name = $input['name'];
$year = $input['year'];
$team = $input['team'];
$position = $input['position'];
$number = $input['number'];
$img = $input['img'];
$id = $input['id'];

// Prepare and bind
$stmt = $conn->prepare("UPDATE MvpData SET name = ?, year = ?, team = ?, position = ?, number = ?, img = ? WHERE id = ?");
if (!$stmt) {
  die(json_encode(array('error' => 'Statement preparation failed: ' . $conn->error)));
}
$stmt->bind_param("sissisi", $name, $year, $team, $position, $number, $img, $id);

// Execute and respond
if ($stmt->execute()) {
    echo json_encode(array('success' => 'Record updated successfully'));
} else {
    echo json_encode(array('error' => 'Error: ' . $stmt->error));
}

$stmt->close();
$conn->close();
?>