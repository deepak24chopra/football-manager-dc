let router = lsApp.router();

function loadWelcome() {
    localStorage.clear();
    document.getElementById("view").innerHTML = document.getElementById("welcome_template").innerHTML;
}

function loadHome() {
    if (isSigned() == false) {
        window.location = "/#/welcome";
        return;
    }
    document.getElementById("view").innerHTML = document.getElementById("home_template").innerHTML;
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

router.add("/", loadHome);
router.add("/welcome", loadWelcome);