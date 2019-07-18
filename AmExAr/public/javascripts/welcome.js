$(document).ready(function () {
	welcome();
});


function welcome() {
	var user = loggedInUser();
	$("#name").html(user.name);
}