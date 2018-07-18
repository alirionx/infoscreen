<?php
	
//-----------Work with Sessions---------------------------
	if (session_status() == PHP_SESSION_NONE) {
		
		ini_set('session.gc_maxlifetime', 180);
		session_start();
	}
//--------------------------------------------------------


//---Maintenance Mode-------------------------------------
	
	//$_SESSION['userid'] 	= 'dquilitzsch';

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
	

//----Usefull Functions-----------------------------------
	
	function generateRandomString( $length ) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
	
//--------------------------------------------------------

	
//---Check Auth and cancel if not-------------------------

	if( !isset($_SESSION['userid']) ){ exit( header("HTTP/1.1 401 Unauthorized") ); }
	
//--------------------------------------------------------	




//--------Menue Call----------------------------------------------------------

	function menue_call( $POST ){

		$menue_def['user']  = array();
		$menue_def['admin'] = array();
			
			$menue_def['user']["home"] 			= "Home";
			$menue_def['user']["presentations"] = "Presentations";
			$menue_def['user']["locations"] 	= "Locations";
			$menue_def['user']["profile"] 		= "Profile";
			$menue_def['user']["logoff"] 		= "Logoff";

			$menue_def['admin']["home"] 		 = "Home";
			$menue_def['admin']["presentations"] = "Presentations";
			$menue_def['admin']["locations"] 	 = "Locations";
			$menue_def['admin']["mgmt"] 		 = "App Management";
			$menue_def['admin']["profile"] 		 = "Profile";
			$menue_def['admin']["logoff"] 		 = "Logoff";
		
		
				
			$obj_out = $menue_def[ $_SESSION['role'] ];
		
		//---------------------
		
			$json_out = json_encode( $obj_out, JSON_PRETTY_PRINT);
			//echo '<pre>';
			print_r( $json_out );
			//echo '</pre>';
		
		//---------------------
	}
	
//-----------------------------------------------------------------------------


//--------Management Tables Call-----------------------------------------------

	function mgmt_tables_call( $POST ){

		$my_con 		= $GLOBALS['my_con'];
		$my_schema		= $GLOBALS['my_schema'];
		
		$table_name		= '__tables';
		
		//---------------------
			
			$obj_out = array();
			
			$obj_out['userid'] 		= $_SESSION['userid'];
			$obj_out['function']	= $POST['function'];
		
		//---------------------		
			
			$sql_qry = mysqli_query($my_con, " SELECT * FROM __tables WHERE mgmt = 'true' ; " );	
			
			while( $sql_row = mysqli_fetch_assoc( $sql_qry )){
				
				$obj_out['content'][ $sql_row['id'] ] =  $sql_row; 
				
			}
		
		//---------------------
		
			$json_out = json_encode( $obj_out, JSON_PRETTY_PRINT);
			//echo '<pre>';
			print_r( $json_out );
			//echo '</pre>';
		
		//---------------------
	}
	
//-----------------------------------------------------------------------------





