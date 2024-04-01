// constants
// for book/loan request form
const requiredFieldsLoanReqDocDelivery = {
    noSerialRequest: ['LoanAuthor', 'LoanTitle', 'CallNumber', 'NotWantedAfter', 'AcceptAlternateEdition', 'facOrGrad', 'ItemInfo4'],
    serialRequest: ['LoanTitle', 'PhotoJournalYear', 'CallNumber', 'NotWantedAfter', 'facOrGrad']
}

const requiredFieldsLoanReq = ['LoanAuthor', 'LoanTitle', 'NotWantedAfter', 'AcceptNonEnglish', 'AcceptAlternateEdition'];


// for photocopy/article request form
const requiredFieldsPhotocopyReq = ['PhotoJournalTitle', 'PhotoJournalYear', 'PhotoJournalInclusivePages', 'PhotoArticleTitle', 'NotWantedAfter', 'AcceptNonEnglish'];

// fields that are required for doc delivery form
const requiredFieldsPhotocopyReqDocDelivery = ['PhotoJournalTitle', 'PhotoJournalYear', 'PhotoJournalInclusivePages', 'CallNumber', 'PhotoArticleTitle', 'NotWantedAfter', 'AcceptNonEnglish', 'ItemInfo2'];