
//-------------------------------------------------------------	
	
	view_call["locations"] = function(){
			
		//----------------------------------------------
			
			var formData = new FormData();
				formData.append("function", "table_call" );
				formData.append("table_name", "locations" );
						
			form_post( app_api , formData , view_build["locations"] );
			
		//----------------------------------------------
			
	}
	
	
//-------------------------------------------------------------	

	view_build["locations"] = function( obj ){		
		
		//--------------------------			
		
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";	
			
			var topres = document.getElementById("topres");
				topres.innerHTML = "";	
		
		//--------------------------		
		
		//----------------------------------------------
			
			var opt = ["del" , "location_show"];
			
			var table = edit_table_build( obj , opt );
		
		//----------------------------------------------
			
				mainres.appendChild(table);
		
		//----------------------------------------------
	}
	
//-------------------------------------------------------------		
	

	
//-------------------------------------------------------------	
	
	view_call["location_show"] = function(){
			
		//----------------------------------------------
			
			var location_id = hash_handler['get']( "location_id" );
			
			var formData = new FormData();
				formData.append("function", "location_show_call" );
				formData.append("location_id", location_id );
						
			form_post( app_api , formData , view_build["location_show"] );
			
		//----------------------------------------------
			
	}
	
	
//-------------------------------------------------------------	

	view_build["location_show"] = function( obj ){		
				
		//----------------------------------------------
			
			var page_hl = page_hl_build( "Location: " + obj.location_name );
				page_hl.style.marginBottom = "10px";
		//----------------------------------------------
			
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";
				mainres.style.textAlign = "center";
				mainres.appendChild(page_hl);
		
		//----------------------------------------------
			
			for( var prop in obj.content ){
				
				var slide_deck_frame = document.createElement("DIV");
				mainres.appendChild(slide_deck_frame);
					slide_deck_frame.classList.add("slide_deck_frame");
					
					var slide_deck_thumb = document.createElement("IMG");
					slide_deck_frame.appendChild(slide_deck_thumb);
						slide_deck_thumb.src = obj.content[prop].slide_thumb;
						
						var location_id 	= obj.location_id;
						var presentation_id = obj.content[prop].presentation_id;
						
						slide_deck_thumb.setAttribute("location_id" , location_id );
						slide_deck_thumb.setAttribute("presentation_id" , presentation_id );
						
						slide_deck_thumb.onclick = function(){
							
							var location_id 	= this.getAttribute("location_id");
							var presentation_id = this.getAttribute("presentation_id");
							
							window.open( "show/#location_id="+location_id+"/presentation_id="+presentation_id+"/interval=5" );
							
						}
						
					
					var slide_deck_tag = document.createElement("DIV");
					slide_deck_frame.appendChild(slide_deck_tag);
						slide_deck_tag.innerHTML = obj.content[prop].presentation_name;
					
			}
		
		//----------------------------------------------
	}
	
//-------------------------------------------------------------		
	
	
	
	
//-------------------------------------------------------------		
	
		table_opt_create["location_show"] = function( opt_obj ){
			
			var btn = document.createElement("BUTTON");
				btn.classList.add("content_table_btn");
				btn.innerHTML = "show";
				
				btn.setAttribute("location_id" , opt_obj.id_val );
				
				btn.onclick = function(){
					
					var location_id = this.getAttribute("location_id");
					location.href = "#view=location_show/location_id="+location_id;
					
					view_foward();
				}
				
			return btn;
		}
		
	//----------------------------------------------
	
//-------------------------------------------------------------	