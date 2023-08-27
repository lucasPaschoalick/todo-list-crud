$(document).ready(function() {

    // Adicionar tarefa    
    $("#addTaskForm").submit(function(event) {
        event.preventDefault();
        var taskDescription = $("#taskDescription").val();        

        $.ajax({
            url: "../../backEnd/src/controllers/addTaskController.php",
            method: "POST",
            data: { taskDescription: taskDescription },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    console.log("chegou aqui")
                    $("#taskDescription").val("");

                    loadTasks();

                } else {
                    console.log(response.error);
                }
            }
        });
    });
  
    // Deletar tarefa    
    $(document).on("click", ".deleteButton", function() {
        var row = $(this).closest("tr");
        var taskId = row.attr("dataTaskId");
        
        
        $.ajax({
            url: "../../backEnd/src/controllers/deleteTaskController.php",
            method: "POST",
            data: { taskId: taskId },
            success: function(response) {
                loadTasks();
            }
        });
    });
  
    // Editar tarefa
    $(document).on("click", ".editButton", function() {
        var row = $(this).closest("tr");
        var taskId = row.attr("dataTaskId");
        var taskDescription = row.find(".taskDescription").text();
        var taskStatus = row.find(".taskStatus").text().trim();
                
        $("#editTaskId").val(taskId);
        $("#editTaskDescription").val(taskDescription);
        $("#editTaskStatus").val(taskStatus);
        
        $("#editModal").show();
    });

    $(document).on("click", ".close", function() {
        $("#editModal").hide();
    });

    $(document).on("click", "#saveChanges", function() { 
        var taskId = $("#editTaskId").val();        
        var updatedTaskDescription = $("#editTaskDescription").val();
        var updatedTaskStatus = $("#editTaskStatus").val();

        $.ajax({
            url: "../../backEnd/src/controllers/updateTaskController.php",
            method: "POST",
            data: { taskId: taskId, taskDescription: updatedTaskDescription, taskStatus: updatedTaskStatus },
            success: function(response) {                               
                loadTasks();
            },
            error: function() {
                console.log("Erro ao atualizar a tarefa.");
            }
        });

        $("#editModal").hide();
    });

    loadTasks();
});
  
// Visualizar Tarefas na tabela
function loadTasks() {
    $.ajax({
        url: "../../backEnd/src/controllers/loadTasksController.php",
        method: "GET",
        dataType: "json",
        success: function(response) {
            var tasks = response;
            var tableBody = $(".taskTable tbody");
            tableBody.empty();

            if (tasks.length > 0) {
                tasks.forEach(function(task) {
                    var taskModel = new TaskModel(task.id, task.description, task.status);

                    var taskView = new TaskView(taskModel);

                    tableBody.append(taskView.getTaskRow());
                });
            } else {
                var noTasksRow = "<tr><td colspan='5'>Nenhuma tarefa encontrada.</td></tr>";
                tableBody.append(noTasksRow);
            }
        },
        error: function(err) {
            console.log("Erro ao carregar as tarefas.");
            console.log(err);
        }
    });
}
  