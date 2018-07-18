
//-------------------------------------------------------------	
	
	view_call["presentations"] = function(){
			
		//----------------------------------------------
			
			var formData = new FormData();
				formData.append("function", "table_call" );
				formData.append("table_name", "presentations" );
						
			form_post( app_api , formData , view_build["presentations"] );
			
		//----------------------------------------------
			
	}
	
	
//-------------------------------------------------------------	

	view_build["presentations"] = function( obj ){		
		
		//--------------------------			
		
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";	
			
			var topres = document.getElementById("topres");
				topres.innerHTML = "";	
		
		//--------------------------		
		
		//----------------------------------------------
			
			var opt = [ "del" , "assign" ];
			
			var table = edit_table_build( obj , opt );
		
		//----------------------------------------------
			
				mainres.appendChild(table);
		
		//----------------------------------------------
	}
	
//-------------------------------------------------------------		
	
		table_opt_create["assign"] = function( opt_obj ){
			
			var btn = document.createElement("BUTTON");
				btn.classList.add("content_table_btn");
				btn.innerHTML = "assign";
				
				btn.setAttribute("presentation_id" , opt_obj.id_val );
				
				btn.onclick = function(){
					
					var presentation_id = this.getAttribute("presentation_id");
					location.href = "#view=assign/presentation_id="+presentation_id;
					
					view_foward();
				}
				
			return btn;
		}
		
	//----------------------------------------------
		
		table_opt_create["slide_del"] = function( opt_obj ){
			
			var btn = document.createElement("BUTTON");
				btn.classList.add("content_table_btn");
				btn.innerHTML = "del";
				
				btn.setAttribute("table_name" , opt_obj.table );
				btn.setAttribute("id_col" , opt_obj.id_col );
				btn.setAttribute("id_val" , opt_obj.id_val );
				
				btn.onclick = function(){
					
					var alrt = confirm("Do you really want to delete this entry");
					if (alrt == true) {
   
						var table_name 	= this.getAttribute("table_name");
						var id_col 		= this.getAttribute("id_col");
						var id_val 		= this.getAttribute("id_val");
						
						var formData = new FormData();
							formData.append("function", "table_row_delete" );
							formData.append("table_name", table_name );
							formData.append("id_col", id_col );
							formData.append("id_val", id_val );
						
						form_post( app_api , formData , view_foward );
					}
				}
				
			return btn;
		}
		
		table_opt_create[ "slide_add" ] = function( opt_obj ){
			
			var presentation_id = hash_handler['get']( "presentation_id" );
			
			var tr = document.createElement("TR");
				var td = document.createElement("TD");
				tr.appendChild(td);
					td.colSpan = "2";
					td.style.background = "none"
				
					var btn = document.createElement("BUTTON");
					td.appendChild(btn);
						
						btn.classList.add("content_table_btn");
						btn.innerHTML = "add slides";
						
						btn.setAttribute("presentation_id" , presentation_id );
						
						btn.onclick = function(){
							
							var presentation_id = this.getAttribute("presentation_id");
							slide_add_frame_call(presentation_id);
						}
		
			return tr;
		}
		
