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

function loadEvent(params) {
    if(isSigned() == false) {
        window.location = "/#/welcome";
        return;
    }
    console.log('in load Event', params.id);
    document.getElementById("view").innerHTML = document.getElementById("event_template").innerHTML;
    getEvent()
    .then(function(data) {
        event = data;
        showEvent();
    })
    .catch(function(error) {
        console.log('error in loading event.',error);
    });
}

function removeEventModal() {
    if(isSigned() == false) {
        addEventHTML = document.getElementById('eventModal').innerHTML;
        document.getElementById('eventModal').innerHTML = '';
    }
}

router.add("/", loadHome);
router.add("/welcome", loadWelcome);
router.add("/event/:id", loadEvent);