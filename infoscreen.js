
//-------------------------------------

	var app_api 	= 'infoscreen.php';
	var auth_api	= 'auth.php';
	
	var base_view	= "locations"; 
	
	
	var view_call	= []; 
	var view_build	= []; 
	
	//-------------------------
	
		
	
	//-------------------------
	
//-------------------------------------

	function IsJsonString( str ) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

//-------------------------------------
	
	function location_reload( ) {
		
		location.reload();
	}
	
//-------------------------------------

	function center_domel( domel , fixed_top ) {
		
				
		var body_with 		= document.body.offsetWidth;
		var body_height 	= document.body.offsetHeight;
		
		var domel_with 		= domel.offsetWidth;
		var domel_height 	= domel.offsetHeight;
		
		var left 	= (( body_with - domel_with ) / 2 ) / body_with * 100 ;
		var top 	= (( body_height - domel_height ) / 2 ) / body_height * 100 ;
		
				
		domel.style.position 	= "fixed";
		domel.style.left 		= left+"%";
		
		if( fixed_top != undefined ){
			
			domel.style.top 	= fixed_top;
		}
		else{
			domel.style.top 	= top+"%";
		}
	}
	
//-------------------------------------
	
//---------------------------------------------------------------

	function form_post( api , formData , follow_func ){
		
		var http 	= new XMLHttpRequest();
		http.open("POST", api );
		http.send(formData);	
		
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200 ) {
				
				console.log( http.responseText );
				
				if( IsJsonString( http.responseText ) == true && follow_func != undefined ){ 
					
					var obj = JSON.parse( http.responseText );
					follow_func( obj );
				}
				else if( follow_func != undefined ){
					follow_func( http.responseText );	
				}
				else{
					
				}
			}
			else if( http.readyState == 4 && http.status == 401 ) {
				console.log( http.responseText );
				
				login_frame_call();
			}
			else if( http.readyState == 4  ) {
				console.log( http.responseText );
				
				alert("Error in Function: " + follow_func);
			}
		}
	}

//-------------------------------------------------------------
	
	
	function login_frame_call(){
		
		if( document.getElementById("login_frame") != undefined ){
			document.getElementById("login_frame").parentNode.removeChild( document.getElementById("login_frame") );
		}
		
		var login_frame = document.createElement("DIV");
			login_frame.classList.add("form_small");
			login_frame.id = "login_frame";
			login_frame.addEventListener ('keydown', function (event) {
				if (event.which == 13) {
					document.getElementById("login_submit").click();
				}
			});
			
			var form_hl = document.createElement("DIV");
				form_hl.classList.add("form_hl");
				form_hl.innerHTML = "User Login";
			login_frame.appendChild(form_hl);
					
			var user_input = document.createElement("INPUT");
				user_input.id = "username_input";
				user_input.style.textAlign = "center";
				user_input.type = "text";
				user_input.placeholder = "Enter User Name";
			login_frame.appendChild(user_input);	
			
			var pwd_input = document.createElement("INPUT");
				pwd_input.id = "pwd_input";
				pwd_input.style.textAlign = "center";
				pwd_input.type = "password";
				pwd_input.placeholder = "Enter Password";
			login_frame.appendChild(pwd_input);	

			
			var login_submit = document.createElement("BUTTON");
			login_frame.appendChild(login_submit);	
				login_submit.id = "login_submit";
				login_submit.classList.add("form_btn");
				login_submit.innerHTML = "login";
			
				login_submit.onclick = function(){
						
					var username_input = document.getElementById( 'username_input' );
					var pwd_input = document.getElementById( 'pwd_input' );
					
					var user_name =  username_input.value;
					var user_pwd  =  pwd_input.value;					
																			
						if( user_name == "" || user_pwd == "" ){
												
							username_input.value = "";
							pwd_input.value = "";
											
							alert("please enter valid credentials.");
							return null;
						}
											
																	
						var formData = new FormData();
							formData.append("function", "auth_do" );
							formData.append("user_name", user_name );
							formData.append("user_pwd", user_pwd );

							form_post( auth_api , formData , view_foward );	

						document.getElementById("login_frame").parentNode.removeChild( document.getElementById("login_frame") );
				}
		
		//-----------------------------
			
			document.body.appendChild(login_frame);
							
			center_domel( login_frame , "200px");
		
	}
	
