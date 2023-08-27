class TaskModel {
    constructor(id, description, status) {
        this.id = id;
        this.description = description;
        this.status = status;
    }
    
    getId() {
        return this.id;
    }

    getDescription() {
        return this.description;
    }

    setStatus(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }
}
