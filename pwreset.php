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
                <a href=""><img class="logo" src="img/app/westudee_logo_black.png"></a>
                <div class="cardform-error" id="error"></div>
                <form id='form' class="row" method='POST' action="#">
                    <p class="center">Enter your new password.</p>
                    <div class="input-field col s10 offset-s1">
                        <input name="new_password" id="new_password" type="password" class="validate">
                        <label for="password">New Password</label>
                    </div>
                    <div class="input-field col s10 offset-s1">
                        <input id="conf_password" type="password" class="validate">
                        <label for="conf_password">Confirm Password</label>
                    </div>
                    <input name="token" id="token" type="hidden" />
                    <input name='utf-8' type='hidden' value='✓' />
                    <input name="username" id="username" type="hidden" />
                    <button class="btn waves-effect waves-light btn-large " type="submit" name="action">Submit</button><br>
                </form>
            </div>
        </div>
    </div>

    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="js/materialize/materialize.min.js"></script>
    <script language='javascript' type='text/javascript'>
      <!--
      window.onload = function() {
        var urlParams = {};
        (function () {
            var pair, // Really a match. Index 0 is the full match; 1 & 2 are the key & val.
                tokenize = /([^&=]+)=?([^&]*)/g,
                // decodeURIComponents escapes everything but will leave +s that should be ' '
                re_space = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); },
                // Substring to cut off the leading '?'
                querystring = window.location.search.substring(1);

            while (pair = tokenize.exec(querystring))
               urlParams[re_space(pair[1])] = re_space(pair[2]);
        })();

        var base = 'https://www.parse.com';
        var id = urlParams['id'];
        document.getElementById('form').setAttribute('action', base + '/apps/' + id + '/request_password_reset');
        document.getElementById('username').value = urlParams['username'];
        document.getElementById('username_label').appendChild(document.createTextNode(urlParams['username']));

        document.getElementById('token').value = urlParams['token'];
        if (urlParams['error']) {
          document.getElementById('error').appendChild(document.createTextNode(urlParams['error']));
        }
        if (urlParams['app']) {
          document.getElementById('app').appendChild(document.createTextNode(' for ' + urlParams['app']));
        }
      }
        //-->
    </script>
</body>
</html>