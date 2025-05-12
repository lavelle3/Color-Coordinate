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

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET["color_count"])) {
        getColorCount($conn);
    } elseif (isset($_GET["colors"])) {
        getColors($conn);
    } else {
        handleGet($conn);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json = json_decode(file_get_contents('php://input'));

    if (isset($json->action)) {
        if ($json->action === "edit") {
            handleEdit($conn, $json);
        } elseif ($json->action === "delete") {
            handleDelete($conn, $json);
        }
    } else {
        handlePost($conn, $json);
    }
}

function getColors($conn) {
    $sql = "SELECT * FROM colors ORDER BY id";
    $result = $conn->query($sql);

    $output = array();
    while ($row = $result->fetch_assoc()) {
        array_push($output, $row);
    }
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

function handlePost($conn, $json) {
    if (!isset($json->name, $json->hex_value)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        return;
    }

    $name = $conn->real_escape_string($json->name);
    $hex_value = $conn->real_escape_string($json->hex_value);

    if (!preg_match('/^#[0-9a-fA-F]{6}$/', $hex_value)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid hex format"]);
        return;
    }

    // Check for duplicate name or hex value
    $checkSql = "SELECT * FROM colors WHERE name = '$name' OR hex_value = '$hex_value'";
    $checkResult = $conn->query($checkSql);
    if ($checkResult->num_rows > 0) {
        http_response_code(409);
        echo json_encode(["error" => "Duplicate name or hex value"]);
        return;
    }

    $stmt = $conn->prepare("INSERT INTO colors (name, hex_value) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $hex_value);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "Color added"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => $stmt->error]);
    }

    $stmt->close();
}

function handleEdit($conn, $json) {
    if (!isset($json->name, $json->new_name, $json->new_hex_value)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        return;
    }

    $name = $conn->real_escape_string($json->name);
    $new_name = $conn->real_escape_string($json->new_name);
    $new_hex_value = $conn->real_escape_string($json->new_hex_value);

    if (!preg_match('/^#[0-9a-fA-F]{6}$/', $new_hex_value)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid hex format"]);
        return;
    }

    // Check for duplicate name or hex value (excluding the current color)
    $checkSql = "SELECT * FROM colors WHERE (name = '$new_name' OR hex_value = '$new_hex_value') AND name != '$name'";
    $checkResult = $conn->query($checkSql);
    if ($checkResult->num_rows > 0) {
        http_response_code(409);
        echo json_encode(["error" => "Duplicate name or hex value"]);
        return;
    }

    $stmt = $conn->prepare("UPDATE colors SET name = ?, hex_value = ? WHERE name = ?");
    $stmt->bind_param("sss", $new_name, $new_hex_value, $name);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Color updated"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => $stmt->error]);
    }

    $stmt->close();
}

function handleDelete($conn, $json) {
    if (!isset($json->name)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        return;
    }

    $name = $conn->real_escape_string($json->name);

    // Ensure at least 2 colors remain
    $countSql = "SELECT COUNT(*) as count FROM colors";
    $countResult = $conn->query($countSql);
    $countRow = $countResult->fetch_assoc();
    if ($countRow['count'] <= 2) {
        http_response_code(400);
        echo json_encode(["error" => "Cannot delete. At least 2 colors must remain."]);
        return;
    }

    $stmt = $conn->prepare("DELETE FROM colors WHERE name = ?");
    $stmt->bind_param("s", $name);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Color deleted"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => $stmt->error]);
    }

    $stmt->close();
}
?>