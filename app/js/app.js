/*
    For now..., just a personal reminder to:
      ___   _   _    ___    _  __             ___    _____             ___    _  _     ___      ___             ___    _____     _
     | __| | | | |  / __|  | |/ /     o O O  |_ _|  |_   _|    o O O  / __|  | || |   |_ _|    | _ \    o O O  |_ _|  |_   _|   | |
     | _|  | |_| | | (__   | ' <     o        | |     | |     o       \__ \  | __ |    | |     |  _/   o        | |     | |     |_|
    _|_|_   \___/   \___|  |_|\_\   TS__[O]  |___|   _|_|_   TS__[O]  |___/  |_||_|   |___|   _|_|_   TS__[O]  |___|   _|_|_   _(_)_
  _| """ |_|"""""|_|"""""|_|"""""| {======|_|"""""|_|"""""| {======|_|"""""|_|"""""|_|"""""|_| """ | {======|_|"""""|_|"""""|_| """ |
  "`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'./o--000'"`-0-0-'"`-0-0-'./o--000'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'./o--000'"`-0-0-'"`-0-0-'"`-0-0-'
*/
var DEBUG = false;

Parse.$ = jQuery;
Parse.initialize("mxpAxRbhZmodDXNvsW2aQBSk4eoMdDmxmCXVajY1", "oBnSRa41KipKeIaiCuAgkYqxmPsXRhHkGZA8IyTN");

var app = angular.module('WeStudeeApp', ['ngRoute', 'ngAnimate', 'parse-angular']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/", {templateUrl: "partials/dashboard.html"})
    .when("/signup", {templateUrl: "partials/signup.html", controller: "CreateAccountCtrl"})
    .when("/signup_success", {templateUrl: "partials/signup_success.html"})
    .when("/activated", {templateUrl: "partials/confirm.html"})
    .when("/reconfirm", {templateUrl: "partials/reconfirm.html"})
    .when("/send_reconfirm", {templateUrl: "partials/resend_confirm.html"})
    .when("/invalid", {templateUrl: "partials/invalid.html"})
    .when("/reset", {templateUrl: "partials/pw_reset.html"}) // TODO: Change interface
    .when("/reset_success", {templateUrl: "partials/reset_success.html"}) // TODO: Change interface
    .when("/login", {templateUrl: "partials/login.html", controller: "LoginCtrl"})
    .when("/forgot", {templateUrl: "partials/forgot.html", controller: "ForgotCtrl"})
    .when("/forgot_sent", {templateUrl: "partials/forgot_sent.html"})
    .when("/logout", { templateUrl: "partials/logout.html" })
    .when("/profile", { templateUrl: "partials/profile.html", controller: "ProfileCtrl" })
    .when("/profile_edit", { templateUrl: "partials/profile_edit.html", controller: "ProfileEditCtrl" })
    .when("/profile_view", { templateUrl: "partials/profile_view.html", controller: "ProfileViewCtrl" })
    .when("/profile_setup", { templateUrl: "partials/profile_setup.html", controller: "ProfileSetupCtrl" })
    .when("/courses", { templateUrl: "partials/courses.html", controller: "CourseCtrl" })
    .when("/courses_setup", { templateUrl: "partials/courses_setup.html", controller: "CourseCtrl" })
    .otherwise({ redirect: "/" });

    if (!Parse.User.current() && document.URL.indexOf("reset") == -1) location.href= '?#/login';
}]);

// Redirect Routing
if (Parse.User.current()) {
    // Check User Activation
    if(Parse.User.current().get("emailVerified") === false) console.log(Parse.User.current().get("emailVerified")); //location.href= '?#/reconfirm';
    else {
        // Check Profile Established
        var UserProfile = Parse.Object.extend("UserProfile");
        var query = new Parse.Query("UserProfile");
        query.equalTo("userID", Parse.User.current());
        query.find({ success: function(c) {
            var usr_prof = c[0];
            if (usr_prof.get("about") === undefined &&
                usr_prof.get("major") === undefined &&
                usr_prof.get("prefEmail") === undefined &&
                usr_prof.get("availability") === undefined &&
                usr_prof.get("courseList") === undefined &&
                document.URL.indexOf("profile_setup") == -1) {
                    goto("profile_setup");
            }
        }});
    }
}

/* Template Controller
app.controller('PageCtrl', function (/* $scope, $location, $http) {
    console.log("Page Controller activated!");
}); */

var base_url = "WeStudee/app/";

