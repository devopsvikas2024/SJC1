google.charts.load('current', {packages: ['corechart', 'bar', 'line']});
google.charts.setOnLoadCallback(drawBasic);
function drawBasic() {


// ASSET-CHART
if ($("#asset-chart").length > 0) {
    $.ajax({
        url: '/com/sjc/asset/assetclassificationcounts',
        dataType: 'json',
        success: function(response) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'AssetClassification');
            data.addColumn('number', 'Counts');
 
            $.each(response, function(_index, row) {
                data.addRow([row.classification, row.count]);
               
            });

            var options = {
                hAxis: { title: 'AssetClassification', titleTextStyle: { color: '#333' } },
                vAxis: { minValue: 1 },
                width: '100%',
                height: 400,
                colors: [CionAdminConfig.primary, CionAdminConfig.secondary]
            };

            var chart = new google.visualization.AreaChart(document.getElementById('asset-chart'));
            chart.draw(data, options);
        }
    });
}

//asset-classification-chart
if ($("#asset-classification-chart").length > 0) {
	   var assetclassificationMonthYearwiseChart = new google.visualization.AreaChart(document.getElementById("asset-classification-chart"));
           
           
  function updateClassificationMonthYearwiseChart(selectedClassificationYear, selectedClassification, data) {
      var filteredClassificationData = data.filter(item => item.asset_purchase_year == selectedClassificationYear && item.asset_classification == selectedClassification);
      var chartClassificationDataArray = [["Month", "Counts"]];
      filteredClassificationData.forEach(item => {
          chartClassificationDataArray.push([item.asset_purchase_month, item.classificationCount]);
      });
      var assetClassificationChartData = google.visualization.arrayToDataTable(chartClassificationDataArray);

      var options = {
		  hAxis: { title: 'Month', titleTextStyle: { color: '#333' } },
          vAxis: { minValue: 1 },
          width: '100%',
          height: 400,
          colors: [CionAdminConfig.primary, CionAdminConfig.secondary]
      };
          
      assetclassificationMonthYearwiseChart.draw(assetClassificationChartData,options);
  }

  $.ajax({
      url: '/com/sjc/asset/assetclassificationvalueandcountbymonth',
      type: 'GET',
      success: function (data) {
          var uniqueClassificationYears = [...new Set(data.map(item => item.asset_purchase_year))];
          var uniqueClassification = [...new Set(data.map(item => item.asset_classification))];

          var selectedClassificationYear = document.getElementById('select-Asset-count-classification-year');
          uniqueClassificationYears.forEach(function (year) {
              var optionYear = document.createElement('option');
              optionYear.text = year;
              selectedClassificationYear.add(optionYear);
          });

          var selectedClassification = document.getElementById('select-Asset-count-classification');
          uniqueClassification.forEach(function (classification){
              var optionClassification = document.createElement('option');
              optionClassification.text = classification;
              selectedClassification.add(optionClassification)
          })

          $('#select-Asset-count-classification-year').on('change', function () {
              var selectedClassificationYear = $(this).val();
              var selectedClassification = $('#select-Asset-count-classification').val();
              updateClassificationMonthYearwiseChart(selectedClassificationYear, selectedClassification, data);
          });

          $('#select-Asset-count-classification').on('change', function () {
              var selectedClassification = $(this).val();
              var selectedClassificationYear = $('#select-Asset-count-classification-year').val();
              updateClassificationMonthYearwiseChart(selectedClassificationYear, selectedClassification, data);
          });

          var initialClassificationYear = $('#select-Asset-count-classification-year').val();
          var initialClassification = $('#select-Asset-count-classification').val();
          updateClassificationMonthYearwiseChart(initialClassificationYear, initialClassification, data);
      },
      error: function (error) {
          console.error('Error fetching data from API:', error);
      }
  });
	  
  }
 

