	
//-------------------------------------

	var app_api 	= 'infoscreen_show.php';
	
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

	function hash_handler_get( hash_key ){

		var hash = window.location.hash.substr(1);
		
		//console.log( hash );
		
		var hash_ary = hash.split('/');
		
				
		var hash_sry_assoc = [];
			
		x = hash_ary.length;

		for( i=0; i < x ; i++ ){
			
			var n = hash_ary[i].indexOf( "=" );
			
			hash_sry_assoc[ hash_ary[i].substring( 0, n) ] = hash_ary[i].substring( n+1 ) ;			
		}		
			
		//console.log( hash_sry_assoc );
		
		var hash_result = hash_sry_assoc[ hash_key ];
		console.log( hash_result );
		
		return hash_result;	
	}

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
				
				pin_frame_call();
			}
			else if( http.readyState == 4  ) {
				console.log( http.responseText );
				
				alert("Error in Function: " + follow_func);
			}
		}
	}

//-------------------------------------------------------------
	
	function check_pin(){
		
		var presentation_id = hash_handler_get( "presentation_id" );
		
		var formData = new FormData();
			formData.append("function", "check_pin" );
			formData.append("presentation_id", presentation_id );
		
		form_post( app_api , formData , infoscreen_show_call );
	}

//---------------------------

	function pin_frame_call(){
		
		var presentation_id = hash_handler_get( "presentation_id" );
		
		if( document.getElementById("pin_frame") != undefined ){
			document.getElementById("pin_frame").parentNode.removeChild( document.getElementById("pin_frame") );
		}
		
		var pin_frame = document.createElement("DIV");
			pin_frame.classList.add("form_small");
			pin_frame.id = "pin_frame";
			pin_frame.addEventListener ('keydown', function (event) {
				if (event.which == 13) {
					document.getElementById("pin_submit").click();
				}
			});
			
			var form_hl = document.createElement("DIV");
				form_hl.classList.add("form_hl");
				form_hl.innerHTML = "Access Pin";
			pin_frame.appendChild(form_hl);
					
			var pin_input = document.createElement("INPUT");
				pin_input.id = "pin_input";
				pin_input.style.textAlign = "center";
				pin_input.type = "text";
				pin_input.placeholder = "Enter Pin";
			pin_frame.appendChild(pin_input);	
			

			
			var pin_submit = document.createElement("BUTTON");
			pin_frame.appendChild(pin_submit);	
				pin_submit.id = "pin_submit";
				pin_submit.classList.add("form_btn");
				pin_submit.innerHTML = "ok";
				
				pin_submit.setAttribute("presentation_id" , presentation_id );
			
				pin_submit.onclick = function(){
					
					var presentation_id = this.getAttribute("presentation_id");
					
					
					var pin_input = document.getElementById( 'pin_input' );
					
					var presentation_pin =  pin_input.value;	
																			
						if( presentation_pin == "" ){
												
							pin_input.value = "";
											
							alert("please enter a valid pin.");
							return null;
						}
											
																	
						var formData = new FormData();
							formData.append("function", "pin_auth_do" );
							formData.append("presentation_pin", presentation_pin );
							formData.append("presentation_id", presentation_id );

							form_post( app_api , formData , infoscreen_show_call );	

						document.getElementById("pin_frame").parentNode.removeChild( document.getElementById("pin_frame") );
				}
		
		//-----------------------------
			
			document.body.appendChild(pin_frame);
							
			center_domel( pin_frame , "120px");
		
	}
	
	
//-------------------------------------------------------------

	function infoscreen_show_call(){
		
		var presentation_id = hash_handler_get( "presentation_id" );
		var location_id 	= hash_handler_get( "location_id" );
		
		var formData = new FormData();
			formData.append("function", "infoscreen_show_call" );
			formData.append("presentation_id", presentation_id );
			formData.append("location_id", location_id );
		
		form_post( app_api , formData , infoscreen_show_build );
	}
		
//----------------------------

	function infoscreen_show_build( obj ){
		
		window.tmpobj = obj;
		
		var i = 0;
		
		var media_target = document.getElementById("media_target");
			
		for( var prop in obj.content ){
			
			if( obj.content[prop].slide_filetype == "video" ){
				
				var is_slide = document.createElement("VIDEO");
					is_slide.classList.add( "slide" );
					is_slide.setAttribute("controls" , "controls" );
					is_slide.setAttribute("slide_nr" , prop );
					is_slide.style.display = "none";
					
					var is_slide_prop = document.createElement("SOURCE");
						is_slide_prop.src = "../"+obj.content[prop].slide_file;
						is_slide_prop.type = "video/mp4";
						
					is_slide.appendChild(is_slide_prop);
			}
			else{
				var is_slide = document.createElement("IMG");
					is_slide.classList.add( "slide" );
					is_slide.setAttribute("slide_nr" , prop );
					is_slide.src = "../"+obj.content[prop].slide_file;
					is_slide.style.display = "none";
			}
			
			media_target.appendChild(is_slide);
			
			if( prop == 0 ){
				is_slide.style.display = "inline";
				window.slide_nr = 0;
			}
			
		}
		
	}

//-------------------------------------------------------------	
	
	function media_control_toggle(){
		
		var media_control = document.getElementById("media_control");
		
		if( $("#media_control").css("display") == "none" ){
			
			$("#media_control").fadeIn(300);
			$("#media_control_bg").fadeIn(300);
		}
		else{
			
			$("#media_control").fadeOut(300);
			$("#media_control_bg").fadeOut(300);
		}
	}
	
//-------------------------------------------------------------	
		
	function slide_next(){
		
		var slide_nr = parseInt( window.slide_nr );
		
		if( slide_nr == $( ".slide" ).length -1 ){
			var new_slide_nr =  0;
		}
		else{
			var new_slide_nr =  slide_nr + 1;
		}
		
		var cur_slide = $( ".slide" )[slide_nr];
			$(cur_slide).fadeOut(500);
		
		var new_slide = $( ".slide" )[new_slide_nr];
			$(new_slide).fadeIn(500);
						
		window.slide_nr = new_slide_nr;
					
	}
		
//---------------------------
		
	function slide_prev(){
		
		var slide_nr = parseInt( window.slide_nr );
		
		if( slide_nr == 0 ){
			var new_slide_nr =  $( ".slide" ).length -1 ;
		}
		else{
			var new_slide_nr =  slide_nr - 1;
		}
		
		var cur_slide = $( ".slide" )[slide_nr];
			$(cur_slide).fadeOut(500);
		
		var new_slide = $( ".slide" )[new_slide_nr];
			$(new_slide).fadeIn(500);
						
		window.slide_nr = new_slide_nr;
					
	}
		
//---------------------------
		
	function slide_play(){
		
		$( "#slide_play_btn" ).hide();
		$( "#slide_pause_btn" ).show();
		
		if( hash_handler_get( "interval" ) != undefined ){
			interv_sec = parseInt( hash_handler_get( "interval" ) ) * 1000;
		}
		else{
			interv_sec = 5000;
		}
		
		window.interval = setInterval( function(){
			
			slide_next();
		}, interv_sec);	
	}
		
//---------------------------
	
	function slide_pause(){
		
		$( "#slide_play_btn" ).show();
		$( "#slide_pause_btn" ).hide();
		
		clearInterval(window.interval);
					
	}
		
//---------------------------
		