//--------Table Call----------------------------------------------------------

	function table_call( $POST ){
		
		$my_con 		= $GLOBALS['my_con'];
		$my_schema		= $GLOBALS['my_schema'];
		
		$table_name		= $POST['table_name'];
		
		//---------------------
			
			$obj_out = array();
			
			$obj_out['userid'] 		= $_SESSION['userid'];
			$obj_out['function']	= $POST['function'];
			$obj_out['table_name'] 	= $POST['table_name'];
		
		//---------------------		
			
			$sql_qry = mysqli_query($my_con, " SELECT * FROM __tables WHERE table_name = '$table_name' ; " );	
			
			$sql_row = mysqli_fetch_assoc( $sql_qry );
			
			$id_col  = $sql_row['id_col'];
			$table_odr  = $sql_row['table_odr'];
			
			$obj_out['id_col'] 	= $sql_row['id_col'];
			$obj_out['new_col'] = $sql_row['new_col'];
			$obj_out['new_val'] = $sql_row['new_val'];
			
		
		//---------------------
		
			$sql_qry = mysqli_query($my_con, " SELECT * FROM _$table_name ORDER BY odr ; " );	
			
			while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
				
				$obj_out['def'][ $sql_row['odr'] ] = $sql_row;
				
				if( $sql_row['column_type'] == 'dd_fk' ){
					
					$column_name = $sql_row['column_name'];
					
					$sql_sub_qry = mysqli_query($my_con, " SELECT * FROM __dd WHERE column_name = '$column_name' ; " );
					
					if( mysqli_num_rows($sql_sub_qry) > 0 ){
						
						$sql_sub_row = mysqli_fetch_assoc( $sql_sub_qry );
						
						$column_name = $sql_sub_row['column_name'];
						$src_table   = $sql_sub_row['src_table'];
						$src_val_col = $sql_sub_row['src_val_col'];
						$src_txt_col = $sql_sub_row['src_txt_col'];
						$src_group   = $sql_sub_row['src_group'];
						$src_order   = $sql_sub_row['src_order'];
						
						$i = 1;
						
						$sql_sub_qry = mysqli_query($my_con, " SELECT * FROM $src_table $src_group $src_order  ; " );
						while( $sql_sub_row = mysqli_fetch_assoc( $sql_sub_qry ) ){
								
							$obj_out['dd_fk'][$column_name][ $i ]['src_val_col'] = $sql_sub_row[ $src_val_col ];
							$obj_out['dd_fk'][$column_name][ $i ]['src_txt_col'] = $sql_sub_row[ $src_txt_col ];
							
							$i ++;
						}
					}
					
				}
			}
		
		//---------------------
			
			$sql_qry = mysqli_query($my_con, " SELECT * FROM $table_name ORDER BY $table_odr ; " );	
			
			while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
				
				$obj_out['content'][ $sql_row[ $table_odr ] ] = $sql_row;
			}
		
		//---------------------
		
			$json_out = json_encode($obj_out, JSON_PRETTY_PRINT);
			//echo '<pre>';
			print_r( $json_out );
			//echo '</pre>';
		
		//---------------------
	}

//-----------------------------------------------------------------------------


//--------Table Cell Change----------------------------------------------------

	function table_cell_change( $POST ){
	
		$my_con 		= $GLOBALS['my_con'];
		$my_schema		= $GLOBALS['my_schema'];
		
		print_r($POST);
		
		$table_name = $POST['table_name'];
		$id_col 	= $POST['id_col'];
		$id_val 	= $POST['id_val'];
		$col		= $POST['col'];
		$new_val 	= $POST['new_val'];
		
		$sql_qry = mysqli_query($my_con, " UPDATE $table_name SET $col = '$new_val' WHERE $id_col = '$id_val' ; " );	
	}

//-----------------------------------------------------------------------------



//--------User Profile Call----------------------------------------------------

	function user_profile_call( $POST ){
	
			$my_con 		= $GLOBALS['my_con'];
			$my_schema		= $GLOBALS['my_schema'];
		
			$user_name 		= $_SESSION['userid'];
			
			$table			= 'users';
			$table_def		= '_users';
		
		//---------------------
			
			$obj_out = array();
			
			$obj_out['userid'] 		= $_SESSION['userid'];
			$obj_out['function']	= $POST['function'];
			$obj_out['table_name']	= $table;
			$obj_out['id_col']		= "user_id";
		
		//----------------------------------------------------------------------
		
			$i = 1;
			$sql_qry = mysqli_query($my_con, " SELECT * FROM $table_def ORDER BY odr; " );	
			while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
				
				$obj_out['def'][$i] = $sql_row;
				$i ++;
			}
			
		//------------------------------------
		
			$sql_qry = mysqli_query($my_con, " SELECT * FROM $table WHERE user_name = '$user_name' ; " );	
			$sql_row = mysqli_fetch_assoc( $sql_qry );
				
			$obj_out['content'] = $sql_row;
			
			unset( $obj_out['content']['user_password'] );
			
		//----------------------------------------------------------------------
		
		//---------------------
		
			$json_out = json_encode($obj_out, JSON_PRETTY_PRINT);
			//echo '<pre>';
			print_r( $json_out );
			//echo '</pre>';
		
		//---------------------
	}

//-----------------------------------------------------------------------------



