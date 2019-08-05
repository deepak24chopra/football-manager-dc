let router = lsApp.router();

function loadWelcome() {
    localStorage.clear();
    removeEventModal();
    document.getElementById("view").innerHTML = document.getElementById("welcome_template").innerHTML;
}

function loadHome() {
    if (isSigned() == false) {
        window.location = "/#/welcome";
        return;
    }
    document.getElementById("view").innerHTML = document.getElementById("home_template").innerHTML;
    document.getElementById('eventModal').innerHTML = addEventHTML;
    showProfile();
    getManagers()
        .then(function(data) {
            managers = data;
            showManagers();
        })
        .catch(function(error) {
            console.log(error);
        });
    getEvents()
        .then(function(data) {
            events = data;
            showEvents();
        })
        .catch(function(error) {
            console.log(error);
        });
}

function loadEvent() {
    if(isSigned() == false) {
        window.location = "/#/welcome";
        return;
    }
    document.getElementById("view").innerHTML = document.getElementById("event_template").innerHTML;
}

function removeEventModal() {
    if(isSigned() == false) {
        addEventHTML = document.getElementById('eventModal').innerHTML;
        document.getElementById('eventModal').innerHTML = '';
    }
}

router.add("/", loadHome);
router.add("/welcome", loadWelcome);