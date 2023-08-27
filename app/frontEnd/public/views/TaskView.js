class TaskView {
    constructor(TaskModel) {
      this.TaskModel = TaskModel;
    }
  
    getTaskRow() {
      return `<tr dataTaskId='${this.TaskModel.getId()}'>
        <td class='taskId'>${this.TaskModel.getId()}</td>
        <td class='taskDescription'>${this.TaskModel.getDescription()}</td>
        <td class='taskStatus'>${this.TaskModel.getStatus()}</td>
        <td><button class='deleteButton'>Deletar</button></td>
        <td><button class='editButton'>Editar</button></td>
      </tr>`;
    }
  }
  