/* WeStudee Parse Core API */

Parse.initialize("mxpAxRbhZmodDXNvsW2aQBSk4eoMdDmxmCXVajY1", "oBnSRa41KipKeIaiCuAgkYqxmPsXRhHkGZA8IyTN");

var debug = true;

function signup(first, last, email, password, gender) {
	if (first == "" || last == "" || email == "" || password == "" || gender == "")
		return false;

	console.log(first);

	var user = new Parse.User();
	user.set("first_name", first);
	user.set("last_name", last);
	user.set("email", email);
	user.set("gender", gender);
	user.set("username", email)
	user.set("password", password);

	user.signUp(null, {
  		success: function(user) {
  			if (debug) console.log("Signup Success");
  		},
  		error: function(user, error) {
  			if (debug) console.log("[Error " + error.code + "]: " + error.message);
  			if (error.code == 202) {
  				console.log("taken");
  				// send the message to the user telling them the account is taken
  			}
  		}
	});
}

function login(username, password) {
	if (username == "" || password == "") 
		return false;

	Parse.User.logIn(username, password, {
  		success: function(user) {
  			if (debug) console.log("Login Success");
  			console.log(Parse.User.isCurrent());
  		},
  		error: function(user, error) {
  			if (debug) console.log("[Error " + error.code + "]: " + error.message);
  		
  		}
	});
}


