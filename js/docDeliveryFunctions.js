



// global variables, used in inline scripts
var requiredFields = [];
let isDocDelivery;

//helper functions
function fadeOut(selector, duration=500){
    $(selector).fadeOut(duration);
}

function fadeIn(selector, duration=500){
    $(selector).fadeIn(duration);
}

function hideElement(querySelector){
	$(querySelector).addClass('display-none');
}

function hideFormGroup(formElementID){
	hideElement('form #formGroup-'+formElementID);
}


// unhides any element referenced by the query selector
function unHideElement(querySelector){
	$(querySelector).removeClass('display-none');
}

function unHideFormGroup(formElementID){
	unHideElement('form #formGroup-'+formElementID);
}


function makeRequired(formElementID){
	$("#"+formElementID).prop('required', true);
	unHideElement("form #formGroup-"+formElementID + " .req");
}

function makeOptional(formElementID){
	$("#"+formElementID).removeAttr('required');
	hideElement("form #formGroup-"+formElementID + " .req");
}


function getFormGroupSelector(formElementID){
    return "form #formGroup-"+formElementID;
}





//Pickup library is ItemInfo4
function pickupLibraryFadeIn(note) {
    console.log("Pickup Library Fade In");

    
    fadeIn('#ItemInfo4');
    fadeOut('#ItemInfo4Note');

    var fieldIndex = requiredFields.indexOf('ItemInfo4');
    if ((fieldIndex < 0) && ($('#ItemInfo3').val() == '')) {
        requiredFields.push('ItemInfo4');
        makeRequired("ItemInfo4"); // make pickup location field required
    }
}

function determineCampusMailbox() {
    if ($('#facOrGrad').val() == 'Faculty') {
        if ($('#itemInfo2').val() != 'Yes') {
            console.log("fade in campus mailbox");
            fadeIn('#formGroup-ItemInfo3');
        } else {
            fadeOut('#formGroup-ItemInfo3');
            $('#ItemInfo3').val('');
        }
    } else {
        fadeOut('#formGroup-ItemInfo3');
        $('#ItemInfo3').val('');
    }
}

function determinePickupNote() {
    var pickupMessage = '';

    var pickupMessageArray = [];
    pickupMessageArray.push("Periodical/Serial will be placed on hold at the library where it is shelved.");

    //Constructed so testweb links don't point to live forms
    var editUserInformationURL = location.origin + location.pathname + '?Action=10&Form=81';

    pickupMessageArray.push('Delivery will be to your address in ILLiad which <em>does not</em> update automatically.  You can check or change this by clicking on <a href="' + editUserInformationURL + '">this User Information link</a> or by selecting User Information from the left-hand menu.');

    //Constructed so testweb links don't point to live forms
    var docDeliveryCopyURL = location.origin + location.pathname + '?Action=10&Form=22&docdelivery=true';

    pickupMessageArray.push('Serials cannot be delivered to your address. You can request a copy of specific articles or sections using the <a href="' + docDeliveryCopyURL + '">Doc Delivery - Copy </a> form.');

    console.log("pickup array");
    console.log(pickupMessageArray);


    if ($("#ItemInfo3").val() != '') {
        pickupLibraryFadeOut();
    } else if ($("#itemInfo2").val() == 'Yes') {
        if ($('#facOrGrad').val() == 'Distance student') {
            pickupLibraryFadeOut();
            pickupMessage = pickupMessageArray[2];
        } else if ($('#itemInfo5').val() == 'Yes') {
            fadeOut('#ItemInfo4Note');
            pickupLibraryFadeIn();
        } else {
            pickupLibraryFadeOut();
            pickupMessage = pickupMessageArray[0];
        }
    } else if ($('#facOrGrad').val() == 'Distance student') {
        pickupMessage = pickupMessageArray[1];
        pickupLibraryFadeOut();
    } else {
        console.log("unhandled pickup library case?");
        pickupLibraryFadeIn();
        fadeOut('#ItemInfo4Note');
    }


    if (($('#ItemInfo4Note').html != '') && ($('#ItemInfo4Note').html() != pickupMessage)) {
        $('#ItemInfo4Note').hide();
    }
    fadeIn('#ItemInfo4Note');
    $('#ItemInfo4Note').html(pickupMessage);
}

