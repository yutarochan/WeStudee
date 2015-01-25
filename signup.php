<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
    
    <link type="text/css" rel="stylesheet" href="css/materialize/materialize.min.css"  media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="css/style.css"  media="screen,projection"/>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col l6 center offset-l3 z-depth-1 signup-panel grey lighten-5">
                <a href="http://westudee.pancakeapps.com/"><img class="logo_micro" src="img/app/westudee_logo_black.png"></a>
                <div class="cardform-error"></div>
                <form class="signup-form">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="first_name" type="text" class="validate signup-firstname">
                            <label for="first_name">First Name</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="last_name" type="text" class="validate signup-lastname">
                            <label for="last_name">Last Name</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="email" type="text" class="validate signup-email">
                            <label for="email">Email Address</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="password" type="password" class="validate signup-password">
                            <label for="password">Password</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6">
                            <input name="gender" type="radio" id="male" />
                            <label for="male">Male</label>
                        </div>
                        <div class="col s6">
                            <input name="gender" type="radio" id="female" />
                            <label for="female">Female</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light btn-large " type="submit" name="action">Signup</button><br>
                </form>
            </div>
        </div>
        <div class="row center">
            <p class="disclaimer">By clicking Register, you agree to our <a href="">Terms</a>, <a href="">Privacy Policy</a>, and our <a href="">Data Use Policy</a>.</p>
        </div>
    </div>

    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="js/materialize/materialize.min.js"></script>
    <script src="https://www.parsecdn.com/js/parse-1.3.3.min.js"></script>

    <!-- TOOD: Make a page with all of the functions on a signle javascript -->
    <script>
        Parse.$ = jQuery;
        Parse.initialize("mxpAxRbhZmodDXNvsW2aQBSk4eoMdDmxmCXVajY1", "oBnSRa41KipKeIaiCuAgkYqxmPsXRhHkGZA8IyTN");

        $('.signup-form').on('submit', function(e) {
            if ($(".signup-email").val() == "" || $(".signup-email").val() == "" || $(".signup-firstname").val() == "" || $(".signup-lastname").val() == "" || $(".signup-email").val() == "" || $('input[name=gender]:checked', '.signup-form').val() == "") {
                $(".cardform-error").html("Please do not leave any of the fields blank.");
            } else {
                e.preventDefault();

                var user = new Parse.User();
                user.set("username", $(".signup-email").val());
                user.set("password", $(".signup-password").val());
                user.set("first_name", $(".signup-firstname").val());
                user.set("last_name", $(".signup-lastname").val());
                user.set("email", $(".signup-email").val());
                //user.set("gender", $('input[name=gender]:checked', '.signup-form').attr('id'); // TODO: Set gender

                user.signUp(null, {
                    success: function(user) {
                        location.href='complete.php';
                    },
                    error: function(user, error) {
                        // Show the error message somewhere and let the user try again.
                        if (error.code == -1) $(".cardform-error").html("Please do not leave any fields blank.");
                        if (error.code == 202) $(".cardform-error").html("Username is already taken. <a href='http://westudee.pancakeapps.com/app/login.html'>Sign in</a> now.");
                    }
                });
            }
        });
    </script>
</body>
</html>