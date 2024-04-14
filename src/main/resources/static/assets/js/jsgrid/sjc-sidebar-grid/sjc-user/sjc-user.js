
   
    $("#User_table_body").jsGrid({
        paging:true,
        loadonce: true,
        width: "100%",
        autoload: true,
        sorting:true,
        confirmDeleting: false,
        paging: true,
        pageSize:7,
        caption: "User_table_body",
        controller:
         {
            loadData: function(filter) {
                return $.getJSON('/com/sjc/user/getusers')
                .then (function(data){
					return data.filter(function(item){
						return (!filter.firstName || item.firstName.toLowerCase().includes(filter.firstName))||
						       (!filter.lastName || item.lastName.toLowerCase().includes(filter.lastName))||						       
						       (!filter.mobileNo || item.mobileNo.toLowerCase().includes(filter.mobileNo))||
						       (!filter.userName || item.userName.toLowerCase().includes(filter.userName))||
						       (!filter.userType || item.userType.toLowerCase().includes(filter.userType));
						   						      
					})
				})
            }
        },
        fields: [
            {
                 headerTemplate: function() {
                 return $("<button>")
                .attr("type", "button")
                .attr("id", "deleteUser")
                .append($("<i>").addClass("px-1 fa fa-trash-o"))  // Append the icon first
                .append(" DELETE") .addClass("btn btn-danger active")
                .click(function () {
               $('#deleteUser').click(deleteSelectedUsers);
        });
                },
                itemTemplate: function(_, item) {
                    return $("<input>").attr("type", "checkbox")
                        .prop("checked", $.inArray(item, selectedUserItems) > -1)
                        .on("change", function() {
                            $(this).is(":checked") ? selectUserItem(item) : unselectUserItem(item);
                            $(this).closest("tr").toggleClass("fw-bolder text-dark bg-primary ", $(this).is(":checked"));
                        });
                },
                align: "center",
                width: 80
            },
  
            { name: "firstName", title: "<b>First Name</b>", type: "Text", width: 50 },
            { name: "lastName", title: "<b>Last Name</b>", type: "text", width: 50 },
            { name: "mobileNo", title: "<b>Contact Number</b>", type: "text", width: 80 },
            { name: "userName", title: "<b>User Name</b>", type: "text", width: 80 },
            { name: "userType", title: "<b>User Role</b>", type: "text", width: 50 },
        ]
    });
  
    var selectedUserItems = [];
   
    var selectUserItem = function(item) {
        selectedUserItems.push(item);
};
    var unselectUserItem =function(item){
        selectedUserItems.pop(item);
    }
    
//DELETE USER FUNCTION
function deleteSelectedUsers() {
    if (selectedUserItems.length === 0) {
        $("#Warning_Msg").html("Please select at least one user to delete.");
        $('#Warning_modal').modal('show');
        return;
    }

    // Show the confirmation modal
    $('#ConfirmationUserDelete').modal('show');

    // When "Yes" button is clicked
    $('#confirmDeleteBtn').on('click', function() {
		
        // Loop through all selected items and delete
        selectedUserItems.forEach(function(item) {
            const url = '/com/sjc/user/delete';
            const data = {
                id: item.id
            };

            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function() {
                    console.log('Successfully deleted user with ID:', item.id);
                },
                error: function(xhr, status, error) {
                    console.error('There was a problem with the AJAX request:', error);
                }
            });
        });

        // Clear the selected items array and hide the confirmation modal
        selectedUserItems = [];
        $('#ConfirmationUserDelete').modal('hide');
        $('#Delete_modal').modal('show');
        $('#main-content').load('./sjc_user.html');
         selectedUserItems = [0];
    });
}




//ADD BUTTON CLICK EVENT

       $(document).on('click', '#addUserBtn', function() {
       console.log("add usersss");
       $('#user_Form')[0].reset();
       $('#user_Modal').modal('show'); 
        $('#user_Form').off('submit').submit(function(e) {
        e.preventDefault();
        
        console.log("wait for submit");
        addNewUser();
    });
});

    $(document).on('click', '#userAdUpCloseButton', function(){
		 $('.userError-message').remove();
		 $('#userName').removeClass('add-isNotValid');
		 $('#passWord').removeClass('add-isNotValid');
		 $('#firstName').removeClass('add-isNotValid');
         $('#lastName').removeClass('add-isNotValid');
		 $('#mobileNo').removeClass('add-isNotValid');
		 $('#userType').removeClass('add-isNotValid');
	})

