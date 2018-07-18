
//-------------------------------------------------------------	
	
	view_call["mgmt"] = function(){
		
		var formData = new FormData();
			formData.append("function", "mgmt_tables_call" );
			
		form_post( app_api , formData , view_build["mgmt"] );			
	
	}
	
//-----------------------------

	view_build["mgmt"] = function( obj ){
		
		//--------------------------			
		
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";	
			
			var topres = document.getElementById("topres");
				topres.innerHTML = "";	
		
		//--------------------------		
			
			var mgmt_select = document.createElement("SELECT");
				topres.appendChild(mgmt_select);
				mgmt_select.id = "mgmt_select";
				mgmt_select.classList.add("main_select");
				
				var mgmt_opt = document.createElement("OPTION");
					mgmt_opt.value = "null";
					mgmt_opt.innerHTML = "please select an option";
				mgmt_select.appendChild(mgmt_opt);
				
				
			for( var prop in obj.content ){
				
				var mgmt_opt = document.createElement("OPTION");
					mgmt_opt.value = obj.content[prop].table_name;
					mgmt_opt.innerHTML = obj.content[prop].mgmt_txt;
				mgmt_select.appendChild(mgmt_opt);	
			}
				
				mgmt_select.onchange = function(){
					
					var is_table = this.value;
					
					if( is_table != "null" ){
						
						location.href = "#"+hash_handler['set']( "sub_view" , is_table );
						
						mgmt_table_call();
			
					}
					else{
						var mainres = document.getElementById("mainres");
							mainres.innerHTML = "";	
							
						location.href = "#"+hash_handler['remove']( "sub_view" );
					}
				}
		
		//--------------------------		
		
		if( hash_handler['get']( "sub_view" ) != undefined){
			
			mgmt_select.value = hash_handler['get']( "sub_view" );
			
			mgmt_table_call();
		}
	}
	
	
//-------------------------------------------------------------	
	
	function mgmt_table_call(){
		
		var is_table = hash_handler['get']( "sub_view" );
		
		var formData = new FormData();
			formData.append("function", "table_call" );
			formData.append("table_name", is_table );
							
		form_post( app_api , formData , mgmt_table_build );			
	}

	function mgmt_table_build( obj ){
		
		//----------------------------------------------
			
			var opt = [ "del" ];
			
			var table = edit_table_build( obj , opt );
		
		//----------------------------------------------
			
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";
				mainres.appendChild(table);
		
		//----------------------------------------------
		
	}

//-------------------------------------------------------------	
	