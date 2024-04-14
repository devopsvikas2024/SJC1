//Family Function

    


// Click event handler for dropdown items



    $("#sjc_family_Grid").jsGrid({
       width: "100%",
        autoload: true,
        confirmDeleting: false,
        sorting:true,
        paging: true,
        pageSize: 8,
        controller: {
    loadData: function(filter) {
        return $.getJSON('/com/sjc/family/getfamily')
            .then(function(data) {
                return data.filter(function(item) {
                    return (!filter.familyName || item.familyName.toLowerCase().includes(filter.familyName)) ||
                           (!filter.familyCode || item.familyCode.toLowerCase().includes(filter.familyCode)) ||
                           (!filter.familyDescription || item.familyDescription.toLowerCase().includes(filter.familyDescription)) ||
                           (!filter.familyAddressLineOne || item.familyAddressLineOne.toLowerCase().includes(filter.familyAddressLineOne)) ||
                           (!filter.familyCity || item.familyCity.toLowerCase().includes(filter.familyCity)) ||
                           (!filter.familyState || item.familyState.toLowerCase().includes(filter.familyState)) ||
                           (!filter.familyAddressLineTwo || item.familyAddressLineTwo.toLowerCase().includes(filter.familyAddressLineTwo));
                })
            });
    }
},
        fields: [
            {
                headerTemplate: function() {
                    return $("<button>")  
                .attr("type", "button")
                .attr("id","DeleteFamily")
                .append($("<i>").addClass(" fa fa-trash-o"))  // Append the icon first
                .append(" DELETE") .addClass("btn btn-danger active")
                .click(function () {
                  $('#DeleteFamily').click(familyDeleteFunction);
        });
            },
           itemTemplate: function(_, item) {
                return $("<input>").attr("type", "checkbox")
                    .prop("checked", $.inArray(item, selectedFamilyItems) > -1)
                    .on("change", function () {
                        $(this).is(":checked") ? selectFamilyItem(item) : unselectFamilyItem(item);
                        $(this).closest("tr").toggleClass("fw-bolder text-dark bg-primary ", $(this).is(":checked"));

                    });
            },
            align: "center",
            width: 70
            },
           
            { name: "familyCode", title:"<b>Family Code</b>", type: "Text", width: 45 },
            { name: "familyName", title:"<b>Family Name</b>", type: "text", width: 45 },
            { name: "familyDescription", title:"<b>Family Description</b>", type: "text", width: 55 },
            { name: "familyAddressLineOne", title:"<b>Address Line 1</b>", type: "text", width: 45 },
            { name: "familyAddressLineTwo", title:"<b>Address Line 2</b>", type: "text", width: 35 },
            { name: "familyCity", title:"<b>City</b>", type: "Text", width: 55 },
            { name: "familyState", title:"<b>State</b>", type: "text", width: 70 },
            { name: "familyZipCode", title:"<b>Zipcode</b>", type: "text", width: 40 },
            { name: "familyCountry", title:"<b>Country</b>", type: "text", width: 40 },
       
           
        ]
    });
    
    
    var selectedFamilyItems = [];
    var selectFamilyItem = function(item) {
        selectedFamilyItems.push(item);
    };
    var unselectFamilyItem = function(item) {
        selectedFamilyItems = $.grep(selectedFamilyItems, function(i) {
            return i !== item;
        });
    };
    
    
 //DELETE FUNCTION FOR FAMILY
       function familyDeleteFunction() {
    if (selectedFamilyItems.length === 0) {
         $("#Warning_Msg").html("Please select at least one family to delete.");
        $('#Warning_modal').modal('show');
        return;
    }

    // Show the modal
    $('#ConfirmationFamilyDelete').modal('show');

    // When "Yes" button is clicked
    $('#confirmfamilyDeleteBtn').on('click', function() {
		
		selectedFamilyItems.forEach(function(item){const url = '/com/sjc/family/delete';
        const data = {
           id: item.id
        };

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function() {
				console.log('Successfully deleted family with ID:', item.id);               
            },
            error: function(error) {
                console.error('There was a problem with the AJAX request:', error);
            }
        });
        
        })
         
           $('#ConfirmationFamilyDelete').modal('hide');
        $('#Delete_Family_modal').modal('show');
         $('#main-content').load('./sjc_family.html');
          selectedFamilyItems = [];
    });
}

     $(document).on('click', '#addFamilyBtn', function() {
		   console.log("add family");
	 	     $('#family_Form')[0].reset();
           $('#familyAddUpdateModal').modal('show'); 
           $('#family_Form').off('submit').submit(function(familyAddEvent) {
            familyAddEvent.preventDefault();
        
        console.log("wait for submit");
        addNewFamily();
         });
	 });
  
  $(document).on('click', '#familyAdUpCloseButton', function(){
	    $('.familyError-message').remove();
	    $('#familyName').removeClass('add-isNotValid')
	    $('#familyDescription').removeClass('add-isNotValid')
	    $('#familyAddressLineOne').removeClass('add-isNotValid')
	    $('#familyAddressLineTwo').removeClass('add-isNotValid')
	    $('#familyCity').removeClass('add-isNotValid')
        $('#familyState').removeClass('add-isNotValid')
	    $('#familyZipCode').removeClass('add-isNotValid')
	    $('#familyCountry').removeClass('add-isNotValid')
  })
 

  function fetchFamilyData() {
    console.log("fetchFamilyData work")
    const familyCity = $('#familyCity').val();
    $.getJSON('../assets/js/jsgrid/sjc-sidebar-grid/sjc-family/malaysia.json', function(data) {
        const matchingEntries = data.filter(entry => entry.city.toLowerCase() === familyCity.toLowerCase());
        if (matchingEntries.length > 0) {
            const postcode = matchingEntries[0].postcode;
            const state = matchingEntries[0].state;
            const country = matchingEntries[0].country;
            $('#familyZipCode').val(postcode);
            $('#familyState').val(state);
            $('#familyCountry').val(country);
        } else {
            $('#familyZipCode').val('');
            $('#familyState').val('');
            $('#familyCountry').val('');
        }
      });
  }


