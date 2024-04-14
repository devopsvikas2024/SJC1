var form = document.getElementById("msform");
var fieldsets = form.querySelectorAll("form");
var currentStep = 0;
var numSteps = 4;
  var isValid = true;

for (var i = 1; i < fieldsets.length; i++) {
  fieldsets[i].style.display = "none";
}

function membernextStep() {
  document.getElementById("backbtn").disabled = false;
   var formId= "form"+currentStep;
  validation[formId]();
   if (isValid) {      
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
      document.getElementById("nextbtn").textContent = "Finish";
    }
    if (currentStep > stepLength - 1) {
      document.getElementById("nextbtn").textContent = "Finish";
      addClass(step, "done");
      addClass(step, "active");
      removeClass(step, "editing");
      addassetdata();   
      document.getElementById("nextbtn").disabled = true;
    }
  });
  }
  }

function memberbackStep() {
  currentStep--;
  var stepper = document.getElementById("stepper1");
  var steps = stepper.getElementsByClassName("step");
  let stepLength = steps.length;
  document.getElementById("nextbtn").textContent = "Next";
  document.getElementById("nextbtn").disabled = false;
  if (currentStep < stepLength - 1) {
    document.getElementById("backbtn").disabled = false;
    fieldsets[currentStep + 1].style.display = "none";
    fieldsets[currentStep].style.display = "flex";
    removeClass(steps[currentStep], "done");
    removeClass(steps[currentStep], "active");
    if (currentStep == 0) {
      document.getElementById("backbtn").disabled = true;
    }
  } else {
    removeClass(steps[currentStep], "done");
    removeClass(steps[currentStep], "active");
  }
}

// function prevStep(){
//   fieldsets[currentStep].style.display = "none";
//   currentStep--;
//   fieldsets[currentStep].style.display = "block";
// }

