<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>WeStudee</title>

		<!-- Stylesheets -->
		<link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
		<link href="css/static_style.css" rel="stylesheet">

		<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body>
        <div id="nav" class="navbar navbar-default navbar-fixed-top navbar-top_state" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="index.html"><img style="float:left" height="95%" src="img/static/icon_small.png"><strong>We</strong>Studee</a>
                </div>
                <div class="navbar-collapse collapse">

                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
						<li><a id="login-btn"class="login-btn" href="http://westudee.herokuapp.com/login">Login</a></li> <!-- Change upon product release -->
                    </ul>
                </div>
            </div>
        </div>
	
		<div class="container-fluid banner">
			<div class="container text-center">
				<h1 class="text-center">Find, Connect and Study</h1>
				<h3>WeStudee makes searching for study partners simple and easy.</h3>
				<p class="button"><a href="http://westudee.herokuapp.com/signup">Get Started</a></p> <!-- Change upon product release -->
			</div>
		</div>
		
		<div class="container-fluid schools">
			<div class="container text-center">
				<div class="row">
					<div class="col-xs-4 col-sm-4"><img width="60%" src="img/static/goodwin.png"></div>
					<div class="col-xs-4 col-sm-4"><img width="60%" src="img/static/goodwin.png"></div>
					<div class="col-xs-4 col-sm-4"><img width="60%" src="img/static/goodwin.png"></div>
				</div>
			</div>
		</div>
		
		<div class="container content_pane">
			<div class="col-md-6 text_pane">
				<h1>Build Your Profile</h1>
				<p>Create your profile to include your school, courses, availability and study preferences.</p>
			</div>
			<div class="col-md-6">
				<img src="img/static/iphone_browse.png">
			</div>
		</div>
	
		<div class="container-fluid content_pane" style="background-color: #f9f9fa;">
			<div class="container">
				<div class="col-md-6 text_pane">
					<h1>Search and Connect</h1>
					<p>Browse students at your school that match your availability, courses and study preferences.</p>
				</div>
				<div class="col-md-6">
					Put pretty pictures and animations here.
				</div>
			</div>
		</div>
		
		<div class="container content_pane">
			<div class="col-md-6 text_pane">
				<h1>Study Together</h1>
				<p>Request to study with another student, meet offline and have fun studying together.</p>
			</div>
			<div class="col-md-6">
				Put pretty pictures animations here
			</div>
		</div>
	
		
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="js/bootstrap/bootstrap.min.js"></script>
		
		<script>
			$(window).scroll(function() {
				if ($(document).scrollTop() > 150) {
					$('#nav').removeClass('navbar-top_state');
					$('#nav').addClass('nb-below');
					$('.navbar-brand').addClass('nb-below_logo');
					$('.navbar-right').addClass('nb-below_link');
				} else {
					$('#nav').addClass('navbar-top_state');
					$('#nav').removeClass('nb-below');
					$('.navbar-brand').removeClass('nb-below_logo');
					$('.navbar-right').removeClass('nb-below_link');
				}
			});
		</script>
	</body>
</html>