//--------Password Reset----------------------------------------------------

	function res_pwd( $POST ){
	
		$my_con 		= $GLOBALS['my_con'];
		$my_schema		= $GLOBALS['my_schema'];
		
		print_r($POST);
		
		$table_name = $POST['table_name'];
		$id_col 	= $POST['id_col'];
		$id_val 	= $POST['id_val'];
		$col		= $POST['col'];
		$new_pwd 	= $POST['new_pwd'];
		
		$new_pwd_hash = password_hash($new_pwd, PASSWORD_DEFAULT);
		
		$sql_qry = mysqli_query($my_con, " UPDATE $table_name SET $col = '$new_pwd_hash' WHERE $id_col = '$id_val' ; " );	
	}

//-----------------------------------------------------------------------------





//--------Table Row Delete-----------------------------------------------------

	function table_row_delete( $POST ){
	
		$my_con 		= $GLOBALS['my_con'];
		$my_schema		= $GLOBALS['my_schema'];
		
		print_r($POST);
		
		$table_name = $POST['table_name'];
		$id_col 	= $POST['id_col'];
		$id_val 	= $POST['id_val'];
		
		
		//------------------------------------
		
			if( $table_name == 'slides' ){
				
				$sql_qry = mysqli_query($my_con, " SELECT slide_thumb , slide_file FROM slides WHERE $id_col = '$id_val' ; " );	
				$sql_row = mysqli_fetch_assoc( $sql_qry );
				
				$slide_thumb 	= $sql_row['slide_thumb'];
				$slide_file		= $sql_row['slide_file'];
				unlink( $slide_thumb ); 
				unlink( $slide_file ); 
				
				$sql_qry = mysqli_query($my_con, " DELETE FROM slide_to_location WHERE slide_id = $id_val ; " );
				
			}
			
		//------------------------------------
		
			if( $table_name == 'presentations' ){
				
				echo $id_col . " - " . $id_val . " - " . $table_name;
				
				$sql_qry2 = mysqli_query( $my_con, " SELECT * FROM slides WHERE $id_col = $id_val ; " )or die("Error: ".mysqli_error($my_con) ) ;
				
				while( $sql_row2 = mysqli_fetch_assoc( $sql_qry2 ) ){
					
					$slide_id		= $sql_row2['slide_id'];
					$slide_thumb 	= $sql_row2['slide_thumb'];
					$slide_file		= $sql_row2['slide_file'];
					unlink( $slide_thumb ); 
					unlink( $slide_file ); 
					
					$sql_qry3 = mysqli_query($my_con, " DELETE FROM slide_to_location WHERE slide_id = $slide_id ; " );
					
				}
				
				$sql_qry4 = mysqli_query($my_con, " DELETE FROM slides WHERE $id_col = $id_val ; " );	
			}
			
		//------------------------------------
		
		$sql_qry = mysqli_query($my_con, " DELETE FROM $table_name WHERE $id_col = '$id_val' ; " );	
	}

//-----------------------------------------------------------------------------


//--------Table Row Add--------------------------------------------------------

	function table_row_add( $POST ){
	
		$my_con 		= $GLOBALS['my_con'];
		$my_schema		= $GLOBALS['my_schema'];
		
		print_r($POST);
		
		$table_name = $POST['table_name'];
		
		$sql_qry = mysqli_query($my_con, " SELECT * FROM __tables WHERE table_name = '$table_name' ; " );	
		$sql_row = mysqli_fetch_assoc( $sql_qry );
		
		$new_col = $sql_row['new_col'];
		$new_val = $sql_row['new_val'];
		
		$sql_qry = mysqli_query($my_con, " INSERT INTO $table_name ($new_col) VALUES('$new_val') ; " );	
		
	}

//-----------------------------------------------------------------------------