//asset-value-chart
if ($("#asset-value-chart").length > 0) {
    // Make an AJAX request to fetch the data
    $.ajax({
        url: '/com/sjc/asset/assetpurchasevalues',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'AssetClassification');
            data.addColumn('number', 'Values');

            // Loop through the response data and add it to the DataTable
            $.each(response, function(_index, row) {
                data.addRow([row.classification, parseFloat(row.value)]);
            });

            var options = {
                hAxis: { title: 'AssetClassification', titleTextStyle: { color: '#333' } },
                vAxis: { minValue: 1 },
                width: '100%',
                height: 400,
                colors: [CionAdminConfig.primary, CionAdminConfig.secondary, "#51bb25"]
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('asset-value-chart'));
            chart.draw(data, options);
        },
        error: function( error) {
            console.error("Error loading data:", error);
        }
    });
}

  
  // asset summary by values
  
 // asset-valuemonth-chart
  if ($("#asset-valuemonth-chart").length > 0) {
       var assetValueMonthYearwiseChart = new google.charts.Bar(document.getElementById("asset-valuemonth-chart"));

  function updateAssetValueMonthYearwiseChart(selectedClassificationValueYear, selectedClassificationForValue, data) {
      var filteredAssetValueData = data.filter(item => item.asset_purchase_year == selectedClassificationValueYear && item.asset_classification == selectedClassificationForValue);
      var chartAssetValueDataArray = [["Month", "Value"]];
      filteredAssetValueData.forEach(item => {
          chartAssetValueDataArray.push([item.asset_purchase_month, item.purchase_value]);
      });
      var assetValueChartData = google.visualization.arrayToDataTable(chartAssetValueDataArray);

      var options = {
          bars: "vertical",
          vAxis: {
              format: "decimal"
          },
          height: 400,
          width: '100%',
          colors: ["#51bb25"]
      };
      assetValueMonthYearwiseChart.draw(assetValueChartData, google.charts.Bar.convertOptions(options));
  }

  $.ajax({
      url: '/com/sjc/asset/assetclassificationvalueandcountbymonth',
      type: 'GET',
      success: function (data) {
          var uniqueAssetValueYears = [...new Set(data.map(item => item.asset_purchase_year))];
          var uniqueClassificationForValue = [...new Set(data.map(item => item.asset_classification))];

          var selectedAssetValueYear = document.getElementById('select-Asset-value-classification-year');
          uniqueAssetValueYears.forEach(function (year) {
              var optionYear = document.createElement('option');
              optionYear.text = year;
              selectedAssetValueYear.add(optionYear);
          });

          var selectedClassificationForValue = document.getElementById('select-Asset-value-classification');
          uniqueClassificationForValue.forEach(function (classification){
              var optionClassification = document.createElement('option');
              optionClassification.text = classification;
              selectedClassificationForValue.add(optionClassification)
          })

          $('#select-Asset-value-classification-year').on('change', function () {
              var selectedAssetValueYear = $(this).val();
              var selectedClassificationForValue = $('#select-Asset-value-classification').val();
              updateAssetValueMonthYearwiseChart(selectedAssetValueYear, selectedClassificationForValue, data);
          });

          $('#select-Asset-value-classification').on('change', function () {
              var selectedClassificationForValue = $(this).val();
              var selectedAssetValueYear = $('#select-Asset-value-classification-year').val();
              updateAssetValueMonthYearwiseChart(selectedAssetValueYear, selectedClassificationForValue, data);
          });

          var initialAssetValueYear = $('#select-Asset-value-classification-year').val();
          var initialClassificationForValue = $('#select-Asset-value-classification').val();
          updateAssetValueMonthYearwiseChart(initialAssetValueYear, initialClassificationForValue, data);
      },
      error: function (error) {
          console.error('Error fetching data from API:', error);
      }
  });
	  
  }  
  
  // Member-chart
  
  if ($("#Member-chart").length > 0) {
$.ajax({
  url: '/com/sjc/member/memberdatacounts',
  method: 'GET',
  success: function(response) {
    var data = response.map(function(item) {
      return [item.membership_type, item.count];
    });

    var chartData = google.visualization.arrayToDataTable([
      ['Membership Type', 'Counts'],
      ...data
    ]);

    var options = {
      bars: 'vertical',
      vAxis: { format: 'decimal' },
      height: 400,
      width: '100%',
      colors: [CionAdminConfig.primary, CionAdminConfig.secondary, '#51bb25']
    };

    // Draw the chart
    var chart = new google.charts.Bar(document.getElementById('Member-chart'));
    chart.draw(chartData, google.charts.Bar.convertOptions(options));
  },
  error: function(error) {
    console.error('Failed to fetch data:', error);
  }
});

  }
  
  //pie-chart : Age-Demographics-chart
  
