(function($) {
	"use strict";

//--- Define header template function----
	function headerTemplate() {
		return $("<button>")
			.attr("type", "button")
			.attr("id", "deleteAsset")
			.append($("<i>").addClass(" px-1 fa fa-trash-o"))
			.append("DELETE")
			.addClass("btn btn-danger active")
			.click(deleteSelectedAsset);
	}

//----- Define item template function----
	function itemTemplate(_, item) {
		return $("<input>").attr("type", "checkbox")
			.prop("checked", $.inArray(item, selectedAssetItems) > -1)
			.on("change", function() {
				$(this).is(":checked") ? selectAssetItem(item) : unselectAssetItem(item);
				$(this).closest("tr").toggleClass("fw-bolder text-dark bg-primary ", $(this).is(":checked"));
			});
	}

	// Define fields configuration
	var fields = [
		{
			headerTemplate: headerTemplate,
			itemTemplate: itemTemplate,
			align: "center",
			sorting:true,
			width: 40
		},
		{ name: "asset_id", title: "<b>Asset ID</b>", type: "text", width: 30 },
		{ name: "name_of_asset", title: " <b>Name of Asset</b>", type: "Text", width: 35 },
		{ name: "classification", title: "<b>Classification</b>", type: "text", width: 40 },
		{ name: "location", title: "<b>Location</b>", type: "text", width: 50 },
		{ name: "purchase_value", title: "<b>Purchase Value</b>", type: "text", width: 30 },
		{ name: "asset_status", title: " <b>Asset Status</b>", type: "text", width: 30 },
	];

	// Define controller object
	var controller = {
		loadData: function(filter) {
			return $.getJSON('/com/sjc/asset/getAsset')
			.then (function(data){
		return data.filter(function(item){
			return !filter.name_of_asset||item.name_of_asset.toLowerCase().includes(filter.name_of_asset);
		})
       })
		}
	};

	// Initialize jsGrid
	$("#sjc_asset").jsGrid({
		width: "100%",
		autoload: true,
		confirmDeleting: false,
		paging: true,
		pageSize: 8,
		controller: controller,
		fields: fields
	});


	var selectedAssetItems = [];
	var selectAssetItem = function(item) {
		selectedAssetItems.push(item);
	};
	var unselectAssetItem = function(item) {
		selectedAssetItems = $.grep(selectedAssetItems, function(i) {
			return i !== item;
		});
	};

	function deleteSelectedAsset() {
		if (selectedAssetItems.length === 0) {
			$("#Warning_Msg").html("Please select at least one Asset to delete.");
			$('#Warning_modal').modal('show');
			return;
		}



		// Show the modal
		$('#ConfirmationAsssetDelete').modal('show');

		// When "Yes" button is clicked
		$('#confirmAssetDeleteBtn').on('click', function() {
			selectedAssetItems.forEach(function(item) {
				const url = '/com/sjc/asset/delete';
				const data = {
					id: item.id
				};

				$.ajax({
					url: url,
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(data),
					success: function() {
						console.log("Asset Delete");
					},
					error: function(_xhr, _status, error) {
						console.error('There was a problem with the AJAX request:', error);
					}
				});
			});
			selectedAssetItems = [];
			$('#DeleteconfirmationModal').modal('hide');
			$('#Delete_asset_modal').modal('show');
			$('#main-content').load('./sjc_asset.html');
			selectedAssetItems = [0];
		});
	}

	// for asset Classsification DropDown
	$.ajax({
		url: '/com/sjc/assetclassification/getassetclassification',
		type: 'GET',
		success: function(data) {
			var dropdown = $('#assetClassification');
			$.each(data, function(_index, item) {
				dropdown.append($('<option></option>').attr('value', item.assetClassificationAcronym).text(item.assetClassificationName));
				console.log("okey");
			});
		},
		error: function(_xhr, _status, error) {
			// Handle error
			console.error('Error fetching data from API:', error);
		}
	});

	// for Asset LOcation DropDown
	$.ajax({
		url: '/com/sjc/location/getlocation',
		type: 'GET',
		success: function(data) {
			var dropdown = $('#assetLocation');
			$.each(data, function(_index, item) {
				dropdown.append($('<option></option>').attr('value', item.locationName).text(item.locationName));
				console.log("okey");
			});
		},
		error: function(_xhr, _status, error) {
			// Handle error
			console.error('Error fetching data from API:', error);
		}
	});

     // Form wizard variables
	var Mode = "add";
	var form = document.getElementById("msform");
	var fieldsets = form.querySelectorAll("form");
	var currentStep = 0;
	var isValid = true;

	// Hide all form fieldsets except the first one
	for (var i = 1; i < fieldsets.length; i++) {
		fieldsets[i].style.display = "none";
	}

	// Reset all forms in the wizard
	function assetFormwizardReset() {
		console.log("Resetting form");
		isValid = true;
		$('#assetForm0')[0].reset();
		$('#assetForm1')[0].reset();
		$('#assetForm2')[0].reset();
		currentStep = 0;
		removeInvalidClasses();
	}
	
	// Function to remove invalid classes from form fields
function removeInvalidClasses() {
    $('.is-invalid').removeClass('is-invalid');
     $('.error-text').hide();
}
	
	 //cancel button
	 $(document).on('click', '#cancel-button', function() {
	     console.log("cancel function from reset");
	      currentStep = 0;
		 assetFormwizardReset();
	 });
	 

	// Event handler for adding asset
	/*$(document).on('click', '#addAsset', function(event) */
	   $('#addAsset').click(function(event){
		event.preventDefault();
		Mode = "add";
		assetFormwizardReset();
		$('#AssetModal').modal('show');
	});



	$('#editAsset').click(function() { 
		switch (selectedAssetItems.length) {
			case 1:
				Mode = "edit";
				var assetId = selectedAssetItems[0].id;
				loadAssetdata(assetId);
				$('#AssetModal').modal('show');
				break;
			case 0:
				console.log("selectedAssetItems is empty");
				$("#Warning_Msg").html("Please select the asset data to edit.");
				$('#Warning_modal').modal('show');
				break;
			default:
				console.log("selectedAssetItems has multiple items");
				$("#Warning_Msg").html("Please select only one asset data to edit.");
				$('#Warning_modal').modal('show');
				break;
		}
	});

	// Event delegation for handling next step button click
	 $('.assetNextStepBtn').click(function(event) {
		event.preventDefault();
		var formId = "assetForm" + currentStep;
		console.log(formId);
		assetValidation[formId](); // Validate form
		if (isValid) {
			if (currentStep == 2) {
				$('#AssetModal').modal('hide');
				if (Mode === "add") {
					addassetdata();
				} else {
					var selectedAssetItem = selectedAssetItems[0];
					var assetId = selectedAssetItem.id;
					editassetdata(assetId);
				}
			} 
			else {
				console.log(" Move to the next step");
				assetNextStep(); // Move to the next step
			}
		}
	});

	// Event delegation for handling back step button click 
	$('.assetBackStepBtn').click(function(){
		assetBackStep(); // Move to the previous step
	});

	// Disable back button initially
	$("#assetbackbtn").prop("disabled", true);

	// Function to move to the next step in the wizard
	function assetNextStep() {
		document.getElementById("assetbackbtn").disabled = false;
		console.log(" testing enter");
		currentStep++;
		var stepper = document.getElementById("stepper1");
		var steps = stepper.getElementsByClassName("step");
		var stepLength = steps.length;

		// Update steps display
		Array.from(steps).forEach((step, index) => {
			let stepNum = index + 1;
			if (stepNum === currentStep && currentStep < stepLength) {
				addClass(step, "editing");
				fieldsets[currentStep].style.display = "flex";
			} else {
				removeClass(step, "editing");
			}
			if (stepNum <= currentStep && currentStep < stepLength) {
				addClass(step, "done");
				addClass(step, "active");
				removeClass(step, "editing");
				fieldsets[currentStep - 1].style.display = "none";
			} else {
				removeClass(step, "done");
			}
			if (currentStep == stepLength - 1) {
				document.getElementById("assetnextbtn").textContent = "Finish";
			}
			if (currentStep > stepLength - 1) {
				document.getElementById("assetnextbtn").textContent = "Finish";
				addClass(step, "done");
				addClass(step, "active");
				removeClass(step, "editing");
			}
		});
	}

	// Function to move to the previous step in the wizard
	function assetBackStep() {
		currentStep--;
		var stepper = document.getElementById("stepper1");
		var steps = stepper.getElementsByClassName("step");
		var stepLength = steps.length;
		document.getElementById("assetnextbtn").textContent = "Next";
		document.getElementById("assetnextbtn").disabled = false;
		if (currentStep < stepLength - 1) {
			document.getElementById("assetbackbtn").disabled = false;
			fieldsets[currentStep + 1].style.display = "none";
			fieldsets[currentStep].style.display = "flex";
			removeClass(steps[currentStep], "done");
			removeClass(steps[currentStep], "active");
			if (currentStep == 0) {
				document.getElementById("assetbackbtn").disabled = true;
			}
		} else {
			removeClass(steps[currentStep], "done");
			removeClass(steps[currentStep], "active");
		}
	}

	// Utility functions for adding, removing, and checking classes
	function hasClass(elem, className) {
		return new RegExp(" " + className + " ").test(" " + elem.className + " ");
	}

	function addClass(elem, className) {
		if (!hasClass(elem, className)) {
			elem.className += " " + className;
		}
	}

	function removeClass(elem, className) {
		var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
		if (hasClass(elem, className)) {
			while (newClass.indexOf(" " + className + " ") >= 0) {
				newClass = newClass.replace(" " + className + " ", " ");
			}
			elem.className = newClass.replace(/^\s+|\s+$/g, "");
		}
	}




	// Function to add asset data
	function addassetdata() {
		var asset_Data = gatherAssetData();
        console.log('add function');
		sendDataToServer(asset_Data, 'add');
	}

	// Function to load asset data into the form
	function loadAssetdata(id) {
		$.ajax({
			url: `/com/sjc/asset/${id}`,
			method: 'GET',
			dataType: 'json',
			success: function(Data) {
				fillFormData(Data);
			},
			error: function(_jqXHR, textStatus, errorThrown) {
				console.error('Error fetching user data:', textStatus, errorThrown);
			}
		});
	}

	// Function to edit asset data
	function editassetdata(id) {
		var asset_Data = gatherAssetData();
		asset_Data.id = id;

		console.log('Edit function');
		sendDataToServer(asset_Data, 'update');
		
	}

	// Function to gather data from the form
	function gatherAssetData() {
		return {
			name_of_asset: $('#assetName').val(),
			ownership: $('#assetOwnership').val(),
			classification: $('#assetClassification').val(),
			location: $('#assetLocation').val(),
			purchase_value: $('#assetPurchaseValue').val(),
			date_of_purchase: $('#assetDateOfPurchase').val(),
			depreciation_type: $('#assetDepreciationType').val(),
			asset_status: $('#assetAssetStatus').val(),
			status_effective_date: $('#assetStatusEffectiveDate').val()
		};
	}

	// Function to send data to the server
	function sendDataToServer(data, mode) {
		console.log(data,mode);
		$.ajax({
			url: `/com/sjc/asset/${mode}`,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: function(data) {
				currentStep = 0;
				selectedAssetItems = [];
			    console.log(mode);
				(mode === 'add' ? $('#Add_Asset_Modal') : $('#Update_Asset_modal')).modal('show');
				console.log('API Response:', data);
				assetFormwizardReset();
				$('#main-content').load('./sjc_asset.html');
				mode="add";
			},
			error: function(error) {
				console.error('Error:', error);
			}
		});
	}

	// Function to fill form data with asset details
	function fillFormData(data) {
		$('#assetName').val(data.name_of_asset);
		$('#assetOwnership').val(data.ownership);
		$('#assetClassification').val(data.classification);
		$('#assetLocation').val(data.location);
		$('#assetPurchaseValue').val(data.purchase_value);
		$('#assetDateOfPurchase').val(data.date_of_purchase);
		$('#assetDepreciationType').val(data.depreciation_type);
		$('#assetAssetStatus').val(data.asset_status);
		$('#assetStatusEffectiveDate').val(data.status_effective_date);
	}

	// Consolidated validation function
	const assetValidation = {
		assetForm0() {
			assetValidateInput('#assetName', "Asset Name", 3);
			assetValidateSelect('#assetOwnership', "Ownership");
			assetValidateSelect('#assetClassification', "Classification of Asset");
			assetValidateSelect('#assetLocation', "Location of Asset");
		},
		assetForm1() {
			assetValidateInput('#assetPurchaseValue', "Purchase cost");
			assetValidateInput('#assetDateOfPurchase', "Date Of Purchase");
			assetValidateSelect('#assetDepreciationType', "Asset Depreciation Type");
		},
		assetForm2() {
			assetValidateSelect('#assetAssetStatus', "Asset Status");
			assetValidateInput('#assetStatusEffectiveDate', "Status Effective Date");
		}
	};

	// Generic function to validate input fields
	function assetValidateInput(fieldId, fieldName, minLength = 0) {
		var fieldValue = $(fieldId).val().trim();
		if (fieldValue === '') {
			$(fieldId).addClass('is-invalid');
			$(`${fieldId}-error`).show().html(`Please enter the ${fieldName}`);
			isValid = false;
		} else if (minLength > 0 && fieldValue.length < minLength) {
			$(fieldId).addClass('is-invalid');
			$(`${fieldId}-error`).show().html(`Length of ${fieldName} must be at least ${minLength}`);
			isValid = false;
		} else {
			$(fieldId).removeClass('is-invalid');
			isValid = true;
			$(`${fieldId}-error`).hide();
			
		}
	}

	// Generic function to validate select fields
	function assetValidateSelect(fieldId, fieldName) {
		var fieldValue = $(fieldId).val();
		if (fieldValue === null || fieldValue === '') {
			$(fieldId).addClass('is-invalid');
			$(`${fieldId}-error`).show().html(`Please select the ${fieldName}`);
			isValid = false;
		} else {
			$(fieldId).removeClass('is-invalid');
			isValid = true;
			$(`${fieldId}-error`).hide();
		}
	}


})(jQuery);

 function filterAssetData(){
	 var searchText = $("#searchAssetInput").val().toLowerCase();
    $("#sjc_asset").jsGrid("loadData", {
        name_of_asset: searchText
    });
 }
