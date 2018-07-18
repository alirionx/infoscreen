//-------------------------------------------------------------	
	
	view_call["profile"] = function(){
			
		var formData = new FormData();
			formData.append("function", "user_profile_call" );
			
		form_post( app_api , formData , view_build["profile"] );			
	
	}
	
//-----------------------------

	view_build["profile"] = function( obj ){
		
		
		//--------------------------			
		
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";	
			
			var topres = document.getElementById("topres");
				topres.innerHTML = "";	
		
		//--------------------------				
		
			var profile_frame = document.createElement("DIV");
				profile_frame.classList.add("form_small");
				profile_frame.id = "profile_frame";
				
				
				var form_hl = document.createElement("DIV");
					form_hl.classList.add("form_hl");
					form_hl.innerHTML = "User Profile Data ("+obj.content.user_name+")";
				profile_frame.appendChild(form_hl);
		
			
			for( var prop in obj.def ){
				
				if( obj.def[prop].relevant == "true" ){
					
					var input_hl = document.createElement("DIV");
						input_hl.classList.add("input_hl");
						input_hl.innerHTML = obj.def[prop].column_headline;
					profile_frame.appendChild(input_hl);
					
					var form_input = document.createElement("INPUT");
						form_input.value = obj.content[obj.def[prop].column_name];
					profile_frame.appendChild(form_input);
					
						form_input.setAttribute("table_name" , obj.table_name );
						form_input.setAttribute("id_col" , obj.id_col );
						form_input.setAttribute("id_val" , obj.content[obj.id_col] );
						form_input.setAttribute("col" , obj.def[prop].column_name );
						
						form_input.onchange = function(){
							
							var table_name 	= this.getAttribute("table_name");
							var id_col 		= this.getAttribute("id_col");
							var id_val 		= this.getAttribute("id_val");
							var col 		= this.getAttribute("col");
						
							var new_val		= this.value;
							
							var formData = new FormData();
								formData.append("function", "table_cell_change" );
								formData.append("table_name", table_name );
								formData.append("id_col", id_col );
								formData.append("id_val", id_val );
								formData.append("col", col );
								formData.append("new_val", new_val );
							
							//form_post( app_api , formData , view_foward );
							form_post( app_api , formData );
						}
				}
			}
			
		//--------------------------		
			
			var pwd_res_btn = document.createElement("BUTTON");
				pwd_res_btn.classList.add("form_btn");
				pwd_res_btn.innerHTML = "reset password";
					
				pwd_res_btn.setAttribute("table_name" , obj.table_name );
				pwd_res_btn.setAttribute("id_col" , obj.id_col );
				pwd_res_btn.setAttribute("id_val" , obj.content[obj.id_col] );
				pwd_res_btn.setAttribute("col" , "user_password" ); //evil: non dynamic
					
				pwd_res_btn.onclick = function(){
						
					var pwd_obj = [];
						
						pwd_obj["table_name"] 	= this.getAttribute("table_name");
						pwd_obj["id_col"] 		= this.getAttribute("id_col");
						pwd_obj["id_val"] 		= this.getAttribute("id_val");
						pwd_obj["col"] 			= this.getAttribute("col");
						
					pwd_res_frame_call(pwd_obj);
				}
				
			profile_frame.appendChild(pwd_res_btn);	
		
		//--------------------------		
			
			mainres.appendChild(profile_frame);
			center_domel( profile_frame , "140px");
			
		//--------------------------	
	}
	
	
//-------------------------------------------------------------
		
		
		