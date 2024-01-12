import React from 'react'
import { toast } from 'react-toastify'
import config from './Config'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react'

const Invoice = () => {

  const [billDetails,setBillDetails]=useState([]);
  const checkInNumber=sessionStorage['checkInNumber']
  const receipId=sessionStorage['receipId']

  useEffect(() => {
    loadBillDetails()
  }, [])

   // load all rooms 
   const loadBillDetails = () => {
    axios
      .get(config.URL + `/bill/${checkInNumber}/${receipId}`,
      {
         headers: {'Authorization': 'Bearer ' +sessionStorage['token'] }       
      }
    
      )
      .then((response) => {
        const result = response.data
        console.log(result)
        if (result.lenght !=0) {
            setBillDetails(result)
        } else {
          toast.error(result['error'])
        }
      })
  }

  return (
    <>
    <style
      dangerouslySetInnerHTML={{
        __html:
          "\n\t\t\tbody {\n\t\t\t\tfont-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n\t\t\t\ttext-align: center;\n\t\t\t\tcolor: #777;\n\t\t\t}\n\n\t\t\tbody h1 {\n\t\t\t\tfont-weight: 300;\n\t\t\t\tmargin-bottom: 0px;\n\t\t\t\tpadding-bottom: 0px;\n\t\t\t\tcolor: #000;\n\t\t\t}\n\n\t\t\tbody h3 {\n\t\t\t\tfont-weight: 300;\n\t\t\t\tmargin-top: 10px;\n\t\t\t\tmargin-bottom: 20px;\n\t\t\t\tfont-style: italic;\n\t\t\t\tcolor: #555;\n\t\t\t}\n\n\t\t\tbody a {\n\t\t\t\tcolor: #06f;\n\t\t\t}\n\n\t\t\t.invoice-box {\n\t\t\t\tmax-width: 800px;\n\t\t\t\tmargin: auto;\n\t\t\t\tpadding: 30px;\n\t\t\t\tborder: 1px solid #eee;\n\t\t\t\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0.15);\n\t\t\t\tfont-size: 16px;\n\t\t\t\tline-height: 24px;\n\t\t\t\tfont-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n\t\t\t\tcolor: #555;\n\t\t\t}\n\n\t\t\t.invoice-box table {\n\t\t\t\twidth: 100%;\n\t\t\t\tline-height: inherit;\n\t\t\t\ttext-align: left;\n\t\t\t\tborder-collapse: collapse;\n\t\t\t}\n\n\t\t\t.invoice-box table td {\n\t\t\t\tpadding: 5px;\n\t\t\t\tvertical-align: top;\n\t\t\t}\n\n\t\t\t.invoice-box table tr td:nth-child(2) {\n\t\t\t\ttext-align: right;\n\t\t\t}\n\n\t\t\t.invoice-box table tr.top table td {\n\t\t\t\tpadding-bottom: 20px;\n\t\t\t}\n\n\t\t\t.invoice-box table tr.top table td.title {\n\t\t\t\tfont-size: 45px;\n\t\t\t\tline-height: 45px;\n\t\t\t\tcolor: #333;\n\t\t\t}\n\n\t\t\t.invoice-box table tr.information table td {\n\t\t\t\tpadding-bottom: 40px;\n\t\t\t}\n\n\t\t\t.invoice-box table tr.heading td {\n\t\t\t\tbackground: #eee;\n\t\t\t\tborder-bottom: 1px solid #ddd;\n\t\t\t\tfont-weight: bold;\n\t\t\t}\n\n\t\t\t.invoice-box table tr.details td {\n\t\t\t\tpadding-bottom: 20px;\n\t\t\t}\n\n\t\t\t.invoice-box table tr.item td {\n\t\t\t\tborder-bottom: 1px solid #eee;\n\t\t\t}\n\n\t\t\t.invoice-box table tr.item.last td {\n\t\t\t\tborder-bottom: none;\n\t\t\t}\n\n\t\t\t.invoice-box table tr.total td:nth-child(2) {\n\t\t\t\tborder-top: 2px solid #eee;\n\t\t\t\tfont-weight: bold;\n\t\t\t}\n\n\t\t\t@media only screen and (max-width: 600px) {\n\t\t\t\t.invoice-box table tr.top table td {\n\t\t\t\t\twidth: 100%;\n\t\t\t\t\tdisplay: block;\n\t\t\t\t\ttext-align: center;\n\t\t\t\t}\n\n\t\t\t\t.invoice-box table tr.information table td {\n\t\t\t\t\twidth: 100%;\n\t\t\t\t\tdisplay: block;\n\t\t\t\t\ttext-align: center;\n\t\t\t\t}\n\t\t\t}\n\t\t",
      }}
    />
    <br />
    <br />
    <div className='invoice-box'>
      <table>
        <tbody>
          <tr className='top'>
            <td colSpan={2}>
              <table>
                <tbody>
                  <tr>
                    <td className='title'>
                    </td>
                    <td>
                      Invoice #: 123
                      <br />
                      Created: {new Date().toJSON().slice(0,10).replace(/-/g,'/')}
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr className='information'>
            <td colSpan={2}>
              <table>
                <tbody>
                  <tr>
                    <td>
                     Shivajinagar, 
                      <br />
                      Senapati Bapat Rd
                      <br />
                      Pune, Maharashtra 411053.
                    </td>
                    <td>
                      Hotel Paradise Inn.
                      <br />
                     ASHUTOSH 
                      <br />
                     ashutoshp5599@gmail.com
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr className='heading'>
            <td>Payment Method</td>
            <td>cash/online</td>
          </tr>
          <tr className='heading'>
            <td>Item</td>
            <td>Price</td>
          </tr>
          <tr className='item'>
            <td>Accomodation</td>
            <td>{billDetails.roomChareges} .RS</td>
          </tr>
          <tr className='item'>
            <td>Meal Charges</td>
            <td>{billDetails.mealCharges} .RS</td>
          </tr>
          <tr className='item last'>
            <td>Sport Charges</td>
            <td>{billDetails.sportCharges} .RS</td>
          </tr>
          <tr className='total'>
            <td />
            <td>Total: {billDetails.totalcharges} .RS</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
  )
}
export default Invoice
