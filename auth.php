<?php
	
//-----------Work with Sessions---------------------------
	if (session_status() == PHP_SESSION_NONE) {
		
		ini_set('session.gc_maxlifetime', 180);
		session_start();
	}
//--------------------------------------------------------


//---Disable Authentication (Maintenance Mode)------------

	//$_SESSION['userid'] = "dquilitzsch"; 
	//$_SESSION['admin']  = true; 
	
//---MySQL Connect----------------------------------------
	
	$my_schema = 'infoscreen';
		
	$my_con = mysqli_connect(
		'127.0.0.1' , 
		'infoscreen' , 
		'infoscreen' , 
		$my_schema
	);

//--------------------------------------------------------	


//-------Global Vars--------------------------------------

	$file_base		= '/var/www/html/infoscreen/';

//--------------------------------------------------------



//--------The Auth Ting--------------------------------------------------------
	
	function auth_check(){
		
		if( isset( $_SESSION['userid'] )){
			
			echo $_SESSION['userid'];
		}
		else{
			
			exit( header("HTTP/1.1 401 Unauthorized") ); 
		}
	}
	
//--------------------------------------
	
	function auth_do( $POST ){
		
		//---------------------
		
			$my_con 		= $GLOBALS['my_con'];
			$my_schema		= $GLOBALS['my_schema'];
			
			$user_name		= $POST['user_name'];
			$user_pwd		= $POST['user_pwd'];
			
		//---------------------
		
			$sql_qry = mysqli_query($my_con, " 
				
				SELECT 
					a.*,
					b.role_name
					
					FROM 
						users a
						
					JOIN
						roles b
						ON(a.user_role = b.id )
						
						
						WHERE 
							a.user_name = '$user_name' 
				; 
				
			" );	
			$sql_num = mysqli_num_rows( $sql_qry );
			
			if( $sql_num > 0 ){
				$sql_row = mysqli_fetch_assoc( $sql_qry );				
				$user_password_hash = $sql_row['user_password'];
				
				if ( password_verify( $user_pwd, $user_password_hash ) ) {
					
					$_SESSION['userid'] = $user_name; 
					$_SESSION['role'] = $sql_row['role_name']; 
				}
				
			}
	}
	
//--------------------------------------

	function auth_kill( $POST ){
		
		session_destroy();
	}

//-----------------------------------------------------------------------------





//--------Function Caller-----------------------------------------------------
		
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