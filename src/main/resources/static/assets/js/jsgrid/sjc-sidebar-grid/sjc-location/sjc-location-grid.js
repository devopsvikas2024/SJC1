 //JS GRID LOAD DATA FUNCTION
 
  $("#sjc_location").jsGrid({
		width: "100%",
        autoload: true,
        confirmDeleting: false,
        sorting:true,
        paging: true,
        pageSize: 7,
        controller: {
           loadData: function(filter) {
                return $.getJSON('/com/sjc/location/getlocation')
                .then(function(data){
				return	data.filter(function(item){
					          
						 return (!filter.locationCode|| item.locationCode.toLowerCase().includes(filter.locationCode))||
						        (!filter.locationName|| item.locationName.toLowerCase().includes(filter.locationName))||
						        (!filter.locationAcronym|| item.locationAcronym.toLowerCase().includes(filter.locationAcronym));
						        
					})
				})
            }
        },
        fields: [
            {       
                headerTemplate: function() {
                    return $("<button>")
                    .attr("type","button")
                    .attr("id","DeleteLocation")
                    .append($("<i>").addClass(" px-1 fa fa-trash-o"))
                    .append("DELETE").addClass("btn btn-danger active")
                        .click(function () {
							 $('#DeleteLocation').click(deleteSelectedLocation);
                 
           });
            },
            itemTemplate: function(_, item) {
                return $("<input>").attr("type", "checkbox")
                        .prop("checked", $.inArray(item, selectedLocationItems) > -1)
                        .on("change", function () {
                            $(this).is(":checked") ? selectLocationItem(item) : unselectLocationItem(item);
                             $(this).closest("tr").toggleClass("fw-bolder text-dark bg-primary  ", $(this).is(":checked"));
                        });
            },
            align: "center",
            width: 40
            },
           
            { name: "locationCode", title:"<b>Location Code</b>", type: "Text", width: 60 },
            { name: "locationName", title:"<b>Location Name</b>",type: "text", width: 60 },
            { name: "locationAcronym", title:"<b>Location Acronym</b>",type: "text", width: 60 },

           
          ]
        
     });
     
     //SEARCHING FUNCTION
     
   function filterlocationData(){
	var searchText =  $("#searchlocationInput").val().toLowerCase();
	  $("#sjc_location").jsGrid("loadData", {
   locationCode : searchText,
       locationName:searchText,
       locationAcronym:searchText
       
    });
	
 }
        
        var selectedLocationItems = [];
        var selectLocationItem = function(item) {
        selectedLocationItems.push(item);
        };
        var unselectLocationItem = function(item) {
        selectedLocationItems.pop(item);
      };
    
    //DELETE USER FUNCTION
          
    function deleteSelectedLocation() {
       if (selectedLocationItems.length === 0) {
          $("#Warning_Msg").html("Please select at least one location to delete.");
          $('#Warning_modal').modal('show');
          return;
        }
        
 // Show the modal
    $('#ConfirmationLocationDelete').modal('show');

    // When "Yes" button is clicked
    $('#confirmlocationDeleteBtn').on('click', function() {
		selectedLocationItems.forEach(function(item){
			       const url = '/com/sjc/location/delete';
        const data = {
           id: item.id
        };
      
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function() {
				console.log('Successfully deleted location with ID:', item.id);  
            },
            error: function(error) {
                console.error('There was a problem with the AJAX request:', error);
            }
        });
		});
        
          $('#ConfirmationLocationDelete').modal('hide');
            $('#Delete_Location_modal').modal('show');
             $('#main-content').load('./sjc_location.html');
             selectedLocationItems = []; 
     
    });
}