//--------Table Row Order--------------------------------------------------------

	function table_row_order( $POST ){
	
		$my_con 		= $GLOBALS['my_con'];
		$my_schema		= $GLOBALS['my_schema'];
		
	//---------------------
		
		$table_name = $POST['table_name'];
		$id_col 	= $POST['id_col'];
		$id_val 	= $POST['id_val'];
		$odr_col 	= $POST['col'];
		$odr_dir 	= $POST['direction'];
		
	//---------------------
		
		$presentation_filter 	 = ""; //BAD CODE!!!
		$presentation_and_filter = ""; //BAD CODE!!!
		
		if( $table_name == 'slides' ){
			$sql_qry = mysqli_query($my_con, " SELECT presentation_id FROM $table_name WHERE $id_col = '$id_val' ; " );	
			$sql_row = mysqli_fetch_assoc( $sql_qry );
			$presentation_id = $sql_row['presentation_id'];
			
			$presentation_filter 	 = " WHERE presentation_id = '".$presentation_id."'";
			$presentation_and_filter = " AND presentation_id = '".$presentation_id."'";
		}
		
	//---------------------
		
		$sql_qry = mysqli_query($my_con, " SELECT $odr_col FROM $table_name WHERE $id_col = '$id_val' ; " );	
		$sql_row = mysqli_fetch_assoc( $sql_qry );
		echo $cur_odr = $sql_row[$odr_col];
		
		$sql_qry = mysqli_query($my_con, " SELECT MIN($odr_col) as min_odr , MAX($odr_col) as max_odr FROM $table_name $presentation_filter ; " );	
		$sql_row = mysqli_fetch_assoc( $sql_qry );
		echo $min_odr = $sql_row['min_odr'];
		echo $max_odr = $sql_row['max_odr'];
		
		if( $odr_dir == 'up' && $cur_odr > $min_odr ){
			
			echo "true";
			$sql_qry  = mysqli_query($my_con, " SELECT $id_col , $odr_col FROM $table_name WHERE $odr_col < $cur_odr $presentation_and_filter ORDER BY $odr_col DESC LIMIT 1 ; " );	
			$sql_row  = mysqli_fetch_assoc( $sql_qry );
			echo $less_ord = $sql_row[$odr_col];
			$less_id = $sql_row[$id_col];
			
			$sql_qry = mysqli_query($my_con, " UPDATE $table_name SET $odr_col = '$less_ord' WHERE $id_col = '$id_val' ; " );	
			$sql_qry = mysqli_query($my_con, " UPDATE $table_name SET $odr_col = '$cur_odr' WHERE $id_col = '$less_id' ; " );	
			
		}
		
		if( $odr_dir == 'down' && $cur_odr < $max_odr ){
			
			echo "true";
			$sql_qry  = mysqli_query($my_con, " SELECT $id_col , $odr_col FROM $table_name WHERE $odr_col > $cur_odr $presentation_and_filter ORDER BY $odr_col LIMIT 1 ; " );	
			$sql_row  = mysqli_fetch_assoc( $sql_qry );
			echo $more_ord = $sql_row[$odr_col];
			$more_id = $sql_row[$id_col];
			
			$sql_qry = mysqli_query($my_con, " UPDATE $table_name SET $odr_col = '$more_ord' WHERE $id_col = '$id_val' ; " );	
			$sql_qry = mysqli_query($my_con, " UPDATE $table_name SET $odr_col = '$cur_odr' WHERE $id_col = '$more_id' ; " );	
			
		}
		
	}

//-----------------------------------------------------------------------------

