import style from "./CreateInvoice.module.css"
import State_list from "../../../ObjData/GSTStateCode.json"
import { useEffect, useRef, useState } from "react"
import ProductDetails from "./ProductDetails"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import { url_ } from "../../../Config";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function CreateInvoice(){

  const invoiceid=useLocation().state.invoiceid;
  const year=useLocation().state.year;
  const month=useLocation().state.month;
  const option=useLocation().state.option;
  const ID=useLocation().state.id;
  const amendid=useLocation().state.amendid;

  const Navigate = useNavigate()

    const myGSTN={bill_from_GSTIN:"33AAA1234A1ZA",bill_from_State:fetchStateCode("33AAA1234A1ZA".slice(0,2))};
    

  const storedToken = window.localStorage.getItem("jwtToken");

  const saveProductsRef=useRef(null)



    
    const [invoice_fields,setinvoice_fields]=useState({
        // id:"",
    
        invoiceid:useLocation().state.invoiceid,
    
        supplytype:"",	
    
        subtype:"",	
    
        documenttype:"Tax Invoice",	
    
        documentno:useLocation().state.invoiceid,	
    
        documentdate:"",	
    
        transaction_Type:"Regular",
    
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
    
        invoiceImport:true,	
    
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


    })

    const [originalInvoice,setoriginalinvoice]=useState({})
    const [amendedInvoice,setamendedinvoice]=useState({})

    const documenttype=[
        {val:"Tax Invoice",option_nm:"Tax Invoice"},
        {val:"Bill of Supply",option_nm:"Bill of Supply"},
        {val:"Delivery Challan",option_nm:"Delivery Challan"},
        {val:"Others",option_nm:"Others"}
    ]

    const transactiontype=[
        {val:"Regular",option_nm:"Regular"},
        {val:"Bill to–Ship To",option_nm:"Bill to–Ship To"},
        {val:"Bill from",option_nm:"Bill from"},
        {val:"Combination of both",option_nm:"Combination of both"},
    ]

    const supplyType=[
        {val:"Outward",option_name:"Outward"},
        {val:"Inward",option_name:"Inward"}
    ]

    const subType=[
        {val:"Supply",option_name:"Supply"},
        {val:"Export",option_name:"Export"},
        {val:"SEZ",option_name:"SEZ"},
        {val:"Job Work",option_name:"Job Work"},
        {val:"SKD/CKD/Lots",option_name:"SKD/CKD/Lots"},
        {val:"Recipient Not Known",option_name:"Recipient Not Known"},
        {val:"For Own Use",option_name:"For Own Use"},
        {val:"Exibition or Fair",option_name:"Exibition or Fair"},
        {val:"Line Sales",option_name:"Line Sales"},
        {val:"Others",option_name:"Others"},
    ]

    const vehicleType=[
        {val:"Regular",option_name:"Regular"},
        {val:"Over Dimentional Cargo",option_name:"Over Dimentional Cargo"}
    ]


    const modeType=[
        {val:"Road",option_name:"Road"},
        {val:"Rail",option_name:"Rail"},
        {val:"Air",option_name:"Air"},
        {val:"Ship or Ship cum Road/Rail",option_name:"Ship or Ship cum Road/Rail"},
    ]
    const [fetchedTotal,setfetchedtotal]=useState({})
    useEffect(()=>{
        setinvoice_fields({
                ...invoice_fields,
                total_inv_amount:(parseInt(invoice_fields.total_taxiable_value)+
                parseInt(invoice_fields.igst_amount)+
                parseInt(invoice_fields.cgst_amount)+
                parseInt(invoice_fields.sgst_amount)+
                parseInt(invoice_fields.cess_advol_amount)+
                parseInt(invoice_fields.cess_non_advol_amount)+
                parseInt(invoice_fields.other_amount)
            
            )
        })
    },[invoice_fields.other_amount])

    const transporDateRef=useRef(null)



    function fetchStateCode(no){
        const statcodeno=no;//String(no).padStart(2,'0');
        const statename=State_list.filter((item)=>item.statecode===statcodeno)
        if(statename.length>0)
            return `${statcodeno}-${statename[0].statenm}`;
        else
            return null
  }

    async function getStateFromPin(pinCode){
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          try{const response=await fetch(`https://api.postalpincode.in/pincode/${pinCode}`, requestOptions)
          if(response.status===200){
            const result=await response.json()
            
            if(result[0].Status==="Error"){
                    return null;
            }
            else if(result[0].Status==="Success")
            {
                const {District,State,Country}=result[0].PostOffice[0]
                return formatStates(State)
        }
            
          }}catch(error){
            console.log(error)
          }
    }


    function formatStates(statenm) {
        
        const stateparts = statenm.toLowerCase().split(" ");
    
        const statename = State_list.filter((item) => {
          const valpart = item.statenm.toLowerCase().split(" ");
          const optionpart = item.statenm.toLowerCase().split(" ");
          if (
            stateparts.some((state) => valpart.includes(state)) ||
            stateparts.some((state) => optionpart.includes(state))
          ) {
            return true;
          } else return false;
        });
        
        return `${statename[0].statecode}-${statename[0].statenm}`;
      }

      const [existingIDs,setExistingIDs]=useState([])
    

      async function FetchIDS(){
        

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${storedToken}`);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            const response=await fetch(`${url_}/list/ofinvoice/findByBillFromGSTIN?bill_from_GSTIN=${invoice_fields.bill_from_GSTIN}&Invoicemonth=${month}&Invoiceyear=${year}`, requestOptions)
            if(response.status===200){
                const result=await response.json();
                // console.log(result)
                result.map((item)=>item.invoiceid=item.invoiceid.toString());
                const ids=result.map((item)=>item.invoiceid)
                setExistingIDs(ids)
            }

    
        }

        


    function handleChange(e){
        const {name,value}=e.target;
        
        
        switch(name){
            case "documenttype":
                
                if(value==="Tax Invoice"){
                    setinvoice_fields({...invoice_fields,documentno:invoiceid,[name]:value})
                }
                else{
                    setinvoice_fields({...invoice_fields,[name]:value})
                }
                
                break;
            case "subtype":
                
                setinvoice_fields({...invoice_fields,[name]:value,deemexport:value==="Export" ? true : false,sez:value==="SEZ"?true:false})
                break;

            case "documentdate":
                
                if(new Date(value)<=new Date()){
                    setinvoice_fields({...invoice_fields,[name]:value})
                }
                else{
                    e.preventDefault();
                    Swal.fire({
                        icon:"info",
                        iconColor:"red",
                        text:"Select date less than or equals to Today"})
                }
                break
            
            case 'dispatch_from_Pincode':
            case 'ship_to_Pincode':
                setinvoice_fields({...invoice_fields,[name]:value.replace(/\D/g, "")})
                break;

            default:setinvoice_fields({...invoice_fields,[name]:value})
        }
    }

    async function handleBlur(e){
        const {name,value}=e.target;
        // console.log(name)
        
        switch(name){

            case 'invoiceid':                
                console.log(existingIDs,value)
            if(existingIDs.some((item)=>item===value)){
                Swal.fire('Invoice id already exist')
                setinvoice_fields({...invoice_fields, [name]: invoiceid }  )
                
            }
            else{
                setinvoice_fields({...invoice_fields, [name]: value }  )
            }
            break;

            case 'bill_to_GSTIN':
                setinvoice_fields({...invoice_fields,bill_to_State:fetchStateCode(value.slice(0,2))})
                break;

            case "dispatch_from_Pincode":
            case "ship_to_Pincode":
                const state=await getStateFromPin(value);
                if(state)
                {
                    name==="dispatch_from_Pincode"? setinvoice_fields({...invoice_fields,dispatch_from_State:state}):
                    name==="ship_to_Pincode"&&setinvoice_fields({...invoice_fields,ship_to_State:state})
                }
                else{
                    Swal.fire({
                        icon:"info",
                        iconColor:"red",
                        text:"Invalid Pin code.!"
                    })
                    name==="dispatch_from_Pincode"? setinvoice_fields({...invoice_fields,dispatch_from_State:""}):
                    name==="ship_to_Pincode"&&setinvoice_fields({...invoice_fields,ship_to_State:""})
                }
                break;

           default:
        }
    }

    async function saveInvoice(){

        switch(option)
        {
            case 'Create':
            createInvoice()
            break;
            case 'Amend':
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
                    amendInvoice()
                  }
            break;
            case 'Edit':
            editInvoice();
            break;
            default:break;
        }
        
      }



    async function createInvoice(){
        
        
        

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var raw = JSON.stringify(invoice_fields);

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
                const result = await response.json()
                if (saveProductsRef.current && saveProductsRef.current.saveProductItems) {
                    saveProductsRef.current.saveProductItems(result.id,result.invoiceid);
                  }
            }
        }catch(error){
            console.log(error)
        }
        

        
    }



    
    async function editInvoice(){
        
        
        invoice_fields.invoiceImport=true;
        invoice_fields.rate=null;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var raw = JSON.stringify(invoice_fields);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

        try
        {
            const response = await fetch(`${url_}/updateinvoice/${ID}`, requestOptions);
            if(response.status===200){
                const result = await response.text();

                if (saveProductsRef.current && saveProductsRef.current.saveProductItems) {
                    saveProductsRef.current.saveProductItems(result.id,result.invoiceid);
                  }
            }
            if(response.status===404){
                const result = await response.text();
                Swal.fire({title:result})
            }
        }catch(error){
            console.log(error)
        }       

        
    }



    async function amendInvoice(){
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        invoice_fields.amended=true
        var raw = JSON.stringify(invoice_fields);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        try
        {
            const response = await fetch(`${url_}/api/invoice/amended/save`, requestOptions);
            if(response.status===200){
                const result = await response.text()
                changeAmendedStatus();
                if (saveProductsRef.current && saveProductsRef.current.saveProductItems) {
                    saveProductsRef.current.saveProductItems(result.id,result.invoiceid);
                  }
            }
        }catch(error){
            console.log(error)
        }
        

        
    }


    async function changeAmendedStatus(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var raw = JSON.stringify({...originalInvoice ,amended: true});

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

        try
        {
            const response = await fetch(`${url_}/updateinvoice/${ID}`, requestOptions);
            if(response.status===200){
                const result = await response.json();
                swal.fire(result).then(() => {
                    window.location.reload();
                });
            }
        }catch(error){
            Swal.fire(error)
        }
    }


    

    function updateTotals(data){
        
        setinvoice_fields({
            ...invoice_fields,
            total_taxiable_value:data.totalTaxableAmt,
            igst_amount:data.totaligstAmt,
            cgst_amount:data.totalcgstAmt,
            sgst_amount:data.totalsgstAmt,
            total_inv_amount:data.totalinvAmt,
            cess_advol_amount:data.totalcessAdvolAmt,
            cess_non_advol_amount:data.totalnoncessAdvolvAmt
        })
    }

    


      useEffect(()=>{
        if(option==="Edit"||option==="Amend"||option==="View"){
            fetchInvoiceDetails()
        }
        FetchIDS()
      },[])


      async function fetchInvoiceDetails(){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${storedToken}`);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            console.log(`${url_}/invoice/byid/${ID}`)
           const response = await fetch(`${url_}/invoice/byid/${ID}`, requestOptions);
           if(response.status===200){
                const result=await response.json();
               
                result.documentdate=result.documentdate===null ? "" :result.documentdate
                result.part_b_Transper_doc_no_date=result.part_b_Transper_doc_no_date===null ? "" :result.part_b_Transper_doc_no_date
                result.transportation_Approxiamte_distance=result.transportation_Approxiamte_distance===null ? "" :result.transportation_Approxiamte_distance

                setinvoice_fields(result);
                
                setoriginalinvoice(result)


                if (saveProductsRef.current && saveProductsRef.current.fetchProductDetails) {
                    saveProductsRef.current.fetchProductDetails({
                        CGST_SGST_Amt:result.cgst_amount+result.sgst_amount,
                        IGST_Amt:result.igst_amount,
                        CESS_Advol_Amt:result.cess_advol_amount,
                        CESS_non_Advol_Amt:result.cess_non_advol_amount,
                        Total_inv_amount:result.total_inv_amount,
                    });
                  }
                  if(result.amended){
                    fetchAmendedInvoiceDetails()
                  }
                
           }
      }



      async function fetchAmendedInvoiceDetails(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

       const response = await fetch(`${url_}/amend/ofinvoice/findById/${amendid}`, requestOptions);
       if(response.status===200){
            const result=await response.json();
            // console.log(result);            
            setamendedinvoice(result)


            if (saveProductsRef.current && saveProductsRef.current.fetchAmendedProductDetails) {
                saveProductsRef.current.fetchAmendedProductDetails({
                    CGST_SGST_Amt:result.cgst_amount+result.sgst_amount,
                    IGST_Amt:result.igst_amount,
                    CESS_Advol_Amt:result.cess_advol_amount,
                    CESS_non_Advol_Amt:result.cess_non_advol_amount,
                    Total_inv_amount:result.total_inv_amount,
                });
              }
            
       }
  }

  function changeDetails(e){
    e.preventDefault()
    if(showamended){
        console.log(originalInvoice)
       
        if (saveProductsRef.current && saveProductsRef.current.changeProductDetails) {
            saveProductsRef.current.changeProductDetails("Original",
            {
                total_taxiable_value:originalInvoice.total_taxiable_value,
                cgst_amount:originalInvoice.cgst_amount,
                sgst_amount:originalInvoice.sgst_amount,
                igst_amount:originalInvoice.igst_amount,
                cess_advol_amount:originalInvoice.cess_advol_amount,
                cess_non_advol_amount:originalInvoice.cess_non_advol_amount,
                total_inv_amount:originalInvoice.total_inv_amount,
            }
            );
            
        }
        setinvoice_fields(originalInvoice)
    }
    else{

        if (saveProductsRef.current && saveProductsRef.current.changeProductDetails) {
            saveProductsRef.current.changeProductDetails("Amended",
            {
                total_taxiable_value:amendedInvoice.total_taxiable_value,
                cgst_amount:amendedInvoice.cgst_amount,
                sgst_amount:amendedInvoice.sgst_amount,
                igst_amount:amendedInvoice.igst_amount,
                cess_advol_amount:amendedInvoice.cess_advol_amount,
                cess_non_advol_amount:amendedInvoice.cess_non_advol_amount,
                total_inv_amount:amendedInvoice.total_inv_amount,
            }
            );
            
        }
        setinvoice_fields(amendedInvoice)

    }
    setshowamended(!showamended)
  }

      const [showamended,setshowamended]=useState(false)

    return(
        <>
        <div className={`${style.maincontainer}`}>
            <div className={`${style.row} ${style.pagetitle} flex-column`}>
                <h4 className="text-center">{option} Invoice </h4>
                <span>Invoice No :<input name="invoiceid" className="fit-content-input" onChange={handleChange} onBlur={handleBlur} value={invoice_fields.invoiceid} disabled={option==="Amend"||option==="Edit"||option==="View"}/></span>
                 
            </div>
            <div className={`${style.row}`}>
            {invoice_fields.amended&&<button type="button" className="btn btn-info" onClick={changeDetails} >Show {showamended?"Original":"Amended"} Copy</button>}
            </div>

{/* ================        TRANSACTION DETAILS        ================================== */}

        <div className={`${style.row} ${style.transacdetails}`}>
            <div className={`${style.blocktitle}`}>
                <label className={style.lable}>Transaction Details</label>
            </div>  
              
            <div className={`${style.docdetails}`}>
                <div className={`${style.row} ${style.suplydiv}`}>
                    <span className={`col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 d-flex`}>
                        <label className={`${style.suplabel} ${style.mandatory}`}>Supply Type</label>

                        <span className={`${style.radiotype1}`}>
                        {supplyType.map((option, index) => (  
                            
                                
                                <label htmlFor={option.val}>
                                    <input
                                    type="radio"
                                    id={option.val}
                                    name="supplytype"
                                    value={option.val}
                                    checked={invoice_fields.supplytype===option.val}
                                    onChange={handleChange}
                                    
                                    />&nbsp;
                                    {option.option_name}
                                </label>
                                 
                        ))}
                        </span>
                    </span>

                    <span className={`col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 d-flex`}>
                        <label className={`${style.suplabel} w-25`}>Sub Type &nbsp;
                        <i className={`fas fa-question-circle`} style={{"color": "#74C0FC"}}></i>
                        <span className={`${style.mandatory}`}></span>
                        </label>

                        <span className={`${style.radiotype1} w-75`}>
                        {subType.map((option, index) => (
                                <label htmlFor={option.val}>
                                    <input
                                    type="radio"
                                    id={option.val}
                                    name="subtype"
                                    value={option.val}
                                    checked={invoice_fields.subtype=== option.val}
                                    onChange={handleChange}
                                    
                                />&nbsp;
                                    {option.option_name}
                                </label>           
                        ))}
                        </span>                        
                    </span>

                </div>




                <div className={`${style.row}`}>         
                            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex'>
                                <span className="w-50">
                                    <label className={`${style.doclabel} ${style.mandatory}`}>Document Type</label>
                                    <select onChange={handleChange} name="documenttype" value={invoice_fields.documenttype}>
                                        {documenttype.map((data)=>{
                                            return(
                                                <option val={data.val} selected={invoice_fields.documenttype===data.val}>{data.option_nm}</option>
                                            )
                                        })}
                                    </select>
                                </span>
                                
                                <span className="w-50">
                                    <label className={`${style.doclabel} ${style.mandatory}`}>Document No</label>
                                    <input name="documentno" value={invoice_fields.documentno}  onChange={handleChange} disabled={invoice_fields.documenttype==="Tax Invoice"?true:false}/>
                                </span>
                            </div>


                            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex'>
                                <span className="w-50">
                                    <label className={`${style.doclabel} ${style.mandatory}`}>Document Date</label>
                                    <input name="documentdate" value={invoice_fields.documentdate}  onChange={handleChange} type="date" max={new Date().toLocaleDateString()}/>
                                </span>
                                <span className="w-50">
                                    <label className={`${style.doclabel} ${style.mandatory}`}>Transaction Type</label>
                                    <select onChange={handleChange} name="transaction_Type" value={invoice_fields.transaction_Type}>
                                        {transactiontype.map((data)=>{
                                            return(
                                                <option val={data.val}>{data.option_nm}</option>
                                            )
                                        })}
                                    </select>
                                </span>
                            </div>
                            
                </div> 
            </div>
               
        </div>



{/* ================        BILL DETAILS        ================================== */}
            <div className={`${style.row}`}>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    <div className={style.blocktitle}>
                        <label className={style.lable}>Bill From</label>
                    </div>
                    <div className={style.details}>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className={style.label}>Name</td>
                                    <td className={style.inputbox}>
                                        <div className={style.inputinfo}>
                                        <input name="bill_from_Name" value={invoice_fields.bill_from_Name} onChange={handleChange}/>
                                        <span className={style.info}>
                                            <i className="fas fa-question-circle" style={{"color": "#74C0FC"}}></i>
                                            <i className="far fa-times-circle" style={{"color": "#74C0FC"}}></i>
                                        </span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={`${style.label} ${style.mandatory}`}>GSTIN</td>
                                    <td className={`${style.inputbox}`}>
                                        <input name="bill_from_GSTIN" value={invoice_fields.bill_from_GSTIN} disabled/>
                                        <i className="fas fa-question-circle" style={{"color": "#74C0FC"}}></i>
                                    </td>
                                </tr>


                                <tr>
                                    <td className={`${style.label} ${style.mandatory}`}>State</td>
                                    <td className={style.inputbox}>
                                        <select onChange={handleChange} name="bill_from_State" value={invoice_fields.bill_from_State} disabled>
                                            <option val="">---State---</option>
                                            {State_list.map((data)=>{
                                                return(
                                                    <option value={`${data.statecode}-${data.statenm}`}>{data.statenm}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    <div className={style.blocktitle}>
                        <label className={style.lable}>Dispatch From</label>
                    </div>
                    <div className={style.details}>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className={style.label}>Address</td>
                                    <td className={style.inputbox}>
                                        <input name="dispatch_from_Address" value={invoice_fields.dispatch_from_Address}  onChange={handleChange}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={`${style.label}`}>Place</td>
                                    <td className={style.inputbox}>
                                        <input name="dispatch_from_Place" value={invoice_fields.dispatch_from_Place}  onChange={handleChange}/>
                                    </td>
                                </tr>


                                <tr>
                                    <td className={`${style.label} ${style.mandatory}`}>Pin Code</td>
                                    <td className={`${style.inputbox} ${style.pincode}`}>
                                        <>
                                            <input name="dispatch_from_Pincode" value={invoice_fields.dispatch_from_Pincode} onChange={handleChange} onBlur={handleBlur} maxLength={6} className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"/>
                                            <i className="fas fa-question-circle" style={{"color": "#74C0FC"}}></i>
                                        </>
                                        <select onChange={handleChange} name="dispatch_from_State" value={invoice_fields.dispatch_from_State} disabled className={`col-12 col-sm-7 col-md-7 col-lg-7 col-xl-`}>
                                            <option val="">---State---</option>
                                            {State_list.map((data)=>{
                                                return(
                                                    <option value={`${data.statecode}-${data.statenm}`}>{data.statenm}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>

            <div className={`${style.row}`}>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    <div className={style.blocktitle}>
                        <label className={style.lable}>Bill To</label>
                    </div>
                    <div className={style.details}>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className={style.label}>Name</td>
                                    <td className={style.inputbox}>
                                        <div className={style.inputinfo}>
                                        <input name="bill_to_Name" value={invoice_fields.bill_to_Name}  onChange={handleChange}/>
                                        <span className={style.info}>
                                            <i className="fas fa-question-circle" style={{"color": "#74C0FC"}}></i>
                                            <i className="far fa-times-circle" style={{"color": "#74C0FC"}}></i>
                                        </span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={`${style.label} ${style.mandatory}`}>GSTIN</td>
                                    <td className={style.inputbox}>
                                        <input name="bill_to_GSTIN" value={invoice_fields.bill_to_GSTIN}  onChange={handleChange} onBlur={handleBlur}/>
                                        <i className="fas fa-question-circle" style={{"color": "#74C0FC"}}></i>
                                    </td>
                                </tr>


                                <tr>
                                    <td className={`${style.label} ${style.mandatory}`}>State</td>
                                    <td className={style.inputbox}>
                                        <select onChange={handleChange} name="bill_to_State" value={invoice_fields.bill_to_State} disabled>
                                            <option val="">---State---</option>
                                            {State_list.map((data)=>{
                                                return(
                                                    <option value={`${data.statecode}-${data.statenm}`}>{data.statenm}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    <div className={style.blocktitle}>
                        <label className={style.lable}>Ship To</label>
                    </div>
                    <div className={style.details}>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className={style.label}>Address</td>
                                    <td className={style.inputbox}>
                                        <input name="ship_to_Address" value={invoice_fields.ship_to_Address}  onChange={handleChange}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={`${style.label}`}>Place</td>
                                    <td className={style.inputbox}>
                                        <input name="ship_to_Place" value={invoice_fields.ship_to_Place}  onChange={handleChange}/>
                                    </td>
                                </tr>


                                <tr>
                                    <td className={`${style.label} ${style.mandatory}`}>Pin Code</td>
                                    <td className={`${style.inputbox} ${style.pincode}`}>
                                        <>
                                            <input name="ship_to_Pincode" value={invoice_fields.ship_to_Pincode} onChange={handleChange} onBlur={handleBlur} maxLength={6} className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"/>
                                            <i className="fas fa-question-circle" style={{"color": "#74C0FC"}}></i>
                                        
                                            <select onChange={handleChange} name="ship_to_State" value={invoice_fields.ship_to_State} disabled className={`col-12 col-sm-7 col-md-7 col-lg-7 col-xl-`}>
                                                <option val="">---State---</option>
                                                {State_list.map((data)=>{
                                                    return(
                                                        <option value={`${data.statecode}-${data.statenm}`}>{data.statenm}</option>
                                                    )
                                                })}
                                            </select>
                                        </>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

{/* ================        PRODUCT ITEM DETAILS        ================================== */}

            <div className={`${style.row}`}>
                <div className={style.blocktitle}>
                    <label className={style.lable}> Item Details</label>
                </div>
                <div className={style.productdetails}> 
                    <ProductDetails  
                    option={option}
                    invoiceid={invoiceid}
                    deemexport={invoice_fields.deemexport}
                    sez={invoice_fields.sez}
                    myGSTN={invoice_fields.bill_from_GSTIN} 
                    gstin_to={invoice_fields.bill_to_GSTIN} 
                    month={month}
                    year={year}
                    productTotals={updateTotals}
                    saveProducts={saveProductsRef}
                    
                    />


                    <table className={`table table-bordered ${style.itemtable}`}>
                        
                        <tbody>
                            <tr>
                                <th><label className={style.gstmandatory}>Total Tax'ble Amount</label></th>
                                <th><label className={style.gstmandatory}>CGST Amount</label></th>
                                <th><label className={style.gstmandatory}>SGST Amount</label></th>
                                <th><label className={style.gstmandatory}>IGST Amount</label></th>
                                <th><label className={style.gstmandatory}>CESS Advol<br/>Amount</label></th>
                                <th><label className={style.gstmandatory}>CESS non.Advol<br/>Amount</label></th>
                                <th><label>Other Amount(+/-)</label></th>
                                <th><label className={style.gstmandatory}>Tota Inv. Amount</label></th>
                            </tr>
                            <tr>
                                <td><input name="total_taxiable_value" value={invoice_fields.total_taxiable_value}  onChange={handleChange}/></td>
                                <td><input name="cgst_amount" value={invoice_fields.cgst_amount}  onChange={handleChange}/></td>
                                <td><input name="sgst_amount" value={invoice_fields.sgst_amount}  onChange={handleChange}/></td>
                                <td><input name="igst_amount" value={invoice_fields.igst_amount}  onChange={handleChange}/></td>                            
                                <td><input name="cess_advol_amount" value={invoice_fields.cess_advol_amount}  onChange={handleChange}/></td>
                                <td><input name="cess_non_advol_amount" value={invoice_fields.cess_non_advol_amount}  onChange={handleChange}/></td>
                                <td><input name="other_amount" value={invoice_fields.other_amount}  onChange={handleChange}/></td>
                                <td><input name="total_inv_amount" value={invoice_fields.total_inv_amount}  onChange={handleChange}/></td>
                                
                            </tr>
                        </tbody>
                       
                    </table>
                </div>
                
            </div>




{/* ================        TRANSPORT DETAILS     ===================================== */}
            <div className={`${style.row}`}>
                <div className={style.blocktitle}>
                    <label className={style.lable}> Transportation Details</label>
                </div>

                <div className={`${style.row} ${style.transacdetails}`}>
                    <div className={`${style.docdetails}`}>
                    <div className={`${style.row}`}>         
                                <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex'>
                                    <span className="w-50">
                                        <label className={`${style.translabel}`}>Transporter ID</label>
                                        <input name="transportation_transpoter_id" value={invoice_fields.transportation_transpoter_id}  onChange={handleChange}/>
                                        <i className={`fas fa-question-circle`} style={{"color": "#74C0FC"}}></i>
                                    </span>
                                    
                                    <span className="w-50">
                                        <label className={`${style.translabel}`}>Transporter Name</label>
                                        <input name="transportation_transpoter_Name" value={invoice_fields.transportation_transpoter_Name}  onChange={handleChange}/>
                                    </span>
                                </div>


                                <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex'>
                                    <span className="w-50">
                                        <label className={`${style.translabel} w-100`}>Auto calculated PIN to PIN (in km)
                                        <i className={`fas fa-question-circle`} style={{"color": "#74C0FC"}}></i>
                                        </label>
                                        
                                    </span>
                                    <span className="w-50">
                                        <label className={`${style.translabel} ${style.mandatory}`}>Approx. Distance in km</label>
                                        <input name="transportation_Approxiamte_distance" value={invoice_fields.transportation_Approxiamte_distance}  onChange={handleChange}/>
                                        <i className={`fas fa-question-circle`} style={{"color": "#74C0FC"}}></i>
                                    </span>
                                </div>
                                
                    </div> 
                    </div>
                </div>
            </div>


{/* ================        PART-B DETAILS     ===================================== */}

            <div className={`${style.row}`}>
                <div className={style.blocktitle}>
                    <label className={style.lable}> Part-B</label>
                </div>
                <div className={style.parbdetails}>
                    
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>
                                    <span className="w-100 d-flex">
                                        <label className="w-25">Mode</label>
                                        <span className={`w-75 ${style.radiotype1}`}>
                                            {modeType.map((option, index) => (                                                
                                                    <label htmlFor={option.val}>
                                                        <input
                                                            type="radio"
                                                            id={option.val}
                                                            name="part_b_mode"
                                                            value={option.val}
                                                            checked={invoice_fields.part_b_mode===option.val}
                                                            onChange={handleChange}
                                                            
                                                        />&nbsp;
                                                        {option.option_name}
                                                    </label>
                                                    
                                            ))}
                                        </span>
                                    </span>
                                </td>
                                <td>
                                <span className="w-100 d-flex align-items-center">
                                        <label className="w-25">Vehicle Type</label>
                                        <span className={`w-75 ${style.radiotype1}`}>
                                            {vehicleType.map((option, index) => (  
                                                    <label htmlFor={option.val}>
                                                    <input
                                                        type="radio"
                                                        id={option.val}
                                                        name="part_b_vechiletype"
                                                        value={option.val}
                                                        checked={invoice_fields.part_b_vechiletype===option.val}
                                                        onChange={handleChange}
                                                        
                                                    />&nbsp;
                                                    {option.option_name}                                                    
                                                    </label>                                                   
                                            ))}
                                        </span>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="w-100 d-flex align-items-center">
                                        <label className="w-25">Vehicle No</label>
                                        <span className={`w-75 d-flex align-items-center`}>
                                            <input name="part_b_vechileNo" value={invoice_fields.part_b_vechileNo}  onChange={handleChange}/>
                                            <i className={`fas fa-question-circle`} style={{"color": "#74C0FC"}}></i>
                                        </span>                                    
                                    </span>
                                </td>
                                <td >
                                <span className="w-100 d-flex align-items-center">
                                    <label className="w-25">Transporter Doc No & Date</label>
                                    <span className={`w-75 d-flex`}>
                                        <input name="part_b_Transper_doc" value={invoice_fields.part_b_Transper_doc} onChange={handleChange} className="w-50"/>
                                        <div className={`${style.inputcal}`}>
                                            <input type="date" name="part_b_Transper_doc_no_date" onChange={handleChange} value={invoice_fields.part_b_Transper_doc_no_date} />
                                            {/* <span className={style.calender}> */}
                                            {/* <DatePicker
                                                onChange={(handleDateChange)}
                                                ref={transporDateRef}
                                                className={style.hide_datePicker}
                                                showPopperArrow={false}
                                                popperPlacement="bottom-start"
                                                dateFormat="dd-MM-yyyy"
                                            /> */}
                                                {/* <input name="part_b_Transper_doc_no_date" type="date" style={{"display":"none"}} ref={transporDateRef} onChange={handleChange}/> */}
                                                {/* <i className="fa-regular fa-calendar-days" onClick={(e)=>{console.log("clicked");transporDateRef.current.setOpen(true);}}></i> */}
                                            {/* </span> */}
                                        </div>
                                    </span>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>



{/* ==============      BUTTON GROUP    ===================================== */}

            <div className={`${style.row} ${style.buttons}`}>
            <button type="button" className="btn btn-warning">Preview</button>
            {(option!=="View" && !invoice_fields.amended)&&<button type="button" className="btn btn-info" onClick={saveInvoice}>Submit</button>}
            <button type="button" className="btn btn-danger" onClick={(e)=>{Navigate(-1)}}>Exit</button>
            <button type="button" className="btn btn-primary" >E-Way Bill</button>
            </div>
        </div>
        </>
    )
}

export default CreateInvoice;