if ($("#Age-Demographics-chart").length > 0) {
    $.ajax({
        url: '/com/sjc/member/memberpercentagedateofbirthwise',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            var data = new google.visualization.DataTable();
            
            data.addColumn('string', 'Age Demographics');
            data.addColumn('number', 'percentage');

            response.forEach(function(item) {
				 var percentage = parseFloat(item.percentage)
                data.addRow([item.member_age, percentage]);
            });

            var options = {
                is3D: true,
                width: '100%',
                height: 400,
                colors: ["#f8d62b", "#a927f9", "#51bb25", CionAdminConfig.secondary, CionAdminConfig.primary]
            };
            var chart = new google.visualization.PieChart(document.getElementById('Age-Demographics-chart'));
            chart.draw(data, options);
        },
        error: function( error) {
            console.error('Error loading data:', error);
        }
    });
}

//Member-Age-chart
          
  if ($("#Member-Age-chart").length > 0) {
  $.ajax({
    url: '/com/sjc/member/membercountdateofbirthwise',
    dataType: 'json',
    success: function (data) {
      var dataArray = [["Age Demographics", "Counts"]];
      data.forEach(function (item) {
        dataArray.push([item.member_age, item.count]);
      });

      var dataTable = google.visualization.arrayToDataTable(dataArray);

      var options = {
        bars: "vertical",
        vAxis: { minValue: 1 },
        height: 400,
        width: '100%',
        colors: [CionAdminConfig.primary, CionAdminConfig.secondary, "#51bb25"]
      };

      var chart = new google.charts.Bar(document.getElementById("Member-Age-chart"));
      chart.draw(dataTable, google.charts.Bar.convertOptions(options));
    },
    error: function ( textStatus, errorThrown) {
      console.error("Error fetching data: " + textStatus, errorThrown);
    }
  });
}

//Member-classification-chart
  
 if ($("#Member-classification-chart").length > 0) {
  var memberTypeMonthYearwiseChart = new google.charts.Bar(document.getElementById("Member-classification-chart"));

  function updateMemberTypeChart(selectedMemberTypeYear, selectedMemberType, data) {
      var filteredMemberTypeData = data.filter(item => item.membersYear == selectedMemberTypeYear && item.membershipType == selectedMemberType);
      var chartMemberTypeDataArray = [["Month", "Counts"]];
      filteredMemberTypeData.forEach(item => {
          chartMemberTypeDataArray.push([item.membersMonth, item.membersCount]);
      });
      var memberTypeChartData = google.visualization.arrayToDataTable(chartMemberTypeDataArray);

      var options = {
          bars: "vertical",
          vAxis: {
              format: "decimal"
          },
          height: 400,
          width: '100%',
          colors: ["#51bb25"]
      };
      memberTypeMonthYearwiseChart.draw(memberTypeChartData, google.charts.Bar.convertOptions(options));
  }

  $.ajax({
      url: '/com/sjc/member/memberdatamonthwisecounts',
      type: 'GET',
      success: function (data) {
          var uniqueMembertypeYears = [...new Set(data.map(item => item.membersYear))];
          var uniqueMemberType = [...new Set(data.map(item => item.membershipType))];

          var selectMembertypeYear = document.getElementById('select-year-member-type-for-count');
          uniqueMembertypeYears.forEach(function (year) {
              var optionYear = document.createElement('option');
              optionYear.text = year;
              selectMembertypeYear.add(optionYear);
          });

          var selectMembertype = document.getElementById('select-member-type-for-count');
          uniqueMemberType.forEach(function (type){
              var optionMemberType = document.createElement('option');
              optionMemberType.text = type;
              selectMembertype.add(optionMemberType)
          })

          $('#select-year-member-type-for-count').on('change', function () {
              var selectedMembertypeYear = $(this).val();
              var selectedMemberType = $('#select-member-type-for-count').val();
              updateMemberTypeChart(selectedMembertypeYear, selectedMemberType, data);
          });

          $('#select-member-type-for-count').on('change', function () {
              var selectedMemberType = $(this).val();
              var selectedMembertypeYear = $('#select-year-member-type-for-count').val();
              updateMemberTypeChart(selectedMembertypeYear, selectedMemberType, data);
          });

          var initialYear = $('#select-year-member-type-for-count').val();
          var initialMemberType = $('#select-member-type-for-count').val();
          updateMemberTypeChart(initialYear, initialMemberType, data);
      },
      error: function (error) {
          console.error('Error fetching data from API:', error);
      }
  });
}
 
 
 //Baptism-Trends-chart
  
