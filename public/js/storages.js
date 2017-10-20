window.onload =function(){
	var operation = "A"; //la operacion por defecto va ser A de Add

	var select_codigo = -1; //para selecionar el codigo

	var usuario = localStorage.getItem("usuario");//nustra data en localStorage var se usuario

	usuario = JSON.parse(usuario); //convertimos a string

	if(usuario == null){ //si no hay d, inicializamos con array
		usuario = [];
	}

	function Add(){
		var user = JSON.stringify({
			codigo    : $("#txt_cd").val(),
			nombre  : $("#txt_n").val(),
			apellido : $("#txt_a").val(),
			correo : $("#txt_Email").val()
		});
		/*var codigo   = $("#txt_cd").val();
		var	nombre = $("#txt_n").val();
		var	apellido = $("#txt_a").val();
		var	correo = $("#txt_Email").val();
		var pers;*/
		//usuario.push([codigo,nombre,apellido,correo]);
		usuario.push(user);
		localStorage.setItem("usuario", JSON.stringify(usuario));
		//alert("los ds fueron agregados");
		//return true;
	}

	function Edit(){
		usuario[select_codigo] = JSON.stringify({
				codigo    : $("#txt_cd").val(),
				nombre  : $("#txt_n").val(),
				apellido : $("#txt_a").val(),
				correo : $("#txt_Email").val()
			});//cuando se modifica, se guarda en el mismo codigo
		localStorage.setItem("usuario", JSON.stringify(usuario));
		/*alert("The data was edited.")
		operation = "A"; //retorna la operacion
		return true;*/
	}

	function Delete(){
		usuario.splice(select_codigo, 1);
		localStorage.setItem("usuario", JSON.stringify(usuario));
		alert("Usuario Eliminado");
	}

	function List(){		
		$("#tblList").html("");
		$("#tblList").html(
			"<thead>"+
			"	<tr>"+			
			"	<th>Código de Estudiante</th>"+
			"	<th>Nombre y Apellido </th>"+			
			"	<th>Correo</th>"+
			"	<th> Acciones </th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);
		for(var i in usuario){
			var d = JSON.parse(usuario[i]);
		  	$("#tblList tbody").append("<tr>"+									 	  
										 "	<td>"+d.codigo+"</td>" + 
										 "	<td>"+d.nombre+" "+d.apellido+"</td>" + 										 
										 "	<td>"+d.correo+"</td>" + 
										 "	<td><input type='button' value='Editar' alt='Edit"+i+"' class='btnEdit'/><input type='button' value='Eliminar' alt='Delete"+i+"' class='btnDelete'/></td>" +
		  								 "</tr>");
		}
	}

	$("#frmCadastre").bind("submit",function(){		
		if(operation == "A")
			return Add();
		else
			return Edit();
	});

	List();

	$(".btnEdit").bind("click", function(){

		operation = "E";
		select_codigo = parseInt($(this).attr("alt").replace("Edit", ""));
		
		var d = JSON.parse(usuario[select_codigo]);
		$("#txt_cd").val(d.codigo);
		$("#txt_n").val(d.nombre);
		$("#txt_a").val(d.apellido);
		$("#txt_Email").val(d.correo);
		$("#txt_cd").attr("readonly","readonly");
		$("#txt_n").focus();
	});

	$(".btnDelete").bind("click", function(){
		select_codigo = parseInt($(this).attr("alt").replace("Delete", ""));
		Delete();
		List();
	});
}