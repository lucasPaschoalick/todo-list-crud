<?php

require '../../../dataBase/config/config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $taskDescription = $_POST["taskDescription"];
  $status = "A fazer";
  $timestamp = date("Y-m-d H:i:s");

  $sql = "INSERT INTO tasks (task_description, status, timestamp) VALUES ('$taskDescription', '$status', '$timestamp')";
  if (mysqli_query($conn, $sql)) {
    $taskId = mysqli_insert_id($conn);

    echo json_encode([
      'success' => true,
      'taskId' => $taskId,
      'taskDescription' => $taskDescription,
      'status' => $status
    ]);
  } else {
    echo json_encode([
      'success' => false,
      'error' => "Erro ao adicionar a tarefa: " . mysqli_error($conn)
    ]);
  }
}

mysqli_close($conn);
?>
