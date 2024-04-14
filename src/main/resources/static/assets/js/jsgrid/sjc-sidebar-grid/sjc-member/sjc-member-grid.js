(function($) {
    "use strict";
    
    //Define Header template Function 
    function headerTemplate(){
		return $("<button>")
                    .attr("type","button")
                    .attr("id", "deleteMember")
                    .append($("<i>").addClass("px-1 fa fa-trash-o"))
                    .append("DELETE").addClass("btn btn-danger active")
                        .click( function () {
						$('#deleteMember').click(deleteSelectedMember); 
	   });
	   }
	   
	   //Define item Template Function
	   function itemTemplate(_,item){
		    return $("<input>").attr("type", "checkbox")
                        .prop("checked", $.inArray(item, selectedMemberItems) > -1)
                        .on("change", function () {
                            $(this).is(":checked") ? selectMemberItem(item) : unselectMemberItem(item);
                            $(this).closest("tr").toggleClass("fw-bolder text-dark bg-primary ", $(this).is(":checked"));
                        });
	    }
      
      // Define fields configuration
      
      var fields =[
		  {
             headerTemplate: headerTemplate,
            itemTemplate:itemTemplate,
            align: "center",
            width: 80,
            },
            { name: "member_id", title:"<b>Member ID</b>", type: "text", width: 60 },
            { name: "mem_family_id", title:"<b>Family ID</b>", type: "Text", width: 40 },
            { name: "mem_first_name", title:"<b>First Name</b>", type: "text", width: 50 },
            { name: "mem_last_name", title:"<b>Last Name</b>",  type: "text", width: 50 },
            { name: "mem_date_of_birth", title:"<b>Date of Birth</b>", type: "text", width: 50 },
            { name: "mem_gender", title:"<b>Gender</b>", type: "text", width: 40 },
            { name: "mem_marital_status", title:"<b>Marital Status</b>", type: "text", width: 50 },
            { name: "mem_contact_number", title:"<b>Contact Number</b>", type: "text", width: 60 },
            { name: "membership_type", title:"<b>Membership Type</b>", type: "text", width: 50 },
            { name: "membership_status", title:"<b>Membership Status</b>", type: "text", width: 50 },
      ];
      
      //define cvontroller object
       var controller ={
		   loadData: function(filter) {
                return $.getJSON('/com/sjc/member/getMember')
                 .then(function(data) {
                return data.filter(function(item) {
                    return !filter.member_id|| item.member_id.toLowerCase().includes(filter.member_id);
                });
            });
            }
		  }
		  
		  
    // Initialize jsGrid  
    $("#sjc_member").jsGrid({
       width: "100%",
        autoload: true,
        confirmDeleting: false,
        paging: true,
        pageSize: 6,
        controller: controller,
        fields: fields
    });
    
    
    
    var selectedMemberItems = [];
    var selectMemberItem = function(item) {
        selectedMemberItems.push(item);
       };
    var unselectMemberItem = function(item) {
        selectedMemberItems = $.grep(selectedMemberItems, function(i) {
            return i !== item;
        });
    };
    
     function deleteSelectedMember() {
		    if (selectedMemberItems.length === 0) {
        $("#Warning_Msg").html("Please select at least one Member to delete.");
        $('#Warning_modal').modal('show');
        return;
    }
    

    // Show the modal
    $('#ConfirmationMemberDelete').modal('show');

    // When "Yes" button is clicked
    $('#confirmMemberDeleteBtn').on('click', function() {
		
		 selectedMemberItems.forEach(function(item) {
        const url = '/com/sjc/member/delete';
        const data = {
            id: item.id
        };

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function() {
               console.log("Member Delete");
            },
            error: function(_xhr, _status, error) {
                console.error('There was a problem with the AJAX request:', error);
            }
        });
       });
         selectedMemberItems = [];
         $('#DeleteconfirmationModal').modal('hide');
         $('#Delete_Member_modal').modal('show');
         $('#main-content').load('./sjc_member.html');
         selectedMemberItems = [0];
    });
}

