// Validate Email
let emailError = true;

$("#result").hide();

function validateEmail() {
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let emailValue = $("#userName").val();

    if (regex.test(emailValue)) {
        $("#userName").removeClass("is-invalid");
        emailError = true;
    } else {
        $("#userName").addClass("is-invalid");
        emailError = false;
    }
}

$("#userName").blur(function () {
    validateEmail();
});

// Validate Password
$("#passcheck").hide();
let passwordError = true;

function validatePassword() {
    let passwordValue = $("#passWord").val();

    if (passwordValue.length === 0) {
        $("#passcheck").show();
        $("#passcheck").html("Password is required");
        $("#passcheck").css("color", "red");
        passwordError = false;
        return false;
    }

    if (passwordValue.length < 3 || passwordValue.length > 10) {
        $("#passcheck").show();
        $("#passcheck").html("Length of your password must be between 3 and 10");
        $("#passcheck").css("color", "red");
        passwordError = false;
        return false;
    } else {
        $("#passcheck").hide();
    }
}

// Submit button
$("#submitbtn").click(function (event) {
	event.preventDefault();
    validateEmail();
    validatePassword();

    if (passwordError && emailError) {
        console.log("Validation passed. Proceeding with login...");
        let username = $("#userName").val();
        let password = $("#passWord").val();

        $.ajax({
            url: '/com/sjc/user/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                userName: username,
                passWord: password
            }),
            dataType: 'json'
        })
        .done(function(data) {
            const user = data.length > 0 ? data[0] : null;

            if (data.length > 0 && data[0].id) {
                sessionStorage.setItem('userId', user.id);
                sessionStorage.setItem('userType', user.userType);
                console.log('Redirecting to dashboard.html');
                window.location.href = '../template/main.html';
            } else {
                $('#result').show();
            }
        })
        .fail(function(error) {
            console.error('Error:', error);
            $('#result').show();
        });
    } else {
        console.log("Validation failed. Please correct the errors.");
    }
});