/* get, set class, see https://ultimatecourses.com/blog/javascript-hasclass-addclass-removeclass-toggleclass */

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
  
  
const validation = {                     
  form0() { 
	    $('.form-control').removeClass('is-invalid');
        $('.form-select').removeClass('is-invalid');
	   
	    isValid = true;
	    
	     var memberFamliyId = $('#memberFamliyId').val();
        if (memberFamliyId === null||memberFamliyId === '') {
            $('#memberFamliyId').addClass('is-invalid');
            $("#memberFamliyId-error").show();
            $("#memberFamliyId-error").html("please select the FamliyId");
            $("#memberFamliyId-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberFamliyId-error").hide();
    }
    
    var memberFirstName = $('#memberFirstName').val().trim();
        if (memberFirstName ==='') {
            $('#memberFirstName').addClass('is-invalid');
            $("#memberFirstName-error").show();
            $("#memberFirstName-error").html("First Name is required");
            $("#memberFirstName-error").css("color", "red");
            isValid = false;
            }
         else {
        $("#memberFirstName-error").hide();
    } 
    
         var memberLastName = $('#memberLastName').val().trim();
        if (memberLastName ==='') {
            $('#memberLastName').addClass('is-invalid');
            $("#memberLastName-error").show();
            $("#memberLastName-error").html("Last Name  is required");
            $("#memberLastName-error").css("color", "red");
            isValid = false;
            }
         else {
        $("#memberLastName-error").hide();
    }
    
        var memberFamiliarName = $('#memberFamiliarName').val().trim();
        if (memberFamiliarName ==='') {
            $('#memberFamiliarName').addClass('is-invalid');
            $("#memberFamiliarName-error").show();
            $("#memberFamiliarName-error").html("Familiar Name is required**");
            $("#memberFamiliarName-error").css("color", "red");
            isValid = false;
            }
         else {
        $("#memberFamiliarName-error").hide();
    }
      
           var memberPassportNumber = $('#memberPassportNumber').val().trim();
        if (memberPassportNumber ==='') {
            $('#memberPassportNumber').addClass('is-invalid');
            $("#memberPassportNumber-error").show();
            $("#memberPassportNumber-error").html("Passport Number  is required");
            $("#memberPassportNumber-error").css("color", "red");
            isValid = false;
            }
         else {
        $("#memberPassportNumber-error").hide();
    }
       
      
          var memberDateofBirth = $('#memberDateofBirth').val();
        if (memberDateofBirth ==='') {
            $('#memberDateofBirth').addClass('is-invalid');
            $("#memberDateofBirth-error").show();
            $("#memberDateofBirth-error").html("Mention your Date of Birth");
            $("#memberDateofBirth-error").css("color", "red");
            isValid = false;
            }
         else {
        $("#memberDateofBirth-error").hide();
    }   
    
     var memberMaritalStatus = $('#memberMaritalStatus').val();
        if (memberMaritalStatus === null||memberMaritalStatus === '') {
            $('#memberMaritalStatus').addClass('is-invalid');
            $("#memberMaritalStatus-error").show();
            $("#memberMaritalStatus-error").html(" Mention your MaritalStatus");
            $("#memberMaritalStatus-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberMaritalStatus-error").hide();
    }
    
           var memberDateofWedding = $('#memberDateofWedding').val();
        if (memberDateofWedding ==='') {
            $('#memberDateofWedding').addClass('is-invalid');
            $("#memberDateofWedding-error").show();
            $("#memberDateofWedding-error").html("select the Date of Wedding ");
            $("#memberDateofWedding-error").css("color", "red");
            isValid = false;
            }
         else {
        $("#memberDateofWedding-error").hide();
    } 
         
         
         if (!$('input[name="memberGender"]:checked').val()) {
			$("#memberGender-error").show();
            $("#memberGender-error").html("select your gender");
            $("#memberGender-error").css("color", "red");
            isValid = false; 
		 } else{
           $("#memberGender-error").hide();			 
		 }
         
  
  } , 
                            
  form1() {                       
     $('.form-control').removeClass('is-invalid');
        $('.form-select').removeClass('is-invalid');
	    isValid = true;
	   
     var memberEmail = $('#memberEmail').val();
        if (memberEmail === '') {
            $('#memberEmail').addClass('is-invalid');
            $("#memberEmail-error").show();
            $("#memberEmail-error").html("Email id required");
            $("#memberEmail-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberEmail-error").hide();
    }
    
     var memberContactNumber = $('#memberContactNumber').val();
        if (memberContactNumber === '') {
            $('#memberContactNumber').addClass('is-invalid');
            $("#memberContactNumber-error").show();
            $("#memberContactNumber-error").html("Contact Number  required");
            $("#memberContactNumber-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberContactNumber-error").hide();
    }	
    
    
     var memberAddressLine1= $('#memberAddressLine1').val();
        if ( memberAddressLine1 === '') {
            $('#memberAddressLine1').addClass('is-invalid');
            $("#memberAddressLine1-error").show();
            $("#memberAddressLine1-error").html("Address  required");
            $("#memberAddressLine1-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberAddressLine1-error").hide();
    }	
    
     var memberAddressLine2= $('#memberAddressLine2').val();
        if ( memberAddressLine2 === '') {
            $('#memberAddressLine2').addClass('is-invalid');
            $("#memberAddressLine2-error").show();
            $("#memberAddressLine2-error").html("Address   required");
            $("#memberAddressLine2-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberAddressLine2-error").hide();
    }	
    
       var memberCity = $('#memberCity').val();
        if (memberCity === null||memberCity === '') {
            $('#memberCity').addClass('is-invalid');
            $("#memberCity-error").show();
            $("#memberCity-error").html("please select the city");
            $("#memberCity-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberCity-error").hide();
    }
    
       var memberState= $('#memberState').val();
        if (memberState === null||memberState === '') {
            $('#memberState').addClass('is-invalid');
            $("#memberState-error").show();
            $("#memberState-error").html("please select the State");
            $("#memberState-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberState-error").hide();
    }
    
       var memberCountry = $('#memberCountry').val();
        if (memberCountry === null||memberCountry === '') {
            $('#memberCountry').addClass('is-invalid');
            $("#memberCountry-error").show();
            $("#memberCountry-error").html("please select the  Country ");
            $("#memberCountry-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberCountry-error").hide();
    }
    
    
    
       var memberZipcode = $('#memberZipcode').val();
        if (memberZipcode === '') {
            $('#memberZipcode').addClass('is-invalid');
            $("#memberZipcode-error").show();
            $("#memberZipcode-error").html("please Enter the zipcode");
            $("#memberZipcode-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberZipcode-error").hide();
    }
    
    
	    
  },                              
                                  
  form2() {                       
     $('.form-control').removeClass('is-invalid');
        $('.form-select').removeClass('is-invalid');
	    isValid = true;
	  
	   var memberDateofBaptism = $('#memberDateofBaptism').val();
        if (memberDateofBaptism ===  '') {
            $('#memberDateofBaptism').addClass('is-invalid');
            $("#memberDateofBaptism-error").show();
            $("#memberDateofBaptism-error").html("please select the Date of Baptism");
            $("#memberDateofBaptism-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberDateofBaptism-error").hide();
    } 
    
     
     
      var memberLocationofBaptism = $('#memberLocationofBaptism').val();
        if (memberLocationofBaptism ===  '') {
            $('#memberLocationofBaptism').addClass('is-invalid');
            $("#memberLocationofBaptism-error").show();
            $("#memberLocationofBaptism-error").html("Location of Baptism is required");
            $("#memberLocationofBaptism-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberLocationofBaptism-error").hide();
    } 
    
       var memberBaptisedBy = $('#memberBaptisedBy').val();
        if (memberBaptisedBy ===  '') {
            $('#memberBaptisedBy').addClass('is-invalid');
            $("#memberBaptisedBy-error").show();
            $("#memberBaptisedBy-error").html("Baptised by is required");
            $("#memberBaptisedBy-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberBaptisedBy-error").hide();
    } 
    
     var memberDateofConfirmation = $('#memberDateofConfirmation').val();
        if (memberDateofConfirmation ===  '') {
            $('#memberDateofConfirmation').addClass('is-invalid');
            $("#memberDateofConfirmation-error").show();
            $("#memberDateofConfirmation-error").html("Date of Confirmation is required");
            $("#memberDateofConfirmation-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberDateofConfirmation-error").hide();
    } 
    
     var memberLocationofConfirmation= $('#memberLocationofConfirmation').val();
        if (memberLocationofConfirmation ===  '') {
            $('#memberLocationofConfirmation').addClass('is-invalid');
            $("#memberLocationofConfirmation-error").show();
            $("#memberLocationofConfirmation-error").html("Location of Confirmation is required");
            $("#memberLocationofConfirmation-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberLocationofConfirmation-error").hide();
    } 
    
     var memberConfirmedBy = $('#memberConfirmedBy').val();
        if (memberConfirmedBy ===  '') {
            $('#memberConfirmedBy').addClass('is-invalid');
            $("#memberConfirmedBy-error").show();
            $("#memberConfirmedBy-error").html("Confirmed By is required");
            $("#memberConfirmedBy-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberConfirmedBy-error").hide();
    } 
	   
	                               
                                  
},

 form3() {                       
     $('.form-control').removeClass('is-invalid');
        $('.form-select').removeClass('is-invalid');
	 
	    isValid = true;
	   
	    var memberMembershipType = $('#memberMembershipType').val();
        if (memberMembershipType ===  ''|| memberMembershipType== null) {
            $('#memberMembershipType').addClass('is-invalid');
            $("#memberMembershipType-error").show();
            $("#memberMembershipType-error").html("Membership Type is required");
            $("#memberMembershipType-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberMembershipType-error").hide();
    } 
    
      var memberMembershipStatus = $('#memberMembershipStatus').val();
        if (memberMembershipStatus ===  ''|| memberMembershipStatus === null) {
            $('#memberMembershipStatus').addClass('is-invalid');
            $("#memberMembershipStatus-error").show();
            $("#memberMembershipStatus-error").html("Membership Status is required");
            $("#memberMembershipStatus-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberMembershipStatus-error").hide();
    } 
    
     var memberMembershipStartDate = $('#memberMembershipStartDate').val();
        if (memberMembershipStartDate ===  '') {
            $('#memberMembershipStartDate').addClass('is-invalid');
            $("#memberMembershipStartDate-error").show();
            $("#memberMembershipStartDate-error").html("Membership StartDate is required");
            $("#memberMembershipStartDate-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberMembershipStartDate-error").hide();
    } 
    
     var   memberMembershipEndDate = $('#memberMembershipEndDate').val();
        if (memberMembershipEndDate ===  '') {
            $('#memberMembershipEndDate').addClass('is-invalid');
            $("#memberMembershipEndDate-error").show();
            $("#memberMembershipEndDate-error").html("Membership EndDate is required");
            $("#memberMembershipEndDate-error").css("color", "red");
            isValid = false;
        }else {
        $("#memberMembershipEndDate-error").hide();
    }                      
                                  
},                                
  }                        
  // add asset data 
  
  function  addassetdata(){
	    memberFamliyId =  $('#memberFamliyId').val();
        memberFirstName = $('#memberFirstName').val();
        memberLastName = $('#memberLastName').val();
        memberFamiliarName = $('#memberFamiliarName').val();
        memberPassportNumber = $('#memberPassportNumber').val();
        memberDateofBirth = $('#memberDateofBirth').val();
        memberGender =$('input[name="memberGender"]:checked').val();
        memberMaritalStatus = $('#memberMaritalStatus').val();
        memberDateofWedding = $('#memberDateofWedding').val();
        memberEmail = $('#memberEmail').val();
        memberContactNumber = $('#memberContactNumber').val();
        memberAddressLine1= $('#memberAddressLine1').val();
        memberAddressLine2= $('#memberAddressLine2').val();
        memberCity = $('#memberCity').val();
        memberState= $('#memberState').val();
        memberCountry = $('#memberCountry').val();
        memberZipcode = $('#memberZipcode').val();
        memberDateofBaptism = $('#memberDateofBaptism').val();
        memberLocationofBaptism = $('#memberLocationofBaptism').val();
        memberBaptisedBy = $('#memberBaptisedBy').val();
        memberDateofConfirmation = $('#memberDateofConfirmation').val();
	    memberLocationofConfirmation= $('#memberLocationofConfirmation').val();
	    memberConfirmedBy = $('#memberConfirmedBy').val();
	    memberMembershipType = $('#memberMembershipType').val();
	    memberMembershipStatus = $('#memberMembershipStatus').val();
	    memberMembershipStartDate = $('#memberMembershipStartDate').val();
	    memberMembershipEndDate = $('#memberMembershipEndDate').val();
	    
	    
	    var member_data={
			 FamliyId: memberFamliyId,
			 FirstName: memberFirstName,
			 LastName: memberLastName,
			 FamiliarName: memberFamiliarName,
			 PassportNumber: memberPassportNumber,
			 DateofBirth: memberDateofBirth,
			 Gender: memberGender,
			 MaritalStatus: memberMaritalStatus,
			 DateofWedding: memberDateofWedding,
			 Email:memberEmail,
			 ContactNumber:memberContactNumber,
			 AddressLine1:memberAddressLine1,
			 AddressLine2:memberAddressLine2,
			 City:memberCity,
			 State: memberState,
			 Country:memberCountry,
			 Zipcode: memberZipcode,
			 DateofBaptism:memberDateofBaptism,
			 LocationofBaptism:memberLocationofBaptism,
			 BaptisedBy:memberBaptisedBy,
			 DateofConfirmation : memberDateofConfirmation,
			 ConfirmedBy : memberConfirmedBy,
			 MembershipType:memberMembershipType,
			 MembershipStatus:memberMembershipStatus,
			 MembershipStartDate:memberMembershipStartDate,
			 MembershipEndDate :memberMembershipEndDate 
			  
		}
		
		console.log(member_data);
  }                              