// for form-Wizard Family ID dropDown
    $.ajax({
        url: '/com/sjc/family/getfamily',
        type: 'GET',
        success: function(data) {
            var dropdown = $('#memberFamliyId');
            $.each(data, function(_index, item) {
                dropdown.append($('<option></option>').attr('value', item.familyCode).text(item.familyCode));
                console.log("okey");
            });
        },
        error: function(_xhr, _status, error) {
            // Handle error
            console.error('Error fetching data from API:', error);
        }
    });
    
    
    //Married or Not disable function
     $('#memberMaritalStatus').change(function() {
        var selectedValue = $(this).val();
        if (selectedValue === 'Married') {
            $('#memberDateofWedding').prop('disabled', false);
        } else {
            $('#memberDateofWedding').prop('disabled', true);
            $('#memberDateofWedding').val('NULL'); // Reset date value to null
        }
    });
 
  // for form-wizard work
  var Mode = "add";
  var form = document.getElementById("msform");
  var fieldsets = form.querySelectorAll("form");
  var currentStep = 0;
  var numSteps = 4;
  var isValid = true;

  // Hide all form fieldsets except the first one
   for (var i = 1; i < fieldsets.length; i++) {
      fieldsets[i].style.display = "none";
   }
   
   //Reset all forms in the Wizard
    function memberFormwizardReset(){
	  console.log("reset From");
	  $('#memberForm0')[0].reset();
	  $('#memberForm1')[0].reset();
	  $('#memberForm2')[0].reset();
	  $('#memberForm3')[0].reset();
	  removeInvalidClasses();
  }
  
  function removeInvalidClasses() {
    $('.is-invalid').removeClass('is-invalid');
     $('.error-text').hide();
}
  
  //cancel button
	 $(document).on('click', '#cancel-button', function() {
	     console.log("cancel function from reset");
		 memberFormwizardReset();
	 });
  
   // Event handler for adding member
   $(document).on('click', '#addMember', function(event) {
	   event.preventDefault();
	   Mode= "add";
	   memberFormwizardReset();
	$('#MemberModal').modal('show'); 	
});
 
 
   //$(document).on('click', '#editMember', function()
    $('#editMember').click(function(){ 
	   switch (selectedMemberItems.length) {
	       case 1:
	            console.log("edit mode");
	            Mode="edit";
                var MemberId = selectedMemberItems[0].id;
	            loadMemberdata(MemberId);
	            $('#MemberModal').modal('show'); 
	            break;
	     case 0:
		       console.log("please select the  data first");
		       $("#Warning_Msg").html("please select the member data first");
		       $('#Warning_modal').modal('show');
		       break;
	    default:
		       $("#Warning_Msg").html("select the only member");
		       $('#Warning_modal').modal('show');
		       console.log("selectedMemberItems has multiple items");
		       break;
       }
      });
   
    $(document).off('click', '#membernextbtn');

// Event delegation for handling next step button click
   $(document).on('click', '#membernextbtn', function(event) {
	  event.preventDefault();
	  var formId= "memberForm"+currentStep;
		 console.log(formId);
         membervalidation[formId]();
         if (isValid) {
	 if(currentStep == numSteps-1){
		 $('#MemberModal').modal('hide');
         if(Mode === "add") {
			 console.log("add button submitted"); 		 
		 addMemberdata();
		 }else{
			var selectedMemberItem = selectedMemberItems[0];
           var MemberId = selectedMemberItem.id;
			 editMemberdata(MemberId);
		 }
		}else{
			membernextStep();
			}
			}
});

   $(document).on('click', '#memberbackbtn', function() {
   memberbackStep();
});
  
  $("#memberbackbtn").prop("disabled", true);
  
function membernextStep() {
  $("#memberbackbtn").prop("disabled", false);      
  currentStep++;
  if (currentStep > numSteps) {
    currentStep = 1;
  }
  var stepper = document.getElementById("stepper1");
  var steps = stepper.getElementsByClassName("step");

  Array.from(steps).forEach((step, index) => {
    let stepNum = index + 1;
    let stepLength = steps.length;
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
      document.getElementById("membernextbtn").textContent = "Finish";
    }
    if (currentStep > stepLength - 1) {
      document.getElementById("membernextbtn").textContent = "Finish";
      addClass(step, "done");
      addClass(step, "active");
      removeClass(step, "editing");
    }
  });
  }

function memberbackStep() {
  currentStep--;
  var stepper = document.getElementById("stepper1");
  var steps = stepper.getElementsByClassName("step");
  let stepLength = steps.length;
  document.getElementById("membernextbtn").textContent = "Next";
  document.getElementById("membernextbtn").disabled = false;
  if (currentStep < stepLength - 1) {
    document.getElementById("memberbackbtn").disabled = false;
    fieldsets[currentStep + 1].style.display = "none";
    fieldsets[currentStep].style.display = "flex";
    removeClass(steps[currentStep], "done");
    removeClass(steps[currentStep], "active");
    if (currentStep == 0) {
      document.getElementById("memberbackbtn").disabled = true;
    }
  } else {
    removeClass(steps[currentStep], "done");
    removeClass(steps[currentStep], "active");
  }
}


