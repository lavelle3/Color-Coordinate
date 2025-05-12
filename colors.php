<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Content-Type: application/json");

$conn = new mysqli("faure", "eid", "passwd", "eid");
if ($conn->connect_error) {
    http_response_code(400);
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    $result = $conn->query("SELECT * FROM colors");
    $colors = [];
    while ($row = $result->fetch_assoc()) {
        array_push($colors, $row);
    }
    echo json_encode($colors);
} elseif ($method === "POST") {
    $json = json_decode(file_get_contents("php://input"));
    $action = $json->action ?? 'add';

    if ($action === "add") {
        $name = $conn->real_escape_string($json->name);
        $hex = $conn->real_escape_string($json->hex);
        $sql = "INSERT INTO colors (name, hex) VALUES ('$name', '$hex')";
        echo json_encode(["success" => $conn->query($sql)]);
    } elseif ($action === "edit") {
        $id = intval($json->id);
        $name = $conn->real_escape_string($json->name);
        $hex = $conn->real_escape_string($json->hex);
        $sql = "UPDATE colors SET name='$name', hex='$hex' WHERE id=$id";
        echo json_encode(["success" => $conn->query($sql)]);
    } elseif ($action === "delete") {
        $id = intval($json->id);
        $sql = "DELETE FROM colors WHERE id=$id";
        echo json_encode(["success" => $conn->query($sql)]);
    }
}
?>
