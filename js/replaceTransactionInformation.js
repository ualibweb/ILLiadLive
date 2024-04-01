var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var URLValue = getUrlParameter('Value');
var CurrentURL = document.location.host + document.location.pathname;
var querystring = '?Action=10&Form=63&Value=' + URLValue;

var requestURL = 'https://' + CurrentURL + querystring;
console.log(requestURL);

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js'; //replace as appropriate
document.head.appendChild(script);

$("#transactionTable").load(requestURL + ' #TransactionInformation');


