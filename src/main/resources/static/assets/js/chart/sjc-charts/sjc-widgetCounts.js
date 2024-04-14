

//BY ALEXPANDIAN S

$(document).ready(function() {
	
	// member counts for widget
    var membercountsapiUrl = '/com/sjc/member/membercounts'; 
    
    // family counts for widget  
    var familycountsapiUrl = '/com/sjc/family/familycounts'; 
    
     // asset counts for widget
    var assetcountsapiUrl = '/com/sjc/asset/assetcounts'; 
    
     // member baptised confirmation Count for widget
    var memberbaptisedconfirmationCountapiUrl = '/com/sjc/member/memberbaptisedconfirmationCount'; 
    
     // member baptized count for widget
    var memberbaptizedcountapiUrl = '/com/sjc/member/memberbaptizedcount'; 
      
      // member counts-ajax
    $.ajax({
        url: membercountsapiUrl,
        type: 'GET',
        success: function(data) {
            $('#widget-member-counts').text(data);
        },
        error: function(error) {
            console.error('Error fetching user count:', error);
        }
    });
    
     // family counts- ajax
     
      $.ajax({
        url: familycountsapiUrl,
        type: 'GET',
        success: function(data) {
            $('#widget-family-counts').text(data);
        },
        error: function( error) {
            console.error('Error fetching user count:', error);
        }
    });
   
    
     // asset counts-ajax
     $.ajax({
        url: assetcountsapiUrl,
        type: 'GET',
        success: function(data) {
            $('#widget-assets-counts').text(data);
        },
        error: function(  error) {
            console.error('Error fetching user count:', error);
        }
    });
    
    // member baptized count -ajax
      $.ajax({
        url: memberbaptizedcountapiUrl,
        type: 'GET',
        success: function(data) {
           // Convert string to integer
            $('#widget-baptised-counts').text(data);
        },
        error: function( error) {
            console.error('Error fetching user count:', error);
        }
    });
    
    
       // member baptised confirmation Count -ajax
     $.ajax({
        url: memberbaptisedconfirmationCountapiUrl,
        type: 'GET',
        success: function(data) {
          
            $('#widget-confirmation-counts').text(data);
        },
        error: function( error) {
            console.error('Error fetching user count:', error);
        }
    });
    
    
      //member lastand & pre data for createdby
        var apiUrlMemberTimeline = "http://localhost:8080/com/sjc/member/memberlastandpredataforcreatedby"
        var apiUrlAssetTimeline ="http://localhost:8080/com/sjc/asset/assetcreatedbyactivitytimeline"
     $.ajax({
		 
                url:apiUrlMemberTimeline ,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    $('#activity-timeline-lastcreateddate').text(data[0].laCreatedDt );
                    $('#activity-timeline-last-createdby').text(data[0].laCreatedBy + " " + "added new member");
                    $("#activity-timeline-last-membername").text(data[0].laMemFirstName +" "+ data[0].laMemLastName);
                     $('#activity-timeline-pre-createddate').text(data[0].preCreatedDt );
                    $('#activity-timeline-pre-createdby').text(data[0].preCreatedBy + " " + "added new member");
                    $("#activity-timeline-pre-membername").text(data[0].preMemFirstName +" "+ data[0].preMemLastName);
                },
                error: function( error) {
                    console.error('Error:', error);
                }
            });
             $.ajax({
		 
                url:apiUrlAssetTimeline ,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    $('#activity-timeline-asset-createddate').text(data[0].assetCreatedDt );
                    $('#activity-timeline-asset-createdby').text(data[0].assetCreatedBy + " " + "added new asset");
                    $("#activity-timeline-asset-name").text(data[0].assetName);
                    
                },
                error: function( error) {
                    console.error('Error:', error);
                }
            });
});



