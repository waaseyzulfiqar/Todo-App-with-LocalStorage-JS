const input = document.querySelector("#input");

const ol = document.querySelector("ol");

var todo = [];

var todoArray = []; // to save todo data to localstorage

var getUserTodo = []; // to get the loggedIn user Todo

var username = document.querySelector("#username");

var currentUser = JSON.parse(localStorage.getItem("Current_User"));

var form = document.querySelector("#form");

if (currentUser) {
  username.innerHTML = currentUser.username;

  // Retrieve todo data from localStorage
  var storedTodo = localStorage.getItem(`loggedInUserTodo`);

  if (storedTodo) {
    todoArray = JSON.parse(storedTodo);
    console.log("todoArray ===> ", todoArray);

    // Filter todo data for the current user
    var userTodo = todoArray.filter((todo) => {
      return todo.userId === currentUser._id;
    });
    console.log("userTodo ===>", userTodo);

    var todoTasks = userTodo.map((todo) => todo.task);

    // Update the todo array
    todo = todoTasks;
    console.log("todo ===> ", todo);

    renderTodo();
  }

} else {
  window.location = "index.html";
}

function removeUser() {
  localStorage.removeItem("Current_User");
  window.location = "index.html";
}

function renderTodo() {
  if (todo.length === 0) {
    ol.innerHTML = `
      <h4 class="no-todos">Nothing to do? Add a new todo to stay productive!</h4>
    `;
  }else{

    ol.innerHTML = "";
  
    for (let i = 0; i < todo.length; i++) {
      ol.innerHTML += ` <li id="todoJs">${todo[i]}
  
                          <div>
                          <button onclick="liEditBtn(${i})" class="edit-btn"><i class="ri-edit-box-line"></i></button>
                            <button onclick="liDelBtn(${i})" class="del-btn"><i class="ri-close-line"></i></button>
                          </div>
                          
                          </li>`;
  }
  }
}

var date = new Date();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (input.value) {
    var userTodoObj = {
      userId: currentUser._id,
      id: todo.length + 1,
      task: input.value,
      createdAt: date.toLocaleString(),
    };

    todo.push(input.value);

    renderTodo();

    todoArray.push(userTodoObj);

    localStorage.setItem("loggedInUserTodo", JSON.stringify(todoArray));

    input.value = "";
  }
});

function liDelBtn(index) {
  Swal.fire({
    title: "Are you sure ?",
    showDenyButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#4cc54c"
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      todo.splice(index, 1);

      todoArray.splice(index, 1); // Remove the deleted todo item from todoArray
      localStorage.setItem("loggedInUserTodo", JSON.stringify(todoArray)); // Update localStorage

      renderTodo();
    } else if (result.isDenied) {
      renderTodo();
    }
  });
}

async function liEditBtn(index) {
  
  const { value: editedTodo } = await Swal.fire({
    title: "Edit your Todo",
    input: "text",
    inputValue: todo[index], // Use the current todo item as the input value
    showCancelButton: true,
    confirmButtonColor: "#4cc54c", // Change the button color to blue
    cancelButtonColor: "#d33", // Change the cancel button color to red
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });
  if (editedTodo) {
    
    todo.splice(index, 1, editedTodo); // Use the editedTodo value to update the todo item
  
    todoArray[index].task = editedTodo; // Update the edited todo item in todoArray
    localStorage.setItem("loggedInUserTodo", JSON.stringify(todoArray)); // Update localStorage
  
    renderTodo();
  }

}