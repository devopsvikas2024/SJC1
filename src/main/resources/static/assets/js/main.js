// static navbar and sidebar dynamic page-content jk 17-01
		
		 $(document).ready(function() {
// Load  last loaded page or Dashboard.html by default

    var lastLoadedPage = localStorage.getItem('lastLoadedPage');
    if (lastLoadedPage) {
        $('#main-content').load(lastLoadedPage);
    } else {
        $('#main-content').load('./Dashboard.html');
    }

    $('.sidebar-menu').click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        $('#main-content').load(url, function() {
            localStorage.setItem('lastLoadedPage', url); 
        });
    });
	        
	        
	        
 // get userid from session Storage and fetch name from db and display 
	         var userId = sessionStorage.getItem('userId');
	         
	          if (userId) {
             $.ajax({
              url: `/com/sjc/user/${userId}`,
              method: 'GET',
              dataType: 'json',
              success: function(userData) {
              displayUserProfile(userData);
              },
              error: function(textStatus, errorThrown) {
                console.error('Error fetching user data:', textStatus, errorThrown);
                 } 
             });
              } else {
           console.error('User ID not found in session storage');
             }
	         
	         
	          function displayUserProfile(user) {
                $('#nav_username').text(user.firstName + " "+ user.lastName);
                $('#nav_usertype').text(user.userType);
                }
                
                const userType =sessionStorage.getItem('userType') || 'user'
                
                 const adminMenu = document.getElementById('adminMenu');
                 const assetMenu = document.getElementById('assetMenu');
                 const memberMenu = document.getElementById('memberMenu');
                
                 // show the navbar 
                function showNavMenu(element) {
               if (element) {
                  element.classList.remove('hiddenItem');
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
                } else if (userType === "user"){
                showNavMenu(assetMenu);
                }
                
                		
    var apiUrlForAssetNotify = "/com/sjc/asset/assetcreatedbyactivitytimeline";
    var apiUrlForMemberNotify = "/com/sjc/member/memberlastandpredataforcreatedby";
    
    $.ajax({
        url: apiUrlForAssetNotify,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#asset-notify').text(data[0].assetCreatedBy + " added new asset");
            updateBadge();
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });

    $.ajax({
        url: apiUrlForMemberNotify,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#member-notify').text(data[0].laCreatedBy + " added new member");
            updateBadge();
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });


    function updateBadge() {
        var assetCount = parseInt($('#notification-badge').text());
        $('#notification-badge').text(assetCount + 1);
        $('#notification-badge').show(); // Show the badge
    }

   
    $('.notification-box').click(function() {
        $('#notification-badge').hide(); 
    });		    

             });
             
   function toggleSidebar(){
	  $(".sidebar-submenu").css("display","none");
  }           
  
  function userLogout(){
	 console.log("worked");
	 sessionStorage.clear();
  }          
  // hide the submenu when menu is clicked 
  
  
  

             