//Pickup library is ItemInfo4
function pickupLibraryFadeOut(note) {

    console.log("Pickup Library Fade Out");

    fadeOut('#ItemInfo4');
    makeOptional('ItemInfo4');
    $('#ItemInfo4').val(function(index, value) {
        return '';
    });


    $('#ItemInfo4Text').removeClass('validationError').addClass('valid');
    var fieldIndex = requiredFields.indexOf('ItemInfo4');
    if (fieldIndex >= 0) {
        requiredFields.splice(fieldIndex, 1);
    }
}

//Remove the Mail to address field and address note when distance education is not chosen
function removeDeliveryToAddress() {

    var pickupLocation = document.getElementById('ItemInfo4');
    var pickupLocations = pickupLocation.children;

    //Iterate to get index of Mail to address option (in case it changes)
    for (i = 0; i < pickupLocations.length; i++) {
        if (pickupLocations[i].value == 'Mail to address') {
            pickupLocation.remove(i);
        }
    }

    fadeOut('ItemInfo4DistanceEdNote');

}


function facOrGradChange() {
    var annexValue = $('#itemInfo5').val();
    var serialLoanValue = $('#itemInfo2').val()

    determineCampusMailbox();

    if (annexValue == 'Yes') {
        //$('#ItemInfo4Note').text("For Annex requests, any user can specify a pickup library.");
    } else {
        //$('#ItemInfo4Note').text("For document delivery, faculty or graduate students may choose to pick up their item at a library other than Gorgas.");
    }

    console.log("REQUIRED FIELDS");
    console.log(requiredFields);

    determineCampusMailbox();
    determinePickupNote();
}

function campusMailboxChange() {
    determineCampusMailbox();
    determinePickupNote();
}

function pickupLibraryChange() {
    determineCampusMailbox();
    determinePickupNote();
}

function annexRequestChange() {
    determineCampusMailbox();
    determinePickupNote();
}



function serialLoanChange() {
    var annexValue = $('#itemInfo5').val();

    if ($(this).val() == 'Yes') {

        //$('label[for="LoanTitle"]').fadeOut(500);
        fadeOut(getFormGroupSelector('LoanAuthor'));
        fadeOut(getFormGroupSelector('LoanPublisher'));
        fadeOut(getFormGroupSelector('LoanPlace'));
        fadeOut(getFormGroupSelector('LoanDate'));
        fadeOut(getFormGroupSelector('LoanEdition'));
        fadeOut(getFormGroupSelector('AcceptAlternateEdition'));


        fadeIn(getFormGroupSelector('PhotoJournalVolume'));
        fadeIn(getFormGroupSelector('PhotoJournalIssue'));
        fadeIn(getFormGroupSelector('PhotoJournalMonth'));
        fadeIn(getFormGroupSelector('PhotoJournalYear'));


        var fieldsToBeRemoved = ['LoanAuthor', 'ItemInfo4', 'AcceptAlternateEdition'];
        for (j = 0; j < fieldsToBeRemoved.length; j++) {

            var currentField = fieldsToBeRemoved[j];
            makeOptional(currentField);
            var fieldIndex = requiredFields.indexOf(currentField);
            if (fieldIndex >= 0) {
                requiredFields.splice(fieldIndex, 1);
            }
        }

        var fieldsToBeAdded = ['PhotoJournalYear'];
        for (j = 0; j < fieldsToBeAdded.length; j++) {
            var currentField = fieldsToBeAdded[j];
            var fieldIndex = requiredFields.indexOf(currentField);
            if (fieldIndex == -1) {
                makeRequired(currentField);
                requiredFields.push(currentField);
            }
        }


        console.log("REQUIRED FIELDS");
        console.log(requiredFields);


    } else if ($(this).val() == 'No') {
        fadeIn(getFormGroupSelector('LoanPublisher'));
        fadeIn(getFormGroupSelector('LoanPlace'));
        fadeIn(getFormGroupSelector('LoanDate'));
        fadeIn(getFormGroupSelector('LoanEdition'));
        fadeIn(getFormGroupSelector('LoanAuthor'));
        fadeIn(getFormGroupSelector('LoanPublisher'));
        fadeIn(getFormGroupSelector('AcceptAlternateEdition'));


        fadeOut(getFormGroupSelector('PhotoJournalVolume'));
        fadeOut(getFormGroupSelector('PhotoJournalIssue'));
        fadeOut(getFormGroupSelector('PhotoJournalMonth'));
        fadeOut(getFormGroupSelector('PhotoJournalYear'));


        var fieldsToBeRemoved = ['PhotoJournalYear'];
        for (j = 0; j < fieldsToBeRemoved.length; j++) {

            var currentField = fieldsToBeRemoved[j];
            makeOptional(currentField);
            var fieldIndex = requiredFields.indexOf(currentField);
            if (fieldIndex >= 0) {
                requiredFields.splice(fieldIndex, 1);
            }
        }

        var fieldsToBeAdded = ['LoanAuthor', 'AcceptAlternateEdition'];
        for (j = 0; j < fieldsToBeAdded.length; j++) {
            var currentField = fieldsToBeAdded[j];
            var fieldIndex = requiredFields.indexOf(currentField);
            if (fieldIndex == -1) {
                makeRequired(currentField);
                requiredFields.push(currentField);
            }
        }


        console.log("REQUIRED FIELDS");
        console.log(requiredFields);

    }

    determineCampusMailbox();
    determinePickupNote();

}