//--------Assign App Call------------------------------------------------------

	function assign_call( $POST ){
	
		//---------------------
			
			$my_con 		= $GLOBALS['my_con'];
			$my_schema		= $GLOBALS['my_schema'];
			
			$presentation_id = $POST['presentation_id'];
		
		//---------------------
			
			$obj_out = array();
			
			$obj_out['userid'] 		= $_SESSION['userid'];
			$obj_out['function']	= $POST['function'];
		
		//----------------------------------------------------------------------		
			
			$sql_qry = mysqli_query($my_con, " SELECT presentation_name FROM presentations WHERE presentation_id = $presentation_id ; " );	
			$sql_row = mysqli_fetch_assoc( $sql_qry );
			$obj_out['presentation_name'] = $sql_row['presentation_name'];
			
		//----------------------------------------------------------------------		
		
			$obj_out['slides']['table_name'] = 'slides';
			
			$sql_qry = mysqli_query($my_con, " SELECT * FROM __tables WHERE table_name = 'slides' ; " );	
			$sql_row = mysqli_fetch_assoc( $sql_qry );
			
			$id_col  = $sql_row['id_col'];
			
			$table_odr  = $sql_row['table_odr'];
			
			$obj_out['slides']['id_col']  = $sql_row['id_col'];
			$obj_out['slides']['new_col'] = $sql_row['new_col'];
			$obj_out['slides']['new_val'] = $sql_row['new_val'];
			
		
		//---------------------
		
			$sql_qry = mysqli_query($my_con, " SELECT * FROM _slides ORDER BY odr ; " );	
			
			while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
				
				$obj_out['slides']['def'][ $sql_row['odr'] ] = $sql_row;
			}
		
		//---------------------
		
			$sql_qry = mysqli_query($my_con, " SELECT * FROM slides WHERE presentation_id = $presentation_id ORDER BY $table_odr ;" );	
			
			while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
				
				$obj_out['slides']['content'][ $sql_row[ $table_odr ] ] = $sql_row;
			}
		
		//----------------------------------------------------------------------		
			
			$obj_out['presentation_to_location']['content'] = array();
			
			$sql_qry = mysqli_query($my_con, " 
				SELECT 
					a.*,
					b.location_name
					
					FROM 
						presentation_to_location a
					
					JOIN
						locations b
					  
						ON(a.location_id = b.location_id)
					  
						WHERE
							presentation_id = '$presentation_id'
			
						ORDER BY 
							location_id
			" );	
			
			while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
				
				$obj_out['presentation_to_location']['content'][ $sql_row['location_id'] ] = $sql_row;
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


//--------Upload Slides (TRICKY!!!)--------------------------------------------

	function slides_upload( $POST , $FILES ){
	
	//-------------------------------
	
		$my_con 		= $GLOBALS['my_con'];
		$my_schema		= $GLOBALS['my_schema'];
		
		$presentation_id = $POST['presentation_id'];
	
	//-------------------------------
	
		$slidedir = 'slides/';
		$thumbdir = 'thumbs/';
		
		$file_ext_ary  = array("png", "jpg", "jpeg", "mp4");
		$file_type_ary = array( "png" => "image" , "jpg" => "image" , "jpeg" => "image" , "mp4" => "video" );
	
	//-------------------------------
	
		foreach( $FILES as $file ){
		
			$file_name 	= $file['name'];
			$tmp_name 	= $file['tmp_name'];
			$extension 	= strtolower(substr($file_name, strpos($file_name, '.') + 1));
			
			$ran_str 	= generateRandomString(10);
			
			$uploadfile = $slidedir . $ran_str . "." . $extension ;
			
			$slide_filetype = $file_type_ary[$extension];
			
			if ( move_uploaded_file( $file['tmp_name'], $uploadfile) && in_array( $extension, $file_ext_ary ) ) {
				echo "Upload Successfull.\n";
			
				if( $slide_filetype == 'image' ){
				
					list($width, $height) = getimagesize($uploadfile);
														
						$ratio = $height / $width;
						$thumb_width = 400;
						$thumb_height = $thumb_width * $ratio;
											
					$thumb = imagecreatetruecolor($thumb_width, $thumb_height);
					
					if( $extension == 'png' ){
						$source = imagecreatefrompng($uploadfile);
					}
					else{
						$source = imagecreatefromjpeg($uploadfile);
					}
					
					imagecopyresampled($thumb, $source, 0, 0, 0, 0, $thumb_width, $thumb_height, $width, $height);
				
					//-----------------
						
						ob_start();
						
						if( $extension == 'png' ){
							imagepng($thumb);
						}
						else{
							imagejpeg($thumb);
						}
						
						$data = ob_get_clean();
					
					//-----------------
				
					$uploadthumb = $thumbdir . $ran_str . '.' . $extension;
					
					file_put_contents( $uploadthumb , $data );
					
				}
				else{
					$uploadthumb = $thumbdir . 'movie_icon.png';
				}
				
				//-----------------------------------------------	
					
					$sql_qry = mysqli_query($my_con, " SELECT MAX(slide_number) as max_num FROM slides ; " );	
					$sql_row = mysqli_fetch_assoc( $sql_qry );
					$max_num = $sql_row['max_num'];
					$new_num = $max_num + 1;
					
					$sql_qry = mysqli_query($my_con, " 
						INSERT INTO slides 
							( slide_thumb , slide_file , slide_number , presentation_id, slide_filetype ) 
							VALUES( '$uploadthumb' , '$uploadfile' , $new_num , $presentation_id, '$slide_filetype' )  
						; 
					" );	
					
				//-----------------------------------------------
					
					$sql_qry = mysqli_query($my_con, " SELECT slide_id FROM slides WHERE slide_number = $new_num ; " );	
					$sql_row = mysqli_fetch_assoc( $sql_qry ) ;
					$slide_id = $sql_row['slide_id'];
					
					$sql_qry = mysqli_query($my_con, " SELECT location_id FROM presentation_to_location WHERE presentation_id = $presentation_id ; " );	
					while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
						
						$location_id = $sql_row['location_id'];
						
						$sql_qry2 = mysqli_query($my_con, " 
							INSERT INTO slide_to_location 
								( slide_id , location_id ) VALUES( $slide_id , $location_id )
							; 
						" );
					}
					
				//-----------------------------------------------
			}
		}
		
		//-----------------------------------------------
	}

//-----------------------------------------------------------------------------
	
	
	

//--------Call Locations to select---------------------------------------------
		
	function location_select_call( $POST ){
		
		//-------------------------------
		
			$my_con 		= $GLOBALS['my_con'];
			$my_schema		= $GLOBALS['my_schema'];
			
			$presentation_id = $POST['presentation_id'];
			
			$obj_out['function'] = $POST['function'];
			$obj_out['presentation_id'] = $POST['presentation_id'];
			
			$obj_out['content'] = array();
			
		//-------------------------------
			
			$sql_qry = mysqli_query($my_con, " SELECT * FROM locations ORDER BY location_id ; " );
			while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
				
				$obj_out['content'][ $sql_row['location_id'] ] = $sql_row;
				$obj_out['content'][ $sql_row['location_id'] ] ['selected'] = 'false';
			}
		
		//-------------------------------
				
			$sql_qry = mysqli_query($my_con, " SELECT * FROM presentation_to_location WHERE presentation_id = $presentation_id ; " );
			while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
				
				$obj_out['content'][ $sql_row['location_id'] ] ['selected'] = 'true';
			}
		
		//-------------------------------
		
		//---------------------
		
			$json_out = json_encode($obj_out, JSON_PRETTY_PRINT);
			//echo '<pre>';
			print_r( $json_out );
			//echo '</pre>';
		
		//---------------------

	
	}
	
