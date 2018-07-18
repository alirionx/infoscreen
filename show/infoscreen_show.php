
<?php

//-----------Work with Sessions---------------------------
	if (session_status() == PHP_SESSION_NONE) {
		
		ini_set('session.gc_maxlifetime', 180);
		session_start();
	}
//--------------------------------------------------------

//---Disable Authentication (Maintenance Mode)------------

	//$_SESSION['presentation_pin'] = "08398"; 
	
//--------------------------------------------------------


//---MySQL Connect----------------------------------------
	
	$my_schema = 'infoscreen';
		
	$my_con = mysqli_connect(
		'127.0.0.1' , 
		'infoscreen' , 
		'infoscreen' , 
		$my_schema
	);

//--------------------------------------------------------	
	
	function pin_auth_do( $POST ){
		
		//---------------------
			
			$my_con 		= $GLOBALS['my_con'];
			$my_schema		= $GLOBALS['my_schema'];
			
			$presentation_id	= $POST['presentation_id'];
			$presentation_pin 	= $POST['presentation_pin'];
			
		//---------------------
			
			$sql_qry = mysqli_query($my_con, " SELECT presentation_pin FROM presentations WHERE presentation_id = $presentation_id ; " );	
			$sql_row = mysqli_fetch_assoc( $sql_qry );
			
			if( $sql_row['presentation_pin'] == $presentation_pin ){
				
				$_SESSION['presentation_pin'] = $presentation_pin;
			}
	}

//-----------------------------------------------------------------------------

	function infoscreen_show_call( $POST ){
		
		//---------------------
			
			$my_con 		= $GLOBALS['my_con'];
			$my_schema		= $GLOBALS['my_schema'];
			
			$presentation_id = $POST['presentation_id'];
			$location_id 	 = $POST['location_id'];
		
		//---------------------
		
			$sql_qry = mysqli_query($my_con, " SELECT presentation_pin FROM presentations WHERE presentation_id = $presentation_id ; " );	
			$sql_row = mysqli_fetch_assoc( $sql_qry );
			
			$presentation_pin = $sql_row['presentation_pin'];
			
			if( $presentation_pin != '' && $_SESSION['presentation_pin'] != $presentation_pin ){
				
				exit( header("HTTP/1.1 401 Unauthorized") ); 
			}
			
		//---------------------
				
			$obj_out = array();
				
			$obj_out['function']		= $POST['function'];
			$obj_out['presentation_id'] = $presentation_id;
			$obj_out['location_id'] 	= $location_id;
			
			$timestamp = date("Y-m-d");
		
		//----------------------------------------------------------------------
		
			$sql_qry = mysqli_query($my_con, " 
			
				SELECT

					b.slide_id,
					b.slide_file,
                    b.slide_expire,
					b.slide_filetype
					
					FROM
						presentations a
						
					JOIN
						slides b
						ON(a.presentation_id = b.presentation_id)
					
					JOIN
						slide_to_location c
						ON(b.slide_id = c.slide_id)
					
						WHERE
							a.presentation_id = $presentation_id
								AND
							c.location_id = $location_id 
							
						ORDER BY 
							b.slide_number
			" );	
			
			$i = 0;
			
			while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
				
				$slide_expire = $sql_row['slide_expire'];
				
				if( $slide_expire != '' && $slide_expire < $timestamp ){
					
				}
				else{
				
					$obj_out['content'][ $i ] = $sql_row;
				}
				
				$i ++;
			}
			
		//----------------------------------------------------------------------
		
		
		//---------------------
		
			$json_out = json_encode($obj_out, JSON_PRETTY_PRINT);
			//echo '<pre>';
			print_r( $json_out );
			//echo '</pre>';
		
		//---------------------
	}

//-----------------------------------------------------------------------------
	
	
	
	

//--------Function Caller------------------------------------------------------
		
	if( isset( $_POST["function"] ) ) {
		
		if(isset( $_FILES ) ){
			$_POST["function"]( $_POST , $_FILES );	
		}
		else{
			$_POST["function"]( $_POST );	
		}
		//print_r($_POST); 
	}	
	
	if( isset( $_GET["function"] ) ) {
		$_GET["function"]( $_GET );	
	
		//print_r($_POST); 
	}	
	
//-----------------------------------------------------------------------------




?>