function docDeliverySubmit() {
    if (isDocDelivery == true) {
        $('#Notes').val(function(index, value) {

            //Cram fac/grad value into Notes field when form is submitted
            var notesValue = $('#Notes').val();
            var facOrGradValue = $('#facOrGrad').val();

            if (facOrGradValue == 'Faculty') {
                var facOrGradIndex = notesValue.indexOf('Faculty request / ');

                if (facOrGradIndex == -1) {

                    notesValue = 'Faculty request / ' + notesValue;

                }
            } else {
                if (facOrGradValue == 'Graduate student request') {

                    facOrGradIndex = notesValue.indexOf('Graduate student request / ');
                    if (facOrGradIndex == -1) {
                        notesValue = 'Faculty request / ' + notesValue;
                    }
                }
            }

            return notesValue;
        });
    }

    let missingFields = [];

    // TODO: legacy form validation, might be eventually phased out and replaced with the "required" attribute
    //Check for validation errors
    for (i = 0; i < requiredFields.length; i++) {
        currentField = requiredFields[i];
        currentContent = $('#' + currentField).val();

        if (currentContent == '') {
            console.log("FORM UNFILLED!");
            missingFields.push(currentField);
            $('label[for="' + currentField + '"] span.valid').addClass('validationError').removeClass('valid');
        } else {
            $('label[for="' + currentField + '"] span.validationError').addClass('valid').removeClass('validationError');
        }
    }
    //testCounter = 0;

    //Empty fields that are hidden
    $('#LoanRequestForm > fieldset div.form-group').each(function(index) {
        var displayAttr = $(this).css('display');

        if (displayAttr != undefined) {

            if (displayAttr === "none") {
                //testCounter++;
                console.log("DISPLAY ATTRIBUTE PRESENT");
                $(this).find('input').val(function(index, value) {
                    console.log("SETTING INPUT");
                    return '';
                });
                $(this).find('select').val(function(index, value) {
                    console.log("SETTING SELECT");
                    return '';
                });
                $(this).find('textarea').val(function(index, value) {
                    console.log("SETTING TEXTAREA");
                    return '';
                });

            }
        }
    });

    topErrorMessage = '';

    missingFieldsPresent = missingFields.length > 0;
    distanceStudent = $('#facOrGrad').val() == 'Distance student';
    serialLoanRequestDistanceStudent = $('#itemInfo2').val() == 'Yes' && distanceStudent;

    if (missingFieldsPresent || serialLoanRequestDistanceStudent) {
        if (missingFieldsPresent) {

            topErrorMessage = '<p style="color: red;">Required fields are missing.</p>';

            console.log("MISSING FIELDS ARRAY");
            console.log(missingFields);



            console.log("TOP ERROR MESSAGE IS");
            console.log(topErrorMessage);


            console.log("RETURNING FALSE");
        }

        if (serialLoanRequestDistanceStudent) {
            topErrorMessage += '<p style="color: red;">Distance students cannot request delivery of a serial to their address.</p>';
        }

        if ($('#TopErrorMessage').length == 0) {
            topErrorMessage = '<div id="TopErrorMessage">' + topErrorMessage + '</div>';
            $('#pageHeader').after(topErrorMessage);
        } else {
            $('#TopErrorMessage').html('');
            $('#TopErrorMessage').html(topErrorMessage);
        }

        return false;
    }

    if (distanceStudent) {
        //I believe
        $('#ItemInfo4').append($("<option></option>").text('Mail to address'));
        $('#ItemInfo4').val('Mail to address');
    }

}
