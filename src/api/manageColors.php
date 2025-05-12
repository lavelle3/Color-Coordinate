<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("content-type: application/json");
$servername = "faure";
$username = "brauncw";
$db = "brauncw";
$password = "835308860";
$conn = new mysqli($servername, $username, $password, $db);


// Check connection
if ($conn->connect_error) {
	http_response_code(400);
  die("Connection failed: " . $conn->connect_error);
}
if ($_SERVER["REQUEST_METHOD"] === "GET"){
	if(isset($_GET["color_count"])){
		getColorCount($conn);
	}
	elseif(isset($_GET["colors"])){
        getColors($conn);
    }   
    else {
		handleGet($conn);
	}
}
elseif ($_SERVER["REQUEST_METHOD"] === "POST"){
	handlePost($conn);
}

function getColors($conn) {
	$sql = "SELECT * FROM colors order by id";
	$result = $conn->query($sql);

	$output = array();
	while($row = $result->fetch_assoc())
		array_push($output, $row);
	http_response_code(200);
	echo json_encode($output);
}

function getColorCount($conn) {
    $sql = "SELECT COUNT(*) as count FROM colors";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    http_response_code(200);
    echo json_encode($row);
}

function handleGet($conn) {
	$sql = "SELECT name, hex_value FROM colors";
	$result = $conn->query($sql);
	
	$output = array();
	while($row = $result->fetch_assoc())
		array_push($output, $row);
	http_response_code(200);
	echo json_encode($output);
}

function handlePost($conn) {
    $json = json_decode(file_get_contents('php://input'));

    if (!isset($json->name, $json->id, $json->hex_value)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        return;
    }

    $name = $conn->real_escape_string($json->name);
    $id = (int)$json->id;
    $hex_value = $conn->real_escape_string($json->hex_value);

    if (!preg_match('/^#[0-9a-fA-F]{6}$/', $hex_value)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid hex format"]);
        return;
    }

    $stmt = $conn->prepare("INSERT INTO colors (id, name, hex_value) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $id, $name, $hex_value);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "Color added"]);
    } else {
        http_response_code(409);
        echo json_encode(["error" => $stmt->error]);
    }

    $stmt->close();
}
?>
