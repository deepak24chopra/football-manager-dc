function getEvent(eventId) {
    return fetch(`/api/event/${eventId}`, {
        method: "post",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: `{"eventId", "${eventId}"}`
    }).then(function(data) {
        if(data.status == 200) {
            return data;
        }
        throw "Get Event error.";
    }).then(function(data) {
        return data.json();
    })
}

function getEvents() {
    return fetch(`/api/events/all`, {
        method: "post",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: `{"email" : "${user.email}"}`
    }).then(function(data) {
        if (data.status == 200) {
            return data;
        }
        throw "Get events Error.";
    }).then(function(data) {
        return data.json();
    });
}

function showEvents() {
    Object.keys(events).forEach(function(key) {
        if (events[key].typeof == "tournament") {
            to.push(events[key]);
        }
        if (events[key].typeof == "challenge") {
            ch.push(events[key]);
        }
        if (events[key].typeof == "league") {
            leagues.push(events[key]);
        }
        if (events[key].typeof == "champions league") {
            cl.push(events[key]);
        }
    });
    showCL();
    showLeagues();
    showChallenge();
    showTournament();
}

function showCL() {
    document.getElementById('showCL').innerHTML = "";
    let elem = document.createElement("div");
    elem.setAttribute("class", "card");
    elem.setAttribute("style", "width: 18rem;");
    let htmlStr = '';
    htmlStr += `<div class="card-header"><i class="fas fa-trophy"></i>Champions Leagues</div>`;
    htmlStr += `<ul class="list-group list-group-flush">`;
    if (cl.length > 0) {
        Object.keys(cl).forEach(function(key) {
            htmlStr += `<li class="list-group-item"><b>Champions League</b><br>`;
            htmlStr += `<i class="fas fa-calendar-alt"></i>${cl[key].createdAt}`;
            htmlStr += `<p>${cl[key].status}</p></li>`;
        });
    }
    if (cl.length == 0) {
        htmlStr += `<li class="list-group-item"><b>No Champions League has been played till now.</b><br>`;
    }
    htmlStr += '</ul>';
    elem.innerHTML = htmlStr;
    document.getElementById("showCL").appendChild(elem);
}

function showLeagues() {
    document.getElementById('showLeagues').innerHTML = "";
    let elem = document.createElement("div");
    elem.setAttribute("class", "card");
    elem.setAttribute("style", "width: 18rem;");
    let htmlStr = '';
    htmlStr += `<div class="card-header"><i class="fas fa-trophy"></i>Leagues</div>`;
    htmlStr += `<ul class="list-group list-group-flush">`;
    if (leagues.length > 0) {
        Object.keys(leagues).forEach(function(key) {
            htmlStr += `<li class="list-group-item"><b>Leagues</b><br>`;
            htmlStr += `<i class="fas fa-calendar-alt"></i>${leagues[key].createdAt}`;
            htmlStr += `<p>${leagues[key].status}</p></li>`;
        });
    }
    if (leagues.length == 0) {
        htmlStr += `<li class="list-group-item"><b>No League has been played till now.</b><br>`;
    }
    htmlStr += '</ul>';
    elem.innerHTML = htmlStr;
    document.getElementById("showLeagues").appendChild(elem);
}

function showChallenge() {
    document.getElementById('showChallengeSeries').innerHTML = "";
    let elem = document.createElement("div");
    elem.setAttribute("class", "card");
    elem.setAttribute("style", "width: 18rem;");
    let htmlStr = '';
    htmlStr += `<div class="card-header"><i class="fas fa-trophy"></i>Challenge Series</div>`;
    htmlStr += `<ul class="list-group list-group-flush">`;
    if (ch.length > 0) {
        Object.keys(ch).forEach(function(key) {
            htmlStr += `<li class="list-group-item"><b>Challenge Series</b><br>`;
            htmlStr += `<i class="fas fa-calendar-alt"></i>${ch[key].createdAt}`;
            htmlStr += `<p>${ch[key].status}</p></li>`;
        });
    }
    if (ch.length == 0) {
        htmlStr += `<li class="list-group-item"><b>No Challenge Series has been played till now.</b><br>`;
    }
    htmlStr += '</ul>';
    elem.innerHTML = htmlStr;
    document.getElementById("showChallengeSeries").appendChild(elem);
}

function showTournament() {
    document.getElementById('showTournaments').innerHTML = "";
    let elem = document.createElement("div");
    elem.setAttribute("class", "card");
    elem.setAttribute("style", "width: 18rem;");
    let htmlStr = '';
    htmlStr += `<div class="card-header"><i class="fas fa-trophy"></i>Tournaments</div>`;
    htmlStr += `<ul class="list-group list-group-flush">`;
    if (to.length > 0) {
        Object.keys(to).forEach(function(key) {
            htmlStr += `<li class="list-group-item"><b>Tournaments</b><br>`;
            htmlStr += `<i class="fas fa-calendar-alt"></i>${to[key].createdAt}`;
            htmlStr += `<p>${to[key].status}</p></li>`;
        });
    }
    if (to.length == 0) {
        htmlStr += `<li class="list-group-item"><b>No Tournament has been played till now.</b><br>`;
    }
    htmlStr += '</ul>';
    elem.innerHTML = htmlStr;
    document.getElementById("showTournaments").appendChild(elem);
}

function addEvent() {
    let eventType = document.getElementById('eventTypeId').value;
    fetch("/api/events/add", {
            method: "post",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: `{"type" : "${eventType}" }`
        }).then(function(data) {
            if (data.status == 200) {
                return data;
            }
            throw "Error";
        }).then(function(data) {
            return data.json();
        }).then(function(data) {
            console.log('data', data); // handle success here
            window.location = `/#/event/${data._id}`
        })
        .catch(function(error) {
            console.log(error);
        })
}

function showEvent() {
    
}

let addEventHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addEventModal">Add Event</button>`;
let events = [];
let event = '';
let cl = [];
let leagues = [];
let ch = [];
let to = [];
let event = [];