//-------------------------------------------------------------	
	
	function view_get( ){
		
		//----------------------------------------------
			
			if ( document.getElementById( "loader_frame" ) != undefined ){ 
				loader_remove();
			}
			
		//----------------------------------------------
			
			if( hash_handler['get']( "view" ) == undefined ){
				
				var view = base_view;
			}
			else{
				
				var view = hash_handler['get']( "view" );
			}
			
			location.href = "#" + hash_handler['set'] ( "view" , view );
			
		//----------------------------------------------
			
			var formData = new FormData();
				formData.append("function", "auth_check" );
						
			form_post( auth_api , formData , view_foward );
			
		//----------------------------------------------
		
			
		
		//----------------------------------------------
	}
	
	function view_foward(){
		
		menue_call();
		
		var view = hash_handler['get']( "view" );
		
		view_call[view]();
	}
	
//-----------------------------------------------------------------

	function menue_call( ){
		
		var formData = new FormData();
			formData.append("function", "menue_call" );
						
		form_post( app_api , formData , menue_build );
	}
	
//-------------------
	
	function menue_build( obj ){
		
		var menue_frame = document.getElementById("menue_frame");
			menue_frame.innerHTML = "";
			
			var menue_table = document.createElement("TABLE");
			menue_frame.appendChild(menue_table);
				
				var menue_tr = document.createElement("TR");
				menue_table.appendChild(menue_tr);
			
				
				for( var prop in obj ){
					
					var menue_td = document.createElement("TD");
					
					if( hash_handler['get']("view") == prop ){
						
						//menue_td.style.fontWeight = "bold";
						menue_td.style.textDecoration = "underline";						
					}
					
					menue_tr.appendChild(menue_td);
					
						menue_td.innerHTML = obj[prop];
						
						menue_td.setAttribute("view" , prop);
						menue_td.onclick = function(){
							
							var view = this.getAttribute("view");
							location.href = "#view="+view;
							
							view_call[view]();
							menue_call();
						}
				}
	}

//-----------------------------------------------------------------
	
	view_call["logoff"] = function(){
		
		location.href = "#";
		
		var formData = new FormData();
			formData.append("function", "auth_kill" );
						
		form_post( auth_api , formData , location_reload );
	
	}
	
//-----------------------------------------------------------------
	
	function page_hl_build( hl_txt ){
		
		var page_hl = document.createElement("DIV");
			page_hl.classList.add("page_hl");
			page_hl.innerHTML = hl_txt;
			
		return page_hl;
	}
	
//-----------------------------------------------------------------

	function static_table_build( obj ){
		
		var table = document.createElement("TABLE");
			table.classList.add("content_table");
		
		//--------------------------
			
			var tr = document.createElement("TR");
			table.appendChild(tr);
		
			for( var prop in obj.def ){
				
				var th = document.createElement("TH");
					th.style.textAlign 	= obj.def[prop].column_align;
					th.style.width 		= obj.def[prop].column_width;
					th.innerHTML 		= obj.def[prop].column_headline;
				tr.appendChild(th);
			}
		
		//--------------------------
		
			for( var prop in obj.content ){
				
				var tr = document.createElement("TR");
				table.appendChild(tr);
				
				for( var prop2 in obj.def ){
					
					var td = document.createElement("TD");
						td.style.textAlign 	= obj.def[prop2].column_align;
						td.innerHTML 		= obj.content[prop][ obj.def[prop2].column_name ];
					tr.appendChild(td);
				}
			}
			
		//--------------------------		
		
		return table;
	}
	
