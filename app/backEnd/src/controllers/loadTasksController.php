<?php

require '../../../dataBase/config/config.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    
    $sql = "SELECT * FROM tasks";

    $result = mysqli_query($conn, $sql);
    
    $tasks = [];
    
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $task = [
                'id' => $row['id'],
                'description' => $row['task_description'],
                'status' => $row['status']
            ];

            $tasks[] = $task;
        }
    }
}

mysqli_close($conn);

// Retorna os dados das tarefas como JSON
header('Content-Type: application/json');
echo json_encode($tasks);
?>
