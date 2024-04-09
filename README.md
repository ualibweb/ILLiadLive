# Documentation
The file describes the code for Illiad's frontend

*The new repo is in https://github.com/UA-Libraries/ILLiadLive.*

*The old version of illiad can be found in the old-illiad branch*

## Overview
This repo contains a heavily modified version of the Illiad 9.x.x web pages.
UA Libraries wanted to create a form process, within Illiad, that could take an OpenURL web request url, process it via JS logic, and send the request over to one of 2-4 forms (2 primary forms, and then additional fields are rendered programatically on each form when a request is processed.
The data is automatically inserted into the forms. If a user is performing a manual request, then thay are guided through the process, and to the appropraite form variant; if it is a request that comes in via OpenURL, from one of our three sources - Plumx plugin in blackboard, the library catalog, and the Ebsco database aggragators - then it is processed by the JS in the forms, sent to an intermediary page, and then, nased on the type of request the user choses, then sent to one of the JS rendered additional form pages.

CSS has been altered in both the custom area, and in the non-custom area (this happened before we realized not to work in there) - we are working on moving these changes into the custom CSS container, so be forwarned, there are few localized CSS items, in the login pages, and on some of the forms.There is also Custom JS on all of the form pages, and in a few processing engine pages.

This application cannot be updated via normal routine processes, you cannot dump new illiad pages, and over write these and then change the CSS, update work on these pages requires individual work on all affected pages listed below. You will need to move the JS programming over to the new pages, and call the same functions and methods, and interact with the same css/js variables.

There is also a completely separate section of Illiad that is used to make and recieve requests from opther libraries called "lending' - it is in a folder of the same name in the primary file structure of illiad. It uses the JS engines from the other locations, but you will need to make sure it is grabbing the incoming variables, and placing them into forms for submission by other libraries. It easy to overlook this section.

## Relevant URLs
- [A knowledge repository on everything ILLiad](https://support.atlas-sys.com/hc/en-us/categories/360000716874-ILLiad)


## File structure
The root directory contains other sub-directories and various files. The main sub-directories are:
- /css
- /js


Important files in the root directory include:
- Logon.html
- include_js_helpers.html
- ArticleRequest.html
- EditArticleRequest.html
- LoanRequest.html
- EditLoanRequest.html
- include_article_request_fields.html
- include_loan_request_fields.html
- include_head.html
- include_request_buttons.html
- include_request_cited.html

This file will walk through important views in the Illiad frontend and their corresponding source code files.


## /css directory
This directory contains the css files used throughout the site. The most notable ones being `illiad.css` and `custom.css`.
- `illiad.css` - contains default styles for the website. You typically shouldn't edit this
- `custom.css` - contains any additional styles meant to override/supplement the styling in `illiad.css`

Both of these files are included with `include_head.html`

## /js directory
This directory contains the javascript files used throughout the site. The following are some of the important files it contains:
- `constants.js` - contains javascript constant objects that are used across various scripts
- `atlasUtility.js` - performs javascript interactions on various elements on site load. For example, hiding all elements that fulfill a certain criteria on the current page. Also provides some utility functions
- `docDeliveryFunctions.js` - contains event handlers and utility functions for various javascript interactions across the website. Most of the code responsible for hiding/showing form elements across the different forms is located here.
- `parse_field_values_from_url.js` - when the document is ready, this script extracts field values from the page's url and fills them in the input fields accordingly


## HTML files
- `Logon.html` - This is the source code file for the login form
- `include_js_helpers.html` - this file contains javascript functions used for form interactions
- `ArticleRequest.html` - the source code file for the Copy/Doc Delivery - Copy forms
- `EditArticleRequest.html` - the source code file for the edit version of the Copy/Doc Delivery - Copy forms
- `LoanRequest.html` - the source code file for the Loan/Doc Delivery - Loan forms
- `EditLoanRequest.html` - the source code file for the edit version of the Loan/Doc Delivery - Loan forms
- `include_article_request_fields.html` - contains form fields for the Copy/Doc Delivery - Copy forms. This file gets included in `ArticleRequest.html` using #INCLUDE
- `include_loan_request_fields.html` - contains form fields for the Loan/Doc Delivery - Loan forms. This file gets included in `LoanRequest.html` using #INCLUDE
- `include_edit_article_request_fields.html` - contains form fields for `EditArticleRequest.html`
- `include_edit_loan_request_fields.html` - contains form fields for `EditLoanRequest.html`
- `include_head.html` - is typically included using #INCLUDE in the head tag of other HTML files. It imports various css and javascript files
- `include_request_buttons.html` - contains the action buttons for the various forms
- `include_request_cited.html` - contains the HTML for the "Where did you learn about this item?" section in the forms


## Filling in form fields
Some form fields are automatically filled in as soon as they appear on the page. 
This is done using the #PARAM DLL tag or with custom javascript. 
The main Javascript file handling this is `js/parse_field_values_from_url.js`.
For the custom javascript, the field values are usually derived from the URL query parameters. Below is a list of query
parameter keys and their corresponding field value:

- `callno`, `callnumber` => "Call Number" field
- `atitile` => "Article or Chapter Title" field
- `title` => "Title (Journal, Book, Conference Proceedings, Anthology)" field
- `aulast` => the "Author/Editors" field on the Physical Item Request form, the "Article or Chapter Author" on the Scan Request form

