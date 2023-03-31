/**
 * This program manages the components of the READ, UPDATE and DELETE functions from the Retrieve tab
 */

$(document).ready(function(){
    /**
     * This method will be reused everytime a new event happens in this tab.
     * If there's data to be showed, it will fill the form values,
     * otherwise it will clean it. 
     * It will mainly clean if the user searches for a user that does not 
     * exists
     * @param {*} data 
     */
    function fillFindContainer(data){
        if (data){
            $("#find-new-cases").val(data.new_cases);
            $("#find-total-cases").val(data.total_cases);
            $("#find-new-deaths").val(data.new_deaths);
            $("#find-total-deaths").val(data.total_deaths);

        }else{
            $("#find-new-cases").val("");
            $("#find-total-cases").val("");
            $("#find-new-deaths").val("");
            $("#find-total-deaths").val("");
        }      
    }

    /**
     * This is an aux function to assemble the covid data.
     * It will be used mainly to the update function
     */
    function assembleCovid(){
        let c = {};
        c.new_cases = $("#find-new-cases").val();
        c.total_cases = $("#find-total-cases").val();
        c.new_deaths = $("#find-new-deaths").val();
        c.total_deaths = $("#find-total-deaths").val();

        return c;
    }

    /**
     * This function binds an event to the Search button to search the data with a given date.
     */
    $("#btn-read-data").click(function(event){
        event.preventDefault();
        $("#list-covid").empty();

        /**  Assembling the table everytime the button is clicked.
            This will make sure that if things are added, deleted or modified in the other tab,
            this table will be always up to date.
        */
        let tbl = '<table id="table-list"><tr><th>ISO Code</th><th>Continent</th><th>Location</th><th>Date</th><th>Total Cases</th><th>New Cases</th><th>Total Deaths</th><th>New Deaths</th></tr></table>';
        $("#list-covid").append(tbl);


        let given_date = $("#date-search").val();
        $.ajax({
            url: '/covid/'+given_date,
            type: 'GET',
            contentType: 'application/json',                      
            success: function(response){
                console.log(response);
                fillFindContainer(response.data);

                let obj = response;
                let tbl_line = '';
                tbl_line = '<tr class="even-row"><td>'+obj.iso_code+'</td><td>'+obj.continent+'</td><td>'+obj.location+'</td><td>'+obj.date+'</td><td>'+obj.total_cases+'</td><td>'+obj.new_cases+'</td><td>'+obj.total_deaths+'</td><td>'+obj.new_deaths+'</td><tr/>';
                $("#table-list").append(tbl_line)
    
            },
            // If there's an error, we can use the alert box to make sure we understand the problem                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

    /**
     * This function will bind an event to the update button to update new and total cases/deaths.
     */
    $("#btn-update-data").click(function(event){
        event.preventDefault();
        let date_match = $("#date-search").val();
        let contact = assembleCovid();
        $.ajax({
            url: '/covid/'+date_match,
            type: 'PUT',
            data: JSON.stringify(contact),
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                $("#update-delete-out").text(response.msg);                
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

     /**
     * This function will bind an event to the delete button
     */
    $("#btn-delete-data").click(function(event){
        event.preventDefault();
        let delete_date = $("#date-search").val();
        $.ajax({
            url: '/covid/'+delete_date,
            type: 'DELETE',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                $("#update-delete-out").text(response.msg);
                // We clear the fields after the data is deleted
                fillFindContainer(null);              
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
});
