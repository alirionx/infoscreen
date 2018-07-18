

	var weekdays = [ 'Mo' , 'Tu' , 'We' , 'Th' , 'Fr' , 'Sa' , 'Su' ];
	var weekdaysLength = weekdays.length;
	
	
	var calmonth = new Array();
	calmonth[0] = "January";
	calmonth[1] = "February";
	calmonth[2] = "March";
	calmonth[3] = "April";
	calmonth[4] = "May";
	calmonth[5] = "June";
	calmonth[6] = "July";
	calmonth[7] = "August";
	calmonth[8] = "September";
	calmonth[9] = "October";
	calmonth[10] = "November";
	calmonth[11] = "December";
	
	var month_nbr = new Array();
	month_nbr[0] = "01";
	month_nbr[1] = "02";
	month_nbr[2] = "03";
	month_nbr[3] = "04";
	month_nbr[4] = "05";
	month_nbr[5] = "06";
	month_nbr[6] = "07";
	month_nbr[7] = "08";
	month_nbr[8] = "09";
	month_nbr[9] = "10";
	month_nbr[10] = "11";
	month_nbr[11] = "12";
	
	var day_nbr = new Array();
	day_nbr[0] = "01";
	day_nbr[1] = "02";
	day_nbr[2] = "03";
	day_nbr[3] = "04";
	day_nbr[4] = "05";
	day_nbr[5] = "06";
	day_nbr[6] = "07";
	day_nbr[7] = "08";
	day_nbr[8] = "09";
	day_nbr[9] = "10";
	day_nbr[10] = "11";
	day_nbr[11] = "12";
	day_nbr[12] = "13";
	day_nbr[13] = "14";
	day_nbr[14] = "15";
	day_nbr[15] = "16";
	day_nbr[16] = "17";
	day_nbr[17] = "18";
	day_nbr[18] = "19";
	day_nbr[19] = "20";
	day_nbr[20] = "21";
	day_nbr[21] = "22";
	day_nbr[22] = "23";
	day_nbr[23] = "24";
	day_nbr[24] = "25";
	day_nbr[25] = "26";
	day_nbr[26] = "27";
	day_nbr[27] = "28";
	day_nbr[28] = "29";
	day_nbr[29] = "30";
	day_nbr[30] = "31";
	

	function date_select( month_factor , date_target){
		
		console.log( month_factor + ' - ' + date_target );
		
		if( document.getElementById( 'calendar_frame' ) != undefined ){
			document.getElementById( 'calendar_frame' ).parentNode.removeChild( document.getElementById( 'calendar_frame' ) );
		}
		
		var called_date = new Date();
			called_date.setMonth( called_date.getMonth() + month_factor  );
			
		//console.log( month[called_date.getMonth()] + ' - ' + called_date.getFullYear() );
		
		var calendar_frame = document.createElement('DIV');
			calendar_frame.id = 'calendar_frame';
			calendar_frame.classList.add("calendar_frame");
			document.body.appendChild( calendar_frame );
		
		var calendar_box = document.createElement('DIV');
			calendar_box.classList.add("calendar_box");
			calendar_frame.appendChild( calendar_box );
		
		
		var head_block = document.createElement('TABLE');
			head_block.classList.add("head_block");
			calendar_box.appendChild( head_block );
			
			var head_tr = document.createElement('TR');
				head_block.appendChild( head_tr );
				
				var left_arrow = document.createElement('TD');
					left_arrow.classList.add("arrow_td");
					left_arrow.innerHTML = '&#10094;';
					left_arrow.onclick = function() { date_select( (month_factor - 1) , date_target) };
					head_tr.appendChild( left_arrow );	
					
				var calendar_hl = document.createElement('TD');
					calendar_hl.innerHTML = calmonth[called_date.getMonth()] + ' - ' + called_date.getFullYear();
					head_tr.appendChild( calendar_hl );
				
				var right_arrow = document.createElement('TD');
					right_arrow.classList.add("arrow_td");
					right_arrow.innerHTML = '&#10095;';
					right_arrow.onclick = function() { date_select( (month_factor + 1) , date_target) };
					head_tr.appendChild( right_arrow );
				
				
				for( i = 0; i < weekdaysLength ; i++ ){
					var wdbox = document.createElement('DIV');
						wdbox.classList.add("weekdays");
						wdbox.innerHTML = weekdays[i];
						
						calendar_box.appendChild( wdbox );
				}
				
				
		var last_day = new Date();
			last_day.setYear( called_date.getFullYear() );
			last_day.setMonth( called_date.getMonth()  + 1  );
			last_day.setDate( 1 );
			last_day.setDate( last_day.getDate()  - 1  );
			last_day = last_day.getDate();
			//console.log( last_day );	
		
		var first_day = new Date();
			first_day.setYear( called_date.getFullYear() );
			first_day.setMonth( called_date.getMonth() );
			first_day.setDate( 1 );
			first_day = first_day.getDay()
			//console.log( first_day );
			if( first_day == 0 ){ first_day = 7 };
			
			
		
		for( i = 1; i < first_day ; i++ ){
			
			var ndbox = document.createElement('DIV');
				ndbox.classList.add("ndays");
				calendar_box.appendChild( ndbox );
		}
		
		for( i = 0; i < last_day ; i++ ){
			
			var dbox = document.createElement('DIV');
				dbox.classList.add("days");
				dbox.innerHTML = day_nbr[i];
				dbox.setAttribute( 'date_val' , called_date.getFullYear() + '-' + month_nbr[ called_date.getMonth() ] + '-' + day_nbr[i] );
				dbox.onclick = function(){
					
					var date_target_domel = document.getElementById( date_target );
						date_target_domel.value = this.getAttribute( 'date_val' );
						
						var event = new Event('change');
						date_target_domel.dispatchEvent(event);
						
					document.getElementById( 'calendar_frame' ).parentNode.removeChild( document.getElementById( 'calendar_frame' ) );
				}
				
				calendar_box.appendChild( dbox );
		}
		
	}
	


