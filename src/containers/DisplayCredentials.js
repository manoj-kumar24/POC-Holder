import React from 'react';

const DisplayCredentials = ({cred}) => {
    console.log("CRED: Holder",cred);
    if (cred.credentialSubject) {
        if (cred.credentialSubject.data.hasOwnProperty('nationality') === true) {
            console.log('NATId displayCredentials', cred.credentialSubject.data.nationality.nationality.name);
            const {nationality} = cred.credentialSubject.data.nationality.nationality.name;
            const {gstNumber} = cred.credentialSubject.data.nationality.identifier.value;
            const {docType}= cred.credentialSubject.data.nationality.identifier.propertyID;

            return (
                <>
                    <p><strong>Nationality:</strong> {nationality}</p>
                    <p><strong>GST:</strong> {gstNumber}</p>
                    <p><strong>Document Type:</strong> {docType}</p>
                </>
            )
        }
        else if (cred.credentialSubject.data.hasOwnProperty('invoice') === true) {
            console.log("Invoice: displayCredentials: ",cred.credentialSubject.data.seller.name);
            const {sellerName} = cred.credentialSubject.data.seller.name;
            // const {invoiceDate} = cred.credentialSubject.data.invoice.invoiceDate;
            const {invoiceVal} = cred.credentialSubject.data.invoice.orderedItem.value;
            const {docType1} = 'Invoice'

            return (
                <>
                    <p><strong>Seller Name:</strong> {sellerName}</p>
                    {/* <p><strong>Invoice Date:</strong> {invoiceDate}</p> */}
                    <p><strong>Invoice Value:</strong> {invoiceVal}</p>
                    <p><strong>Document Type:</strong> {docType1}</p>
                </>
            )
        }
    }
    // else{
    //     const { givenName, familyName } = cred.credentialSubject.data;
    //     const { documentType } = cred.credentialSubject.data.hasIDDocument.hasIDDocument;
        
    //     return (
    //         <>
    //             <p><strong>Given Name:</strong> {givenName}</p>
    //             <p><strong>Family Name:</strong> {familyName}</p>
    //             <p><strong>Document Type:</strong> {documentType}</p>
    //         </>
    //     )   
    // }
}

export default DisplayCredentials;