// use javascript to fill (alternate) url query parameters into fields
$(document).ready(function() {
    // Function to parse URL query parameters
    function getUrlParams() {
        let params = {};
        let queryString = window.location.search.substring(1);
        let queryParams = queryString.split('&');
        for (let i = 0; i < queryParams.length; i++) {
            let pair = queryParams[i].split('=');
            let key = decodeURIComponent(pair[0]);
            let value = decodeURIComponent(pair[1]);
            params[key.toLowerCase()] = value;
        }
        return params;
    }

    // Get URL parameters
    let params = getUrlParams();


    if (params.hasOwnProperty('callno')) {
        $('#CallNumber').val(params['callno']);
    } else if (params.hasOwnProperty('callnumber')) {
        $('#CallNumber').val(params['callnumber']);
    }

    if (params.hasOwnProperty('atitle')) {
        $('#PhotoArticleTitle').val(params['atitle']);
    }

    if (params.hasOwnProperty('title')) {
        $('#PhotoJournalTitle').val(params['title']);
        $('#LoanTitle').val(params['title']);
    }

    if (params.hasOwnProperty('aulast')) {
        $('#LoanAuthor').val(params['aulast']);
        $('#PhotoArticleAuthor').val(params['aulast']);
    }

    if (params.hasOwnProperty('issued')) {
        const year = params['issued'].substring(0,4);
        $('#PhotoJournalYear').val(year);
    }
});