$("#familyCity").on("input", function() {
    fetchFamilyData();
});


function addNewFamily() {
    $('.familyError-message').remove();

    const familyName = $('#familyName').val().trim();
    const familyDescription = $('#familyDescription').val().trim();
    const familyAddressLineOne = $('#familyAddressLineOne').val().trim();
    
    let familyAddressLineTwo = $('#familyAddressLineTwo').val().trim(); 
    const familyCity = $('#familyCity').val().trim();

    let familyIsValidate = true;

    if (!familyName) {
        $('#familyName').addClass('add-isNotValid').after(`<small class="familyError-message text-danger">Family Name is required*</small>`);
        familyIsValidate = false;
    }

    if (!familyDescription) {
        $('#familyDescription').addClass('add-isNotValid').after(`<small class="familyError-message text-danger">Family Description is required*</small>`);
        familyIsValidate = false;
    }

    if (!familyAddressLineOne) {
        $('#familyAddressLineOne').addClass('add-isNotValid').after(`<small class="familyError-message text-danger">Address Line 1 is required*</small>`);
        familyIsValidate = false;
    } 
   
  
    if (!familyAddressLineTwo) {
        familyAddressLineTwo = 'N/A';
        $('#familyAddressLineTwo').val(familyAddressLineTwo); // Update the field value
    }   

    if (!familyCity) {
        $('#familyCity').addClass('add-isNotValid').after(`<small class="familyError-message text-danger">City is required*</small>`);
        familyIsValidate = false;
    }

    if (familyIsValidate) {
        const new_add_family = new FormData(document.getElementById('family_Form'));
        const new_add_family_Data = {};
        new_add_family.forEach((value, key) => {
            new_add_family_Data[key] = value;
        });

        $.ajax({
            url: '/com/sjc/family/add',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(new_add_family_Data),
            success: function(data) {
                $('#familyAddUpdateModal').modal('hide');
                $('#Add_Family_Modal').modal('show');
                console.log('API Response:', data);
                $('#main-content').load('./sjc_family.html');                
                // Reset form fields and validation               
                $('#family_Form')[0].reset();
                $('.add-isNotValid').removeClass('add-isNotValid');
                $('.familyError-message').remove();
                selectedFamilyItems = [];
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }
}


	   
//EDIT & UPDATE FUNCTION FOR FAMILY
	   $(document).on('click', '#editFamilyBtn', function() {
        console.log("edit family");
        familyEditMode ="edit";
        if(familyEditMode==="edit"){
            console.log(selectedFamilyItems);
            if (selectedFamilyItems.length ===0){
				 $("#Warning_Msg").html("Please select the family to edit");
               $('#Warning_modal').modal('show');
			}
                else if (selectedFamilyItems.length >=2) {
               console.log("Select only one family to edit");
               $("#Warning_Msg").html("Select only one family to edit");
               $('#Warning_modal').modal('show');
            
        } else{
                 var selectedFamilyItem = selectedFamilyItems[0];
                 var familyEditId= selectedFamilyItem.id;
             
                 document.getElementById('familyName').value = selectedFamilyItem.familyName || "";
                 document.getElementById('familyDescription').value = selectedFamilyItem.familyDescription || "";
                 document.getElementById('familyAddressLineOne').value = selectedFamilyItem.familyAddressLineOne || "";
                 document.getElementById('familyAddressLineTwo').value = selectedFamilyItem.familyAddressLineTwo || "";
                 document.getElementById('familyCity').value = selectedFamilyItem.familyCity || "";
                 document.getElementById('familyState').value = selectedFamilyItem.familyState || "";
                 document.getElementById('familyZipCode').value = selectedFamilyItem.familyZipCode || "";
                 document.getElementById('familyCountry').value = selectedFamilyItem.familyCountry || "";
                 
                 $('#familyAddUpdateModal').modal('show');
                  }
                  $('#family_Form').off('submit').submit(function(familyevent) {
					  familyevent.preventDefault();
                    console.log("wait for update submit");
                   updateFamily(familyEditId); 
              });
     }
  });
  
  //update function
            function updateFamily(id) {
               const familyname = $('#familyName').val();
               const familydescription = $('#familyDescription').val();
               const familyaddresslineOne = $('#familyAddressLineOne').val();
               const familyaddresslineTwo = $('#familyAddressLineTwo').val();
               const familycity = $('#familyCity').val();
               const familystate = $('#familyState').val();
               const familyzipcode = $('#familyZipCode').val();
               const familycountry = $('#familyCountry').val();
             $.ajax({
               url: '/com/sjc/family/update',
               type: 'POST',
               contentType: 'application/json',
               data: JSON.stringify({
               id: id,
               familyName: familyname,
               familyDescription: familydescription,
               familyAddressLineOne: familyaddresslineOne,
               familyAddressLineTwo: familyaddresslineTwo,
               familyCity: familycity,
               familyState: familystate,
               familyZipCode: familyzipcode,
               familyCountry: familycountry,
        }),
              success: function (updatedFamily) {
              $('#familyAddUpdateModal').modal('hide');
              $('#Update_Family_modal').modal('show');
              console.log('Updated Family:', updatedFamily);
             $.get('./sjc_family.html', function(data) {
             $('#main-content').html(data);
             } );
              selectedFamilyItems = [];
             },
            error: function (error) {
            console.error('Error:', error);
            // Handle error in the UI
        }
       });
    }
            
  // EXPORT PDF FUNCTION
  
      $(document).on('click', '#familyexportPdfBtn', function() {
            exportToPdf();
        });
   function exportToPdf() {
    var gridData = $("#sjc_family_Grid").jsGrid("option", "data");
    if (gridData.length === 0) {
        alert("No data to export.");
        return;
    }

   
    var container = document.createElement("div");
    container.classList.add("container"); 
    container.style.margin = "20px auto";
 
    var label = document.createElement("div");
    label.textContent = "FAMILY TABLE:";
    label.style.fontWeight = "bold"; 
    container.appendChild(label);

   
    var logoDiv = document.createElement("div");
    logoDiv.style.float = "left";
    logoDiv.style.marginRight = "20px"; 
    var logoImg = document.createElement("img");
    logoImg.src = "../assets/images/logo/sjc-logo.png";
    logoImg.classList.add("img-fluid"); 
    logoDiv.appendChild(logoImg);
    container.appendChild(logoDiv);

    
    var table = document.createElement("table");
    table.classList.add("table", "table-striped");
    var thead = table.createTHead();
    var headerRow = thead.insertRow(0);
    var visibleFields = ["familyCode", "familyName", "familyDescription", "familyAddressLineOne", "familyCity", "familyState"];
    visibleFields.forEach(function (key) {
        var th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    });
    
    gridData.forEach(function (row) {
        var tr = table.insertRow(-1);
        visibleFields.forEach(function (field) {
            var td = tr.insertCell(-1);
            td.textContent = String(row[field] || "");
            td.style.textAlign = "center";
            td.style.padding = "8px";
        });
    });

    
    container.appendChild(table);
   
    var printWindow = window.open('', '_blank');
    printWindow.document.body.appendChild(container);
 
    var printStyles = document.createElement("style");
    printStyles.innerHTML = `
        @media print {
            .container {
                page-break-before: auto;
                page-break-after: always;
            }
            img {
                max-width: 100%;
            }
        }
    `;
    printWindow.document.head.appendChild(printStyles);

    // Print the document
    printWindow.print();
}







//EXPORT EXCELL FUNCTION
           $(document).on('click', '#familyexportExcelBtn', function() {
                   exportToExcel();
            });
          function exportToExcel() {
          var gridData = $("#sjc_family_Grid").jsGrid("option", "data");
          if (gridData.length === 0) {
              alert("No data to export.");
          return;
  }
          var workbook = XLSX.utils.book_new();
          var ws = XLSX.utils.json_to_sheet(gridData);
          XLSX.utils.book_append_sheet(workbook, ws, "User_Data");
         XLSX.writeFile(workbook, "user_data.xlsx");
}





function filterFamilyData() {
    var searchText = $("#searchFamilyInput").val().toLowerCase();
    $("#sjc_family_Grid").jsGrid("loadData", {
        familyName: searchText,
        familyCode:searchText,
        familyDescription:searchText,
        familyAddressLineOne:searchText,
         familyCity:searchText,
         familyState:searchText,
        familyAddressLineTwo:searchText
    });
}
 