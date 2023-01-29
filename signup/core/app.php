<?

// require_once 'main.php';

$received = file_get_contents('php://input');
$data = json_decode($received);
$send = [];


if (!empty($data)) {
    $reason = $data->reason;

    $send = [
        "feed" => "ssa"
    ];
}
else {
    $send = '';
}

if (empty($send)) {
    $send = 'no-return';
}

$response = json_encode($send);
echo $response;
?>