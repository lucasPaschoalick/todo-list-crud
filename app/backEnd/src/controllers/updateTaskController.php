<?php

require '../../../dataBase/config/config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $taskId = $_POST["taskId"];
  $taskDescription = $_POST["taskDescription"];
  $taskStatus = $_POST["taskStatus"];
  
  $sql = "UPDATE tasks SET task_description = '$taskDescription', status = '$taskStatus' WHERE id = $taskId";
  if (mysqli_query($conn, $sql)) {
    echo "Tarefa atualizada com sucesso.";
  } else {
    echo "Erro ao atualizar a tarefa: " . mysqli_error($conn);
  }
}

mysqli_close($conn);
?>