function addNewUser() {
    // Reset previous error messages
    $('.userError-message').remove();
    $('#userName').removeClass('add-isNotValid');
    $('#passWord').removeClass('add-isNotValid');
    $('#firstName').removeClass('add-isNotValid');
    $('#lastName').removeClass('add-isNotValid');
    $('#mobileNo').removeClass('add-isNotValid');
    $('#userType').removeClass('add-isNotValid');

    const userName = $('#userName').val();
    const passWord = $('#passWord').val();
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const mobileNo = $('#mobileNo').val();
    const userType = $('#userType').val();
    const crd =sessionStorage.getItem('userId');
    console.log(crd);

    const FIELD_LENGTH = 8;
    let userIsValid = true;
    
   if (!userName.trim()) {
    $('#userName').addClass('add-isNotValid').after(`<small class="userError-message text-danger">User Name is required*</small>`);
    userIsValid = false;
    } else if (!isValidEmail(userName)) {
    $('#userName').addClass('add-isNotValid').after(`<small class="userError-message text-danger">User Name must be a valid email address*</small>`);
    userIsValid = false;
   }

    function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    }


    if (!passWord.trim()) {
        $('#passWord').addClass('add-isNotValid').after(`<small class="userError-message text-danger ">Password is required*</small>`);
        userIsValid = false;
    } else if (passWord.trim().length !== FIELD_LENGTH) {
        $('#passWord').addClass('add-isNotValid').after(`<small class="userError-message text-danger">Password must be exactly ${FIELD_LENGTH} characters*</small>`);
        userIsValid = false;
    }
    if (!firstName.trim()) {
        $('#firstName').addClass('add-isNotValid ').after(`<small class="userError-message text-danger">First Name is required*</small>`);
        userIsValid = false;
    }
    if (!lastName.trim()) {
        $('#lastName').addClass('add-isNotValid ').after(`<small class="userError-message text-danger">Last Name is required*</small>`);
        userIsValid = false;
    }
     if (!mobileNo.trim()) {
        $('#mobileNo').addClass('add-isNotValid').after(`<small class="userError-message text-danger">Contact Number is required*</small>`);
        userIsValid = false;
    } else if (!isNumeric(mobileNo) || mobileNo.length < 10 || mobileNo.length > 15) {
        $('#mobileNo').addClass('add-isNotValid').after(`<small class="userError-message text-danger">Must be valid Contact Number*</small>`);
        userIsValid = false;
    }

    function isNumeric(value) {
        return /^\d+$/.test(value);
    }


    if (!userType || (userType !== "Super Admin" && userType !== "Admin Inventory" && userType !== "Admin Member"&& userType !=="Tadika Inventory" && userType !=="user" && userType !=="User Inventory" && userType !=="User Membership")) {
        $('#userType').addClass('add-isNotValid').after(`<small class="userError-message text-danger">Please select a valid User Type*</small>`);
        userIsValid = false;
    }

    // Submit form if all validations pass
    if (userIsValid) {
        const new_user_Data = {
			userName: userName,
            passWord: passWord,
            firstName: firstName,
            lastName: lastName,
            mobileNo: mobileNo,
            userType: userType,
            createdby: crd
        };

        $.ajax({
            url: '/com/sjc/user/add',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(new_user_Data),
            success: function(data) {
				
                $('#user_Modal').modal('hide');
                $('#Add_Modal').modal('show');
              console.log('API Response:', data);
              $('#main-content').load('./sjc_user.html');
               
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
   }
}


  


 // EXPORT PDF FUNCTION
      $(document).on('click', '#exportPdfBtn', function() {
            exportToPdf();
        });
     function exportToPdf() {
    var gridData = $("#User_table_body").jsGrid("option", "data");
    if (gridData.length === 0) {
        alert("No data to export.");
        return;
    }

    var table = document.createElement("table");
    table.border = "1";
    var thead = table.createTHead();
    var headerRow = thead.insertRow(0);
    Object.keys(gridData[0]).forEach(function(key) {
        var th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    });
    gridData.forEach(function(row) {
        var tr = table.insertRow(-1);
        Object.values(row).forEach(function(value) {
            var td = tr.insertCell(-1);
            td.textContent = String(value);
        });
    });

    var printWindow = window.open('', '_blank');
    printWindow.document.body.appendChild(table);

    // Set the size and position of the print window
    printWindow.document.body.style.margin = '0';
    printWindow.document.body.style.padding = '0';
    printWindow.document.body.style.width = '100%';
    printWindow.document.body.style.height = '100%';
    printWindow.document.body.style.overflow = 'hidden';
    printWindow.document.title = 'Print PDF';
    printWindow.document.close();

    // Print the contents of the print window
    printWindow.print();

    // Close the print window
    printWindow.close();
console.log("pdf done yoooh")
    // Refocus on the main window
    window.focus();
}



//EXPORT EXCELL FUNCTION
           $(document).on('click', '#exportExcelBtn', function() {
                   exportToExcel();
            });
          function exportToExcel() {
          var gridData = $("#User_table_body").jsGrid("option", "data");
          if (gridData.length === 0) {
              alert("No data to export.");
          return;
  }
          var workbook = XLSX.utils.book_new();
          var ws = XLSX.utils.json_to_sheet(gridData);
          XLSX.utils.book_append_sheet(workbook, ws, "User_Data");
         XLSX.writeFile(workbook, "user_data.xlsx");
}




// edit function start
$(document).on('click', '#edituserBtn', function() {
    console.log("edit user");
    userEditMode ="edit";    
    
    if(userEditMode==="edit"){
        console.log(selectedUserItems);
        if(selectedUserItems.length === 0){
			$("#Warning_Msg").html("Please select the user to edit");
            $('#Warning_modal').modal('show');
		}
        else if (selectedUserItems.length >= 2) {
            console.log("Select only one user to edit");
            $("#Warning_Msg").html("Select only one user to edit");
            $('#Warning_modal').modal('show');
         
        } else {
			
            var selectedUserItem = selectedUserItems[0];
            var editid= selectedUserItem.id;

            document.getElementById('userName').value = selectedUserItem.userName || "";
            document.getElementById('passWord').value = selectedUserItem.passWord || "";
            document.getElementById('firstName').value = selectedUserItem.firstName || "";
            document.getElementById('lastName').value = selectedUserItem.lastName || "";
            document.getElementById('mobileNo').value = selectedUserItem.mobileNo || "";
            document.getElementById('userType').value = selectedUserItem.userType || "";

            $('#user_Modal').modal('show');
         
        }

        $('#user_Form').off('submit').submit(function(event) {
            event.preventDefault();
            console.log("wait for update submit");
            updateUser(editid);
             
          
        });
       return; 
    }
    
});
//update function
            function updateUser(id) {
               // Reset previous error messages
    $('.userError-message').remove();
    $('#userName').removeClass('add-isNotValid');
    $('#passWord').removeClass('add-isNotValid');
    $('#firstName').removeClass('add-isNotValid');
    $('#lastName').removeClass('add-isNotValid');
    $('#mobileNo').removeClass('add-isNotValid');
    $('#userType').removeClass('add-isNotValid');

    const userName = $('#userName').val();
    const passWord = $('#passWord').val();
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const mobileNo = $('#mobileNo').val();
    const userType = $('#userType').val();

    const FIELD_LENGTH = 8;
    let userIsValid = true;
    
   if (!userName.trim()) {
    $('#userName').addClass('add-isNotValid').after(`<small class="userError-message text-danger">User Name is required*</small>`);
    userIsValid = false;
    } else if (!isValidEmail(userName)) {
    $('#userName').addClass('add-isNotValid').after(`<small class="userError-message text-danger">User Name must be a valid email address*</small>`);
    userIsValid = false;
   }

    function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    }


    if (!passWord.trim()) {
        $('#passWord').addClass('add-isNotValid').after(`<small class="userError-message text-danger ">Password is required*</small>`);
        userIsValid = false;
    } else if (passWord.trim().length !== FIELD_LENGTH) {
        $('#passWord').addClass('add-isNotValid').after(`<small class="userError-message text-danger">Password must be exactly ${FIELD_LENGTH} characters*</small>`);
        userIsValid = false;
    }
    if (!firstName.trim()) {
        $('#firstName').addClass('add-isNotValid ').after(`<small class="userError-message text-danger">First Name is required*</small>`);
        userIsValid = false;
    }
    if (!lastName.trim()) {
        $('#lastName').addClass('add-isNotValid ').after(`<small class="userError-message text-danger">Last Name is required*</small>`);
        userIsValid = false;
    }
    if (!mobileNo.trim()) {
        $('#mobileNo').addClass('add-isNotValid').after(`<small class="userError-message text-danger">Contact Number is required*</small>`);
        userIsValid = false;
    } else if (!isNumeric(mobileNo) || mobileNo.length < 10 || mobileNo.length > 15) {
        $('#mobileNo').addClass('add-isNotValid').after(`<small class="userError-message text-danger">Must be valid Contact Number*</small>`);
        userIsValid = false;
    }

    function isNumeric(value) {
        return /^\d+$/.test(value);
    }


    if (!userType || (userType !== "Super Admin" && userType !== "Admin Inventory" && userType !== "Admin Member"&& userType !=="Tadika Inventory" && userType !=="user" && userType !=="User Inventory" && userType !=="User Membership")) {
        $('#userType').addClass('add-isNotValid').after(`<small class="userError-message text-danger">Please select a valid User Type*</small>`);
        userIsValid = false;
    }    
           
           
           
  if(userIsValid){	             
       const update_user_Data =  {
               id: id,
              userName: userName,
              passWord: passWord,
              firstName: firstName,
              lastName: lastName,
              mobileNo: mobileNo,
              userType: userType
        }
           $.ajax({
              url: '/com/sjc/user/update',
              type: 'POST',
              contentType: 'application/json',
              data: JSON.stringify(update_user_Data),
              success: function (updatedUser) {
				  
              $('#user_Modal').modal('hide');
              $('#Update_modal').modal('show');
              console.log('Updated User:', updatedUser);
              $.get('./sjc_user.html', function(data) {
              $('#main-content').html(data);          
             });
              selectedUserItems = [];
             },
            error: function (error) {
            console.error('Error:', error);
            // Handle error in the UI
        }
       });
  }    
    }


function filterUserData(){
	var searchText = $("#searchUserInput").val().toLowerCase();
    $("#User_table_body").jsGrid("loadData", {
        firstName: searchText,
        lastName:searchText,		      
		mobileNo:searchText,				       
		userName:searchText,			       
		userType:searchText		        
						      
    });
}