//-----------------------------------------------------------------
	
	
	function edit_table_build( obj , opt ){
		
		var table = document.createElement("TABLE");
			table.classList.add("content_table");
		
		//--------------------------
			
			var tr = document.createElement("TR");
			table.appendChild(tr);
		
			for( var prop in obj.def ){
				
				var th = document.createElement("TH");
					th.style.textAlign 	= obj.def[prop].column_align;
					th.style.width 		= obj.def[prop].column_width;
					th.innerHTML 		= obj.def[prop].column_headline;
				tr.appendChild(th);
			}
			
			
			if( opt != undefined ){
				
				var th = document.createElement("TH");
					th.style.textAlign 	= "center";
					th.style.width 		= "";
					th.innerHTML 		= "Options";
				tr.appendChild(th);
				
				if( opt.includes("del") ) { var row_add = true; }
				if( opt.includes("slide_del") ) { var slide_add = true; }
			}
		
		//--------------------------
		
			for( var prop in obj.content ){
				
				var tr = document.createElement("TR");
				table.appendChild(tr);
				
				for( var prop2 in obj.def ){
										
					var td = document.createElement("TD");
					tr.appendChild(td);
					
					//--------------------------
						
						var elm_type = obj.def[prop2].column_type;
						
						var elm_obj = [];
							elm_obj.table 	= obj.table_name;
							elm_obj.id_col	= obj.id_col;
							elm_obj.id_val	= obj.content[prop][ obj.id_col ];
							elm_obj.col		= obj.def[prop2].column_name;
							elm_obj.val		= obj.content[prop][ obj.def[prop2].column_name ];
							elm_obj.align	= obj.def[prop2].column_align;
							elm_obj.plh		= obj.def[prop2].cell_placeholder;
						
							if( elm_type == "dd_fk" ){
			
								elm_obj.dd_fk = obj.dd_fk[ obj.def[prop2].column_name ];
								//console.log(elm_obj.dd_fk);
							}
						
					//--------------------------
					
					var table_element =  table_element_create[ elm_type ]( elm_obj );
						td.appendChild(table_element);
				}
				
				if( opt != undefined ){
					
					var td = document.createElement("TD");
						tr.appendChild(td);
					
					for( var prop3 in opt ){
						
						td.appendChild( table_opt_create[ opt[prop3] ](elm_obj) );
					}
				}
			}
			
		//--------------------------		
			
			if( row_add != undefined ){
				
				table.appendChild( table_opt_create[ "add" ](obj.table_name) );
			}
			
			if( slide_add != undefined ){
				
				table.appendChild( table_opt_create[ "slide_add" ](obj.table_name) );
			}
		
		//--------------------------		
		
		return table;
	}
	