//-------------------------------------------------------------	
		
	function slide_add_frame_call( presentation_id ){
		
		//-----------------------------
		
			if( document.getElementById("slide_add_frame") != undefined ){
				document.getElementById("slide_add_frame").parentNode.removeChild(document.getElementById("slide_add_frame"));
			}
		
		//-----------------------------
		
			var slide_add_frame = document.createElement("DIV");
				slide_add_frame.classList.add("form_small");
				slide_add_frame.id = "slide_add_frame";
				
				var form_hl = document.createElement("DIV");
					form_hl.classList.add("form_hl");
					form_hl.innerHTML = "Add Media ( jpg, png images or mp4 video )";
				slide_add_frame.appendChild(form_hl);
					
				var file_input = document.createElement("INPUT");
					file_input.id = "slide_add_input";
					file_input.classList.add("files_input");
					file_input.type = "file";
					file_input.multiple = "multiple";
				slide_add_frame.appendChild(file_input);	

				var file_submit = document.createElement("BUTTON");
					file_submit.classList.add("form_btn");
					file_submit.innerHTML = "upload slides";
				slide_add_frame.appendChild(file_submit);	
					
					file_submit.onclick = function(){
						
						loader_call();
						
						var file_ary = document.getElementById("slide_add_input").files;
						
						if( file_ary.length > 0 ){
						
							var formData = new FormData();
								formData.append("function", "slides_upload" );
								formData.append("presentation_id", presentation_id );
								//formData.append("uploads" , file_ary[0]);
							
							for( var file in file_ary ) {
								formData.append("upload_"+file, file_ary[file]);
							}
							
							form_post( app_api , formData , view_foward );
							
							document.getElementById("slide_add_frame").parentNode.removeChild(document.getElementById("slide_add_frame"));
						}
						
						else{
							alert("no files selected!");
						}
					}
					
				var file_cancel = document.createElement("BUTTON");
					file_cancel.classList.add("form_btn");
					file_cancel.innerHTML = "cancel";
				slide_add_frame.appendChild(file_cancel);	
					
					file_cancel.onclick = function(){
						
						document.getElementById("slide_add_frame").parentNode.removeChild(document.getElementById("slide_add_frame"));
					}
					
		//-----------------------------
			
			document.body.appendChild(slide_add_frame);
							
			center_domel( slide_add_frame , "120px");
	}
		
//-------------------------------------------------------------	



	view_call["assign"] = function(){
		
		//----------------------------------------------		
			
			loader_remove();
			
		//----------------------------------------------
			
			var presentation_id = hash_handler['get']( "presentation_id" );
			
			var formData = new FormData();
				formData.append("function", "assign_call" );
				formData.append("presentation_id", presentation_id );
						
			form_post( app_api , formData , view_build["assign"] );
			
		//----------------------------------------------
			
	}
	
//-------------------------
	
	view_build["assign"] = function( obj ){
			
		//----------------------------------------------
			
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";
				
				var page_hl = page_hl_build( "Presentation: " + obj.presentation_name );
				mainres.appendChild(page_hl);
				
				var slide_frame = document.createElement("DIV");
				mainres.appendChild(slide_frame);
					slide_frame.style.marginRight = "310px";
					
			
			var opt = [ "slide_del" ];
			
			var table = edit_table_build( obj.slides , opt );
			
					slide_frame.appendChild(table);
			
		//----------------------------------------------
			
			//-------------------------
				
				var th_ary = [];
					th_ary["location_name"] = "Location Name";
					
			//-------------------------
			
			var location_frame = document.createElement("DIV");
			mainres.appendChild(location_frame);
				location_frame.classList.add("silde_blade_right");
				
				var location_table = document.createElement("TABLE");
				location_frame.appendChild(location_table);
					location_table.classList.add("content_table");
					location_table.style.minWidth = "280px";
					location_table.style.textAlign = "left";
				
					var location_tr = document.createElement("TR");
					location_table.appendChild(location_tr);
					
						var location_th = document.createElement("TH");
						location_tr.appendChild(location_th);
							location_th.style.textAlign = "center";
							location_th.style.width = "60px";
							location_th.innerHTML = "Action";
					
					for( var prop in th_ary ){
						
						var location_th = document.createElement("TH");
						location_tr.appendChild(location_th);
							location_th.innerHTML = th_ary[prop];
					}
					
			//-------------------------
								
				var table_obj = obj.presentation_to_location.content;
				for( var prop in table_obj ){
					
					var location_tr = document.createElement("TR");
					location_table.appendChild(location_tr);
					
					//---------------------
				
						var location_td = document.createElement("TD");
						location_tr.appendChild(location_td);
							location_td.style.textAlign = "center";
							
							var location_btn = document.createElement("BUTTON");
							location_td.appendChild(location_btn);
								location_btn.id = "slide_select_on_btn_"+table_obj[prop].location_id;
								location_btn.classList.add("content_table_btn");
								location_btn.innerHTML = "select";
								
								location_btn.setAttribute("location_id" , table_obj[prop].location_id);
								location_btn.setAttribute("presentation_id" , table_obj[prop].presentation_id);
								location_btn.onclick = function(){
									
									var location_id = this.getAttribute("location_id");
									var presentation_id = this.getAttribute("presentation_id");
									
									var slide_select_off_btn = document.getElementById( "slide_select_off_btn_"+location_id );
										slide_select_off_btn.style.display = "inline";
										this.style.display = "none";
									
									slide_select_call( presentation_id , location_id );
								}
							
							var location_btn = document.createElement("BUTTON");
							location_td.appendChild(location_btn);
								location_btn.id = "slide_select_off_btn_"+table_obj[prop].location_id;
								location_btn.classList.add("content_table_btn_ext");
								location_btn.style.display = "none";
								location_btn.innerHTML = "ok";
								
								location_btn.setAttribute("location_id" , table_obj[prop].location_id);
								location_btn.onclick = function(){
									
									var location_id = this.getAttribute("location_id");
									
									var slide_select_on_btn = document.getElementById( "slide_select_on_btn_"+location_id );
										slide_select_on_btn.style.display = "inline";
										this.style.display = "none";
										
									slide_unselect_call();
								}
								
					//---------------------
					
					for( var prop2 in th_ary ){
						
						var location_td = document.createElement("TD");
						location_tr.appendChild(location_td);
							location_td.innerHTML = table_obj[prop][prop2];
					}
							
				}
				
			//-------------------------
			
				var location_btn = document.createElement("BUTTON");
				location_frame.appendChild(location_btn);
					location_btn.classList.add("content_table_btn");
					location_btn.innerHTML = "add - remove locations";
					
					location_btn.onclick = function(){
						
						location_select_call();
					}
			
			//-------------------------
			
		//----------------------------------------------
	}
	
