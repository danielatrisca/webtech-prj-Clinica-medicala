/*global $*/

//read records on page load
$(document).ready(function(){
    readRecords();
});
 
function readRecords(){
    $.get("/services/",{},function(data,status){
        data.forEach(function(value){
            var row='<tr id="row_id_'+value.id+'">'
            +displayColumns(value)
            +'</tr>';
            $('#services').append(row);
        });
    });
}

function displayColumns(value){
    return  '<td>'+value.id+'</td>'
   // +'<td class="name"><a href="'+ value.name +'" target="_blank">'+value.name+'</a></td>'
    +'<td class="name">'+value.name+'</td>'
    +'<td class="price">'+value.price+'</td>';
}