//-----------------------------------------------------------------
	
	var table_element_create = [];
	
	//------------------------
	
		table_element_create["static"] = function( elm_obj ){
			
			var div = document.createElement("DIV");
				div.style.textAlign = elm_obj.align;
				div.innerHTML = elm_obj.val;
				
			return div;
		}
		
	//------------------------
		
		table_element_create["input"] = function( elm_obj ){
			
			var input = document.createElement("INPUT");
				input.style.textAlign = elm_obj.align;
				input.value = elm_obj.val;
				
				if( elm_obj.plh != null ){ input.placeholder = elm_obj.plh; }
				
				input.setAttribute("table_name" , elm_obj.table );
				input.setAttribute("id_col" , elm_obj.id_col );
				input.setAttribute("id_val" , elm_obj.id_val );
				input.setAttribute("col" , elm_obj.col );
				
				input.onchange = function(){
					
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
				
			return input;
		}
		
	//------------------------
		
		table_element_create["checkbox"] = function( elm_obj ){
			
			var chk = document.createElement("INPUT");
				chk.type = "checkbox";
				
			if( elm_obj.val == "true" ){ chk.checked = true; }
				
				chk.setAttribute("table_name" , elm_obj.table );
				chk.setAttribute("id_col" , elm_obj.id_col );
				chk.setAttribute("id_val" , elm_obj.id_val );
				chk.setAttribute("col" , elm_obj.col );
				
				chk.onchange = function(){
					
					var table_name 	= this.getAttribute("table_name");
					var id_col 		= this.getAttribute("id_col");
					var id_val 		= this.getAttribute("id_val");
					var col 		= this.getAttribute("col");
				
					var new_val		= this.checked;
					
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
				
			return chk;
		}
		
	//------------------------
	
		table_element_create["dd_fk"] = function( elm_obj ){
			
			var sel = document.createElement("SELECT");
				sel.style.textAlign = elm_obj.align;
				
				for( var prop in elm_obj.dd_fk ){
					
					var opt = document.createElement("OPTION");
						opt.value = elm_obj.dd_fk[prop].src_val_col;
						opt.innerHTML = elm_obj.dd_fk[prop].src_txt_col;
					
					sel.appendChild(opt);
				}
				
				sel.value = elm_obj.val;
				
				sel.setAttribute("table_name" , elm_obj.table );
				sel.setAttribute("id_col" , elm_obj.id_col );
				sel.setAttribute("id_val" , elm_obj.id_val );
				sel.setAttribute("col" , elm_obj.col );
				
				sel.onchange = function(){
					
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
				
			return sel;
		}
		
	//------------------------
	
		table_element_create["date"] = function( elm_obj ){
			
			var input = document.createElement("INPUT");
				input.style.textAlign = elm_obj.align;
				input.value = elm_obj.val;
				
				input.id = "date_" + elm_obj.table + "_" + elm_obj.id_val;
				
				input.onclick = function(){
					
					date_select( 0 , this.id );
				}
				
				input.setAttribute("table_name" , elm_obj.table );
				input.setAttribute("id_col" , elm_obj.id_col );
				input.setAttribute("id_val" , elm_obj.id_val );
				input.setAttribute("col" , elm_obj.col );
				
				input.onchange = function(){
					
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
				
			return input;
		}
		
	//------------------------
	
		table_element_create["thumb"] = function( elm_obj ){
			
			var div = document.createElement("DIV");
				div.style.textAlign = elm_obj.align;
				
				var img = document.createElement("IMG");
				div.appendChild(img);
				
					img.classList.add("thumb");
					img.src = elm_obj.val;
					
					img.onclick = function(){
						
						if( document.getElementById("thumb_preview_frame") != undefined ){
							document.getElementById("thumb_preview_frame").parentNode.removeChild(document.getElementById("thumb_preview_frame"));
						}
						
						var thumb_preview_frame = document.createElement("DIV");
							thumb_preview_frame.classList.add("thumb_preview_frame");
							thumb_preview_frame.id = "thumb_preview_frame";
							
							var prev_img = document.createElement("IMG");
							thumb_preview_frame.appendChild(prev_img);
								prev_img.src = this.src;
								
						document.body.appendChild(thumb_preview_frame);
						
						center_domel( thumb_preview_frame );
					
					}
					img.onmouseout = function(){
						if( document.getElementById("thumb_preview_frame") != undefined ){
							document.getElementById("thumb_preview_frame").parentNode.removeChild(document.getElementById("thumb_preview_frame"));
						}
					}
					
			return div;
		}
		
	//------------------------
	
		table_element_create["slide_assign"] = function( elm_obj ){
			
			var div = document.createElement("DIV");
				div.style.textAlign = elm_obj.align;
				
				var div2 = document.createElement("DIV");
					div2.classList.add("slide_assign_label");
					div2.style.textAlign = elm_obj.align;
					div2.innerHTML = elm_obj.val;
				
				div.appendChild(div2);
				
			//----------------------------
				
				var chk = document.createElement("INPUT");
					chk.type = "checkbox";
					chk.classList.add("slide_assign");
					chk.style.display = "none";
					
					chk.setAttribute( "slide_id" , elm_obj.id_val );
				
				div.appendChild(chk);
				
			//----------------------------
				
			return div;
		}
		
	//------------------------
	
		table_element_create["download"] = function( elm_obj ){
			
			var div = document.createElement("DIV");
				div.style.textAlign = elm_obj.align;
				
				var ahref = document.createElement("A");
					ahref.classList.add("download_link");
					ahref.href = elm_obj.val
					ahref.innerHTML = "download";
					ahref.download = elm_obj.val;
				div.appendChild(ahref);
				
			return div;
		}
		
	//------------------------
	
		table_element_create["password"] = function( elm_obj ){
			
			var div = document.createElement("DIV");
				div.style.textAlign = elm_obj.align;
			
				var btn = document.createElement("BUTTON");
					btn.classList.add("pwd_res_btn");
					btn.innerHTML = "reset";
					
					btn.setAttribute("table_name" , elm_obj.table );
					btn.setAttribute("id_col" , elm_obj.id_col );
					btn.setAttribute("id_val" , elm_obj.id_val );
					btn.setAttribute("col" , elm_obj.col );
					
					btn.onclick = function(){
						
						var pwd_obj = [];
						
							pwd_obj["table_name"] 	= this.getAttribute("table_name");
							pwd_obj["id_col"] 		= this.getAttribute("id_col");
							pwd_obj["id_val"] 		= this.getAttribute("id_val");
							pwd_obj["col"] 			= this.getAttribute("col");
						
						pwd_res_frame_call(pwd_obj);
					}
					
				div.appendChild(btn);
			
				
			return div;
		}
		
	//------------------------
	
		table_element_create["odr"] = function( elm_obj ){
			
			var div = document.createElement("DIV");
				div.style.textAlign = "center";
				
				var updiv = document.createElement("DIV");
					updiv.classList.add("odr_arrow");
					updiv.style.marginBottom = "4px"; 
					updiv.innerHTML = "&and;";
					
					updiv.setAttribute("table_name" , elm_obj.table );
					updiv.setAttribute("id_col" , elm_obj.id_col );
					updiv.setAttribute("id_val" , elm_obj.id_val );
					updiv.setAttribute("col" , elm_obj.col );
					updiv.onclick = function(){
						
						var table_name 	= this.getAttribute("table_name");
						var id_col 		= this.getAttribute("id_col");
						var id_val 		= this.getAttribute("id_val");
						var col 		= this.getAttribute("col");
						
						var formData = new FormData();
							formData.append("function", "table_row_order" );
							formData.append("table_name", table_name );
							formData.append("id_col", id_col );
							formData.append("id_val", id_val );
							formData.append("col", col );
							
							formData.append("direction", "up" );
						
						form_post( app_api , formData , view_foward );
						//form_post( app_api , formData );
					}
					
				div.appendChild(updiv);
				
			//------------------------------
				
				var downdiv = document.createElement("DIV");
					downdiv.classList.add("odr_arrow");
					downdiv.innerHTML = "&or;";
					
					downdiv.setAttribute("table_name" , elm_obj.table );
					downdiv.setAttribute("id_col" , elm_obj.id_col );
					downdiv.setAttribute("id_val" , elm_obj.id_val );
					downdiv.setAttribute("col" , elm_obj.col );
					downdiv.onclick = function(){
						
						var table_name 	= this.getAttribute("table_name");
						var id_col 		= this.getAttribute("id_col");
						var id_val 		= this.getAttribute("id_val");
						var col 		= this.getAttribute("col");
						
						var formData = new FormData();
							formData.append("function", "table_row_order" );
							formData.append("table_name", table_name );
							formData.append("id_col", id_col );
							formData.append("id_val", id_val );
							formData.append("col", col );
							
							formData.append("direction", "down" );
						
						form_post( app_api , formData , view_foward );
						//form_post( app_api , formData );
					}
					
				div.appendChild(downdiv);
				
			return div;
		}
		
	//------------------------
	
	
	
//-----------------------------------------------------------------
	
	var table_opt_create = [];
	
	//------------------------
	
		table_opt_create["del"] = function( opt_obj ){
			
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
		
	//------------------------
	
		table_opt_create["add"] = function( table_name ){
			
			var tr = document.createElement("TR");
				var td = document.createElement("TD");
				tr.appendChild(td);
					td.style.background = "none"
				
					var btn = document.createElement("BUTTON");
					td.appendChild(btn);
						
						btn.classList.add("content_table_btn");
						btn.innerHTML = "add";
						
						btn.setAttribute("table_name" , table_name );
						
						btn.onclick = function(){
		   
							var table_name 	= this.getAttribute("table_name");
							
							var formData = new FormData();
								formData.append("function", "table_row_add" );
								formData.append("table_name", table_name );
								
							form_post( app_api , formData , view_foward );
						}
		
			return tr;
		}
	
	//------------------------
	
//-----------------------------------------------------------------
	
	function pwd_res_frame_call( pwd_obj ){
		
		if( document.getElementById("pwd_res_frame") != undefined ){
			document.getElementById("pwd_res_frame").parentNode.removeChild( document.getElementById("pwd_res_frame") );
		}
		
		console.log(pwd_obj);
		
		var pwd_res_frame = document.createElement("DIV");
			pwd_res_frame.classList.add("form_small");
			pwd_res_frame.id = "pwd_res_frame";
			pwd_res_frame.addEventListener ('keydown', function (event) {
				if (event.which == 13) {
					document.getElementById("respwd_submit_btn").click();
				}
			});
			
			var form_hl = document.createElement("DIV");
				form_hl.classList.add("form_hl");
				form_hl.innerHTML = "User Password Reset";
			pwd_res_frame.appendChild(form_hl);
					
			var pwd_input = document.createElement("INPUT");
				pwd_input.id = "pwd_input";
				pwd_input.style.textAlign = "center";
				pwd_input.type = "password";
				pwd_input.placeholder = "Please enter new Password";
			pwd_res_frame.appendChild(pwd_input);	
			
			var pwd_input = document.createElement("INPUT");
				pwd_input.id = "pwd_input_rep";
				pwd_input.style.textAlign = "center";
				pwd_input.type = "password";
				pwd_input.placeholder = "Please repeat new Password";
			pwd_res_frame.appendChild(pwd_input);	

			
			var pwd_submit = document.createElement("BUTTON");
			pwd_res_frame.appendChild(pwd_submit);	
				pwd_submit.id = "respwd_submit_btn";
				pwd_submit.classList.add("form_btn");
				pwd_submit.innerHTML = "reset";
			
				pwd_submit.setAttribute("col" , pwd_obj.col );
				pwd_submit.setAttribute("id_col" , pwd_obj.id_col );
				pwd_submit.setAttribute("id_val" , pwd_obj.id_val );
				pwd_submit.setAttribute("table_name" , pwd_obj.table_name );
				
				pwd_submit.onclick = function(){
						
					var col 		= this.getAttribute("col");
					var id_col 		= this.getAttribute("id_col");
					var id_val 		= this.getAttribute("id_val");
					var table_name 	= this.getAttribute("table_name");
						
					var pwd_input = document.getElementById( 'pwd_input' );
					var pwd_input_rep = document.getElementById( 'pwd_input_rep' );
											
																			
						if( pwd_input.value == "" ){
												
							pwd_input.value = "";
							pwd_input_rep.value = "";
											
							alert("please enter a valid password.");
							return null;
						}
											
						if( pwd_input.value != pwd_input_rep.value ){
									
							pwd_input.value = "";
							pwd_input_rep.value = "";
												
							alert("please enter a valid password.");
							return null;
						}
											
						var formData = new FormData();
							formData.append("function", "res_pwd" );
							formData.append("new_pwd", pwd_input.value );
							formData.append("col", col );
							formData.append("id_col", id_col );
							formData.append("id_val", id_val );
							formData.append("table_name", table_name );
							

							form_post( app_api , formData );	

						document.getElementById("pwd_res_frame").parentNode.removeChild( document.getElementById("pwd_res_frame") );
				}
			
			var pwd_cancel = document.createElement("BUTTON");
			pwd_res_frame.appendChild(pwd_cancel);	
				pwd_cancel.classList.add("form_btn");
				pwd_cancel.innerHTML = "cancel";
				
				pwd_cancel.onclick = function(){
					
					document.getElementById("pwd_res_frame").parentNode.removeChild( document.getElementById("pwd_res_frame") );
				}
		
		
		//-----------------------------
			
			document.body.appendChild(pwd_res_frame);
							
			center_domel( pwd_res_frame , "120px");
	}

//-----------------------------------------------------------------	