//-------------------------------------------------------------	

	function location_select_call(){
		
		var presentation_id = hash_handler['get']( "presentation_id" );
		
		var formData = new FormData();
			formData.append("function", "location_select_call" );
			formData.append("presentation_id", presentation_id );
						
		form_post( app_api , formData , location_select_build );
		
		
	}
	
	function location_select_build( obj ){
		
		var presentation_id = obj.presentation_id;	
		
		//-----------------------------
		
			if( document.getElementById("location_select_frame") != undefined ){
				document.getElementById("location_select_frame").parentNode.removeChild(document.getElementById("location_select_frame"));
			}
		
		//-----------------------------
		
			var location_select_frame = document.createElement("DIV");
				location_select_frame.classList.add("form_small");
				location_select_frame.id = "location_select_frame";
				
				var form_hl = document.createElement("DIV");
					form_hl.classList.add("form_hl");
					form_hl.innerHTML = "Add or remove locations";
				location_select_frame.appendChild(form_hl);
					
				//-------------------------
									
					var th_ary = [ "Select" , "Location Name" ];
									
					var location_table = document.createElement("TABLE");
					location_select_frame.appendChild(location_table);
					
						location_table.classList.add("content_table");
						location_table.style.minWidth = "280px";
						location_table.style.textAlign = "left";
					
						var location_tr = document.createElement("TR");
						location_table.appendChild(location_tr);
						
						for( var prop in th_ary ){
							
							var location_th = document.createElement("TH");
							location_tr.appendChild(location_th);
								location_th.innerHTML = th_ary[prop];
						}
						
						for( var prop in obj.content ){
							
							var location_tr = document.createElement("TR");
								location_table.appendChild(location_tr);
								
								var location_td = document.createElement("TD");
								location_tr.appendChild(location_td);
									location_td.style.textAlign = "center";
									
									var location_chk = document.createElement("input");
									location_td.appendChild(location_chk);
										location_chk.type = "checkbox";
										location_chk.id   = "pre-to-loc-chk_"+obj.content[prop].location_id;
										location_chk.name = "pre-to-loc-chk_"+obj.content[prop].location_id;
										
										location_chk.setAttribute("presentation_id" , presentation_id );
										location_chk.setAttribute("location_id" , obj.content[prop].location_id );
										
										location_chk.onclick = function(){
											
											var presentation_id = this.getAttribute("presentation_id");
											var location_id = this.getAttribute("location_id");
											
											var formData = new FormData();
												formData.append("function", "presentation_to_location_update" );
												formData.append("presentation_id", presentation_id );
												formData.append("location_id", location_id );
												formData.append("state", this.checked );
															
											form_post( app_api , formData );
										}
										
									if( obj.content[prop].selected == "true" ){	location_chk.checked = true; }
									
								var location_td = document.createElement("TD");
								location_tr.appendChild(location_td);
									
									var location_label = document.createElement("LABEL");
									location_td.appendChild(location_label);
										
										location_label.setAttribute("for" , "pre-to-loc-chk_"+obj.content[prop].location_id );
										location_label.innerHTML = obj.content[prop].location_name;
									
						}
						
					location_select_frame.appendChild(location_table);	
					
				//-------------------------

				//var select_btn = document.createElement("BUTTON");
				//	select_btn.classList.add("form_btn");
				//	select_btn.innerHTML = "update selection";
				//location_select_frame.appendChild(select_btn);	
				
				var select_btn = document.createElement("BUTTON");
					select_btn.classList.add("form_btn");
					select_btn.innerHTML = "ok";
					
					select_btn.onclick = function(){
					
						document.getElementById("location_select_frame").parentNode.removeChild(document.getElementById("location_select_frame"));
						view_foward();
					}
				location_select_frame.appendChild(select_btn);	
		
		//-----------------------------
			
			document.body.appendChild(location_select_frame);
							
			center_domel( location_select_frame , "120px");
	}

