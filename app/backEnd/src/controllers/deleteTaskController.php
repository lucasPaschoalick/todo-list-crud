<?php

require '../../../dataBase/config/config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $taskId = $_POST["taskId"];

  $sql = "DELETE FROM tasks WHERE id = $taskId";
  if (mysqli_query($conn, $sql)) {
    echo "Tarefa excluída com sucesso.";
  } else {
    echo "Erro ao excluir a tarefa: " . mysqli_error($conn);
  }
}

mysqli_close($conn);
?>
