let currentId = 1;

const isDone = {
  Completed: "completed",
  Uncompleted: "uncompleted",
};

class Task {
  constructor(text) {
    this.id = currentId;
    this.text = text;
    this.status = isDone.Uncompleted;
    this.createdAt = new Date().toLocaleString();
  }
}

class TaskManger {
  constructor() {
    this.tasks = [];
    this.load();
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    localStorage.setItem("currentId", this.currentId);
  }

  load() {
    if (localStorage.getItem("tasks")) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
      this.id = Number(localStorage.getItem("currentId"));
    }
  }

  add(text) {
    if (!text || typeof text !== "string" || text.length < 2)
      throw new Error("Must enter valid text");

    const task = new Task(text);

    currentId++;

    this.tasks.push(task);

    this.save();

    return task;
  }

  delete(id) {
    if (!id || typeof id !== "number") throw new Error("Must enter valid ID");
    this.tasks = this.tasks.filter((task) => task.id !== id);

    this.save();
  }

  find(id) {
    if (!id || typeof id !== "number") throw new Error("Must enter valid ID");
    return this.tasks.filter((task) => task.id === id)[0];
  }

  changeStatus(id) {
    if (!id || typeof id !== "number") throw new Error("Must enter valid ID");
    this.find(id).status =
      this.find(id).status === isDone.Uncompleted
        ? isDone.Completed
        : isDone.Uncompleted;

    this.save();
  }

  edit(text, id) {
    if (!id || typeof id !== "number") throw new Error("Must enter valid ID");
    if (!text || typeof text !== "string" || text.length < 2)
      throw new Error("Must enter valid text");
    this.find(id).text = text;

    this.save();
  }
}
