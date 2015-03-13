<html>
<body>
<?php
include_once('session.php');
include_once('file_constants.php');

$result1 = mysql_query("SELECT usersonline.timestamp FROM usersonline,members WHERE usersonline.ip = members.ip");
$timestamp = mysql_fetch_array($result1);
//$timeout = $timestamp[0] - $timeoutseconds;
//$ip = $_SERVER['REMOTE_ADDR'];
//$file = $_SERVER['PHP_SELF'];
	
//echo $timestamp[0] . "<br/>";
//	echo $timeout;

	
		
	$usersonline_table_delete = "DELETE FROM usersonline WHERE timestamp=$timestamp[0]";
	mysql_query($usersonline_table_delete);
	unset($_SESSION['email']);
	session_destroy();
	if(!$usersonline_table_delete)
	echo "Deletion Failed!";
	
	header('Location : home.php');
	if(!headers_sent())
	{
		echo "<script language='javascript'>top.location.replace('home.php');</script>";

	}
?>
</body>
</html>