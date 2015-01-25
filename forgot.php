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
                <a href="http://westudee.herokuapp.com/"><img class="logo" src="http://westudee.herokuapp.com/img/app/westudee_logo_black.png"></a>
                <form class="row forgot-form">
                    <p class="center">Enter the email you used to sign up with WeStudee.</p>
                    <div class="input-field col s10 offset-s1">
                        <input id="email" type="text" class="validate email">
                        <label for="email">Email Address</label>
                    </div>
                    <button class="btn waves-effect waves-light btn-large " type="submit" name="action">Submit</button><br>
                </form>
            </div>
        </div>
    </div>

    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="js/materialize/materialize.min.js"></script>
    <script src="https://www.parsecdn.com/js/parse-1.3.3.min.js"></script>

    <script>
        Parse.$ = jQuery;
        Parse.initialize("mxpAxRbhZmodDXNvsW2aQBSk4eoMdDmxmCXVajY1", "oBnSRa41KipKeIaiCuAgkYqxmPsXRhHkGZA8IyTN");
        $('.forgot-form').on('submit', function(e) {
            e.preventDefault();

            Parse.User.requestPasswordReset($(".email").val(), {
                success: function() {
                    location.href='pwreq_sent.php';
                },
                error: function(error) {
                    // Show the error message somewhere
                    alert("Error: " + error.message);
                }
            });
        });
    </script>
</body>
</html>