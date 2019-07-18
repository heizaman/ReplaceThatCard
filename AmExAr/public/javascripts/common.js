var API_URL = "/apis/";


function createCookie(name, value) {
	document.cookie = name + "=" + value + "; path=/";
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
} 


function deleteCookies() {
    document.cookie = "token=; path=/";
    document.cookie = "name=; path=/";
    document.cookie = "role=; path=/";
}


function getAllCookies() {
    var data = {};

    data.token = getCookie("token");
    data.name = getCookie("name");
    data.role = getCookie("role");
    data.isValid = false;

    if(data.token != "" && data.name != "" && data.role != "")
        data.isValid = true;

    return data;
}


function logout() {
	deleteCookies();
    //createCookie("disableAutoSignIn", 1);
    
	window.location = "/";
}


function loggedInUser() {
    
    var user = getAllCookies();

    if(!user.isValid)
        logout();

    return user;
}