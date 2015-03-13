<?php
if(isset($_GET['email'])){

include('file_constants.php');

$email = $_GET['email'];
$access = "SELECT * FROM members WHERE (Email = '$email')";
$access = mysql_query($access);
$accessrow = mysql_num_rows($access);

if($accessrow == 1)
{
    echo "denied";
}
else
{
	echo "okay";
}

}

?>