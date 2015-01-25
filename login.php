<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
    
    <link type="text/css" rel="stylesheet" href="css/materialize/materialize.min.css"  media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="css/style.css"  media="screen,projection"/>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col l5 center offset-l4 z-depth-1 login-panel grey lighten-5">
                <a href="http://westudee.herokuapp.com/"><img class="logo" src="img/app/westudee_logo_black.png"></a>
                <div class="cardform-error"></div>
                <form class="row login-form" role="form">
                    <div class="input-field col s10 offset-s1">
                        <input id="username" type="text" class="validate login-username">
                        <label for="username">Email</label>
                    </div>
                    <div class="input-field col s10 offset-s1">
                        <input id="password" type="password" class="validate login-password">
                        <label for="password">Password</label>
                    </div>
                    <button class="btn waves-effect waves-light btn-large login-submit" type="submit">Login</button><br>
                    <a href="http://westudee.herokuapp.com/forgot">Forgot Password</a> or <a href="http://westudee.herokuapp.com/signup">Create New Account</a>
                </form>
            </div>
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

        // Redirect if logged in
        //if (Parse.User.current()) window.location.href = "http://westudee.herokuapp.com/";

        // Signup Process
        $('.login-form').on('submit', function(e) {
            // Prevent Default Submit Event
            e.preventDefault();

            var username = $(".login-username").val();
            var password = $(".login-password").val();

            // Call Parse Login function with those variables
            Parse.User.logIn(username, password, {
                // If the username and password matches
                success: function(user) {
                    alert('Welcome!'); // TODO: Change to set user authentication methods.
                },
                // If there is an error
                error: function(user, error) {
                    if (error.code == "101") {
                        $(".cardform-error").html("Email or Password is Incorrect");
                    }
                }
            });
        });
    </script>
</body>
</html>