if ($("#Baptism-Trends-chart").length > 0) {
  
  var baptismMonthwiseChart = new google.charts.Bar(document.getElementById("Baptism-Trends-chart"));

  // Function to update the chart based on the selected year
  function updateChart(selectedYear, data) {
    var filteredData = data.filter(item => item.baptised_year == selectedYear);
    var chartDataArray = [["Baptism Month", "Counts"]];
    filteredData.forEach(item => {
      chartDataArray.push([item.baptism_month, item.baptised_count]);
    });

    var chartData = google.visualization.arrayToDataTable(chartDataArray);

    var options = {
      bars: "vertical",
      vAxis: {
        format: "decimal"
      },
      height: 400,
      width: '100%',
      colors: ["#51bb25"]
    };

   
    baptismMonthwiseChart.draw(chartData, google.charts.Bar.convertOptions(options));
  }

  
  $.ajax({
    url: '/com/sjc/member/memberbaptisedmonthwisecount',
    type: 'GET',
    success: function (data) {
     
      var uniqueYears = [...new Set(data.map(item => item.baptised_year))];

     
      var select = document.getElementById('year-select-for-baptism');
      uniqueYears.forEach(function (year) {
        var option = document.createElement('option');
        option.text = year;
        select.add(option);
      });

      $('#year-select-for-baptism').on('change', function () {
        var selectedYear = $(this).val();
        updateChart(selectedYear, data);
      });
        //Year-Select for drop down
      var initialYear = $('#year-select-for-baptism').val();
      updateChart(initialYear, data);
    },
    error: function (error) {
       // Handle error
      console.error('Error fetching data from API:', error);
    }
  });
}
  
  //Confirmation-Trends-chart
  
 if ($("#Confirmation-Trends-chart").length > 0) {
  var baptismConfirmationMonthwiseChart = new google.charts.Bar(document.getElementById("Confirmation-Trends-chart"));

  function updateConfirmationChart(selectedConfirmationYear, data) {
    var filteredConfirmationData = data.filter(item => item.confirmationBaptisedYear == selectedConfirmationYear);
    var confirmationChartDataArray = [["Confirmation Month", "Counts"]];
    filteredConfirmationData.forEach(item => {
      confirmationChartDataArray.push([item.confirmationBaptisedMonth, item.confirmationBaptisedCounts]);
    });
    var confirmationChartData = google.visualization.arrayToDataTable(confirmationChartDataArray);
    var options = {
      bars: "vertical",
      vAxis: {
        format: "decimal"
      },
      height: 400,
      width: '100%',
      colors: ["#51bb25"]
    };
    baptismConfirmationMonthwiseChart.draw(confirmationChartData, google.charts.Bar.convertOptions(options));
  }

  $.ajax({
    url: '/com/sjc/member/memberbaptisedconfirmationmonthwisecount',
    type: 'GET',
    success: function (data) {
      var uniqueBaptisedConfirmationYears = [...new Set(data.map(item => item.confirmationBaptisedYear))];
      var select = document.getElementById('year-select-for-baptism-confirmation');
      uniqueBaptisedConfirmationYears.forEach(function (year) {
        var option = document.createElement('option');
        option.text = year;
        select.add(option);
      });

      $('#year-select-for-baptism-confirmation').on('change', function () {
        var selectedConfirmationYear = $(this).val();
        updateConfirmationChart(selectedConfirmationYear, data);
      });

      // Year-Select for drop down
      var initialConfirmationYear = $('#year-select-for-baptism-confirmation').val();
      updateConfirmationChart(initialConfirmationYear, data);
    },
    error: function (error) {
      // Handle error
      console.error('Error fetching data from API:', error);
    }
  });
}

 }
 


 
	

 
  