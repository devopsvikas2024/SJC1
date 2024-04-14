   
   $(document).on("change", ".uploadProfileInput", function (event) {
  if ($(event.target).hasClass("uploadProfileInput")) {
    var triggerInput = event.target;
    var currentImg = $(triggerInput).closest(".pic-holder").find(".pic").attr("src");
    var holder = $(triggerInput).closest(".pic-holder");
    var wrapper = $(triggerInput).closest(".profile-pic-wrapper");

    var alerts = wrapper.find('[role="alert"]');
    alerts.each(function () {
      $(this).remove();
    });

    $(triggerInput).blur();
    var files = triggerInput.files || [];
    if (!files.length || !window.FileReader) {
      return;
    }

    if (/^image/.test(files[0].type)) {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onloadend = function () {
        holder.addClass("uploadInProgress");
        holder.find(".pic").attr("src", this.result);

        var loader = $('<div class="upload-loader">' +
          '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>' +
          '</div>');
        holder.append(loader);

        setTimeout(function () {
          holder.removeClass("uploadInProgress");
          loader.remove();

          var random = Math.random();
          if (random < 0.9) {
            wrapper.append('<div class="snackbar show" role="alert"><i class="fa fa-check-circle text-success"></i> Profile image updated successfully</div>');
            $(triggerInput).val("");
            setTimeout(function () {
              wrapper.find('[role="alert"]').remove();
            }, 3000);
          } else {
            holder.find(".pic").attr("src", currentImg);
            wrapper.append('<div class="snackbar show" role="alert"><i class="fa fa-times-circle text-danger"></i> There is an error while uploading! Please try again later.</div>');
            $(triggerInput).val("");
            setTimeout(function () {
              wrapper.find('[role="alert"]').remove();
            }, 3000);
          }
        }, 1500);
      };
    } else {
      wrapper.append('<div class="alert alert-danger d-inline-block p-2 small" role="alert">Please choose a valid image.</div>');
      setTimeout(function () {
        var invalidAlert = wrapper.find('[role="alert"]');
        if (invalidAlert.length) {
          invalidAlert.remove();
        }
      }, 3000);
    }
  }
});




    
    //----------USERID-SESSION STORAGE---------   
function profileEdit() {
    const userType = sessionStorage.getItem('userType') || 'user';
    const userId = sessionStorage.getItem('userId');

    // Get navbar elements using jQuery
    const adminMenu = $('#adminMenu');
    const assetMenu = $('#assetMenu');
    const memberMenu = $('#memberMenu');

    // Function to remove permission-access class
    function showNavMenu(element) {
        if (element) {
            element.removeClass('permission-access');
        } else {
            console.log('Element not found');
        }
    }

    // Show/hide menus based on user type
     if (userType === "Super Admin") {
                showNavMenu(adminMenu);
                showNavMenu(assetMenu);
                showNavMenu(memberMenu);
                } else if (userType === "Admin Inventory") {
                showNavMenu(assetMenu);
                showNavMenu(adminMenu);
                } else if (userType === "Admin Member") {
                showNavMenu(memberMenu);
                showNavMenu(adminMenu);
                } else {
                showNavMenu(assetMenu);
                }				    

            
    if (userId) {
        $.ajax({
            url: `/com/sjc/user/${userId}`,
            method: 'GET',
            dataType: 'json',
            success: function(userData) {
                // Process the fetched user data
                console.log("data fetched");
                displayUserProfile(userData);
            },
            error: function(error) {
                console.error('Error fetching user data:', error);
            },
        });
    } else {
        console.error('User ID not found in session storage');
    }

    function displayUserProfile(user) {
		console.log("display user data ");
        $('#firstname').val(user.firstName);
        $('#lastname').val(user.lastName);
        $('#mobileno').val(user.mobileNo);
        $('#username').val(user.userName);
        $('#password').val(user.passWord);
    }
     
     function reload(){
		  $('#main-content').load('./sjc-profile.html');
	 }
    // Update user profile
    $(document).on("click", '#profileUpdateBtn', function(event) {
		event.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        const firstname = $('#firstname').val();
        const lastname = $('#lastname').val();
        const mobileno = $('#mobileno').val();
        const usertype = userType; // Assuming user type doesn't change during update

        // Check if user ID is available
        if (userId) {
            $.ajax({
                url: '/com/sjc/user/update',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: userId,
                    userName: username,
                    passWord: password,
                    firstName: firstname,
                    lastName: lastname,
                    mobileNo: mobileno,
                    userType: usertype,
                }),
                success: function() {
					
                 $('#profile_Update_modal').modal('show');
                 reload();
                },
                error: function(error) {
                    console.error('Error:', error);
                    // Handle error in the UI
                }
            });
        } else {
            console.error('User ID not found in session storage');
        }
    });
}

// Call the function when the document is ready
$(document).ready(function() {
    profileEdit();
});

//--PASSWORD VIEW TOGGLE

document.getElementById('toggleViewPassword').addEventListener('click', function() {
    	  var passwordInput = document.getElementById('password');
    	  var icon = document.getElementById('toggleViewPassword');

    	  if (passwordInput.type === 'password') {
    	    passwordInput.type = 'text';
    	    icon.classList.remove('fa-eye');
    	    icon.classList.add('fa-eye-slash');
    	  } else {
    	    passwordInput.type = 'password';
    	    icon.classList.remove('fa-eye-slash');
    	    icon.classList.add('fa-eye');
    	  }
    	});



console.log("start");

