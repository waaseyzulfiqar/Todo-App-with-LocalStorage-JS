function isLoggedIn() {
  var token = localStorage.getItem('Current_User');
  return token !== null;
}

function redirectToAppPage() {
  if (isLoggedIn()) {
    window.location = 'todo.html';
  }
}

redirectToAppPage();


// code starts here

var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function register() {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
}

function login() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0";
}

// Signup form functionality //

var registerForm = document.getElementById("register");
var userData = [];

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var username = document.getElementById("username").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please fill out all fields!",
    });
  } else {
    var userObj = {
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

var loginForm = document.getElementById("login");
var verifiedUser = [];

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var currentUser = null;

  var loginEmail = document.getElementById("loginEmail").value.trim();
  var loginPass = document.getElementById("loginPass").value.trim();

  if (!loginEmail || !loginPass) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please fill out all fields!",
    });
  } else {
    var user_data = JSON.parse(localStorage.getItem("User_Data"));

    if (user_data == null) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User Not Found!",
      });
    } else {
      var data = user_data.find(function (user) {
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
