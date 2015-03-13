function validatelogin(login)
{
	var email = document.login.email.value;
    //var email = document.getElementById('email').value;
	var check_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var password = document.login.password.value;
    //var password = document.getElementById('password').value;
    var flag = new Array();

	if((email=="") || (!check_email.test(email)))
    {
        flag[0] = 0;
        document.getElementById('validateemail').innerHTML="<font color='red' size='2'>Invalid Email</font>";
        //document.getElementById('validateemail').innerHTML= email;
        
    }
    else
    {
        flag[0] = 1;
        document.getElementById('validateemail').innerHTML="";
        
    }

    if((password==""))
    {
    	document.getElementById('pass').innerHTML="<font color='red' size='2'>Password must be not be empty</font>";
        flag[1] = 0;
    }
    else
    {
        document.getElementById('pass').innerHTML="";
    	flag[1] = 1;
    }

    if(flag[0] == 1 && flag[1] == 1)
    {
        return true;
    }
    else
    {
        return false;
    }


}