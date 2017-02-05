var table="";
table2="<h3 style='text-align:center'>Employee Details</h3><table class='table table-hover tableSearch1'><tr><th>Id</th><th>name</th><th>email</th><th>city</th><th>Edit/Delete</th></tr>";

table1="<h3 style='text-align:center'>Employee Details</h3><table class='table table-hover table1'><tr><th>Id</th><th>name</th><th>email</th><th>city</th><th>Edit/Delete</th></tr>";
var tableSearch="";
var i=0;
var id1=1;
$b=function(){	
	j=i+40;
$.ajax({

		url:"http://localhost:3000/employees?_start="+i+"&_end="+j,
		type:"GET",
		success:function(data){
			$(".loading").show();
			data.forEach(function(d){
				table+="<tr class='"+d.id+"'>"+
						"<td>"+d.id+"</td><td class='name'>"+d.name+"</td>"+
						"<td class='email'>"+d.email+"</td>"+
						"<td class='city'>"+d.city+"</td>"+
						"<td><button data-name="+d.name+" data-email="+d.email+" data-city="+d.city+" data-id="+d.id+" type='submit'  class='update btn btn-primary'>Edit</button>"+
						"<input type='submit' class='delete btn btn-primary' value='Delete'/></td></tr>";
			});

			$(".table1").append(table);
			
			table="";
			
			
		}


	});
			setTimeout(function(){
				$("#modal3").modal('hide');
			},2000);
        	

	i=j+1;
}
$search=function(){
	;
$.ajax({

		url:"http://localhost:3000/employees?name="+$("#nameSearch").val(),
		type:"GET",
		success:function(data){
			if(true){
				tableSearch+=table2;
			data.forEach(function(d){
					tableSearch+="<tr class='"+d.id+"'>"+
						"<td>"+d.id+"</td><td class='name'>"+d.name+"</td>"+
						"<td class='email'>"+d.email+"</td>"+
						"<td class='city'>"+d.city+"</td>"+
						"<td><button data-name="+d.name+" data-email="+d.email+" data-city="+d.city+" data-id="+d.id+" type='submit'  class='updateSearch btn btn-primary'>Edit</button>"+
						"<input type='submit' class='deleteSearch btn btn-primary' value='Delete'/></td></tr>";
			});
						$(".tableSearch").append(tableSearch);
						tableSearch="";

			}
			else{
				alert("No data found");
			}
		}


	});
}


$show=function(){
$.ajax({

		url:"http://localhost:3000/employees",
		type:"GET",
		success:function(data){
			
			id1=parseInt(data[data.length-1].id)+1;
			
		}


	});


}




$a=function(){
			$.ajax
			    ({
			        type: "POST",
			        dataType : 'json',
			        data: { "id": id1,"name":$("#name").val(),"city":$("#city").val(),"email":$("#email").val() },
			        url: 'http://localhost:3000/employees',
			        
			        success: function () {   $("#name").val("");$("#city").val("");$("#email").val(""); 	alert("Added Successfully");
			        id1++;
 },
			        failure: function() {alert("Error!");}
			    });




			
		

}





$delete=function(){


 var row = $(this).closest('tr'),
        cells = row.find('td');
	
			
$.ajax
    ({
        type: "DELETE",
        url: 'http://localhost:3000/employees/'+cells[0].innerHTML,
        processData: true,
        contentType: "application/json; charset=utf-8",
        success: function (data) {     	
        	setTimeout(function(){alert("Deleted Successfully")},1000);
        $(".table1 tr."+cells[0].innerHTML).hide();
                $(".tableSearching tr."+cells[0].innerHTML).hide();

        
    },
        failure: function() {alert("Error!");}

    });




			

}




var id="";
$update=function(){
	
$.ajax
    ({
        type: "PUT",
        url: 'http://localhost:3000/employees/'+id,
        data:JSON.stringify({"id":id,"name":$("#name1").val(),"city":$("#city1").val(),"email":$("#email1").val()}),
        processData: true,
        contentType: "application/json; charset=utf-8",
        success: function (data) { console.log("updated");
				$("#modal2").modal('hide');

					$(".table1 tr."+id+" td.name").html($("#name1").val());
					$(".table1 tr."+id+" td.city").html($("#city1").val());
					$(".table1 tr."+id+" td.email").html($("#email1").val());

    	alert("Updated Successfully");

    },
        failure: function() {alert("Error!");}

    });
}


$(document).ready(function(){
	$(".tableDiv").html("");
			$b();
			setTimeout(function(){
				$(".load").hide();
			$(".tableDiv").append(table1);
			$(".add").show();
		},100);
	
$show();
var win = $(window);

    // Each time the user scrolls
    win.scroll(function() {
        // End of the document reached?
        if ($(document).height() - win.height() == win.scrollTop()) {
        	$("#modal3").modal();
        	
        		$b();	
        	
        	

        }
    });

$(".formSubmit").on('submit',function(){
	$a();
	return false;
});

$(".formSearch").on('submit',function(){
	$search();
	return false;
});

//$(".formSubmit").delegate('butAdd','click',$a);

$('.tableDiv').delegate('input', 'click', function(){
	tableSearching=".table";
	$delete();
});
$('.tableSearch').delegate('input', 'click', function(){
	tableSearching=".tableSearch";
	$delete();
});

$('.tableDiv').delegate('button', 'click', function(e){
	$("#modal2").modal();
	id=$(e.target).data("id");
	$("#name1").val($(".table1 tr."+id+" td.name").html());
	$("#city1").val($(".table1 tr."+id+" td.city").html());
	$("#email1").val($(".table1 tr."+id+" td.email").html());
});
//replace table selector with an id selector, if you are targetting a specific table
    $("#modal2").delegate('.bttn','click',$update);
    

	
 

});
