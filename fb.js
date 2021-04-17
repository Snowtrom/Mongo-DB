let socket = io();

socket.on("register_fail", ()=>{
    alert("Username taken!");
})

socket.on("register_success", ()=>{
    alert("Successful registration!");
})

function register(e){
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let about = document.getElementById("about").value;
    if (password != password2) alert("Passwords do not match!");
    else socket.emit("register", username, password, about);
}