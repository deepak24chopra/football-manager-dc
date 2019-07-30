function signIn(event) {
    event.preventDefault();
    fetch("/api/users/signin", {
            method: "post",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: `{ "email" : "${event.target.email.value}", "password" : "${event.target.password.value}"}`
        }).then(function(data) {
            if (data.status == 200) {
                return data;
            }
            throw "Error while fetching details";
        }).then(function(data) {
            return data.json();
        }).then(function(data) {
            localStorage.setItem("user", JSON.stringify(data));
            window.location = "/#/";
            return;
        })
        .catch(function(error) {
            console.log(error);
        })
}

function signUp(event) {
    event.preventDefault();
    fetch("/api/users/signup", {
            method: "post",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: `{"email" : "${event.target.email.value}", "name": "${event.target.name.value}", "password": "${event.target.password.value}"}`
        }).then(function(data) {
            if (data.status == 200) {
                return data;
            }
            throw "Error";
        }).then(function(data) {
            return data.json();
        }).then(function(data) {
            localStorage.setItem("user", JSON.stringify(data));
            window.location = "/#/";
            return;
        })
        .catch(function(error) {
            console.log(error);
        })
}

function isSigned() {
    if (localStorage.getItem("user") == null) {
        return false;
    }
    user = JSON.parse(localStorage.getItem("user"));
    return true;
}

function showProfile() {
    document.getElementById("showProfile").innerHTML = "";
    let elem = document.createElement("div");
    elem.setAttribute("class", "card");
    elem.setAttribute("style", "width: 18rem;");
    elem.innerHTML = `<img class="card-img-top" src="https://www.gravatar.com/avatar/${user.emailHash}?s=400" alt="Gravatar"><div class="card-body"><center><h5 class="card-title">${user.name}</h5></center><br><center>${user.email}</center></div>`;
    document.getElementById("showProfile").appendChild(elem);
}

function getManagers() {
    return fetch(`/api/users/all`, {
        method: "post",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: `{"email" : "${user.email}"}`
    }).then(function(data) {
        if (data.status == 200) {
            return data;
        }
        throw "Get managers Error.";
    }).then(function(data) {
        return data.json();
    });
}

function showManagers() {
    document.getElementById("showManagers").innerHTML = "";
    let elem = document.createElement("div");
    elem.setAttribute("class", "card");
    elem.setAttribute("style", "width: 18rem;");
    let htmlStr = '';
    htmlStr += `<div class="card-header">Managers</div>`;
    htmlStr += `<ul class="list-group list-group-flush">`;
    Object.keys(managers).forEach(function(key) {
        htmlStr += `<li class="list-group-item"><b>${managers[key].name}</b><br>`;
        htmlStr += `${managers[key].email}`;
        htmlStr += `<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="${managers[key].form}" aria-valuemin="0" aria-valuemax="100"></div></div></li>`;
    });
    htmlStr += '</ul>';
    elem.innerHTML = htmlStr;
    document.getElementById("showManagers").appendChild(elem);
}

let user = {};
let managers = [];