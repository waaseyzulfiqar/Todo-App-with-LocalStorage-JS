const isLoggedIn = () => {
  var token = localStorage.getItem('Current_User');
  return token !== null;
}

const redirectToAppPage = () => {
  if (isLoggedIn()) {
    window.location = 'todo.html';
  }
}

redirectToAppPage();


// code starts here

const x = document.getElementById("login");
const y = document.getElementById("register");
const z = document.getElementById("btn");

const register = () => {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
}

const login = () => {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0";
}

// Signup form functionality //

const registerForm = document.getElementById("register");
const userData = [];
let userObj;

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please fill out all fields!",
    });
  } else {
    userObj = {
      username: username,
      email: email,
      password: password,
      _id: Date.now()
    };

    
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Account created successfully!",
    });
    
    registerForm.reset();
  }
  userData.push(userObj);

  localStorage.setItem("User_Data", JSON.stringify(userData));
});

// Login form functionality //

const loginForm = document.getElementById("login");
const verifiedUser = [];

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let currentUser = null;

  const loginEmail = document.getElementById("loginEmail").value.trim();
  const loginPass = document.getElementById("loginPass").value.trim();

  if (!loginEmail || !loginPass) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please fill out all fields!",
    });
  } else {
    let user_data = JSON.parse(localStorage.getItem("User_Data"));

    if (user_data == null) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User Not Found!",
      });
    } else {
      let data = user_data.find(function (user) {
        return user.email === loginEmail && user.password === loginPass;
      });

      if (data) {
        Swal.fire({
          title: "Successfully Logged In",
          confirmButtonText: "ok",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

            verifiedUser.push(data);
    
            localStorage.setItem("Verified_User", JSON.stringify(verifiedUser));
    
            currentUser = data;
    
            localStorage.setItem("Current_User", JSON.stringify(currentUser));
    
            window.location = "todo.html";
          }
        });


      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid email or password!",
        });
      }
      loginForm.reset();

    }
  }
});