//Add btn Function

         $(document).on('click', '#addLocationbtn', function() {
       console.log("add Location");
       $('#location_Form')[0].reset();
       $('#locationModal').modal('show');
    
        $('#location_Form').off('submit').submit(function(e) {
        e.preventDefault();
        
        console.log("wait for submit");
        addNewLocation();
    });
});
    $(document).on('click', '#locationAdUpCloseButton', function() {
		$('.locationError-message').remove();
		 $('#locationName').removeClass('add-isNotValid');
		 $('#locationAcronym').removeClass('add-isNotValid');
	})

      function addNewLocation(){
		   $('.locationError-message').remove();
              const locationName = $('#locationName').val().trim();
              const locationAcronym = $('#locationAcronym').val().trim();
               let locationIsValidate = true;
           
		   
		   if (!locationName) {
             $('#locationName').addClass('add-isNotValid').after(`<small class="locationError-message text-danger">Location Name is required*</small>`);
           locationIsValidate = false;
            } 
         else if (!/^[a-zA-Z\s]+$/.test(locationName)) {
             $('#locationName').addClass('add-isNotValid').after(`<small class="locationError-message text-danger">Location Name must contain only letters and spaces*</small>`);
             locationIsValidate = false;
               }
               
		   if (!locationAcronym){
			   $('#locationAcronym').addClass('add-isNotValid').after(`<small class="locationError-message text-danger">Location Acronym is required*</small>`);
			   locationIsValidate = false;
		   }
		   
		   if(locationIsValidate){
			    const new_location = new FormData(document.getElementById('location_Form'));
             const new_location_Data = {};
             new_location.forEach((value, key) => {
             new_location_Data[key] = value;
            });
             $.ajax({
               url: '/com/sjc/location/add',
               type: 'POST',
               contentType: 'application/json',
               data: JSON.stringify(new_location_Data),
               success: function(data) {
               $('#locationModal').modal('hide');
               $('#Add_Location_Modal').modal('show');
               console.log('API Response:', data);
               $('#main-content').load('./sjc_location.html');
               
                selectedLocationItems = [];
              },
              error: function(error) {
              console.error('Error:', error);
            }
        });
		   }         
}
	  
	  
	  // edit function start
    $(document).on('click', '#editLocationbtn', function() {
        console.log("edit location");
        locationEditMode ="dataForedit";
        if(locationEditMode==="dataForedit"){
            console.log(selectedLocationItems);
            if (selectedLocationItems.length === 0){
				$("#Warning_Msg").html("Please select the location to edit");
                $('#Warning_modal').modal('show');
			}
               else if (selectedLocationItems.length >= 2) {
                 console.log("Select only one user to edit");
                $("#Warning_Msg").html("Select only one location to edit");
                $('#Warning_modal').modal('show');
                return;
               } else{
                 var selectedLocationItem = selectedLocationItems[0];
                 var editLocationId= selectedLocationItem.id;
                 
                 
                 document.getElementById('locationName').value = selectedLocationItem.locationName || "";
                 document.getElementById('locationAcronym').value = selectedLocationItem.locationAcronym || "";
                 
                 $('#locationModal').modal('show');
                  }
                  $('#location_Form').off('submit').submit(function(updateEvent) {
					  updateEvent.preventDefault();
                    console.log("wait for update submit");
                   updateLocation(editLocationId); 
              });
     }
  });
      
   //update function
            function updateLocation(id) {
               const locationame = $('#locationName').val();
               const locationacronym = $('#locationAcronym').val();
             $.ajax({
               url: '/com/sjc/location/update',
               type: 'POST',
               contentType: 'application/json',
               data: JSON.stringify({
               id: id,
               locationName: locationame,
               locationAcronym: locationacronym,
        }),
              success: function (updatedLocation) {
              $('#locationModal').modal('hide');
              $('#Update_Location_modal').modal('show');
              console.log('Updated location:', updatedLocation);
             $.get('./sjc_location.html', function(data) {
             $('#main-content').html(data);
             });
              selectedLocationItems = [];
             },
            error: function (error) {
            console.error('Error:', error);
            // Handle error in the UI
        }
       });
    }
	   // EXPORT PDF FUNCTION
      $(document).on('click', '#locationexportPdfBtn', function() {
            exportToPdf();
        });
       function exportToPdf() {
      var gridData = $("#sjc_location").jsGrid("option", "data");
       if (gridData.length === 0) {
        alert("No data to export.");
        return;
    }
   
        var table = document.createElement("table");
        table.border = "1";
        var thead = table.createTHead();
        var headerRow = thead.insertRow(0);
        Object.keys(gridData[0]).forEach(function (key) {
        var th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    });
        gridData.forEach(function (row) {
        var tr = table.insertRow(-1);
        Object.values(row).forEach(function (value) {
            var td = tr.insertCell(-1);
            td.textContent = String(value);
        });
    });
      var printWindow = window.open('', '_blank');
      printWindow.document.body.appendChild(table);
      printWindow.print();
}



//EXPORT EXCELL FUNCTION
           $(document).on('click', '#locationexportExcelBtn', function() {
                   exportToExcel();
            });
          function exportToExcel() {
          var gridData = $("#sjc_location").jsGrid("option", "data");
          if (gridData.length === 0) {
              alert("No data to export.");
          return;
  }
          var workbook = XLSX.utils.book_new();
          var ws = XLSX.utils.json_to_sheet(gridData);
          XLSX.utils.book_append_sheet(workbook, ws, "User_Data");
         XLSX.writeFile(workbook, "user_data.xlsx");
}

  