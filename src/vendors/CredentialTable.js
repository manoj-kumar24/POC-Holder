import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap'

const CredentialTable = ({ credentials }) => {
    const [vcData, setVCData] = useState([]);
    
    useEffect(() => {
      const removeProp = (obj, propToDelete) => {
        for (let property in obj) {
          if (obj.hasOwnProperty(property)) {
            if (property === propToDelete) {
              delete obj[property];
            } else if (typeof obj[property] == "object") {
              removeProp(obj[property], propToDelete);
            }
          }
        }
        return obj
      }

      const initialiseVCData = (vcData) => {
        let processedVCData = []
        console.log("vcData in initialiseVCData: credentialTable: ", vcData);
        for (let vc in vcData) {
          processedVCData[vc] = vcData[vc].credential.credentialSubject.data
          processedVCData[vc] = removeProp(processedVCData[vc], '@type')
        }
        console.log("processedVCData in initialiseVCData: credentialTable: ", processedVCData);
        return processedVCData
      }

      setVCData(initialiseVCData(credentials))
    }, [credentials])

    
    const extractEmailFromIDDocument = (cred) => {
      console.log("extractEmailFromIDDocument: credentialTable ", cred);
      if (cred.hasIDDocument){
        return JSON.parse(cred.hasIDDocument.hasIDDocument.idClass).email
      } 
      else if(cred.seller){
        return cred.seller.email;
      }
      else {
        return null
      }
    }

    return <div>
        <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Index</th>
                  <th>Seller Name</th>
                  <th>Invoice Value</th>
                  <th>Email</th>
                  <th>VC Type</th>
                </tr>
              </thead>
              <tbody>
                {
                  vcData.map((cred, index) => {
                    return (
                      cred.seller ?
                      <tr key={index+1}>
                        <th scope='row'>{index+1}</th>
                        <td>{cred.seller.name || cred.name}</td>
                        <td>{cred.invoice.orderedItem.value || ''}</td>
                        <td>{extractEmailFromIDDocument(cred) || cred.seller.email || '' }</td>
                        {/* <td>{cred.hasIDDocument ?  cred.hasIDDocument.hasIDDocument.documentType : 'ID Document'}</td> */}
                        <td>{"Invoice"}</td>
                      </tr> : ''
                    )
                  })
                }
              </tbody>
            </Table>
    </div>
}

export default CredentialTable;