//-------------------------------------------------------------	

	function slide_select_call( presentation_id , location_id ){
		
		var formData = new FormData();
			formData.append("function", "slide_select_call" );
			formData.append("presentation_id", presentation_id );
			formData.append("location_id", location_id );
						
		form_post( app_api , formData , slide_select_build );
		
	}
	
	//----------------------
	
	function slide_select_build( obj ){
		
		var presentation_id = obj.presentation_id;
		var location_id = obj.location_id;
		
		var slide_assign_ary = document.getElementsByClassName("slide_assign");
		var slide_assign_label_ary = document.getElementsByClassName("slide_assign_label");
										
		var x = slide_assign_ary.length;
										
		for (var i = 0; i < x; i++){
			
			var slide_id = slide_assign_ary[i].getAttribute("slide_id");
			
			if( obj.content[slide_id] != undefined ){
				
				slide_assign_ary[i].checked = true;
			}
			else{
				slide_assign_ary[i].checked = false;
			}
			
			slide_assign_ary[i].style.display = "inline";
			slide_assign_ary[i].setAttribute("location_id" , location_id );
			slide_assign_label_ary[i].style.display = "none";
			
			
			slide_assign_ary[i].onclick = function(){
				
				var slide_id 	= this.getAttribute("slide_id");
				var location_id = this.getAttribute("location_id");
				var state 		= this.checked;
				
				
				var formData = new FormData();
					formData.append("function", "slide_to_location_update" );
					formData.append("slide_id", slide_id );
					formData.append("location_id", location_id );
					formData.append("state", state );
								
				form_post( app_api , formData );
			}
		}
	}
	
	//----------------------
	
	function slide_unselect_call( ){
		
		var slide_assign_ary = document.getElementsByClassName("slide_assign");
		var slide_assign_label_ary = document.getElementsByClassName("slide_assign_label");
										
		var x = slide_assign_ary.length;
										
		for (var i = 0; i < x; i++){
											
			slide_assign_ary[i].style.display = "none";
			slide_assign_ary[i].removeAttribute("location_id" );
			slide_assign_ary[i].onclick = "";
			slide_assign_ary[i].checked = false;
			slide_assign_label_ary[i].style.display = "inline";
		}
	}

//-------------------------------------------------------------	
	
