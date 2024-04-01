
$(document).ready(function(){


	$('#TransactionInformation tbody tr').each(function(index, value){
	  var displayType; 
		$(this).find('td:nth-child(2)').each(function(index, value){
			console.log("HTML");
			console.log($(this).html());

			if ($(this).html() == ''){
				displayType = 'none'
			}
			else {
				displayType = 'table-row';
			}
		});
		$(this).css('display', displayType);
	});
});

