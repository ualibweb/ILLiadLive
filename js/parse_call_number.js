// use javascript to fill callno or callNumber query parameter into callNumber field
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

    // Check if callno or callNumber parameter exists and fill the input field
    if (params.hasOwnProperty('callno')) {
        $('#CallNumber').val(params['callno']);
    } else if (params.hasOwnProperty('callnumber')) {
        $('#CallNumber').val(params['callnumber']);
    }
});