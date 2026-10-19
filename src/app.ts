type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const form = document.querySelector<HTMLFormElement>("#task-form");
const input = document.querySelector<HTMLInputElement>("#task-input");
const list = document.querySelector<HTMLUListElement>("#task-list");

const tasks: Task[] = [];

function renderTasks(): void {
  if (!list) return;

  list.innerHTML = "";

  for (const task of tasks) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");
    const deleteButton = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    text.textContent = task.text;
    if (task.completed) text.classList.add("completed");

    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.addEventListener("click", () => {
      const index = tasks.findIndex((item) => item.id === task.id);
      if (index !== -1) tasks.splice(index, 1);
      renderTasks();
    });

    label.append(checkbox, text);
    item.append(label, deleteButton);
    list.append(item);
  }
}

form?.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  const taskText = input?.value.trim();
  if (!taskText) return;

  tasks.push({
    id: Date.now(),
    text: taskText,
    completed: false,
  });

  if (input) input.value = "";
  renderTasks();
});