// Application View Changer
function goto(path) {
	var root = location.protocol + '//' + location.host + "/" + base_url + "?#/";
	location.href = root + path;
	$(location).attr('href',root+path);
	//alert(root + path);
	location.reload();
}

// Mobile Check
function isMobile() {
  var check = false;
  (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}


app.controller('NavigationCtrl', function($scope) {
    $scope.user = Parse.User.current();

	/* Notification Status
	0 - Havent even opened it yet.
	1 - Not yet acknowledged by client yet, but still active.
	2 - Acknowledged by user.
	*/
	function checkNotifications() {
		var qur_0 = new Parse.Query("Request");
		qur_0.equalTo("status", 0);

		var qur_1 = new Parse.Query("Request");
		qur_1.equalTo("status", 1);

		var query = new Parse.Query.or(qur_0, qur_1);
		query.equalTo("to_user", $scope.user);
		query.limit(1);
		query.find({
			success: function(results) {
				if (results.length > 0 && (!$("#notif").hasClass("blue-text") || !$("#mobile-nav").hasClass("blue-text"))) {
					$("#notif").addClass("blue-text");
					$("#mobile-nav").addClass("blue-text");
				}

				if (results.length > 0) {
					$("#notification_dropdown").empty();

		    		for (var i = 0; i < results.length; i++) {
			    		var q = new Parse.Query(Parse.User);
						q.equalTo("objectId", results[i].get("from_user").id);
						q.find({
							success: function(res) {
								$("#notification_dropdown").append("<li>" + res[0].get("first_name") + " " + res[0].get("last_name") + " sent you a study request." + "</li>");
							}
						});
		    		}
		    	}
		  	},
		  	error: function(error) { console.log("Error: " + error.code + " " + error.message); }
		});
	}

	checkNotifications();
	setInterval(function() {
		var query = new Parse.Query("Request");
		query.equalTo("to_user", $scope.user);
		query.equalTo("status", 0);
		query.limit(1);
		query.find({
			success: function(results) {
				if (results.length > 0) {
		    		var query = new Parse.Query(Parse.User);
					query.equalTo("objectId", results[0].get("from_user").id);
					query.find({
						success: function(res) {
							if (res.length > 0 && (!$("#notif").hasClass("blue-text") || !$("#mobile-nav").hasClass("blue-text"))) {
								$("#notif").addClass("blue-text");
								$("#mobile-nav").addClass("blue-text");
							}
							toast(res[0].get("first_name") + " " + res[0].get("last_name") + " sent you a study request.", 5000);

							$("#notification_dropdown").empty();
							$("#notification_dropdown").append("<li>" + res[0].get("first_name") + " " + res[0].get("last_name") + " sent you a study request." + "</li>");
						}
					});
				}
		  	},
		  	error: function(error) { console.log("Error: " + error.code + " " + error.message); }
		});
	}, 10000);

	// Acknowledgement of Notifications
	$scope.akNotif = function() {
		if ($("#notif").hasClass("blue-text") || $("#mobile-nav").hasClass("blue-text")) {
			$("#notif").removeClass("blue-text");
			$("#mobile-nav").removeClass("blue-text");
		}

		var Request = Parse.Object.extend("Request");
		var query = new Parse.Query(Request);
		query.equalTo("to_user", $scope.user);
		query.lessThan("status", 2);
		query.find({
  			success: function(res) {
  				if (res.length > 0) {
  					for (var i = 0; i < res.length; i++) {
  						res[i].set("status", 2);
  						res[i].save();
  					}
  				}
  			},
  			error: function(object, error) {}
		});
	};

	/* Message Notification	- Simple Indicator of New Messages */
	function checkMessages() {
		var query = new Parse.Query("Messages");
		query.equalTo("to_user", $scope.user);
		query.equalTo("status", 0);
		query.limit(1);
		query.find({
			success: function(results) {
				if (results.length > 0 && (!$("#msg").hasClass("blue-text") || !$("#mobile-nav").hasClass("blue-text"))) {
					$("#msg").addClass("blue-text");
					$("#mobile-nav").addClass("blue-text");
				}
		  	},
		  	error: function(error) { console.log("Error: " + error.code + " " + error.message); }
		});
	};

	checkMessages();
	setInterval(function() {
		var query = new Parse.Query("Messages");
		query.equalTo("to_user", $scope.user);
		query.equalTo("status", 0);
		query.find({
			success: function(results) {
				if (results.length > 0 && (!$("#msg").hasClass("blue-text") || !$("#mobile-nav").hasClass("blue-text"))) {
					$("#msg").addClass("blue-text");
					$("#mobile-nav").addClass("blue-text");
				}
		  	},
		  	error: function(error) { console.log("Error: " + error.code + " " + error.message); }
		});
	}, 10000);

	$scope.akMessage = function() {
		console.log("test");
		if ($("#msg").hasClass("blue-text") || $("#mobile-nav").hasClass("blue-text")) {
			$("#msg").removeClass("blue-text");
			$("#mobile-nav").removeClass("blue-text");
		}

		var Message = Parse.Object.extend("Messages");
		var query = new Parse.Query(Message);
		query.equalTo("to_user", $scope.user);
		query.lessThan("status", 1);
		query.find({
  			success: function(res) {
  				console.log(res.length);
  				if (res.length > 0) {
  					for (var i = 0; i < res.length; i++) {
  						res[i].set("status", 1);
  						res[i].save();
  					}
  				}
  			},
  			error: function(object, error) {}
		});
	};
});


app.controller('DashboardCtrl', function($scope) {
    $scope.user = Parse.User.current();

    $scope.course = [];

    // Query User Profile Information
    var query = new Parse.Query("UserProfile");
    query.limit(1);
    query.equalTo("userID", Parse.User.current());
    query.first().then(function(result){
        $scope.userprofile = result;
        // Query Course Data
        for (var i = 0; i < result.get("courseList").length; i++) {
            var query_course = new Parse.Query("Courses");
            query_course.get(result.get("courseList")[i], {
                success: function(object) {
                        //$("#courses").append("<li class='collection-item'><strong>"+object.get("courseName")+"</strong> ("+object.get("subjectID")+" "+object.get("courseID")+")</li>");
                        $("#course_list").append(
                            "<li>"+
                                "<div class='collapsible-header white-text blue lighten-1'>"+object.get("courseName")+"</div>"+
                                "<div class='collapsible-body grey lighten-3'>"+
                                    "<div id='"+object.id+"' class='row' style='padding: 0 24px;'>"+
                                    "</div>"+
                                "</div>"+
                            "</li>"
                        );

                        var query_cm = new Parse.Query("UserProfile");
                        query_cm.equalTo("schoolID", $scope.userprofile.get("schoolID"));
                        query_cm.find(function(res) {
                            for (var j = 0; j < res.length; j++) {
                                if (containsCourse(res[j].get("courseList"), object.id) && res[j].get("userID").id !== $scope.user.id) {

                                    var query = new Parse.Query("User");
                                    query.get(res[j].get("userID").id, {
                                        success: function(obj) {

                                            var query_prof = new Parse.Query("UserProfile");
                                            query_prof.equalTo("userID", obj);
                                            query_prof.limit(1);
                                            query_prof.find({
                                                success: function(usr_prof) {

                                                    var query_school = new Parse.Query("School");
                                                    query_school.equalTo("objectId", usr_prof[0].get("schoolID").id);
                                                    query_school.find({
                                                        success: function(school_data) {
                                                            $("#"+object.id).append(
                                                                "<div class='col l3 m12'><div class='card'>"+
                                                                    "<div class='card-image waves-effect waves-block waves-light'><img class='activator' src='img/app/profile_cover.png'></div>"+
                                                                        "<div class='card-content'>"+
                                                                            "<span class='card-title activator'><a class='blue-text' href='?#/profile_view?id="+obj.id+"' onClick='goto(\"profile_view?id="+obj.id+"\")'>"+obj.get("first_name") + " " + obj.get("last_name")+"</a><i class='mdi-navigation-more-vert right grey-text text-darken-4'></i></span>"+
                                                                            "<span class='votes'>0 VOTES</span>"+
                                                                        "</div>"+
                                                                        "<div class='card-reveal card_detail'>"+
                                                                            "<span class='card-title grey-text text-darken-4'>"+ obj.get("first_name") + " " + obj.get("last_name") +" <i class='mdi-navigation-close right'></i></span>"+
                                                                            "<span class='dt_head'>"+school_data[0].get("schoolName")+"</span>"+
                                                                            "<span class='dt_head'>"+usr_prof[0].get("major")+"</span>"+

                                                                            "<div class='day_available_header'>Available:</div>"+
                                                                                "<div class='day_available text-center'>"+
                                                                                    "<div class='day "+$scope.availClass(usr_prof[0].get("availability")[0])+"' data-toggle='tooltip' data-placement='bottom' title='"+$scope.getTooltip(usr_prof[0].get("availability")[0])+"'>Su</div>"+
                                                                                    "<div class='day "+$scope.availClass(usr_prof[0].get("availability")[1])+"' data-toggle='tooltip' data-placement='bottom' title='"+$scope.getTooltip(usr_prof[0].get("availability")[1])+"'>M</div>"+
                                                                                    "<div class='day "+$scope.availClass(usr_prof[0].get("availability")[2])+"' data-toggle='tooltip' data-placement='bottom' title='"+$scope.getTooltip(usr_prof[0].get("availability")[2])+"'>T</div>"+
                                                                                    "<div class='day "+$scope.availClass(usr_prof[0].get("availability")[3])+"' data-toggle='tooltip' data-placement='bottom' title='"+$scope.getTooltip(usr_prof[0].get("availability")[3])+"'>W</div>"+
                                                                                    "<div class='day "+$scope.availClass(usr_prof[0].get("availability")[4])+"' data-toggle='tooltip' data-placement='bottom' title='"+$scope.getTooltip(usr_prof[0].get("availability")[4])+"'>Th</div>"+
                                                                                    "<div class='day "+$scope.availClass(usr_prof[0].get("availability")[5])+"' data-toggle='tooltip' data-placement='bottom' title='"+$scope.getTooltip(usr_prof[0].get("availability")[5])+"'>F</div>"+
                                                                                    "<div class='day "+$scope.availClass(usr_prof[0].get("availability")[6])+"' data-toggle='tooltip' data-placement='bottom' title='"+$scope.getTooltip(usr_prof[0].get("availability")[6])+"'>Sa</div>"+
                                                                                "</div>"+
                                                                                "<a onClick='sendRequest(\""+obj.id+"\")' class='waves-effect waves-light btn white-text blue lighten-1'><i class='mdi-content-send'></i> Send Request</a></center>"+
                                                                        "</div>"
                                                                +"</div></div>");
                                                        }
                                                    });
                                                },
                                                error: function(ob, err) {}
                                            });
                                        },
                                        error: function(object, error) {}
                                    });
                                }
                            }
                        });
                },
                error: function(object, error) { console.log("error!!!!"); }
            });
        }
    });

    $scope.getTooltip = function(data) {
        var text = "";
        if (data == 0) text = "None";
        if (data == 1 || data == 4 || data == 5 || data == 7) text += "Morning ";
        if (data == 2 || data == 4 || data == 6 || data == 7) text += "Afternoon";
        if (data == 3 || data == 5 || data == 6 || data == 7) text += " Night";
        return text;
    };

    $scope.availClass = function(num) {
        if (num != 0) return 'available';
        else return 'navailable';
    };

});

function sendRequest(userID) {
    var query = new Parse.Query("User");
    query.get(userID, {
        success: function(object) {
            console.log(object.id);

            var Request = Parse.Object.extend("Request");
            var query_req = new Parse.Query(Request);
            query_req.equalTo("to_user", object);
            query_req.lessThan("status", 2);
            query_req.find({
                  success: function(res) {
                      if (res.length == 0) {
                          var new_req = new Request();
                          new_req.set("from_user", Parse.User.current());
                          new_req.set("to_user", object);
                          new_req.set("status", 0);

                          new_req.save();

                          toast('Request Sent!', 4000);
                      }
                  },
                  error: function(object, error) {}
            });
        },
        error: function(object, error) {}
    });
};

app.controller('CreateAccountCtrl', function($scope) {
	$scope.submit = function() {
		if ($scope.first_name === undefined || $scope.first_name === "" ||
			$scope.last_name === undefined || $scope.last_name === "" ||
			$scope.email === undefined || $scope.email === "" ||
			$scope.password === undefined || $scope.password === "" ||
			$scope.gender === undefined)
			$(".cardform-error").html("Please do not leave anything blank.");
		else {
	 		var user = new Parse.User();
            user.set("username", $scope.email);
            user.set("password", $scope.password);
            user.set("first_name", $scope.first_name);
            user.set("last_name", $scope.last_name);
            user.set("email", $scope.email);
            user.set("gender", $scope.gender);

			user.signUp(null, {
            	success: function(user) {
                    // Parse Email to check if listed school - TODO: Implement a feature to limit the schools.
                    var email_stub = $scope.email.substr(($scope.email.indexOf("@")+1));
                    var email_query = new Parse.Query("School");
                    email_query.equalTo("email_format", email_stub);
                    email_query.find({
                        success: function(data) {
                            var UserProfile = Parse.Object.extend("UserProfile");
                            var usr_prof = new UserProfile();
                            usr_prof.set("userID", user);

                            if (data.length != 0) usr_prof.set("schoolID", data[0]);

                            usr_prof.save();
                            location.href='?#/signup_success';
                        },
                        error: function(error) {}
                    });
				},
                error: function(user, error) {
                	// Show the error message somewhere and let the user try again.
                    if (error.code == -1) $(".cardform-error").html("Please do not leave any fields blank.");
                    if (error.code == 202) $(".cardform-error").html("This email is registered. <a href='?#/login'>Sign in</a> now.");
				}
			});
		}
	};
});

app.controller('LoginCtrl', function($scope) {
    if (Parse.User.current()) location.href= '?#/';
	$scope.login = function() {
		if ($scope.email === undefined || $scope.email === "" ||
			$scope.password === undefined || $scope.password === "")
			$(".cardform-error").html("Please do not leave anything blank.");
		else {
			Parse.User.logIn($scope.email, $scope.password, {
				success: function(user) { location.href='#/'; }, // TODO: Redirect user to DashboardPage
	        	error: function(user, error) { $(".cardform-error").html("Email or Password is Incorrect"); }
	    	});
		}
	};
});

app.controller('ForgotCtrl', function($scope) {
	$scope.submit = function() {
		if ($scope.email === undefined || $scope.email === "")
			$(".cardform-error").html("Please do not leave anything blank.");
		else {
			Parse.User.requestPasswordReset($scope.email, {
	        	success: function() { location.href='?#/forgot_sent'; },
	            error: function(error) { $(".cardform-error").html("The provided email is invalid."); }
			});
		}
	};
});


app.controller('ProfileSetupCtrl', function($scope) {
    $scope.user = Parse.User.current();

    // Preload Initial Form Data
    var query = new Parse.Query("UserProfile");
    query.limit(1);
    query.equalTo("userID", $scope.user);
    query.first().then(function(result){
        if (result) {
            $scope.usrprofile = result;

            // Query User School Information
            var qur = new Parse.Query("School");
            qur.limit(1);
            qur.first().then(function(res) {
                $scope.usrprofile_school = res;

                // Prepopulate form with more data.
                $scope.pro_school = res.get("schoolName");
                $scope.pro_loc = res.get('city') + ", " + res.get('state');
            });
        }
    });

    // Availability Management Functions
    $scope.avail = "0000000";

    function dayToIndex(day) {
        switch (day) {
            case "Sunday": return 0;
            case "Monday": return 1;
            case "Tuesday": return 2;
            case "Wednesday": return 3;
            case "Thursday": return 4;
            case "Friday": return 5;
            case "Saturday": return 6;
        }
    };

    function setCheckbox(data) {
        if (data == 0) {
            $("#morning").prop('checked', false);
            $("#afternoon").prop('checked', false);
            $("#night").prop('checked', false);
        } else if (data == 1) {
            $("#morning").prop('checked', true);
            $("#afternoon").prop('checked', false);
            $("#night").prop('checked', false);
        } else if (data == 2) {
            $("#morning").prop('checked', false);
            $("#afternoon").prop('checked', true);
            $("#night").prop('checked', false);
        } else if (data == 3) {
            $("#morning").prop('checked', false);
            $("#afternoon").prop('checked', false);
            $("#night").prop('checked', true);
        } else if (data == 4) {
            $("#morning").prop('checked', true);
            $("#afternoon").prop('checked', true);
            $("#night").prop('checked', false);
        } else if (data == 5) {
            $("#morning").prop('checked', false);
            $("#afternoon").prop('checked', true);
            $("#night").prop('checked', true);
        } else if (data == 6) {
            $("#morning").prop('checked', true);
            $("#afternoon").prop('checked', false);
            $("#night").prop('checked', true);
        } else if (data == 7) {
            $("#morning").prop('checked', true);
            $("#afternoon").prop('checked', true);
            $("#night").prop('checked', true);
        }
    };

    $scope.updt_dayView = function() {
        var day_idx = dayToIndex($scope.availability);
        setCheckbox($scope.avail[day_idx]);
    };

    $scope.uptd_checkData = function() {
        var day_idx = dayToIndex($scope.availability);
        $scope.avail = repAt($scope.avail, day_idx, setCBString());
    };

    function repAt(data, index, char) {
        var new_data = "";
        for (var i = 0; i < data.length; i++) {
            if (i == index) new_data += char;
            else new_data += data[i];
        }
        return new_data;
    };

    function setCBString() {
        if ($("#morning").is(":checked")) {
            if ($("#afternoon").is(":checked")) {
                if ($("#night").is(":checked")) return 7;
                else return 4;
            } else {
                if ($("#night").is(":checked")) return 5;
                else return 1;
            }
        } else {
            if ($("#afternoon").is(":checked")) {
                if ($("#night").is(":checked")) return 6;
                else return 2;
            } else {
                if ($("#night").is(":checked")) return 3;
                else return 0;
            }
        }
    };

    // Form Submission Function
    $scope.processForm = function() {
        if ($scope.pro_about !== undefined &&
            $scope.pro_major !== undefined &&
            $scope.pro_loc !== undefined &&
            $scope.pro_email !== undefined) {

            console.log("Processing form!");

            var query_prof = new Parse.Query("UserProfile");
            query_prof.equalTo("userID", Parse.User.current());
            query_prof.first().then(function(user) {

                console.log(user.length);
                user.set("about", $scope.pro_about);
                user.set("major", $scope.pro_major);
                user.set("location", $scope.pro_location);
                user.set("prefEmail", $scope.pro_email);
                user.set("availability", $scope.avail);
                user.addUnique("courseList", "");

                user.save();
                goto("courses_setup");
            });
        } else {
            window.scrollTo(0, 0);
            $('.cardform-error').text("Error: Please do not leave any of the fields blank.")
        }
    };
});


app.controller('ProfileCtrl', function($scope) {
	$scope.user = Parse.User.current();

	// Query User Profile Information
	var query = new Parse.Query("UserProfile");
	query.limit(1);
	query.equalTo("userID", $scope.user);
	query.first().then(function(result){
        if (result) {
        	$scope.usrprofile = result;

            for (var i = 0; i < result.get("courseList").length; i++) {
                var query_course = new Parse.Query("Courses");
                query_course.get(result.get("courseList")[i], {
                    success: function(object) {
                        $("#courses").append("<li class='collection-item'><strong>"+object.get("courseName")+"</strong> ("+object.get("subjectID")+" "+object.get("courseID")+")</li>");
                    },
                    error: function(object, error) {}});
            }

        	// Query User School Information
        	var qur = new Parse.Query("School");
        	qur.limit(1);
        	qur.first().then(function(res) { $scope.usrprofile_school = res; });
        }
	});

    function getCourseName(courseID) {
        var query = new Parse.Query("Courses");
        query.equalTo("objectId", courseID);
        query.first().then(function(result){
            return courseID;
        });
    };

    $scope.getTooltip = function(data) {
        var text = "";
        if (data == 0) text = "None";
        if (data == 1 || data == 4 || data == 5 || data == 7) text += "Morning ";
        if (data == 2 || data == 4 || data == 6 || data == 7) text += "Afternoon";
        if (data == 3 || data == 5 || data == 6 || data == 7) text += " Night";
        return text;
    };

    $scope.gotoEdit = function() {
        goto("courses");
    };
});

app.controller('ProfileEditCtrl', function ($scope) {
    $scope.user = Parse.User.current();

    // Query User Profile Information
    var query = new Parse.Query("UserProfile");
    query.limit(1);
    query.equalTo("userID", $scope.user);
    query.first().then(function(result){
        if (result) {
            $scope.usrprofile = result;

            // Prepopulate form with existing data
            $scope.pro_about = result.get("about");
            $scope.pro_major = result.get('major');
            $scope.pro_email = result.get('prefEmail');
            $scope.avail = result.get("availability");

            setCheckbox($scope.avail[0]);

            // Query User School Information
            var qur = new Parse.Query("School");
            qur.limit(1);
            qur.first().then(function(res) {
                $scope.usrprofile_school = res;

                // Prepopulate form with more data.
                $scope.pro_school = res.get("schoolName");
                $scope.pro_loc = res.get('city') + ", " + res.get('state');
            });

            // Query Course Data
            for (var i = 0; i < result.get("courseList").length; i++) {
                var query_course = new Parse.Query("Courses");
                query_course.get(result.get("courseList")[i], {
                    success: function(object) {
                        $("#courses").append("<li class='collection-item'><strong>"+object.get("courseName")+"</strong> ("+object.get("subjectID")+" "+object.get("courseID")+")</li>");
                    },
                    error: function(object, error) {}});
            }

            // Query User School Information
            var qur = new Parse.Query("School");
            qur.limit(1);
            qur.first().then(function(res) { $scope.usrprofile_school = res; });
        }
    });

    $scope.getTooltip = function(data) {
        var text = "";
        if (data == 0) text = "None";
        if (data == 1 || data == 4 || data == 5 || data == 7) text += "Morning ";
        if (data == 2 || data == 4 || data == 6 || data == 7) text += "Afternoon";
        if (data == 3 || data == 5 || data == 6 || data == 7) text += " Night";
        return text;
    };

    $scope.updateProfile = function() {
        var UserProfile = Parse.Object.extend("UserProfile");
        var query = new Parse.Query(UserProfile);
        query.equalTo("userID", $scope.user);
        query.find({
              success: function(res) {
                  if (res.length > 0) {
                      for (var i = 0; i < res.length; i++) {
                          res[i].set("about", $scope.pro_about);
                          res[i].set("major", $scope.pro_major);
                          res[i].set("prefEmail", $scope.pro_email);
                          res[i].set("availability", $scope.avail);
                          res[i].save();

                          toast('Profile Updated!', 4000);
                      }
                  }
              },
              error: function(object, error) {}
        });
    };

    /* User Availability Functionality */
    $scope.updt_dayView = function() {
        var day_idx = dayToIndex($scope.availability);
        setCheckbox($scope.avail[day_idx]);
    };

    $scope.uptd_checkData = function() {
        var day_idx = dayToIndex($scope.availability);
        $scope.avail = repAt($scope.avail, day_idx, setCBString());
    };

    function dayToIndex(day) {
        switch (day) {
            case "Sunday": return 0;
            case "Monday": return 1;
            case "Tuesday": return 2;
            case "Wednesday": return 3;
            case "Thursday": return 4;
            case "Friday": return 5;
            case "Saturday": return 6;
        }
    };

    function setCheckbox(data) {
        if (data == 0) {
            $("#morning").prop('checked', false);
            $("#afternoon").prop('checked', false);
            $("#night").prop('checked', false);
        } else if (data == 1) {
            $("#morning").prop('checked', true);
            $("#afternoon").prop('checked', false);
            $("#night").prop('checked', false);
        } else if (data == 2) {
            $("#morning").prop('checked', false);
            $("#afternoon").prop('checked', true);
            $("#night").prop('checked', false);
        } else if (data == 3) {
            $("#morning").prop('checked', false);
            $("#afternoon").prop('checked', false);
            $("#night").prop('checked', true);
        } else if (data == 4) {
            $("#morning").prop('checked', true);
            $("#afternoon").prop('checked', true);
            $("#night").prop('checked', false);
        } else if (data == 5) {
            $("#morning").prop('checked', false);
            $("#afternoon").prop('checked', true);
            $("#night").prop('checked', true);
        } else if (data == 6) {
            $("#morning").prop('checked', true);
            $("#afternoon").prop('checked', false);
            $("#night").prop('checked', true);
        } else if (data == 7) {
            $("#morning").prop('checked', true);
            $("#afternoon").prop('checked', true);
            $("#night").prop('checked', true);
        }
    };

    function setCBString() {
        if ($("#morning").is(":checked")) {
            if ($("#afternoon").is(":checked")) {
                if ($("#night").is(":checked")) return 7;
                else return 4;
            } else {
                if ($("#night").is(":checked")) return 5;
                else return 1;
            }
        } else {
            if ($("#afternoon").is(":checked")) {
                if ($("#night").is(":checked")) return 6;
                else return 2;
            } else {
                if ($("#night").is(":checked")) return 3;
                else return 0;
            }
        }
    };

    function repAt(data, index, char) {
        var new_data = "";
        for (var i = 0; i < data.length; i++) {
            if (i == index) new_data += char;
            else new_data += data[i];
        }
        return new_data;
    };

    $scope.gotoEdit = function() {
        goto("courses");
    };
});

app.controller('ProfileViewCtrl', function($scope) {
    if (getQueryVariable('id') == false || getQueryVariable('id') == Parse.User.current()) {
        goto("/");
    }

    var query_user = new Parse.Query("User");
    query_user.get(getQueryVariable('id'), {
        success: function(object) {
            $scope.user = object;

            var query = new Parse.Query("UserProfile");
            query.limit(1);
            query.equalTo("userID", object);
            query.first().then(function(result){
                if (result) {
                    $scope.usrprofile = result;

                    for (var i = 0; i < result.get("courseList").length; i++) {
                        var query_course = new Parse.Query("Courses");
                        query_course.get(result.get("courseList")[i], {
                            success: function(object) {
                                $("#courses").append("<li class='collection-item'><strong>"+object.get("courseName")+"</strong> ("+object.get("subjectID")+" "+object.get("courseID")+")</li>");
                            },
                            error: function(object, error) {}});
                    }

                    // Query User School Information
                    var qur = new Parse.Query("School");
                    qur.limit(1);
                    qur.first().then(function(res) { $scope.usrprofile_school = res; });
                }
            });
        }
    });

    function getCourseName(courseID) {
        var query = new Parse.Query("Courses");
        query.equalTo("objectId", courseID);
        query.first().then(function(result){
            return courseID;
        });
    };

    $scope.getTooltip = function(data) {
        var text = "";
        if (data == 0) text = "None";
        if (data == 1 || data == 4 || data == 5 || data == 7) text += "Morning ";
        if (data == 2 || data == 4 || data == 6 || data == 7) text += "Afternoon";
        if (data == 3 || data == 5 || data == 6 || data == 7) text += " Night";
        return text;
    };

    $scope.sendRequest = function() {
        sendRequest($scope.user.id);
    };
});

app.controller('CourseCtrl', function ($scope) {
    $scope.user = Parse.User.current();

    // Query User Profile Information
    var query = new Parse.Query("UserProfile");
    query.limit(1);
    query.equalTo("userID", $scope.user);
    query.first().then(function(result){
        $scope.usrprofile = result;

        // Query Subject Data
        var query_subject = new Parse.Query("Subjects");
        query_subject.equalTo("schoolID", result.get("schoolID").id);
        query_subject.ascending("subjectName");
        query_subject.find(function(data) {
            $scope.subjects = data;

            for (var i = 0; i < data.length; i++) {
                // TODO: Make use of Parse's objectID instead of actually using the subjectID.
                if (!isMobile()) $('#sub').append($("<option></option>").prop('value', data[i].get("subjectID")).text(data[i].get("subjectName")));
                else $('#subj').append();
            }
            $("select").material_select();
        });
    });

    // For Mobile Interface
    $scope.checkDropdown = function() {
        var query = new Parse.Query("UserProfile");
        query.limit(1);
        query.equalTo("userID", Parse.User.current());
        query.first().then(function(result) {
            var query_course = new Parse.Query("Courses");
            query_course.equalTo("schoolID", result.get("schoolID").id);
            query_course.startsWith("subjectID", $scope.dp_sub);
            query_course.find(function(res) {
                $("#cour").empty();
                for (var i = 0; i < res.length; i++) {
                    if (!containsCourse(result.get("courseList"), res[i].id))
                        $("#cour").append("<li class='collection-item' onClick='updateCourse(\""+res[i].id+"\", this)'><div>"+res[i].get("courseName")+"<a class='secondary-content' onClick='updateCourse(\""+res[i].id+"\", this)'><i id='ico_"+res[i].id+"' class='Small mdi-content-add'></i></a></div></li>");
                    else
                        $("#cour").append("<li class='collection-item' onClick='updateCourse(\""+res[i].id+"\", this)'><div>"+res[i].get("courseName")+"<a class='secondary-content' onClick='updateCourse(\""+res[i].id+"\", this)'><i id='ico_"+res[i].id+"' class='Small mdi-content-clear red-text'></i></a></div></li>");
                }
            });
        });
    };

    $scope.checkMobile = isMobile();
});

function updateCourse(obj) {
    // Query User Profile Information
    var query = new Parse.Query("UserProfile");
    query.limit(1);
    query.equalTo("userID", Parse.User.current());
    query.first().then(function(result) {
        if (!(containsCourse(result.get("courseList"), obj))) {
            result.addUnique("courseList", obj);
            $("#ico_"+obj).removeClass("mdi-content-add");
            $("#ico_"+obj).addClass("red-text mdi-content-clear");
        } else {
            result.remove("courseList", obj);
            $("#ico_"+obj).removeClass("red-text mdi-content-clear");
            $("#ico_"+obj).addClass("mdi-content-add");
        }
        result.save();
    });
};

function containsCourse(course, c) {
    for (var i = 0; i < course.length; i++)
        if (course[i] === c) return true;
    return false;
};

function getQueryVariable(variable){
    if (window.location.href.split("?")[window.location.search.split("?").length+1] === undefined)
        return false;
    var query = window.location.href.split("?")[window.location.search.split("?").length+1];
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
