import { useEffect, useState } from 'react';
import style from '../GSTRFiling/GSTRFiling.module.css';
import GSTStateCode from "../../../ObjData/GSTStateCode.json"
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';


function GST2A(){
    const [invoices,setInvoices]=useState([
    ]);
  const storedToken = window.localStorage.getItem("jwtToken");
  const client_id = window.localStorage.getItem("client_id_gst");
  const user_id = window.localStorage.getItem("user_id_gst");


    const Navigate=useNavigate()

    const [bulkimported,setBulkImported]=useState(false);
    const [invoiceImport,setInvoiceImport]=useState(false);

    const myGSTN={GSTIN:localStorage.getItem("gstin")
    ,State:fetchStateCode(localStorage.getItem("gstin").slice(0,2))};

    const year=useLocation().state.year;
    const month=useLocation().state.month;
    const gstCategory=useLocation().state.gstCategory;

    const [filednotfiled,setfilednotfiled]=useState(false);
    
    useEffect(()=>{
        FetchInvoices();
        FetchAmendedInvoices();
        getFiledStatus()
    },[])

  useEffect(() => {
    calculateTotalAmounts()
  }, [invoices]);

  


  
  async function FetchInvoices(){

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`${url_}/list/ofinvoice/findByBillToGSTIN?bill_to_GSTIN=${myGSTN.GSTIN}&Invoicemonth=${month}&Invoiceyear=${year}`, requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result);setInvoices(result)})
    .catch(error => console.log('error', error));



    // const result=[
    //     {
    //         invoiceid:"0001",
    //         bill_to_GSTIN:"33AAA1234A1ZA",
    //         bill_to_Name:"PIRAMAL INC",
    //         Documentdate:"2023-05-05",
    //         bill_to_State:"33-TAMIL NADU",
    //         total_taxiable_value:"5000",
    //         rate:"18",
    //         sgst_amount:"0",
    //         cgst_amount:"0",
    //         igst_amount:"900",
    //         total_inv_amount:"5900",
    //         invoiceImport:false,
    //         cancelled:false,
    //         amended:false,
    //         interstate:false,
    //         deemexport:false,
    //         sez:false
    //     },
    //     {
    //         invoiceid:"0002",
    //         bill_to_GSTIN:"33AAA1234A1ZA",
    //         bill_to_Name:"PIRAMAL INC",
    //         Documentdate:"2023-05-05",
    //         bill_to_State:"33-TAMIL NADU",
    //         total_taxiable_value:"5000",
    //         rate:"18",
    //         sgst_amount:"0",
    //         cgst_amount:"0",
    //         igst_amount:"900",
    //         total_inv_amount:"5900",
    //         invoiceImport:false,
    //         cancelled:false,
    //         amended:false,
    //         interstate:false,
    //         deemexport:false,
    //         sez:false
    //     },
    //     {
    //         invoiceid:"0003",
    //         bill_to_GSTIN:"33AAA1234A1ZA",
    //         bill_to_Name:"PIRAMAL INC",
    //         Documentdate:"2023-05-05",
    //         bill_to_State:"33-TAMIL NADU",
    //         total_taxiable_value:"5000",
    //         rate:"18",
    //         sgst_amount:"0",
    //         cgst_amount:"0",
    //         igst_amount:"900",
    //         total_inv_amount:"5900",
    //         invoiceImport:true,
    //         cancelled:true,
    //         amended:false,
    //         interstate:false,
    //         deemexport:false,
    //         sez:false
    //     },
    //     {
    //         invoiceid:"0004",
    //         bill_to_GSTIN:"33AAA1234A1ZA",
    //         bill_to_Name:"PIRAMAL INC",
    //         Documentdate:"2023-05-05",
    //         bill_to_State:"33-TAMIL NADU",
    //         total_taxiable_value:"5000",
    //         rate:"18",
    //         sgst_amount:"0",
    //         cgst_amount:"0",
    //         igst_amount:"900",
    //         total_inv_amount:"5900",
    //         invoiceImport:true,
    //         cancelled:false,
    //         amended:false,
    //         interstate:false,
    //         deemexport:false,
    //         sez:false
    //     },
    // ]
    // setInvoices(result)
  }


  const [amendinvoices,setamendedInvoices]=useState([
  ]);
  const [viewamendedinvoice,setviewamendedinvoice]=useState(false)
  async function FetchAmendedInvoices(){
   

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    const response=await fetch(`${url_}/list/amend/ofinvoice/findByBillToGSTIN?bill_to_GSTIN=${myGSTN.GSTIN}&Invoicemonth=${month}&Invoiceyear=${year}`, requestOptions)
    if(response.status===200){
        const result=await response.json();
        // console.log(result)
        result.map((item)=>item.id=item.id.toString())
        setamendedInvoices(result)
    }

    
  }


  async function getFiledStatus(){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/GST_Statusfilednotfiled/${user_id}/${client_id}/${year}/${gstCategory}`, requestOptions);
      const data = await response.json();
      const filedstatus=data.filter((item)=>item.month.includes(month)&&item.month.includes(year))[0].filednotfiled==="yes"?true:false
      console.log(filedstatus)
      setfilednotfiled(filedstatus)



    } catch (error) {
      console.error('An error occurred while fetching files:', error);
    }
  }

  const [totalAmounts,setTotalAmounts]=useState({
    tottalinvoices:0,
    totalTaxableAmt:0,
    totaligstAmt:0,
    totalcgstAmt:0,
    totalsgstAmt:0,
    totalinvAmt:0
  })

  function calculateTotalAmounts(){
    const totalTaxableAmt=invoices.reduce((acc, obj) => parseInt(acc) + parseInt(obj.total_taxiable_value), 0);
    const totaligstAmt=invoices.reduce((acc, obj) => parseInt(acc) + parseInt(obj.igst_amount), 0);
    const totalcgstAmt=invoices.reduce((acc, obj) => parseInt(acc) + parseInt(obj.cgst_amount), 0);
    const totalsgstAmt=invoices.reduce((acc, obj) => parseInt(acc) + parseInt(obj.sgst_amount), 0);
    const totalinvAmt=invoices.reduce((acc, obj) => parseInt(acc) + parseInt(obj.total_inv_amount), 0);
    setTotalAmounts(
        {
            tottalinvoices:(invoices.length>0?invoices.length-1:0),
            totalTaxableAmt:totalTaxableAmt,
            totaligstAmt:totaligstAmt,
            totalcgstAmt:totalcgstAmt,
            totalsgstAmt:totalsgstAmt,
            totalinvAmt:totalinvAmt,
        }
    )

  }

  async function saveInvoice(e,invoiceid){


    // {
    //     invoiceid:generateInvoiceNumber(result.length+1),
    //     bill_to_GSTIN:"",
    //     bill_to_Name:"",
    //     Documentdate:"",
    //     bill_to_State:"",
    //     total_taxiable_value:"0",
    //     rate:"0",
    //     sgst_amount:"0",
    //     cgst_amount:"0",
    //     igst_amount:"0",
    //     total_inv_amount:"0",
    //     invoiceImport:false,
    //     cancelled:false,
    //     amended:false,
    //     interstate:false,
    //     rcm:false,
    //     deemexport:false,
    //     sez:false
    // }

    
const saveObject={

    invoiceid:invoiceid,

    // supplytype:"",	

    // subtype:null,	

    // documenttype:null,	

    // documentno:null,	

    documentdate:"",	

    // transaction_Type:null,

    bill_from_Name:"",

    bill_from_GSTIN:localStorage.getItem("gstin"),		

    bill_from_State:fetchStateCode(localStorage.getItem("gstin").slice(0,2)),	

    // dispatch_from_Address:null,	

    // dispatch_from_Place:null,	

    // dispatch_from_Pincode:null,	

    // dispatch_from_State:null,

    bill_to_Name:"",	

    bill_to_GSTIN:"",	

    bill_to_State:"",	

    // ship_to_Address:null,	

    // ship_to_Place:null,	

    // ship_to_Pincode:null,	

    // ship_to_State:null,

    total_taxiable_value:"0",	

    cgst_amount:"0",	

    sgst_amount:"0",	

    igst_amount:"0",		

    rate:null,	

    // cess_advol_amount:"0",	

    // cess_non_advol_amount:"0",	

    // other_amount:"0",	

    total_inv_amount:"0",	

    // transportation_transpoter_id:null,	

    // transportation_transpoter_Name:null,	

    // transportation_Approxiamte_distance:null,	

    // part_b_mode:null,	

    // part_b_vechiletype:null,	

    // part_b_vechileNo:null,	

    // part_b_transper_doc:null,	

    // part_b_Transper_doc_no_date:null,		

    invoiceImport:false,	

    cancelled:false,	

    amended:false,	

    interstate:false,	

    rcm:false,	

    deemexport:false,	

    sez:false,	

    credit_note:false,	

    credit_amount:null,

    issueDate:null,

    invoiceyear: year,

    invoicemonth: month


}
  }

  

  function fetchStateCode(no){
    const statcodeno=no;//String(no).padStart(2,'0');
    const statename=GSTStateCode.filter((item)=>item.statecode===statcodeno)
    if(statename.length>0)
        return `${statcodeno}-${statename[0].statenm}`;
    else
        return null
  }

    

   


      async function handleToggle(){
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm!'
          });

          if (result.isConfirmed) {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${storedToken}`);

            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              redirect: 'follow'
            };

            // console.log(`${url_}/GSTupdateFiledNotFiled/${user_id}/${client_id}/${month} ${year}/${year}/${gstCategory}`)
            fetch(`${url_}/GSTupdateFiledNotFiled/${user_id}/${client_id}/${month} ${year}/${year}/${gstCategory}`, requestOptions)
              .then(response => console.log(response.status))
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
                // window.location.reload();

          }
      }


    function createInvoice(e,invoiceid,option,id){
        e.preventDefault();
        const name=e.target.name.split("_")[0];
        let index,index1,amendid,origid;

         if(name==="originalist"){
            index=invoices.findIndex((item)=>item.id===id)
            amendid=amendinvoices.filter((item)=>           
                 item.invoiceid===invoices[index].invoiceid && 
                item.month===invoices[index].month && 
                item.year===invoices[index].year 
            )
            
            Navigate("invoice",{state:{invoiceid:invoiceid,month:month,year:year,option:option,
              id:id,amendid:invoices[index].amended&&amendid[0].id}})
        }

        

         if(name==="amendlist"){
            index1=amendinvoices.findIndex((item)=>item.id===id)
            origid=invoices.filter((item)=>           
                 item.invoiceid===amendinvoices[index1].invoiceid && 
                item.month===amendinvoices[index1].month && 
                item.year===amendinvoices[index1].year 
                )
                Navigate("invoice",{state:{invoiceid:invoiceid,month:month,year:year,option:option,
                  id:origid[0].id,amendid:id}})
        }
        
    }
    return(
        <div className='m-4 w-100'>        
            <div className={`mb-3 ${style.maindiv}`}>                
                        <div className={`${style.headerleft}`}>
                        <div className='d-flex align-items-center'>
                            <p className={`${style.headtitle} h3 mr-3`}>{gstCategory}</p>
                            {/* <p className={`${style.subheadtitle}`}>To change filing type to IFF Click here</p> */}
                        </div>
                        <div >
                        <p className={`${style.subheadtitle} h6`}>{month} {year}</p>
                        </div>
                        <div className='mt-2'>
                            <label style={{color:"#6571b9"}}>Update filed status &nbsp;</label>
                            <label className={`${style.switch}`}>
                                <input type="checkbox" checked={filednotfiled} onChange={handleToggle} />
                                <span className={`${style.slider} ${style.round}`}></span>
                            </label>
                        </div>
                    </div>
            </div>

            <div className=''>
                {/* <p className={`${style.headtitle} h3`}>Add Record Details</p> */}
                <p className={`${style.subheadtitle} h6`}>4A,4B,6B,6C-B2B,DE,B2C(All)</p>
            <div className={`${style.tablediv}`}>
            <table className={`${style.gstrtable} table table-borderless `}>
            <thead className='m-2'>
            <tr className={style.titlerow}>
                <th className={`${style.invoiceno}`}><p>Invoice No.</p></th>
                <th className={`${style.gstn}`}><p>GSTN</p></th>
                <th className={`${style.supplytype}`}><p>Supply</p></th>
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
        {
        !viewamendedinvoice?
        
        invoices.map((invoice,index)=>{
            return(
            <tr className={`${style.valuerow} ${invoice.cancelled&&`${style.cancelled}`} ${invoice.invoiceImport&&`${style.disabledrow}`} ${(invoice.deemexport||invoice.sez)&&`${style.exported}`} ${invoice.amended&&`${style.amended}`}`}>
                <td className={`${style.invoiceno}`}><input name={`invoiceid__${invoice.invoiceid}`}  value={invoice.invoiceid}  className={style.disabledinput}/></td>
                <td className={`${style.gstn}`}><input name={`bill_to_GSTIN__${invoice.invoiceid}`}   value={invoice.bill_to_GSTIN} maxLength={15} /></td>
                <td className={`${style.supplytype}`}>
                    <select name={`supply__${invoice.invoiceid}`} >
                    <option value="regular">Regular</option>
                    <option value="deemedexport">Export</option>
                    <option value="sez">SEZ</option>
                    </select>
                </td>
                <td className={`${style.name}`}><input name={`bill_to_Name__${invoice.invoiceid}`}  value={invoice.bill_to_Name} /></td>

                <td className={`${style.date}`}><input name={`Documentdate__${invoice.invoiceid}`}  value={invoice.Documentdate} 
                type='date' /></td>

                <td className={`${style.pos}`}><input name={`bill_to_State__${invoice.invoiceid}`}  value={invoice.bill_to_State} /></td>
                <td className={`${style.taxv}`}><input name={`total_taxiable_value__${invoice.invoiceid}`}   value={invoice.total_taxiable_value} /></td>
                <td className={`${style.rate} ${(invoice.deemexport||invoice.sez)&&`${style.disabledinput}`}`}><input name={`rate__${invoice.invoiceid}`}   value={invoice.rate} placeholder={!invoice.rate&&"n/a"} maxLength={2}/></td>
                <td className={`${style.sgst}`}><input name={`sgst_amount__${invoice.invoiceid}`}  value={invoice.sgst_amount} maxLength={2} className={style.disabledinput} /></td>
                <td className={`${style.cgst}`}><input name={`cgst_amount__${invoice.invoiceid}`}  value={invoice.cgst_amount} maxLength={2} className={style.disabledinput} /></td>
                <td className={`${style.igst}`}><input name={`igst_amount__${invoice.invoiceid}`}  value={invoice.igst_amount} maxLength={2} className={style.disabledinput}/></td>
                <td className={`${style.invv}`}><input name={`total_inv_amount__${invoice.invoiceid}`}  value={invoice.total_inv_amount} /></td>
                
                <td classname={`${style.ellipsis} dropdown`}><i className="fa-solid fa-ellipsis-vertical " id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                    <div className={`dropdown-menu ${style.menuitems}`} aria-labelledby="dropdownMenu2">
                       
                        <button name='originalist_view' className="dropdown-item" type="button" onClick={(e)=>{createInvoice(e,invoice.invoiceid,"View",invoice.id)}}>View Invoice</button>
                        
                    </div>
                </td>
            </tr>
            )
        })
        :


        amendinvoices.map((invoice,index)=>{
          return(
          <tr className={`${style.valuerow} ${invoice.cancelled&&`${style.cancelled}`} ${invoice.invoiceImport&&`${style.disabledrow}`} ${(invoice.deemexport||invoice.sez)&&`${style.exported}`} ${invoice.amended&&`${style.amended}`}`}>
              <td className={`${style.invoiceno}`}><input name={`invoiceid__${invoice.invoiceid}`}  value={invoice.invoiceid}  className={style.disabledinput}/></td>
              <td className={`${style.gstn}`}><input name={`bill_to_GSTIN__${invoice.invoiceid}`}   value={invoice.bill_to_GSTIN} maxLength={15} /></td>
              <td className={`${style.supplytype}`}>
                  <select name={`supply__${invoice.invoiceid}`} >
                  <option value="regular">Regular</option>
                  <option value="deemedexport">Export</option>
                  <option value="sez">SEZ</option>
                  </select>
              </td>
              <td className={`${style.name}`}><input name={`bill_to_Name__${invoice.invoiceid}`}  value={invoice.bill_to_Name} /></td>

              <td className={`${style.date}`}><input name={`Documentdate__${invoice.invoiceid}`}  value={invoice.Documentdate} 
              type='date' /></td>

              <td className={`${style.pos}`}><input name={`bill_to_State__${invoice.invoiceid}`}  value={invoice.bill_to_State} /></td>
              <td className={`${style.taxv}`}><input name={`total_taxiable_value__${invoice.invoiceid}`}   value={invoice.total_taxiable_value} /></td>
              <td className={`${style.rate} ${(invoice.deemexport||invoice.sez)&&`${style.disabledinput}`}`}><input name={`rate__${invoice.invoiceid}`}   value={invoice.rate} placeholder={!invoice.rate&&"n/a"} maxLength={2}/></td>
              <td className={`${style.sgst}`}><input name={`sgst_amount__${invoice.invoiceid}`}  value={invoice.sgst_amount} maxLength={2} className={style.disabledinput} /></td>
              <td className={`${style.cgst}`}><input name={`cgst_amount__${invoice.invoiceid}`}  value={invoice.cgst_amount} maxLength={2} className={style.disabledinput} /></td>
              <td className={`${style.igst}`}><input name={`igst_amount__${invoice.invoiceid}`}  value={invoice.igst_amount} maxLength={2} className={style.disabledinput}/></td>
              <td className={`${style.invv}`}><input name={`total_inv_amount__${invoice.invoiceid}`}  value={invoice.total_inv_amount} /></td>
              
              <td classname={`${style.ellipsis} dropdown`}><i className="fa-solid fa-ellipsis-vertical " id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                  <div className={`dropdown-menu ${style.menuitems}`} aria-labelledby="dropdownMenu2">
                     
                      <button name='amendlist_view' className="dropdown-item" type="button" onClick={(e)=>{createInvoice(e,invoice.invoiceid,"View",invoice.id)}}>View Invoice</button>
                      
                  </div>
              </td>
          </tr>
          )
      })
        
        
        }
        
      </tbody>
      <tfoot className='m-2'>
        <tr className={style.totalrow}>
            <td className={`${style.invoiceno}`}><p>{totalAmounts.tottalinvoices}</p></td>
            <td className={`${style.gstn}`}></td>
            <td className={`${style.supplytype}`}></td>
            <td className={`${style.name}`}></td>
            <td className={`${style.date}`}></td>
            <td className={`${style.pos}`}></td>
            <td className={`${style.taxv}`}><p>{totalAmounts.totalTaxableAmt}</p></td>
            <td className={`${style.rate}`}></td>
            <td className={`${style.sgst}`}><p>{totalAmounts.totalsgstAmt}</p></td>
            <td className={`${style.cgst}`}><p>{totalAmounts.totalcgstAmt}</p></td>
            <td className={`${style.igst}`}><p>{totalAmounts.totaligstAmt}</p></td>
            <td className={`${style.invv}`}><p>{totalAmounts.totalinvAmt}</p></td>
        </tr>
      </tfoot>
    </table>
            </div>
        </div>    
        <p className={style.p} onClick={(e)=>{setviewamendedinvoice(!viewamendedinvoice)}}>View {!viewamendedinvoice&&"Amended"} invoices</p>
        <p>HSN wise summary of outward invoices are auto gathered from create invoice option</p>
    </div>
    );
}
export default GST2A;

