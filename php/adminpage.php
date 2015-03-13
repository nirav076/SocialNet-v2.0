<?php
$server="localhost";
$user="root";
$db="members";

$con = mysql_connect($server,$user);
if(!$con) die("Cannot Connect".mysqli_error());
mysql_select_db($db,$con);
$timestamp = time();
$timeoutseconds = 300;
$timeout = $timestamp - $timeoutseconds;
$ip = $_SERVER['REMOTE_ADDR'];
$file = $_SERVER['PHP_SELF'];

/*$usersonline_table = "CREATE TABLE IF NOT EXISTS usersonline (
						timestamp int(15) DEFAULT '0' NOT NULL,
						ip varchar(40) NOT NULL,
						file varchar(100) NOT NULL,
						PRIMARY KEY (timestamp),
						KEY ip (ip),
						KEY file (file))";
mysql_query($usersonline_table);

$usersonline_table_insert = "INSERT INTO usersonline VALUES ('$timestamp','$ip','$file')";
mysql_query($usersonline_table_insert);
if(!$usersonline_table_insert)
	echo "Insertion Failed!";

$usersonline_table_delete = "DELETE FROM usersonline WHERE timestamp<$timeout";
mysql_query($usersonline_table_delete);
if(!$usersonline_table_delete)
	echo "Deletion Failed!";
*/
$result = mysql_query("SELECT DISTINCT ip,timestamp FROM usersonline");
if(!$result)
	echo "Users Online selection failed!";


//$result1 = mysql_query("SELECT usersonline.timestamp FROM usersonline,members WHERE usersonline.ip = members.ip");
//while($row1 = mysql_fetch_array($result1))
//echo $row1['timestamp'];


$usersonline = mysql_num_rows($result);
mysql_close();

if($usersonline==0)
	echo "No users online";
else if($usersonline==1)
	echo "$usersonline user online";
else
	echo "$usersonline users online";

echo "<br/><br/>";

$i=1;
while($row = mysql_fetch_array($result))
	{
		echo "User " . "<b>" . $i . "</b>" . "-----> " ;
		echo "<b>IP</b>: $row[0]" ; echo "<b style='margin-left:6%;'>Time Stamp</b>: $row[1] <br/><br/>";
		$i++;
		//echo "<br/>";
	}


?>

<html>
<head>
	<title>Admin Page</title>
</head>
</html>