function validate(signup)
{
    var email = document.signup.email.value;
    var name = document.signup.name1.value;
    //var check_name = /^[A-Za-z0-9 ]{6,30}$/;
    var password = document.signup.password.value;
    var check_pass = /^[A-Za-z0-9 ]{6,10}$/;
    var repassword = document.signup.repassword.value;
    var check_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var gender = document.signup.gender.selectedIndex;
    var date = document.signup.date.selectedIndex;
    var month = document.signup.month.selectedIndex;
    var year = document.signup.year.selectedIndex;
    var flag = new Array();

    if(name=="") //|| (!check_name.test(name)))
    {
        document.getElementById('name').innerHTML="<font color='red' size='2'>Name must not be empty</font>";
        flag[0] = 0;
        //return false;
    }

    else
    {
        document.getElementById('name').innerHTML="";
        flag[0] = 1;
    }

    if((email=="") || (!check_email.test(email)))
    {
        document.getElementById('validateemail').className="email-nothing";
        document.getElementById('validateemail').innerHTML="<font color='red' size='2'>Invalid Email</font>";
        flag[1] = 0;
        //return false;
    }

    else
    {
        document.getElementById('validateemail').innerHTML="";
        flag[1] = 1;
    }

    if(gender==0)
    {
        document.getElementById('gender').innerHTML="<font color='red' size='2'>Enter Male or Female</font>";
        flag[2] = 0;
        //return false;
    }

    else
    {
        document.getElementById('gender').innerHTML="";
        flag[2] = 1;
    }
    
    if((password=="") || (!check_pass.test(password)))
    {
        document.getElementById('pass').innerHTML="<font color='red' size='2'>Password must be of 6-10 characters</font>";
        flag[3] = 0;
        //return false;
    }

    else
    {
        document.getElementById('pass').innerHTML="";
        flag[3] = 1;
    }


    if(password!=repassword)
    {
        document.getElementById('inner').innerHTML="<font color='red' size='2'>Passwords must match</font>";
        flag[4] = 0 ;
        //return false;
    }

    else
    {
        document.getElementById('inner').innerHTML="";
        flag[4] = 1;
    }

    if(date==0 || month==0 || year==0)
    {
        document.getElementById('dob').innerHTML="<font color='red' size='2'>Enter the date</font>";
        flag[5] = 0;
        //return false;
    }

    else
    {
        document.getElementById('dob').innerHTML="";
        flag[5] = 1;
    }

    if(flag[0] == 1 && flag[1] == 1 && flag[2] == 1 && flag[3] == 1 && flag[4] == 1 && flag[5] == 1)
    {
        return true;
    }
    else 
    {
        return false;
    }

}




//AJAX magic starts from here

window.onload = initCheckEmail;

function alertMe(){
    alert('ssssssss');
}


function initCheckEmail(){
    document.getElementById('email').onblur = checkEmail;
}

function checkEmail(){
    var check_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var email = document.getElementById('email').value;
    //alert('Email value:' + email);
    if(!check_email.test(email))
        document.getElementById('validateemail').innerHTML="<font color='red' size='2'>Invalid Email</font>";
        //document.getElementById('validateemail').className="email-invalid";
        
    else{
    
    //document.getElementById('validateemail').innerHTML="<font size='2'>Checking email availability...</font>";
    //document.getElementById('validateemail').className="email-nothing";
    document.getElementById('validateemail').className="email-processing";
    emailRequest = createRequest();
    if(emailRequest == null){
        alert('Unable to emailRequest to the server. Try reloading the page');
    }
    else{
        //alert('Got the emailRequest object');
        var theEmail = document.getElementById('email').value;
        //alert('Original email value:' + theEmail);
        var email = escape(theEmail);
        //alert('Escaped email value:' + email);
        var url = "checkemail.php?email=" + email;
        //alert("URL:" + url);

        emailRequest.onreadystatechange = showEmailStatus;
        emailRequest.open("GET",url,true);
        emailRequest.send(null);
    }
}
    //alert('I am in checkEmail()');
}



function showEmailStatus(){
    //alert('checking status');

   
    if(emailRequest.readyState == 4 && emailRequest.status == 200){
        if(emailRequest.responseText == "denied"){
            //document.getElementById('validateemail').innerHTML="<font color='red' size='2'>Email Already Taken</font>";
            document.getElementById('validateemail').innerHTML="<font color='#f0f0f0' size='2'><img src='../images/rsz_email-notavailable.png'/></font>";
            document.getElementById('validateemail').className="email-notavailable";
            document.getElementById('email').focus();
            document.getElementById('email').select();

        }
        else{
            //document.getElementById('validateemail').innerHTML="<font color='green' size='2'>Email Available!</font>";
            document.getElementById('validateemail').innerHTML="<font color='#f0f0f0' size='2'><img src='../images/email-available.png'/></font>";
            document.getElementById('validateemail').className="email-available";
        }
    }

}