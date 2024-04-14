

    $("#sjc_assetclassification_Grid").jsGrid({
		width: "100%",
        autoload: true,
        confirmDeleting: false,
        paging: true,
        pageSize: 7,
        controller:  {
              loadData: function(filter) {
        return $.getJSON('/com/sjc/assetclassification/getassetclassification')
            .then(function(data) {
                return data.filter(function(item) {
                    return (!filter.assetClassificationCode|| item.assetClassificationCode.toLowerCase().includes(filter.assetClassificationCode))||
                           (!filter.assetClassificationName|| item.assetClassificationName.toLowerCase().includes(filter.assetClassificationName))||
                           (!filter.assetClassificationAcronym|| item.assetClassificationAcronym.toLowerCase().includes(filter.assetClassificationAcronym));
                });
            });
    }
},
        fields: [
            {
                headerTemplate: function() {
                    return $("<button>")
                    .attr("type","button")
                    .attr("id","deleteAssetClassification")
                    .append($("<i>").addClass(" px-1 fa fa-trash-o"))
                    .append("DELETE").addClass("btn btn-danger active")
                    .click(function () {
                   $('#deleteAssetClassification').click(assetClassificationDeleteFunction);
        });
            },
            itemTemplate: function(_, item) {
                return $("<input>").attr("type", "checkbox")
                        .prop("checked", $.inArray(item, selectedAssetClassificationItems) > -1)
                        .on("change", function () {
                            $(this).is(":checked") ? selectAssetClassificationItem(item) : unselectAssetClassificationItem(item);
                            $(this).closest("tr").toggleClass("fw-bolder text-dark bg-primary ", $(this).is(":checked"));
                        });
            },
            align: "center",
            width: 40
            },
            
             
            { name: "assetClassificationCode", title:" <b>Asset Classification Code</b>", type: "Text", width: 60 },
            { name: "assetClassificationName",  title:" <b>Asset Classification Name</b>",  type: "text", width: 60 },
            { name: "assetClassificationAcronym", title:" <b>Asset Classification Acronym</b>",  type: "text", width: 60 },


           
        ]
    });
    
   
    var selectedAssetClassificationItems = [];
    var selectAssetClassificationItem = function(item) {
        selectedAssetClassificationItems.push(item);
    };
    var unselectAssetClassificationItem = function(item) {
        selectedAssetClassificationItems = $.grep(selectedAssetClassificationItems, function(i) {
            return i !== item;
        });
    };
    
     
     //DELETE FUNCTION FOR ASSETCLASSIFICATION
       function assetClassificationDeleteFunction() {
    if (selectedAssetClassificationItems.length === 0) {
         $("#Warning_Msg").html("Please select at least one asset classification to delete.");
        $('#Warning_modal').modal('show');
        return;
    }

    // Show the modal
    $('#ConfirmationAssetClassificationDelete').modal('show');

    // When "Yes" button is clicked
    $('#confirmAssetClassificationDeleteBtn').on('click', function() {
		
		selectedAssetClassificationItems.forEach(function(item){
			
			  const url = '/com/sjc/assetclassification/delete';
              const data = {
                  id: item.id
        };

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function() {
				 console.log('Successfully deleted asset classification with ID:', item.id);
               
               
               
            },
            error: function(error) {
                console.error('There was a problem with the AJAX request:', error);
            }
        });
		});
		
      
        $('#ConfirmationAssetClassificationDelete').modal('hide');
        $('#Delete_AssetClassification_Success_modal').modal('show');
        $('#main-content').load('./sjc_asset_category.html');
        
          

        // Hide the modal after the operation is complete
       
    });
}
   
   
     //ADD BUTTON FUNCTION
         $(document).on('click', '#addAssetClassificationBtn', function() {
		   console.log("add Asset Classification");
	 	     $('#assetClassification_Form')[0].reset();
           $('#assetClassificationAddUpdateModal').modal('show'); 
           $('#assetClassification_Form').off('submit').submit(function(assetClassificationAddEvent) {
            assetClassificationAddEvent.preventDefault();
        
        console.log("wait for submit");
        addNewAssetClassificationFunction();
         });
	 });
	 
	  $(document).on('click', '#assetClassAdUpCloseButton', function(){
			$('.assetClassError-message').remove();
		
			 $('#assetClassificationName').removeClass('add-isNotValid');
			 $('#assetClassificationAcronym').removeClass('add-isNotValid');
		})
		
	  //ADD FUNCTION	
		
	  function  addNewAssetClassificationFunction(){ 
		 
		  $('.assetClassError-message').remove();
		
		  $('#assetClassificationName').removeClass('add-isNotValid');
		  $('#assetClassificationAcronym').removeClass('add-isNotValid');
		  
		 console.log("addNewAssetClassification worked")
		 
	
    // Check if required fields are empty
  
    const assetClassificationName = $('#assetClassificationName').val().trim();
    const assetClassificationAcronym = $('#assetClassificationAcronym').val().trim();
    
    let assetClassIsValidate = true;
    
     if (!assetClassificationName) {
        $('#assetClassificationName').addClass('add-isNotValid').after(`<small class="assetClassError-message text-danger">Asset Classifictaion Name is required*</small>`);
       assetClassIsValidate = false;
    }
     if (!assetClassificationAcronym) {
        $('#assetClassificationAcronym').addClass('add-isNotValid').after(`<small class="assetClassError-message text-danger">Asset Classifictaion Acronym is required*</small>`);
        assetClassIsValidate = false;
    }  else if (assetClassificationAcronym.toUpperCase() !== assetClassificationAcronym || assetClassificationAcronym.length !== 3) {
    $('#assetClassificationAcronym').addClass('add-isNotValid').after(`<small class="assetClassError-message text-danger">Must be a valid uppercase 3-character acronym *</small>`);
    assetClassIsValidate = false;
}

    
		 if(assetClassIsValidate){
			  const new_add_asset_classification = new FormData(document.getElementById('assetClassification_Form'));
             const new_add_asset_classification_Data = {};
             new_add_asset_classification.forEach((value, key) => {
             new_add_asset_classification_Data[key] = value;
            });
             $.ajax({
               url: '/com/sjc/assetclassification/add',
               type: 'POST',
               contentType: 'application/json',
               data: JSON.stringify( new_add_asset_classification_Data),
               success: function(data) {
               $('#assetClassificationAddUpdateModal').modal('hide');
               $('#Add_Asset_Classification_Success_Modal').modal('show');
               console.log('API Response:', data);
               $('#main-content').load('./sjc_asset_category.html');
                 selectedAssetClassificationItems
              },
              error: function(error) {
              console.error('Error:', error);
            }
        });
		 }
	 }    