//-----------------------------------------------------------------------------



//--------Update Presentation to Location Mapping-------------------------------
		
	function presentation_to_location_update( $POST ){
		
		//-------------------------------
		
			$my_con 		= $GLOBALS['my_con'];
			$my_schema		= $GLOBALS['my_schema'];
			
			$presentation_id = $POST['presentation_id'];
			$location_id 	 = $POST['location_id'];
			$state 	 		 = $POST['state'];
			
			print_r($POST);
			
		//-------------------------------
		
			$sql_qry = mysqli_query($my_con, " SELECT * FROM presentation_to_location WHERE presentation_id = $presentation_id AND location_id = $location_id ; " );
			$sql_num = mysqli_num_rows($sql_qry);
			
			echo $sql_num;
			
			if( $sql_num == 0 && $state = true ){
				
				$sql_qry = mysqli_query($my_con, " 
					INSERT INTO presentation_to_location 
						( presentation_id , location_id ) VALUES( $presentation_id , $location_id )
					; 
				" );
				
				$sql_qry = mysqli_query($my_con, " SELECT slide_id FROM slides WHERE presentation_id = $presentation_id ; " );
				while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
					
					$slide_id = $sql_row['slide_id'];
					
					$sql_qry2 = mysqli_query($my_con, " INSERT INTO slide_to_location ( slide_id , location_id ) VALUES( $slide_id , $location_id ) ; " );
				}
				
			}
			else{
				$sql_qry = mysqli_query($my_con, " DELETE FROM presentation_to_location WHERE presentation_id = $presentation_id AND location_id = $location_id ; " );
				
				$sql_qry = mysqli_query($my_con, " SELECT slide_id FROM slides WHERE presentation_id = $presentation_id ; " );
				while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
					
					$slide_id = $sql_row['slide_id'];
					
					$sql_qry2 = mysqli_query($my_con, " DELETE FROM slide_to_location WHERE slide_id = $slide_id AND location_id = $location_id ; " );
				}
			}
			
		//-------------------------------
	}	
	
//-----------------------------------------------------------------------------
	
	
	
	
	
	
	
