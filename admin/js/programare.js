/*global $*/

//read records on page load
$(document).ready(function(){
    readRecords();
});
 
function readRecords(){
    $.get("/appointments/",{},function(data,status){
        data.forEach(function(value){
            var row='<tr id="row_id_'+value.id+'">'
            +displayColumns(value)
            +'</tr>';
            $('#appointments').append(row);
        });
    });
}

function displayColumns(value){
    return  '<td>'+value.id+'</td>'
   // +'<td class="name"><a href="'+ value.name +'" target="_blank">'+value.name+'</a></td>'
    +'<td class="name">'+value.name+'</td>'
    +'<td class="forename">'+value.forename+'</td>'
    +'<td class="specialty">'+value.specialty+'</td>'
    +'<td class="department">'+value.department+'</td>'
    +'<td class="specialty">'+value.email+'</td>'
    +'<td class="phone">'+value.phone+'</td>'
    +'<td align="center">'
    +'<button onclick="viewRecord('+value.id+')" class="btn btn-edit">Update</button>'
+'</td>'
+'<td align="center">'
+'<button onclick="deleteRecord('+value.id+')" class="btn btn-danger">Exclude</button>'
+'</td>';
}
function addRecord(){
    $('#id').val('');
    $('#name').val('');
    $('#forename').val('');
    $('#specialty').val('');
    $('#department').val('');
    $('#email').val('');
    $('#phone').val('');
    
    $('#myModalLabel').html('Add New appointment');
    $('#add_new_record_modal').modal('show');
}
function viewRecord(id){
    var url="/appointments/"+id;
    
    $.get(url,{},function(data,status){
        //bind the values to the form fields
        $('#name').val(data.name);
         $('#forename').val(data.forename);
          $('#specialty').val(data.specialty);
          $('#department').val(data.department);
          $('#email').val(data.email);
          $('#phone').val(data.phone);
          
          $('#id').val(id);
          $('#myModalLabel').html('Edit appointments');
          
          $('#add_new_record_modal').modal('show');
    });
}
function saveRecord(){
    var formData=$('#record_form').serializeObject();
    if(formData.id)
    {
        updateRecord(formData);
    }
    else
    {
        createRecord(formData);
    }
}
function createRecord(formData){
    $.ajax({
        url:'/appointments/',
        type:'POST',
        accepts:{
            json:'application/json'
        },
        data:formData,
        success:function(data){
            $('#add_new_record_modal').modal('hide');
            
            var row='<tr id="row_id_'+data.id+'">'+displayColumns(data)+'</tr>';
            $('#appointments').append(row);
        }
    });
}
    function updateRecord(formData){
        $.ajax({
            url:'/appointments/'+formData.id,
            type:'PUT',
            accepts:{
                json:'application/json'
            },
            data:formData,
            success:function(data){
                $('#row_id_'+formData.id+'>td.name').html(formData.name);
                 $('#row_id_'+formData.id+'>td.forename').html(formData.forename);
                 $('#row_id_'+formData.id+'>td.specialty').html(formData.specialty);
                 $('#row_id_'+formData.id+'>td.department').html(formData.department);
                 $('#row_id_'+formData.id+'>td.email').html(formData.email);
                 $('#row_id_'+formData.id+'>td.phone').html(formData.phone);
                $('#add_new_record_modal').modal('hide');
            }
        });
    }
    function deleteRecord(id){
        $.ajax({
            url:'/appointments/'+id,
            type:'DELETE',
            success:function(data){
                $('#row_id_'+id).remove();
            }
        });
    }
    $.fn.serializeObject=function()
    {
        var o={};
        var a=this.serializeArray();
        $.each(a,function(){
            if(o[this.name]!==undefined){
                if(!o[this.name].push){
                    o[this.name]=[o[this.name]];
                }
                o[this.name].push(this.value || '');
            }
            else
            {
                o[this.name]=this.value || '';
             }
        });
    return o;
    };