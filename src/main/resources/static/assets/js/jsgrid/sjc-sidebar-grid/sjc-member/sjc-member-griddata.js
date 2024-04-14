'use strict';
(function() {
    var db = {
        loadData: function(filter) {
            return $.grep(this.clients, function(client) {
                return (!filter.Name || client.Name.indexOf(filter.Name) > -1)
                    && (!filter.Age || client.Age === filter.Age)
                    && (!filter.Address || client.Address.indexOf(filter.Address) > -1)
                    && (filter.Married === undefined || client.Married === filter.Married);
            });
        },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.clients);
            this.clients.splice(clientIndex, 1);
        }
    };
    window.db = db;
   
    db.clients = [
  {
        "Member ID": "MEM-0001",
        "Family ID": "FAM-0001",
        "First Name": "Liam",
        "Last Name": "Lim",
        "Date of Birth": "4-Jul-93",
        "Gender": "Male",
        "Marital Status": "Single",
        "Contact Number": "60123456799",       
        "Membership Type": "Parish Roll",
        "Membership Status":"<span class=\"badge bg-success\">Active</span>",
    },
    {
        "Member ID": "MEM-0002",
        "Family ID": "FAM-0002",
        "First Name": "Emma",
        "Last Name": "Yap",
        "Date of Birth": "22-Oct-95",
        "Gender": "Female",
        "Marital Status": "Married",
        "Contact Number": "60123456800",
        "Membership Type": "Parish Roll",
        "Membership Status":"<span class=\" badge bg-secondary\">Inactive</span>",
    },
    {
        "Member ID": "MEM-0003",
        "Family ID": "FAM-0003",
        "First Name": "Noah",
        "Last Name": "Wong",
        "Familiar Name": "Noa",
        "Date of Birth": "11-Sep-89",
        "Gender": "Male",
        "Marital Status": "Single",
        "Contact Number": "60123456801",
        "Date of Baptism": "30-Apr-02",
        "Membership Type": "Associate Member",
        "Membership Status":"<span class=\" badge bg-secondary\">Transferred</span>",
    },
    {
        "Member ID": "MEM-0004",
        "Family ID": "FAM-0004",
        "First Name": "Olivia",
        "Last Name": "Teoh",
        "Familiar Name": "Ollie",
        "Date of Birth": "8-Jan-80",
        "Gender": "Female",
        "Marital Status": "Married",
        "Contact Number": "60123456802",
        "Date of Baptism": "20-Dec-05",
        "Membership Type": "Electoral Roll",
        "Membership Status": "<span class=\" badge bg-warning\">Deceased</span>",
    },
    {
        "Member ID": "MEM-0005",
        "Family ID": "FAM-0001",
        "First Name": "Aiden",
        "Last Name": "Chen",
        "Familiar Name": "Ari",
        "Date of Birth": "19-Feb-95",
        "Gender": "Male",
        "Marital Status": "Single",
        "Contact Number": "60123456803",
        "Date of Baptism": "15-Jul-04",
        "Membership Type": "Electoral Roll",
        "Membership Status":"<span class=\"badge bg-success\">Active</span>",
    },
    {
        "Member ID": "MEM-0006",
        "Family ID": "FAM-0002",
        "First Name": "Mia",
        "Last Name": "Tan",
        "Familiar Name": "Mi",
        "Date of Birth": "28-Sep-85",
        "Gender": "Female",
        "Marital Status": "Married",
        "Contact Number": "60123456804",
        "Date of Baptism": "8-Dec-99",
        "Membership Type": "Electoral Roll",
        "Membership Status": "<span class=\" badge bg-secondary\">Inactive</span>",
    },
    {
        "Member ID": "MEM-0007",
        "Family ID": "FAM-0003",
        "First Name": "Sophia",
        "Last Name": "Lau",
        "Familiar Name": "Sofie",
        "Date of Birth": "15-Nov-90",
        "Gender": "Female",
        "Marital Status": "Married",
        "Contact Number": "60123456809",
        "Date of Baptism": "20-Sep-99",
        "Membership Type": "Parish Roll",
        "Membership Status": "<span class=\"badge bg-success\">Active</span>",
    },
    {
        "Member ID": "MEM-0008",
        "Family ID": "FAM-0004",
        "First Name": "Jackson",
        "Last Name": "Chong",
        "Familiar Name": "Jax",
        "Date of Birth": "28-Jul-87",
        "Gender": "Male",
        "Marital Status": "Single",
        "Contact Number": "60123456810",
        "Date of Baptism": "15-Mar-05",
        "Membership Type": "Associate Member",
        "Membership Status": "<span class=\" badge bg-secondary\">Inactive</span>",
    },
    {
        "Member ID": "MEM-0009",
        "Family ID": "FAM-0001",
        "First Name": "Aria",
        "Last Name": "Goh",
        "Familiar Name": "Ari",
        "Date of Birth": "9-Apr-99",
        "Gender": "Female",
        "Marital Status": "Single",
        "Contact Number": "60123456811",
        "Date of Baptism": "18-Jun-16",
        "Membership Type": "Parish Roll",
        "Membership Status":"<span class=\"badge bg-success\">Active</span>",
    },
    {
        "Member ID": "MEM-0010",
        "Family ID": "FAM-0002",
        "First Name": "Oliver",
        "Last Name": "Ng",
        "Familiar Name": "Ollie",
        "Date of Birth": "14-Feb-80",
        "Gender": "Male",
        "Marital Status": "Married",
        "Contact Number": "60123456812",
        "Date of Baptism": "20-Sep-98",
        "Membership Type": "Parish Roll",
        "Membership Status": "<span class=\" badge bg-secondary\">Inactive</span>",
    },
    {
        "Member ID": "MEM-0011",
        "Family ID": "FAM-0003",
        "First Name": "Amelia",
        "Last Name": "Tan",
        "Familiar Name": "Ami",
        "Date of Birth": "19-Jul-93",
        "Gender": "Female",
        "Marital Status": "Married",
        "Contact Number": "60123456813",
        "Date of Baptism": "25-Nov-95",
        "Membership Type": "Electoral Roll",
        "Membership Status":"<span class=\"badge bg-success\">Deceased</span>",
    },
    {
        "Member ID": "MEM-0012",
        "Family ID": "FAM-0004",
        "First Name": "Elijah",
        "Last Name": "Lim",
        "Familiar Name": "Eli",
        "Date of Birth": "7-Mar-85",
        "Gender": "Male",
        "Marital Status": "Married",
        "Contact Number": "60123456814",
        "Date of Baptism": "15-Jun-00",
        "Membership Type": "Electoral Roll",
        "Membership Status": "<span class=\"badge bg-success\">Active</span>",
    },
    {
        "Member ID": "MEM-0013",
        "Family ID": "FAM-0001",
        "First Name": "Abigail",
        "Last Name": "Liew",
        "Familiar Name": "Abby",
        "Date of Birth": "10-Sep-89",
        "Gender": "Female",
        "Marital Status": "Single",
        "Contact Number": "60123456815",
        "Date of Baptism": "20-Apr-02",
        "Membership Type": "Associate Member",
        "Membership Status": "<span class=\" badge bg-secondary\">Transferred</span>",
    },
    {
        "Member ID": "MEM-0014",
        "Family ID": "FAM-0002",
        "First Name": "Lucas",
        "Last Name": "Tay",
        "Familiar Name": "Luca",
        "Date of Birth": "4-Jan-91",
        "Gender": "Male",
        "Marital Status": "Married",
        "Contact Number": "60123456816",
        "Date of Baptism": "20-Dec-96",
        "Membership Type": "Parish Roll",
        "Membership Status":"<span class=\" badge bg-secondary\">Inactive</span>",
    },
    {
        "Member ID": "MEM-0015",
        "Family ID": "FAM-0003",
        "First Name": "Scarlett",
        "Last Name": "Chua",
        "Familiar Name": "Scarly",
        "Date of Birth": "15-Oct-97",
        "Gender": "Female",
        "Marital Status": "Single",
        "Contact Number": "60123456817",
        "Date of Baptism": "12-Mar-17",
        "Membership Type": "Electoral Roll",
        "Membership Status":"<span class=\"badge bg-success\">Active</span>",
    },
    {
        "Member ID": "MEM-0016",
        "Family ID": "FAM-0004",
        "First Name": "Henry",
        "Last Name": "Lim",
        "Familiar Name": "Hen",
        "Date of Birth": "8-Sep-88",
        "Gender": "Male",
        "Marital Status": "Married",
        "Contact Number": "60123456818",
        "Date of Baptism": "25-Nov-97",
        "Membership Type": "Electoral Roll",
        "Membership Status": "<span class=\"badge bg-success\">Deceased</span>",
    },
    {
        "Member ID": "MEM-0017",
        "Family ID": "FAM-0001",
        "First Name": "Grace",
        "Last Name": "Lau",
        "Familiar Name": "Gigi",
        "Date of Birth": "2-Feb-95",
        "Gender": "Female",
        "Marital Status": "Married",
        "Contact Number": "60123456819",
        "Date of Baptism": "15-Aug-94",
        "Membership Type": "Parish Roll",
        "Membership Status":"<span class=\"badge bg-success\">Active</span>",
    },
    {
        "Member ID": "MEM-0018",
        "Family ID": "FAM-0002",
        "First Name": "Owen",
        "Last Name": "Goh",
        "Familiar Name": "Ollie",
        "Date of Birth": "17-Apr-84",
        "Gender": "Male",
        "Marital Status": "Single",
        "Contact Number": "60123456820",
        "Date of Baptism": "5-Jul-00",
        "Membership Type": "Associate Member",
        "Membership Status": "<span class=\" badge bg-secondary\">Transferred</span>",
    },
    {
        "Member ID": "MEM-0019",
        "Family ID": "FAM-0003",
        "First Name": "Ella",
        "Last Name": "Tan",
        "Familiar Name": "Eli",
        "Date of Birth": "22-Jun-98",
        "Gender": "Female",
        "Marital Status": "Single",
        "Contact Number": "60123456821",
        "Date of Baptism": "22-Mar-17",
        "Membership Type": "Electoral Roll",
        "Membership Status":"<span class=\"badge bg-success\">Active</span>",
    },
    {
        "Member ID": "MEM-0020",
        "Family ID": "FAM-0004",
        "First Name": "Daniel",
        "Last Name": "Lim",
        "Familiar Name": "Dani",
        "Date of Birth": "9-Jan-81",
        "Gender": "Male",
        "Marital Status": "Married",
        "Contact Number": "60123456822",
        "Date of Baptism": "20-Sep-99",
        "Membership Type": "Parish Roll",
        "Membership Status":"<span class=\"badge bg-success\">Active</span>",
    },
    
    
    
          
    ];
   
}());