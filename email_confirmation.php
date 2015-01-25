<?php
require 'lib/SendGrid/SendGrid.php';
require 'lib/SendGrid/Email.php';
require 'lib/Smtpapi/Smtpapi.php';
require 'lib/Smtpapi/Smtpapi/Header.php';

$sendgrid = new SendGrid('yutarochan', 'J@p@n6498!');
$email = new SendGrid\Email();
$email
    ->addTo($_POST["email"])
    ->setFrom('westudee@gmail.com')
    ->setSubject('WeStudee Account Activation')
    ->setText('Hi '.$_POST["name"].', Before being able to use WeStudee, we need you to activate your account by clicking on this activation email link.')
    ->setHtml('<img width="200px" src="http://westudee.heroku.com/img/app/westudee_logo_black.png"><br>
    		   <p>Hi Yuya,<br><br> Before being able to use WeStudee, we need you to activate your account by clicking on the activation email link or simply copying and pasing the URL onto your address bar. <br> 
    		   We hope you enjoy using WeStudee and find the best study partners to help ace that next exam!<br/><br/> Sincerly, <br>The WeStudee Team</p>');
$sendgrid->send($email);
?>