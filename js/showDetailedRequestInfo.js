
$('#detailedInformation').hide();
$('#toggleInformation').click(function(){
    var detailedInformation = $('#detailedInformation');
    if (detailedInformation.is( ":hidden" )) {
        detailedInformation.slideDown(300);
        $(this).css('display', 'none');
    }
});