# Documentation
The file describes the code for Illiad's frontend

*The new repo is in https://github.com/UA-Libraries/ILLiadLive.*

*The old version of illiad can be found in the old-illiad branch*

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

This file will walkthrough important views in the Illiad frontend and their corresponding source code files.


## /css directory
This directory contains the css files used throughout the site. The most notable ones being `illiad.css` and `custom.css`.
- `illiad.css` - contains default styles for the website. You typically shouldn't edit this
- `custom.css` - contains any additional styles meant to override/supplement the styling in `illiad.css`

Both of these files are included with `include_head.html`

## /js directory
This directory contains the javascript files used throughout the site. The following are some of the important files it contains:
- `constants.js` - contains javascript constant objects that are used across various scripts
- `atlasUtility.js` - performs javascript interactions on various elements on site load. For example, hiding all elements that fulfill a certain criteria on the current page. Also provides some utility functions
- `docDeliveryFunctions.js` - contains event handlers and utility functions for various javascript interactions across the website
- `parse_field_values_from_url.js` - when the document is ready, this script extracts field values from the page's url and fills them in the input fields accordingly


## HTML files
- `Logon.html` - This is the source code file for the login form
- `include_js_helpers.html` - this file contains javascript functions used for form interactions
- `ArticleRequest.html` - the source code file for the Copy/Doc Delivery - Copy forms
- `EditArticleRequest.html` - the source code file for the edit version of the Copy/Doc Delivery - Copy forms
- `LoanRequest.html` - the source code file for the Loan/Doc Delivery - Loan forms
- `EditLoanRequest.html` - the source code file for the edit version of the Loan/Doc Delivery - Loan forms
- `include_article_request_fields.html` - contains form fields for the Copy/Doc Delivery - Copy forms. This file gets included in `ArticleRequest.html` and `EditArticleRequest.html` using #INCLUDE
- `include_loan_request_fields.html` - contains form fields for the Loan/Doc Delivery - Loan forms. This file gets included in `LoanRequest.html` and `EditLoanRequest.html` using #INCLUDE
- `include_head.html` - is typically included using #INCLUDE in the head tag of other HTML files. It imports various css and javascript files
- `include_request_buttons.html` - contains the action buttons for the various forms
- `include_request_cited.html` - contains the HTML for the "Where did you learn about this item?" section in the forms

