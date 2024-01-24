import { useEffect, useState } from 'react';
import style from './GSTRFiling.module.css';


function GSTRFiling(){
    const [invoices,setInvoices]=useState([
    ]);
    const [bulkimported,setBulkImported]=useState(false);
    const [invoiceImport,setInvoiceImport]=useState(false);


    useEffect(()=>{
        setInvoices(
            [
                {
                    srno:"0001",
                    gstn:"33AAA1234A1ZA",
                    gstnname:"PIRAMAL INC",
                    invoicdate:"05 Nov 2023",
                    pos:"33-Tamil Nadu",
                    taxable_value:"5,000",
                    rate:"18",
                    sgstrate:"0",
                    cgstrate:"0",
                    igstrate:"900",
                    invoice_value:"5,900",
                    invoiceImport:false
                },
                {
                    srno:"0002",
                    gstn:"33AAA1234A1ZA",
                    gstnname:"PIRAMAL INC",
                    invoicdate:"05 Nov 2023",
                    pos:"33-Tamil Nadu",
                    taxable_value:"5,000",
                    rate:"18",
                    sgstrate:"0",
                    cgstrate:"0",
                    igstrate:"900",
                    invoice_value:"5,900",
                    invoiceImport:false
                },
                {
                    srno:"0003",
                    gstn:"33AAA1234A1ZA",
                    gstnname:"PIRAMAL INC",
                    invoicdate:"05 Nov 2023",
                    pos:"33-Tamil Nadu",
                    taxable_value:"5,000",
                    rate:"18",
                    sgstrate:"0",
                    cgstrate:"0",
                    igstrate:"900",
                    invoice_value:"5,900",
                    invoiceImport:true
                }
            ]
        )
    },[])
    return(
<>
        <div className={style.maindiv}>
        <div className={`${style.leftdiv}`}>
        </div>

        <div className={`${style.rightdiv}`}>

            <div className={`${style.rightdiv_headbar}`}>
                <div className={`${style.headerleft}`}>
                <div>
                    <p className={`${style.headtitle} h3`}>GST-1</p>
                </div>
                <div>
                    <p className={`${style.subheadtitle} h6`}>NOVEMBER</p>
                </div>
                </div>
            </div>
 
        </div>
        </div>

        <div className='m-4'>
        <p className={`${style.headtitle} h3`}>Add Record Details</p>
        <p className={`${style.subheadtitle} h6`}>4A,4B,6B,6C-B2B,DE,B2C(All)</p>
        <div style={{"overflow":"scroll"}}>
        <table className={`${style.gstrtable} table table-borderless`}>
        <thead className='m-2'>
        <tr className={style.titlerow}>
            <th className={`${style.invoiceno}`}><p>Invoice No.</p></th>
            <th className={`${style.gstn}`}><p>GSTN</p></th>
            <th className={`${style.name}`}><p>Name</p></th>
            <th className={`${style.date}`}><p>Date</p></th>
            <th className={`${style.pos}`}><p>POS</p></th>
            <th className={`${style.taxv}`}><p>Taxable Values</p></th>
            <th className={`${style.rate}`}><p>Rate</p></th>
            <th className={`${style.sgst}`}><p>SGST</p></th>
            <th className={`${style.cgst}`}><p>CGST</p></th>
            <th className={`${style.igst}`}><p>IGST</p></th>
            <th className={`${style.invv}`}><p>Inv. Value</p></th>
        </tr>
      </thead>
      <tbody className='m-2'>
        {invoices.map((invoice)=>{
            return(
            <tr className={style.valuerow}>
                <td className={`${style.invoiceno}`}><input value={invoice.srno}  className={style.disabledinput}/></td>
                <td className={`${style.gstn}`}><input value={invoice.gstn} /></td>
                <td className={`${style.name}`}><input value={invoice.gstnname} /></td>
                <td className={`${style.date}`}><input value={invoice.invoicdate} /></td>
                <td className={`${style.pos}`}><input value={invoice.pos} /></td>
                <td className={`${style.taxv}`}><input value={invoice.taxable_value} /></td>
                <td className={`${style.rate}`}><input value={invoice.rate} /></td>
                <td className={`${style.sgst}`}><input value={invoice.sgstrate} /></td>
                <td className={`${style.cgst}`}><input value={invoice.cgstrate} /></td>
                <td className={`${style.igst}`}><input value={invoice.igstrate} /></td>
                <td className={`${style.invv}`}><input value={invoice.invoice_value} /></td>
                <div classname={`${style.ellipsis}`}><i class="fa-solid fa-ellipsis-vertical"></i></div>
            </tr>
            )
        })}

            <tr className={style.valuerow}>
                <td className={`${style.invoiceno}`}><input placeholder='0004'  className={style.disabledinput}/></td>
                <td className={`${style.gstn}`}><input /></td>
                <td className={`${style.name}`}><input /></td>
                <td className={`${style.date}`}><input /></td>
                <td className={`${style.pos}`}><input /></td>
                <td className={`${style.taxv}`}><input /></td>
                <td className={`${style.rate}`}><input /></td>
                <td className={`${style.sgst}`}><input /></td>
                <td className={`${style.cgst}`}><input /></td>
                <td className={`${style.igst}`}><input /></td>
                <td className={`${style.invv}`}><input /></td>
                <div classname={`${style.ellipsis}`}><i class="fa-solid fa-ellipsis-vertical"></i></div>
            </tr>
        
      </tbody>
      <tfoot className='m-2'>
        <tr className={style.totalrow}>
            <td className={`${style.invoiceno}`}><p>0003</p></td>
            <td className={`${style.gstn}`}></td>
            <td className={`${style.name}`}></td>
            <td className={`${style.date}`}></td>
            <td className={`${style.pos}`}></td>
            <td className={`${style.taxv}`}><p>25000</p></td>
            <td className={`${style.rate}`}></td>
            <td className={`${style.sgst}`}><p>900</p></td>
            <td className={`${style.cgst}`}><p>900</p></td>
            <td className={`${style.igst}`}><p>2700</p></td>
            <td className={`${style.invv}`}><p>41900</p></td>
        </tr>
      </tfoot>
    </table>
    </div>
        </div>
        </>
    );
}
export default GSTRFiling;