function hasClass(elem, className) {
  return new RegExp(" " + className + " ").test(" " + elem.className + " ");
}

function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += " " + className;
  }
}

function removeClass(elem, className) {
  console.log("elem, classNamej", elem, className);
  var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
  if (hasClass(elem, className)) {
    while (newClass.indexOf(" " + className + " ") >= 0) {
      newClass = newClass.replace(" " + className + " ", " ");
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, "");
  }
  console.log("elem.classNamej", elem.className);
  
}  
  
  
  // Function to add member data
  function  addMemberdata(){
	   var member_Data=gatherMemberData();
      console.log('add function');
      sendDataToServer(member_Data, 'add');
              }  
 
  // Function to load member data into the form
    function loadMemberdata(id){
	   $.ajax({
              url: `/com/sjc/member/${id}`,
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
    
    // Function to edit member data
    function editMemberdata(id){
           var member_Data=gatherAssetData();
            member_Data.id= id;
           console.log("edit data");
          sendDataToServer(member_Data, 'update');
	}
	
	 
  // Function to gather data from the form
  function gatherMemberData(){
	  return {
        mem_family_id: $('#memberFamliyId').val(),
        mem_first_name: $('#memberFirstName').val(),
        mem_last_name: $('#memberLastName').val(),
        mem_familiar_name: $('#memberFamiliarName').val(),
        mem_ic_number: $('#memberPassportNumber').val(),
        mem_date_of_birth:$('#memberDateofBirth').val(),
        mem_age: "22",
        mem_gender: $('input[name="memberGender"]:checked').val(),
        mem_marital_status: $('#memberMaritalStatus').val(),
        mem_date_of_wedding:$('#memberDateofWedding').val(),
        mem_email: $('#memberEmail').val(),
        mem_contact_number: $('#memberContactNumber').val(),
        mem_address_line_1: $('#memberAddressLine1').val(),
        mem_address_line_2: $('#memberAddressLine2').val(),
        mem_city:$('#memberCity').val(),
        mem_state: $('#memberState').val(),
        mem_zipcode:$('#memberZipcode').val(),
        mem_country: $('#memberCountry').val(),
        mem_baptised: $('input[name="memberBaptised"]:checked').val(),
        mem_date_of_baptism: $('#memberDateofBaptism').val(),
        mem_location_of_baptism:$('#memberLocationofBaptism').val(),
        mem_baptised_by: $('#memberBaptisedBy').val(),
        mem_date_of_confirmation:$('#memberDateofConfirmation').val(),
        mem_location_of_confirmation:  $('#memberLocationofConfirmation').val(),
        mem_confirmed_by: $('#memberConfirmedBy').val(),
        membership_type:$('#memberMembershipType').val(),
        membership_status: $('#memberMembershipStatus').val(),
        membership_start_date: $('#memberMembershipStartDate').val(),
        membership_end_date:$('#memberMembershipEndDate').val() 
	  };
  }
  
 // Function to send data to the server 
 function sendDataToServer(data, mode) {
	        $.ajax({
               url: `/com/sjc/member/${mode}`,
               type: 'POST',
               contentType: 'application/json',
               data: JSON.stringify(data),
               success: function(data) {
				currentStep = 0;
			    console.log(mode);
				(mode === 'add' ? $('#Add_Member_Modal') : $('#Update_Member_modal')).modal('show');
               console.log('API Response:', data);
               $('#main-content').load('./sjc_member.html');
              },
              error: function(error) {
              console.error('Error:', error);
            }
        });
	 }
  
// Function to fill form data with asset details	
	function fillFormData(Data) {
		          $('#memberFamliyId').val(Data. mem_family_id);
                  $('#memberFirstName').val(Data.mem_first_name);
                  $('#memberLastName').val(Data.mem_last_name);
                  $('#memberFamiliarName').val(Data.mem_familiar_name);
                  $('#memberPassportNumber').val(Data.mem_ic_number);
                  $('#memberDateofBirth').val(Data.mem_date_of_birth);
                  var gender = Data.mem_gender; // Assuming Data.mem_gender holds the gender value
                  $('input[name="memberGender"][value="' + gender + '"]').prop('checked', true);
                  $('#memberMaritalStatus').val(Data.mem_marital_status);
                  $('#memberDateofWedding').val(Data.mem_date_of_wedding);
                  $('#memberEmail').val(Data.mem_email);
                  $('#memberContactNumber').val(Data.mem_contact_number);
                  $('#memberAddressLine1').val(Data.mem_address_line_1);
                  $('#memberAddressLine2').val(Data.mem_address_line_2);
                  $('#memberCity').val(Data.mem_city);
                  $('#memberState').val(Data.mem_state);
                  $('#memberZipcode').val(Data.mem_zipcode);
                  $('#memberCountry').val(Data.mem_country);
                  var baptised = Data.mem_baptised; // Assuming Data.mem_gender holds the gender value
                  $('input[name="memberBaptised"][value="' + baptised + '"]').prop('checked', true);
                  $('#memberDateofBaptism').val(Data.mem_date_of_baptism);
                  $('#memberLocationofBaptism').val(Data.mem_location_of_baptism);
                  $('#memberBaptisedBy').val(Data.mem_baptised_by);
                  $('#memberDateofConfirmation').val(Data.mem_date_of_confirmation);
                  $('#memberLocationofConfirmation').val(Data.mem_location_of_confirmation);
                  $('#memberConfirmedBy').val(Data.mem_confirmed_by);
                  $('#memberMembershipType').val(Data.membership_type);
                  $('#memberMembershipStatus').val(Data.membership_status);
                  $('#memberMembershipStartDate').val(Data.membership_start_date);
                  $('#memberMembershipEndDate').val(Data.membership_end_date);
		}
		
//	validation part
  
  
const membervalidation = {                     
  memberForm0() { 
	  memberValidateSelect('#memberFamliyId', "Famliy Id");
	  memberValidateInput('#memberFirstName', "First Name", 3);
	  memberValidateInput('#memberLastName', "Last Name", 3); 
      memberValidateInput('#memberFamiliarName', "Familiar Name", 3);
      membervalidatepassportno('#memberPassportNumber', "Passport/IC No");
      memberValidateInput('#memberDateofBirth', "Date of Birth");
      memberValidateSelect('#memberMaritalStatus', "Marital Status");
  } , 
  memberForm1() {                       
      memberValidateInput('#memberEmail', "Email Id");
      memberValidateInput('#memberContactNumber', "Contact No");
      memberValidateInput('#memberAddressLine1', "Address");
      memberValidateInput('#memberAddressLine2', "Address");
      memberValidateSelect('#memberCity', "City");
      memberValidateSelect('#memberState', "State");
	  memberValidateSelect('#memberCountry', "Country");
      memberValidateInput('#memberZipcode', "Zipcode");     
  },                              
  memberForm2() {                       
	  memberValidateInput('#memberDateofBaptism', "Date of Baptism"); 
	  memberValidateInput('#memberLocationofBaptism', "Location of Baptism");  
	  memberValidateInput('#memberBaptisedBy', "Baptised By");
      memberValidateInput('#memberDateofConfirmation', "Date of Confirmation");
      memberValidateInput('#memberLocationofConfirmation', "Location of Confirmation");
      memberValidateInput('#memberConfirmedBy', "member Confirmed By");
     },
 memberForm3() {                       
     memberValidateSelect('#memberMembershipType', "Membership Type");
     memberValidateSelect('#memberMembershipStatus', "Membership status");
     memberValidateInput('#memberMembershipStartDate', "Membership StartDate");
     memberValidateInput('#memberMembershipEndDate', "Membership EndDate");                              
},                                
  }        
  
  
  // Generic function to validate input fields
	function memberValidateInput(fieldId, fieldName, minLength = 0) {
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
	function memberValidateSelect(fieldId, fieldName) {
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
	
	 function membervalidatepassportno(fieldId, fieldName, minLength = 0) {
    var fieldValue = $(fieldId).val().trim();
    var regex = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/; // Regular expression to allow A-Z, a-z, and numbers only

    if (fieldValue === '') {
        $(fieldId).addClass('is-invalid');
        $(`${fieldId}-error`).show().html(`Please enter the ${fieldName}`);
        isValid = false;
    } else if (!regex.test(fieldValue)) {
        $(fieldId).addClass('is-invalid');
        $(`${fieldId}-error`).show().html(`Please enter valid characters for ${fieldName}`);
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
    
    
    
})(jQuery);
function filterMemberData() {
    var searchText = $("#searchMemberInput").val().toLowerCase();
    $("#sjc_member").jsGrid("loadData", {
        member_id: searchText
    });
}
  