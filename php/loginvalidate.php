<?php
if(isset($_REQUEST['submit']))
{
include_once('session.php');
include ('file_constants.php');

if(!mysql_select_db($db,$con))
{
	include('login.php');
	echo "<script language='javascript'>document.getElementById('wrong').innerHTML='<h>Wrong Email and/or Password</h>';</script></font>";	
}
else
{

$email = isset($_POST['email'])? $_POST['email']:"";
$email = mysql_real_escape_string($email);

$password = isset($_POST['password'])? $_POST['password']:"";
$password = mysql_real_escape_string($password);
$hashed_password = md5($password);
//echo $hashed_password;

$usersonline_table = "CREATE TABLE IF NOT EXISTS usersonline (
						timestamp int(15) DEFAULT '0' NOT NULL,
						ip varchar(40) NOT NULL,
						file varchar(100) NOT NULL,
						PRIMARY KEY (timestamp),
						KEY ip (ip),
						KEY file (file))";
mysql_query($usersonline_table);

$timestamp = time();
$ip = $_SERVER['REMOTE_ADDR'];
$file = $_SERVER['PHP_SELF'];

$access = "SELECT * FROM members WHERE (Email = '$email') AND (Password = '$hashed_password')";
$access = mysql_query($access);
$accessrow = mysql_num_rows($access);

if($accessrow == 1)
{
	$_SESSION['email'] = $_POST['email'];
	$usersonline_table_insert = "INSERT INTO usersonline VALUES ('$timestamp','$ip','$file')";
	mysql_query($usersonline_table_insert);
	mysql_query("UPDATE members SET ip = '$ip' WHERE Email = '$email'");
	//if(!$usersonline_table_insert)
	//echo "Insertion Failed!";
	header('Location: profile.php');
}
else
{
	include('home.php');
	echo "<script language='javascript'>document.getElementById('wrong').innerHTML='<h>Wrong Email and/or Password</h>';</script></font>";
	//header('Location: login.php');
}

include('conclose.php');
}
}
?>