//EDIT & UPDATE FUNCTION FOR ASSETCLASSIFICATTION
	   $(document).on('click', '#editAssetClassificationBtn', function() {
        console.log("edit family");
        assetClassificationEditMode ="edit";
        if(assetClassificationEditMode==="edit"){
            if(selectedAssetClassificationItems.length === 0){
				$("#Warning_Msg").html("Please select the asset-classification to edit");
                $('#Warning_modal').modal('show');
			}
                else if (selectedAssetClassificationItems.length >= 2) {
              
                 console.log("Select only one asset-classification to edit");
                $("#Warning_Msg").html("Select only one asset-classification to edit");
                $('#Warning_modal').modal('show');
                return;
               } else{
                 var selectedAssetClassificationItem = selectedAssetClassificationItems[0];
                 var assetClassificationEditId= selectedAssetClassificationItem.id;
                 
          
                 document.getElementById('assetClassificationName').value = selectedAssetClassificationItem.assetClassificationName || "";
                 document.getElementById('assetClassificationAcronym').value = selectedAssetClassificationItem.assetClassificationAcronym || "";
                 
                 
                 $('#assetClassificationAddUpdateModal').modal('show');
                  }
                  $('#assetClassification_Form').off('submit').submit(function(assetClassificationEditEvent) {
					  assetClassificationEditEvent.preventDefault();
                    console.log("wait for update submit");
                   updateAssetClassificationFunction(assetClassificationEditId); 
                   });
                 }
            });
//UPDATE FUNCTION
     function updateAssetClassificationFunction(id){
			console.log("updateAssetClassificationFunction worked")
			   const asset_Classification_Name = $('#assetClassificationName').val();
               const asset_Classification_Acronym = $('#assetClassificationAcronym').val();
             $.ajax({
               url: '/com/sjc/assetclassification/update',
               type: 'POST',
               contentType: 'application/json',
               data: JSON.stringify({
               id: id,
               assetClassificationName: asset_Classification_Name,
               assetClassificationAcronym: asset_Classification_Acronym,
        }),
              success: function (updatedAssetClassification) {
              $('#assetClassificationAddUpdateModal').modal('hide');
              $('#Update_AssetClassification_Success_modal').modal('show');
              console.log('Updated Asset Classification:', updatedAssetClassification);
             $.get('./sjc_asset_category.html', function(data) {
             $('#main-content').html(data);
             });
              selectedAssetClassificationItems =[]
             },
            error: function (error) {
            console.error('Error:', error);
            // Handle error in the UI
        }
       });
		}
		
		
 // EXPORT PDF FUNCTION
      $(document).on('click', '#assetClassexportPdfBtn', function() {
            exportToPdf();
        });
       function exportToPdf() {
      var gridData = $("#sjc_assetclassification_Grid").jsGrid("option", "data");
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
           $(document).on('click', '#assetClassexportExcelBtn', function() {
                   exportToExcel();
            });
          function exportToExcel() {
          var gridData = $("#sjc_assetclassification_Grid").jsGrid("option", "data");
          if (gridData.length === 0) {
              alert("No data to export.");
          return;
  }
          var workbook = XLSX.utils.book_new();
          var ws = XLSX.utils.json_to_sheet(gridData);
          XLSX.utils.book_append_sheet(workbook, ws, "Asset_Classification_Data");
         XLSX.writeFile(workbook, "Asset_Classification_Data.xlsx");
}





function filterAssetClassifyData() {
    var searchText = $("#searchAssetClassifyInput").val().toLowerCase();
    $("#sjc_assetclassification_Grid").jsGrid("loadData", {
		assetClassificationCode:searchText,
        assetClassificationName: searchText,
        assetClassificationAcronym:searchText
    });
}
 
  