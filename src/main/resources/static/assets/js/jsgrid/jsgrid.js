(function($) {
	"use strict";
	$("#User_table_body").jsGrid({
		width: "100%",
		autoload: true,
		confirmDeleting: false,
		paging: true,
		pageSize:10,
		controller: {
			loadData: function() {
				// Retrieve data from your API
				return $.getJSON('http://localhost:8080/com/sjc/user/getusers');
			}
		},
		fields: [
			{
				headerTemplate: function() {
					return $("<button>").attr("type", "button").text("DELETE").addClass("btn btn-primary active").append($("<i>").addClass("px-1 fa fa-trash-o"))
						.click(function() {
							
							// Add delete button click event
							$('#deleteUser').on('click', function() {
								if (selectedItems !== null) {
									deleteuser(selectedItems);
								} else {
									alert('Please select a row to delete.');
								}
							});
						});
				},

				itemTemplate: function(_, item) {
					return $("<input>").attr("type", "checkbox")
						.prop("checked", $.inArray(item, selectedItems) > -1)
						.on("change", function() {
							$(this).is(":checked") ? selectItem(item) : unselectItem(item);

						});
				},
				align: "center",
				width: 80
			},
			{ name: "id", title: "ID", type: "text", width: 50 },
			{ name: "firstName", title: "First Name",  type: "Text", width: 50 },
			{ name: "lastName", title: "Last Name", type: "text", width: 50 },
			{ name: "address", title: "Address", type: "text", width: 80 },
			{ name: "mobileNo", title:"Mobile No", type: "text", width: 80 },
			{ name: "userName", title:"User Name", type: "text", width: 80 },
			{ name: "userType", title:"User Type", type: "text", width: 50 }
		]
	});


	var selectedItems = [];
	var selectItem = function(item) {
		selectedItems.push(item);


	};
	var unselectItem = function(item) {
		selectedItems = $.grep(selectedItems, function(i) {
			return i !== item;

		});
	};


	$(document).on('click', '#user_editBtn', function() {
        $.fn.editFun();
    });

   $.fn.editFun = function() {
    console.log("insideEdit");

    if (selectedItems.length !== 1) {
        alert("Select only one");
        return;
    }
    else{
		 var selectedItem = selectedItems[0];

    document.getElementById('user-name').value = selectedItem.userName || "";
    document.getElementById('user-password').value = selectedItem.passWord || "";
    document.getElementById('first-name').value = selectedItem.firstName || "";
    document.getElementById('last-name').value = selectedItem.lastName || "";
    document.getElementById('address').value = selectedItem.address || "";
    document.getElementById('user-mobilenumber').value = selectedItem.mobileNo || "";
    document.getElementById('userType').value = selectedItem.userType || "";
	}

   
};

})(jQuery);
//------add new user ---------
function addNewUser() {

	//  retrieved the form data here
	const new_user = new FormData(document.getElementById('Add_user_Form'));

	// Convert the form data to JSON
	const new_user_Data = {};
	new_user.forEach((value, key) => {
		new_user_Data[key] = value;
	});
	console.log(new_user_Data);
	fetch('http://localhost:8080/com/sjc/user/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(new_user_Data),
	})
		.then(response => response.json())
		.then(data => {
			console.log('API Response:', data);
			setTimeout(function() {
				location.reload();
			}, 2000);
		})
		.catch(error => {
			console.error('Error:', error);
		});
}