//--------Call selected Slides for Location------------------------------------
	
	function slide_select_call( $POST ){
		
		//-------------------------------
		
			$my_con 		 = $GLOBALS['my_con'];
			$my_schema		 = $GLOBALS['my_schema'];
			
			$presentation_id = $POST['presentation_id'];
			$location_id 	 = $POST['location_id'];
			$function 	 	 = $POST['function'];
			
			$obj_out['function'] 		= $POST['function'];
			$obj_out['presentation_id'] = $presentation_id;
			$obj_out['location_id'] 	= $location_id;
				
			$obj_out['content'] = array();
		
		//-------------------------------
			
			$sql_qry = mysqli_query($my_con, " 
				SELECT 
					a.slide_id,
					a.location_id,
					b.presentation_id
					
					FROM 
						slide_to_location a
						
					JOIN
						presentation_to_location b
						ON( a.location_id = b.location_id ) 
						
						WHERE
							 b.presentation_id = $presentation_id
								AND
							a.location_id = $location_id
				;
			" );
			
			while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
				
				$obj_out['content'][ $sql_row['slide_id'] ] = $sql_row;
			}
		
		//-------------------------------
		
		//---------------------
		
			$json_out = json_encode($obj_out, JSON_PRETTY_PRINT);
			//echo '<pre>';
			print_r( $json_out );
			//echo '</pre>';
		
		//---------------------
	}
	
//-----------------------------------------------------------------------------



//--------Update Slide to Location Mapping-------------------------------------
		
	function slide_to_location_update( $POST ){
		
		//-------------------------------
		
			$my_con 		= $GLOBALS['my_con'];
			$my_schema		= $GLOBALS['my_schema'];
			
			$slide_id 		 = $POST['slide_id'];
			$location_id 	 = $POST['location_id'];
			$state 	 		 = $POST['state'];
			
			print_r($POST);
			
		//-------------------------------
		
			$sql_qry = mysqli_query($my_con, " SELECT * FROM slide_to_location WHERE slide_id = $slide_id AND location_id = $location_id ; " );
			$sql_num = mysqli_num_rows($sql_qry);
			
			echo $sql_num;
			
			if( $sql_num == 0 && $state = true ){
				
				$sql_qry = mysqli_query($my_con, " 
					INSERT INTO slide_to_location 
						( slide_id , location_id ) VALUES( $slide_id , $location_id )
					; 
				" );
			}
			else{
				$sql_qry = mysqli_query($my_con, " DELETE FROM slide_to_location WHERE slide_id = $slide_id AND location_id = $location_id ; " );
			}
			
		//-------------------------------
	}	
	
//-----------------------------------------------------------------------------
	

	
//--------Location Show Call---------------------------------------------------
		
	function location_show_call( $POST ){
		
		//-------------------------------
		
			$my_con 		= $GLOBALS['my_con'];
			$my_schema		= $GLOBALS['my_schema'];
			
			$location_id 	= $POST['location_id'];
			$function 		= $POST['function'];
			
			$obj_out['function'] 		= $function;
			$obj_out['location_id'] 	= $location_id;
				
			$obj_out['content'] = array();
			
		//----------------------------------------------------------------------		
			
			$sql_qry = mysqli_query($my_con, " SELECT location_name FROM locations WHERE location_id = $location_id ; " );	
			$sql_row = mysqli_fetch_assoc( $sql_qry );
			$obj_out['location_name'] = $sql_row['location_name'];
			
		//----------------------------------------------------------------------	
			
			$sql_qry = mysqli_query($my_con, " 
				
				SELECT 
					a.*,
                    c.show_in_location
					
					FROM 
						presentations a
                        
						
					JOIN
						presentation_to_location b
						ON(a.presentation_id = b.presentation_id )
                        
					JOIN
						presentation_status c
						ON(a.presentation_status = c.id )
						
						WHERE 
							b.location_id = $location_id
								AND 
							c.show_in_location = 'true' 
							
						ORDER BY 
							presentation_id ;
			
			" );	
			
			while( $sql_row = mysqli_fetch_assoc( $sql_qry ) ){
				
				$presentation_id = $sql_row[ 'presentation_id' ];
				
				$obj_out['content'][ $presentation_id ] = $sql_row;
				
				$sql_qry2 = mysqli_query($my_con, " SELECT slide_thumb FROM slides WHERE presentation_id = $presentation_id ORDER BY slide_number LIMIT 1 ; " );	
				$sql_row2 = mysqli_fetch_assoc( $sql_qry2 );
				
				$obj_out['content'][ $sql_row[ 'presentation_id' ] ] [ 'slide_thumb' ] = $sql_row2[ 'slide_thumb' ];
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