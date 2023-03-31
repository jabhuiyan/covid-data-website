/**
 * This program manages the total deaths count in the Deaths tab.
 */

$(document).ready(function(){

    /**
     * This function binds an event to the Find Deaths button to show a
     * table view of number of total deaths between two dates.
     */
    $("#find-deaths-btn").click(function(event){
        event.preventDefault();

        $("#show-death").empty();

        // assembling the table to show total deaths
        let death_tbl = '<table id="table-death"><tr><th>Total Deaths</th></tr></table>';
        $("#show-death").append(death_tbl);

        let starting_date = $("#start-date").val();
        let ending_date = $("#end-date").val();

        $.ajax({
            url: '/deaths/'+starting_date+'.'+ending_date,
            type: 'GET',
            contentType: 'application/json',
            success: function(response){
                console.log(response);

                tbl_update = '<tr class="even-row"><td>'+response+'</td><tr/>';
                $("#table-death").append(tbl_update)
            },
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
});
