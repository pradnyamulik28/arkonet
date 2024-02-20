import { useEffect, useState } from 'react';
import style from './GSTRFiling.module.css';
import GSTStateCode from "../../../ObjData/GSTStateCode.json"
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';
import InviteOnTaxko from '../InviteOnTaxko/InviteOnTaxko';


function GSTRFiling(){
    const [invoices,setInvoices]=useState([
    ]);
    const [amendinvoices,setamendedInvoices]=useState([
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
    const FinancStartyear=parseInt((useLocation().state.fy).split("-")[0]);
    const month=useLocation().state.month;
    const gstCategory=useLocation().state.gstCategory;

    const [filednotfiled,setfilednotfiled]=useState(false);
    // const year=useLocation().state.year;
    useEffect(()=>{
        FetchInvoices();  
        FetchAmendedInvoices()  ;
        getFiledStatus();    
    },[])

  useEffect(() => {
    calculateTotalAmounts()
  }, [invoices]);

  
  async function FetchInvoices(){
   

    const invID= await nextInvoiceID();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    const response=await fetch(`${url_}/list/ofinvoice/findByBillFromGSTIN?bill_from_GSTIN=${myGSTN.GSTIN}&Invoicemonth=${month}&Invoiceyear=${year}`, requestOptions)
    if(response.status===200){
        const result=await response.json();
        // console.log(result)
        result.map((item)=>item.id=item.id.toString());

        setInvoices([...result,
            {
                id:`${(result.length+1)}`,
                invoiceid:invID,//generateInvoiceNumber(result.length+1),
                bill_to_GSTIN:"",
                bill_to_Name:"",
                documentdate:"",
                bill_to_State:"",
                subtype:"Supply",
                total_taxiable_value:"0",
                rate:"0",
                sgst_amount:"0",
                cgst_amount:"0",
                igst_amount:"0",
                total_inv_amount:"0",
                invoiceImport:false,
                cancelled:false,
                amended:false,
                interstate:false,
                rcm:false,
                deemexport:false,
                sez:false,
                new:true,
            }])
    }

    
  }


const [viewamendedinvoice,setviewamendedinvoice]=useState(false)
  async function FetchAmendedInvoices(){
   

    const invID= await nextInvoiceID();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    const response=await fetch(`${url_}/list/amend/ofinvoice/findByBillFromGSTIN?bill_from_GSTIN=${myGSTN.GSTIN}&Invoicemonth=${month}&Invoiceyear=${year}`, requestOptions)
    if(response.status===200){
        const result=await response.json();
        // console.log(result)
        result.map((item)=>item.id=item.id.toString())
        setamendedInvoices(result)
    }

    
  }

  const [nextinvid,setnextinvid]=useState()
  async function nextInvoiceID(){
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    try{const response=await fetch(`${url_}/highest-invoice-id?bill_from_GSTIN=${myGSTN.GSTIN}&invoicestartdate=${FinancStartyear}-04-01 &invoiceenddate=${FinancStartyear+1}-03-31`, requestOptions);
    if(response.status===200){
        const result=await response.text();
        // console.log(result); 
        setnextinvid(`${result}`)
        return `${result}`
    }}catch(error){console.log(error)}
    
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


 


  

  async function saveInvoice(e,invoiceid,invID){

    const updatedArray=[...invoices];
   
    const index=invoices.findIndex((item)=>item.id===invID)

    
    const saveObject={

        invoiceid:invoiceid,

        supplytype:"",	

        subtype:"",	

        documenttype:"",	

        documentno:"",	

        documentdate:"",	

        transaction_Type:"",

        bill_from_Name:"",

        bill_from_GSTIN:localStorage.getItem("gstin"),		

        bill_from_State:fetchStateCode(localStorage.getItem("gstin").slice(0,2)),	

        dispatch_from_Address:"",	

        dispatch_from_Place:"",	

        dispatch_from_Pincode:"",	

        dispatch_from_State:"",

        bill_to_Name:"",	

        bill_to_GSTIN:"",	

        bill_to_State:"",	

        ship_to_Address:"",	

        ship_to_Place:"",	

        ship_to_Pincode:"",	

        ship_to_State:"",

        total_taxiable_value:"0",	

        cgst_amount:"0",	

        sgst_amount:"0",	

        igst_amount:"0",		

        rate:null,	

        cess_advol_amount:"0",	

        cess_non_advol_amount:"0",	

        other_amount:"0",	

        total_inv_amount:"0",	

        transportation_transpoter_id:"",	

        transportation_transpoter_Name:"",	

        transportation_Approxiamte_distance:"",	

        part_b_mode:"",	

        part_b_vechiletype:"",	

        part_b_vechileNo:"",	

        part_b_Transper_doc:"",	

        part_b_Transper_doc_no_date:"",		

        invoiceImport:false,	

        cancelled:false,	

        amended:false,	

        interstate:false,	

        rcm:false,	

        deemexport:false,	

        sez:false,	

        credit_note:false,	

        credit_amount:0,

        issueDate:"",

        invoiceyear: year,

        invoicemonth: month
    }

    const {id,...saveObject1}=updatedArray[index]

    const save=Object.assign({}, saveObject,saveObject1);

    // console.log(save)

    

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var raw = JSON.stringify(save);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try
        {
            const response = await fetch(`${url_}/create-invoice`, requestOptions);
            if(response.status===200){
                const result = await response.text()
                Swal.fire({title:'Record saved.!'}).then(() => {
                    window.location.reload();
                });
            }
        }catch(error){
            console.log(error)
        }
  }


  async function editInvoice(e,invoiceid,invID){

    const updatedArray=[...invoices];
   
    const index=invoices.findIndex((item)=>item.id===invID)
    

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var raw = JSON.stringify(updatedArray[index]);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try
        {
            const response = await fetch(`${url_}/updateinvoice/${invID}`, requestOptions);
            if(response.status===200){
                const result = await response.text();

                Swal.fire({title:result}).then(() => {
                    window.location.reload();
                });
                // if (saveProductsRef.current && saveProductsRef.current.saveProductItems) {
                //     saveProductsRef.current.saveProductItems(result.id,result.invoiceid);
                //   }
            }
            if(response.status===404){
                const result = await response.text();
                Swal.fire({title:result})
            }
        }catch(error){
            console.log(error)
        }
  }

  async function changeCancelledStatus(e,invoiceid,invID){

    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        iconColor:"red",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, confirm!'
      });

      if (result.isConfirmed) {
            const updatedArray=[...invoices];
    
            const index=invoices.findIndex((item)=>item.id===invID)
            updatedArray[index].cancelled= true
        
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${storedToken}`);
        
            var raw = JSON.stringify(updatedArray[index]);
        
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
        
            try
            {
                const response = await fetch(`${url_}/updateinvoice/${invID}`, requestOptions);
                if(response.status===200){
                    const result = await response.text();
                    Swal.fire(`Marked as Cancelled`).then(() => {
                        window.location.reload();
                    });
                }
            }catch(error){
                Swal.fire(error)
            }
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
    //   console.log(filedstatus)
      setfilednotfiled(filedstatus)



    } catch (error) {
      console.error('An error occurred while fetching files:', error);
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

    


    function formatDate(inputDate) {
        const date = new Date(inputDate);
    
        if (isNaN(date.getTime())) {
          // Invalid date, return original input
          return inputDate;
        }
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(date.getDate()).padStart(2, "0");
    
        return `${year}-${month}-${day}`;
      }


    function handleChange(e) {
        const { name, value } = e.target;
        const updatedArray=[...invoices];
          const invID = name.split("__")[1];
          const inputname = name.split("__")[0];
        const index=invoices.findIndex((item)=>item.id===invID)
        // console.log(updatedArray[index].invoiceid)

        switch(inputname){
            // case 'invoiceid':
            //     // invoices.map()
            //     if(invoices.some((item)=>`${item.invoiceid}`===value)){
            //         Swal.fire('Invoice id already exist')
                    
            //     }
            //     else{
            //         updatedArray[index] = { ...updatedArray[index], [inputname]: value };  
            //     }
            //     break;

            case 'bill_to_GSTIN':         
                // console.log(value.slice(0,2))       
                const stcod=fetchStateCode(value.slice(0,2));
                if((value.length===2 && stcod)||stcod){   
                     
                    
                    if(stcod!==myGSTN.State)
                    {
                        updatedArray[index] = { ...updatedArray[index], [inputname]: value,bill_to_State: stcod, interstate:true  }; 
                    }
                    else{
                        updatedArray[index] = { ...updatedArray[index], [inputname]: value,bill_to_State: stcod,interstate:false  };     //Update state code 
                    }
                }
                else
                {
                    if(value.length===2&&!stcod&&e.key!=="Backspace") Swal.fire({
                        icon:"info",
                        iconColor:"red",
                        text:"Invalid GSTN No"
                    })
                    updatedArray[index] = { ...updatedArray[index], [inputname]: value };  
                }
                break;
                
                case "documentdate":
                    console.log(value)
                    if(new Date(value)<=new Date()){
                        updatedArray[index] = { ...updatedArray[index], [inputname]: value };  
                    }
                    else{
                        e.preventDefault();
                        Swal.fire({
                            icon:"info",
                            iconColor:"red",
                            text:"Select date less than or equals to Today"})
                    }
                    break

            case 'total_taxiable_value':
            case 'sgst_amount':
            case 'cgst_amount':
            case 'igst_amount':
                updatedArray[index] = { ...updatedArray[index], [inputname]: value.replace(/[^\d.]/g, "") };  
                break;

            case 'rate':
                if(updatedArray[index].bill_to_GSTIN && updatedArray[index].bill_to_State && updatedArray[index].total_taxiable_value!=="0"){
                    updatedArray[index] = { ...updatedArray[index], [inputname]: value.replace(/\D/g, "") };  
                }
                else{
                    Swal.fire({
                        icon:"info",
                        iconColor:"red",
                        text: (!updatedArray[index].bill_to_GSTIN && !updatedArray[index].bill_to_State)?"Please fill GSTN No first.!"
                        :(updatedArray[index].total_taxiable_value==="0")&&"Please fill Taxable amount.!"
                    })
                }
                break;

            case 'supply':
               switch(value){
                case 'regular':
                    updatedArray[index] = { ...updatedArray[index],subtype:"Supply", deemexport: false,sez:false,  };  
                    break;
                case 'deemedexport':
                    updatedArray[index] = { ...updatedArray[index],subtype:"Export", deemexport: true,sez:false, 
                                            rate:0, igst_amount:0,cgst_amount:0,sgst_amount:0,
                                            total_inv_amount:updatedArray[index].total_taxiable_value!==0&&updatedArray[index].total_taxiable_value };  
                    break;
                case 'sez':
                    updatedArray[index] = { ...updatedArray[index],subtype:"SEZ", deemexport: false,sez:true, 
                                            rate:0, igst_amount:0,cgst_amount:0,sgst_amount:0 ,
                                            total_inv_amount:updatedArray[index].total_taxiable_value!==0&&updatedArray[index].total_taxiable_value
                                        };  
                    break;
                default:
               }
                break;

            
            default:
                updatedArray[index] = { ...updatedArray[index], [inputname]: value };  
                break;
        }
        setInvoices(updatedArray)      
      }

      function handleBlur(e){
        const { name, value } = e.target;
        const updatedArray=[...invoices];
          const invID = name.split("__")[1];
          const inputname = name.split("__")[0];

          const index=invoices.findIndex((item)=>item.id===invID)
        
        switch(inputname){
            case 'invoiceid':                
                
                if(invoices.some((item)=>`${item.invoiceid}`===value && `${item.id}`!==updatedArray[index].id )){
                    Swal.fire('Invoice id already exist')
                    updatedArray[index] = { ...updatedArray[index], [inputname]: nextinvid };  
                    
                }
                else{
                    updatedArray[index] = { ...updatedArray[index], [inputname]: value };  
                }
                break;

            case 'bill_to_GSTIN': 
            if(!fetchStateCode(value.slice(0,2)) && value!==""){
                Swal.fire({
                    icon:"info",
                    iconColor:"red",
                    text:"Invalid GSTN No"
                })
            }
            break;

            case "total_taxiable_value":
            case 'rate': 
                          
                const taxamount=inputname==="total_taxiable_value" ? calculategst(value,updatedArray[index].rate)
                                    : inputname==="rate"  && calculategst(updatedArray[index].total_taxiable_value,value)
                // console.log(taxamount)
                if(updatedArray[index].interstate===true)
                {
                    updatedArray[index] = { ...updatedArray[index],total_inv_amount:taxamount.inv_amount, igst_amount: taxamount.totaltax, sgst_amount:"0", cgst_amount:"0"};  
                }
                else if(updatedArray[index].interstate===false){
                    updatedArray[index] = { ...updatedArray[index],total_inv_amount:taxamount.inv_amount, sgst_amount: taxamount.sgst, cgst_amount:taxamount.sgst, igst_amount:"0" };  
                }
                break;

            default: 
                break;
        }        
        setInvoices(updatedArray)      

      }

      
      function calculategst(taxableamount,rate){

        let totaltax= (taxableamount*(rate/100)).toFixed(2)
        // console.log(totaltax,(totaltax % 1).toFixed(2))
        

        if ((totaltax % 1).toFixed(2) >= 0.50) {
            // Apply upward rounding

            totaltax=Math.ceil(totaltax);
          } else {
            // Apply downward rounding
            totaltax=Math.floor(totaltax);
          }

        const inv_amount=(parseInt(taxableamount)+parseInt(totaltax));
        
        const cgst=( totaltax/2)
        const sgst= (totaltax/2)


        return {totaltax,cgst,sgst,inv_amount}

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

            fetch(`${url_}/GSTupdateFiledNotFiled/${user_id}/${client_id}/${month} ${year}/${year}/${gstCategory}`, requestOptions)
              .then(response => console.log(response.status))
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
                window.location.reload();

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
            console.log(name,invoices[index],amendid)
        }

        

         if(name==="amendlist"){
            index1=amendinvoices.findIndex((item)=>item.id===id)
            origid=invoices.filter((item)=>           
                 item.invoiceid===amendinvoices[index1].invoiceid && 
                item.month===amendinvoices[index1].month && 
                item.year===amendinvoices[index1].year 
                )
        }



        
        // console.log(amendid)
       
        switch(option){
            
            case "Edit":
                if(id)
                {
                    if(filednotfiled ){
                    Swal.fire({
                        icon:"info",text:"GSTR-1 Has already been filed for this month.Kindly amend the invoice"});
                    }
                    else{
                    Navigate("invoice",{state:{invoiceid:invoiceid,month:month,year:year,option:option,id:id}})
                    }   
                }
                
                break;
            case "Amend":
                if(id){
                        if(filednotfiled ){
                            if(name==="originalist"){
                                Navigate("invoice",{state:{invoiceid:invoiceid,month:month,year:year,option:option,
                                    id:id,amendid:invoices[index].amended&&amendid[0].id}})
                            }

                            else if(name==="amendlist"){
                                Navigate("invoice",{state:{invoiceid:invoiceid,month:month,year:year,option:option,
                                    id:origid[0].id,amendid:id}})
                            }
                        }
                        else{
                        
                        Swal.fire({icon:"info",text:"GSTR-1 Has not been filed for this month.Kindly edit the invoice"});
                        }
                    }
                break;
            case "View":
                if(name==="originalist"){
                    Navigate("invoice",{state:{invoiceid:invoiceid,month:month,year:year,option:option,
                        id:id,amendid:invoices[index].amended&&amendid[0].id}})
                }
                else if(name==="amendlist"){
                    Navigate("invoice",{state:{invoiceid:invoiceid,month:month,year:year,option:option,
                        id:origid[0].id,amendid:id}})
                }
                
                break;
            default:Navigate("invoice",{state:{invoiceid:nextinvid,month:month,year:year,option:option}})
        }
        
       
    }
    
    return(
        <div className='m-4 w-100'>        
            <div className={`mb-3 ${style.maindiv}`}>                
                        <div className={`${style.headerleft}`}>
                        <div className='d-flex align-items-center'>
                            <p className={`${style.headtitle} h3 mr-3`}>GSTR-1</p>
                            <p className={`${style.subheadtitle}`}>To change filing type to IFF Click here</p>
                        </div>
                        <div >
                        <p className={`${style.subheadtitle} h6`}>{month} {year}</p>
                        </div>
                        <div className='mt-2'>
                            <label style={{color:"#6571b9"}}>Update filed status &nbsp;</label>
                            <label className={`${style.switch}`}>
                                <input type="checkbox" checked={filednotfiled } onChange={handleToggle} />
                                <span className={`${style.slider} ${style.round}`}></span>
                            </label>
                        </div>
                    </div>
            </div>

            <div className=''>
                <p className={`${style.headtitle} h3`}>Add Record Details</p>
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
                <th className={`${style.ellipsis}`}></th>
            </tr>
      </thead>
      <tbody className='m-2'>
        {
        !viewamendedinvoice?
        invoices.map((invoice,index)=>{
            return(
            <tr className={`${style.valuerow} ${invoice.cancelled&&`${style.cancelled}`} ${invoice.invoiceImport&&`${style.disabledrow}`} ${(invoice.deemexport||invoice.sez)&&`${style.exported}`} ${invoice.amended&&`${style.amended}`}`}>
                <td className={`${style.invoiceno}`}><input name={`invoiceid__${invoice.id}`} onChange={handleChange} onBlur={handleBlur} value={invoice.invoiceid}  disabled={filednotfiled || !invoice.new}/></td>
                <td className={`${style.gstn}`}><input name={`bill_to_GSTIN__${invoice.id}`} onChange={handleChange} onBlur={handleBlur} value={invoice.bill_to_GSTIN} maxLength={15} /></td>
                <td className={`${style.supplytype}`}>
                    <select name={`supply__${invoice.id}`} onChange={handleChange}>
                        <option value="regular" selected={invoice.subtype==="Supply"}>Regular</option>
                        <option value="deemedexport" selected={invoice.subtype==="Export"}>Export</option>
                        <option value="sez" selected={invoice.subtype==="SEZ"}>SEZ</option>
                    </select>
                </td>
                <td className={`${style.name}`}><input name={`bill_to_Name__${invoice.id}`} onChange={handleChange} value={invoice.bill_to_Name} /></td>

                <td className={`${style.date}`}><input name={`documentdate__${invoice.id}`} onChange={handleChange} value={invoice.documentdate} 
                type='date' /></td>

                <td className={`${style.pos}`}><input name={`bill_to_State__${invoice.id}`} onChange={handleChange} value={invoice.bill_to_State} /></td>
                <td className={`${style.taxv}`}><input name={`total_taxiable_value__${invoice.id}`} onChange={handleChange} onBlur={handleBlur} value={invoice.total_taxiable_value} /></td>
                <td className={`${style.rate} ${(invoice.deemexport||invoice.sez)&&`${style.disabledinput}`}`}><input name={`rate__${invoice.id}`} onChange={handleChange} onBlur={handleBlur} value={invoice.rate} placeholder={!invoice.rate&&"n/a"} maxLength={2}/></td>
                <td className={`${style.sgst}`}><input name={`sgst_amount__${invoice.id}`} onChange={handleChange} value={invoice.sgst_amount} maxLength={2} className={style.disabledinput} /></td>
                <td className={`${style.cgst}`}><input name={`cgst_amount__${invoice.id}`} onChange={handleChange} value={invoice.cgst_amount} maxLength={2} className={style.disabledinput} /></td>
                <td className={`${style.igst}`}><input name={`igst_amount__${invoice.id}`} onChange={handleChange} value={invoice.igst_amount} maxLength={2} className={style.disabledinput}/></td>
                <td className={`${style.invv}`}><input name={`total_inv_amount__${invoice.id}`} onChange={handleChange} value={invoice.total_inv_amount} /></td>
                
                <td classname={`${style.ellipsis} dropdown`}><i className="fa-solid fa-ellipsis-vertical " id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                    <div className={`dropdown-menu ${style.menuitems}`} aria-labelledby="dropdownMenu2">
                        <button name='originalist_save' className="dropdown-item" type="button" disabled={invoice.cancelled || invoice.amended || invoice.invoiceImport} onClick={(e)=>{invoice.new?saveInvoice(e,invoice.invoiceid,invoice.id):invoice.amended?Swal.fire("Invoice already amended"):editInvoice(e,invoice.invoiceid,invoice.id)}}>Save</button>
                        <button name='originalist_create' className="dropdown-item" type="button" onClick={(e)=>{createInvoice(e,invoice.invoiceid,"Create",invoice.id)}}>Create Invoice</button>
                        <button name='originalist_edit' className="dropdown-item" type="button" disabled={invoice.new||invoice.cancelled || invoice.amended} onClick={(e)=>{createInvoice(e,invoice.invoiceid,"Edit",invoice.id)}}>Edit Invoice</button>
                        <button name='originalist_amend' className="dropdown-item" type="button" disabled={invoice.new||invoice.cancelled || invoice.amended} onClick={(e)=>{createInvoice(e,invoice.invoiceid,"Amend",invoice.id)}}>Amend Invoice</button>
                        <button name='originalist_view' className="dropdown-item" type="button" disabled={invoice.new} onClick={(e)=>{createInvoice(e,invoice.invoiceid,"View",invoice.id)}}>View Invoice</button>
                        <button name='originalist_issuecred' className="dropdown-item" type="button" disabled={invoice.new}>Issue Credit Note</button>
                        <button name='originalist_cancel' className="dropdown-item" type="button" disabled={invoice.cancelled || invoice.new} onClick={(e)=>{changeCancelledStatus(e,invoice.invoiceid,invoice.id)}}>Mark Cancelled</button>
                        <button name='originalist_rcm' className="dropdown-item" type="button">RCM</button>
                        <button name='originalist_property' className="dropdown-item" type="button">Properties</button>
                        <button name='originalist_invite' className="dropdown-item" type="button" data-toggle="modal" data-target="#inviteontaxko">Invite on TAXKO</button>
                    </div>
                </td>
            </tr>
            )
        }):
        
        amendinvoices.map((invoice,index)=>{
            return(
            <tr className={`${style.valuerow} ${invoice.cancelled&&`${style.cancelled}`} ${invoice.invoiceImport&&`${style.disabledrow}`} ${(invoice.deemexport||invoice.sez)&&`${style.exported}`} ${invoice.amended&&`${style.amended}`}`}>
                <td className={`${style.invoiceno}`}><input name={`invoiceid__${invoice.id}`} onChange={handleChange} onBlur={handleBlur} value={invoice.invoiceid}  disabled={filednotfiled || !invoice.new}/></td>
                <td className={`${style.gstn}`}><input name={`bill_to_GSTIN__${invoice.id}`} onChange={handleChange} onBlur={handleBlur} value={invoice.bill_to_GSTIN} maxLength={15} /></td>
                <td className={`${style.supplytype}`}>
                    <select name={`supply__${invoice.id}`} onChange={handleChange}>
                        <option value="regular" selected={invoice.subtype==="Supply"}>Regular</option>
                        <option value="deemedexport" selected={invoice.subtype==="Export"}>Export</option>
                        <option value="sez" selected={invoice.subtype==="SEZ"}>SEZ</option>
                    </select>
                </td>
                <td className={`${style.name}`}><input name={`bill_to_Name__${invoice.id}`} onChange={handleChange} value={invoice.bill_to_Name} /></td>

                <td className={`${style.date}`}><input name={`documentdate__${invoice.id}`} onChange={handleChange} value={invoice.documentdate} 
                type='date' /></td>

                <td className={`${style.pos}`}><input name={`bill_to_State__${invoice.id}`} onChange={handleChange} value={invoice.bill_to_State} /></td>
                <td className={`${style.taxv}`}><input name={`total_taxiable_value__${invoice.id}`} onChange={handleChange} onBlur={handleBlur} value={invoice.total_taxiable_value} /></td>
                <td className={`${style.rate} ${(invoice.deemexport||invoice.sez)&&`${style.disabledinput}`}`}><input name={`rate__${invoice.id}`} onChange={handleChange} onBlur={handleBlur} value={invoice.rate} placeholder={!invoice.rate&&"n/a"} maxLength={2}/></td>
                <td className={`${style.sgst}`}><input name={`sgst_amount__${invoice.id}`} onChange={handleChange} value={invoice.sgst_amount} maxLength={2} className={style.disabledinput} /></td>
                <td className={`${style.cgst}`}><input name={`cgst_amount__${invoice.id}`} onChange={handleChange} value={invoice.cgst_amount} maxLength={2} className={style.disabledinput} /></td>
                <td className={`${style.igst}`}><input name={`igst_amount__${invoice.id}`} onChange={handleChange} value={invoice.igst_amount} maxLength={2} className={style.disabledinput}/></td>
                <td className={`${style.invv}`}><input name={`total_inv_amount__${invoice.id}`} onChange={handleChange} value={invoice.total_inv_amount} /></td>
                
                <td classname={`${style.ellipsis} dropdown`}><i className="fa-solid fa-ellipsis-vertical " id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                    <div className={`dropdown-menu ${style.menuitems}`} aria-labelledby="dropdownMenu2">
                        <button name='amendlist_save' className="dropdown-item" type="button" disabled={invoice.cancelled || invoice.amended || invoice.invoiceImport} onClick={(e)=>{invoice.new?saveInvoice(e,invoice.invoiceid,invoice.id):invoice.amended?Swal.fire("Invoice already amended"):editInvoice(e,invoice.invoiceid,invoice.id)}}>Save</button>
                        <button name='amendlist_create' className="dropdown-item" type="button" onClick={(e)=>{createInvoice(e,invoice.invoiceid,"Create",invoice.id)}}>Create Invoice</button>
                        <button name='amendlist_edit' className="dropdown-item" type="button" disabled={invoice.new||invoice.cancelled || invoice.amended} onClick={(e)=>{createInvoice(e,invoice.invoiceid,"Edit",invoice.id)}}>Edit Invoice</button>
                        <button name='amendlist_amend' className="dropdown-item" type="button" disabled={invoice.new||invoice.cancelled || invoice.amended} onClick={(e)=>{createInvoice(e,invoice.invoiceid,"Amend",invoice.id)}}>Amend Invoice</button>
                        <button name='amendlist_view' className="dropdown-item" type="button"  onClick={(e)=>{createInvoice(e,invoice.invoiceid,"View",invoice.id)}}>View Invoice</button>
                        <button name='amendlist_issuecred' className="dropdown-item" type="button">Issue Credit Note</button>
                        <button name='amendlist_cancel' className="dropdown-item" type="button" disabled={invoice.cancelled} onClick={(e)=>{changeCancelledStatus(e,invoice.invoiceid,invoice.id)}}>Mark Cancelled</button>
                        <button name='amendlist_rcm' className="dropdown-item" type="button">RCM</button>
                        <button name='amendlist_property' className="dropdown-item" type="button">Properties</button>
                        <button name='amendlist_invite' className="dropdown-item" type="button" data-toggle="modal" data-target="#inviteontaxko">Invite on TAXKO</button>
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
        <InviteOnTaxko />
    </div>
    );
}
export default GSTRFiling;

