function submitRegisterForm() {
	var name = $("#name").val();
	var email = $("#email").val();
	var password = $("#password").val();

	if (name == "" || email == "" || password == "") {
		alert("Please fill out the required fields!");
		return;
	}

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"name": name, "email": email, "password": password}),
		url: API_URL + 'register',
		success: function(response) {
			if(response.status == 'success') {
				window.location = "/";
			}
			else {
				alert(response.message || "Error!");
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}