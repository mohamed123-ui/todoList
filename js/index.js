const Add = document.getElementById("add");
const addInput = document.querySelector("input");
const loading = document.querySelector(".loading");
const rowData = document.getElementById("rowData");

let allTodo = JSON.parse(localStorage.getItem("todos")) || [];

displayTodoO();

Add.addEventListener("click", () => {
  if (!addInput.value.trim()) {
    alert("Please enter a valid task");
    return;
  }
  loading.classList.remove("d-none");

  const todo = {
    id: Date.now(),
    title: addInput.value.trim(),
    completed: false,
  };

  allTodo.push(todo);
  localStorage.setItem("todos", JSON.stringify(allTodo));

  addInput.value = "";
  displayTodoO();
  loading.classList.add("d-none");
});

function displayTodoO() {
  let content = "";

  for (let todo of allTodo) {
    content += `
      <div class="d-flex justify-content-between align-content-center mb-3">
        <div class="text-name text-white">
          <h3 onclick="markCompleted(${todo.id})" style="${todo.completed ? 'text-decoration: line-through;' : ''}">
            ${todo.title}
          </h3>
        </div>
        <div class="icons">
          ${
            todo.completed
              ? '<span><i class="fa-regular fa-circle-check pe-4 fs-5" style="color: #74C0FC;" id="check"></i></span>'
              : ''
          }
          <span><i onclick="deleteTodo(${todo.id})" class="fa-solid fa-trash fs-5" style="color: #B197FC;" id="delete"></i></span>
        </div>
      </div>
    `;
  }

  rowData.innerHTML = content;
}

function deleteTodo(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      allTodo = allTodo.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(allTodo));
      displayTodoO();
      toastr.success("Deleted successfully");
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    }
  });
}

function markCompleted(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Mark as completed?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, complete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      allTodo = allTodo.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      );
      localStorage.setItem("todos", JSON.stringify(allTodo));
      displayTodoO();
      Swal.fire("Completed!", "", "success");
    }
  });
}
