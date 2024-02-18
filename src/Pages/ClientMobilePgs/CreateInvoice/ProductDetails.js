import React, { useEffect, useState } from "react";
import style from "./CreateInvoice.module.css";
import Swal from "sweetalert2";
import { url_ } from "../../../Config";

function ProductDetails(props) {
  const storedToken = window.localStorage.getItem("jwtToken");
    const invoiceid=props.invoiceid;
   useEffect(()=>{ //console.log(invoiceid)
  },[])
    React.useImperativeHandle(props.saveProducts, () => ({
        saveProductItems,fetchProductDetails,fetchAmendedProductDetails,changeProductDetails
      }));

      async function saveProductItems(id,invoiceid){

        switch(props.option)
        {
            case 'Create':
                createProductItems(id,invoiceid)
            break;
            case 'Amend':
                amendProductItems(id)
            break;
            case 'Edit':
                editProductItems(id,invoiceid)
            break;
            default:break;
        }
        
      }


      


      async function createProductItems(id,invoiceid){
        const finalProductList=productlist.map((
            {id,CESS_Advol_Amt,CESS_non_Advol_Amt,CGST_SGST_Amt,IGST_Amt,Total_inv_amount,
            ...item})=>item)
        finalProductList.map(({id,...item})=>item.invoiceid=invoiceid)


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);


        var raw = JSON.stringify(finalProductList);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(`${url_}/create-invoice/product`, requestOptions);
            if (!response.ok) {
                const result = await response.text();
        
                throw new Error(`error`);
                }
                else{
                    Swal.fire("Record save Successfully").then(() => {
                        window.location.reload();
                    });
                    
                }
      }

      async function deleteAddItems() {
        //Only if Editing

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);


// ===========      ADD NEW ITEMS       ======================================

        const addItems = productlist.filter(item1 =>
            !fetchedProductDetails.some(item2 => item2.id === item1.id)
        );
        console.log(addItems)
        var raw = JSON.stringify(addItems);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(`${url_}/create-invoice/product`, requestOptions);
            if (!response.ok) {
                const result = await response.text();        
                throw new Error(`error`,result);
                }


// ============     DELETE ITEMS        ======================================

                const deleteItems = fetchedProductDetails.filter(item1 =>
                    !productlist.some(item2 => item2.id === item1.id)
                  );           
               
            
                const productUpdatPromises = deleteItems.map(
                          async (product) => {
                            try {
                              var myHeaders = new Headers();
                              myHeaders.append("Content-Type", "application/json");
                              myHeaders.append("Authorization", `Bearer ${storedToken}`);
            
                              const requestOptions = {
                                method: "DELETE",
                                headers: myHeaders,
                                redirect: "follow"
                              };
            
                            //   console.log( `${url_}/delete/invoice-products/${product.id}`)
                              const response = await fetch(
                                `${url_}/delete/invoice-products/${product.id}`,
                                requestOptions
                              );
                              if (!response.ok) {
                                const result = await response.text();            
                                throw new Error(`error`,result);
                              }
                              return response.text();
                            } catch (error) {
                              return { error: error.message, product };
                            }
                          }
                        );
            
                        try {
                            const results = await Promise.all(productUpdatPromises);
                            // console.log(results)
                            const failedRecords = results
                              .filter((result) => result.hasOwnProperty("error"))
                              .map((result) => result);
                      
                            const failedRecords1 = failedRecords.map((item) => ({
                              ...item.client,
                              error: item.error,
                            }));             
                      
                            if (failedRecords1.length > 0) {
                             
                              console.log("Failed Records :",failedRecords1)
                            }
                          } catch (error) {
                            
                            console.error("Error registering users:", error);
                          }
      }


      async function editProductItems(id){
        deleteAddItems()


        // ============= EDIT PRODUCT =========================

        
        const matchingItems = productlist.filter(item1 =>
            fetchedProductDetails.some(item2 => item2.id === item1.id)
          );



        
        const finalProductList=matchingItems.map((
            {CESS_Advol_Amt,CESS_non_Advol_Amt,CGST_SGST_Amt,IGST_Amt,Total_inv_amount,
            ...item})=>item)
        finalProductList.map((item)=>item.invoiceid=invoiceid)

            const productUpdatPromises = finalProductList.map(
              async (product) => {
                try {
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  myHeaders.append("Authorization", `Bearer ${storedToken}`);

                  var raw = JSON.stringify(product);

                  var requestOptions = {
                    method: "PUT",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                  };

                //   console.log(`${url_}/update/product/ofinvoice/${product.id}`,raw)
                  const response = await fetch(
                    `${url_}/update/product/ofinvoice/${product.id}`,
                    requestOptions
                  );
                  if (!response.ok) {
                    const result = await response.text();

                    throw new Error(`error`,result);
                  }
                  return response.text();
                } catch (error) {
                  return { error: error.message, product };
                }
              }
            );

            try {
                const results = await Promise.all(productUpdatPromises);
                // console.log(results)
                const failedRecords = results
                  .filter((result) => result.hasOwnProperty("error"))
                  .map((result) => result);
          
                const failedRecords1 = failedRecords.map((item) => ({
                  ...item.client,
                  error: item.error,
                }));       
          
          
                if (failedRecords1.length > 0) {
                 
                  console.log("Failed Records :",failedRecords1)
                }
                else{
                    Swal.fire({title:`Update successful.`}).then(() => {
                            window.location.reload();
                        });
                  
                }
              } catch (error) {
                
                console.error("Error registering users:", error);
              }



      }



      async function amendProductItems(id,invoiceid){
        // Swal.fire(`${id},${invoiceid}`)
        //Add All Details in Amended Table only change amend to true in create invoice table


        const finalProductList=productlist.map((
            {id,CESS_Advol_Amt,CESS_non_Advol_Amt,CGST_SGST_Amt,IGST_Amt,Total_inv_amount,
            ...item})=>item)
        finalProductList.map(({id,...item})=>item.invoiceid=invoiceid)


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);


        var raw = JSON.stringify(finalProductList);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(`${url_}/api/invoice/product/amended/save`, requestOptions);
        if (!response.ok) {
            const result = await response.text();
    
              throw new Error(`error`);
            }
            else{
                Swal.fire("Record amended Successfully");
                window.location.reload();
            }
      }

const [fetchedProductDetails,setfetchedProductDetails]=useState([])


    const myGSTN=props.myGSTN;
    const gstin_to=props.gstin_to;
    const month=props.month;
    const year=props.year;

    const [interstate,setinterstate]=useState(false)
    const deemedexport=props.deemexport
    const sez=props.sez;
    
    useEffect(()=>{
        // console.log("change",deemedexport)
        const updateProduct=[...productlist];
        if(deemedexport||sez)
        {
            updateProduct.map((product)=>{
            product.cgst_sgst_rate="0";
            product.CGST_SGST_Amt="0"
            product.igst_rate="0";
            product.IGST_Amt="0"
            })
        }
        setProductList(updateProduct)   

    },[deemedexport,sez])

    useEffect(()=>{
        const interstate1=myGSTN.slice(0,2)===gstin_to.slice(0,2) ? false:true
        setinterstate(interstate1)

        const updateProduct=[...productlist];
        if(!deemedexport)
        {
            updateProduct.map((product)=>{
                const taxamount=calculategst(product.value,product.cgst_sgst_rate)
                
            // product.cgst_sgst_rate=interstate1?"0":product.cgst_sgst_rate;
            product.CGST_SGST_Amt=interstate1?"0":taxamount.totaltax;
            // product.igst_rate=interstate1?product.igst_rate:"0";
            product.IGST_Amt=interstate1?taxamount.totaltax:"0";
            })
        }
        setProductList(updateProduct)   


    },[gstin_to])

   function deletProduct(itemid){
    setProductList(productlist.filter((item)=>item.id!==itemid))
   }
   function addProduct(e){
    console.log(productlist.length)
    if(props.option==="View"){
      e.preventDefault()
    }
   else{ const addid=(props.option==="Create" || productlist.length<=0)?
              `${productlist.length+1}`:
              `${parseInt(productlist[productlist.length-1].id)+1}`
              
    setProductList([...productlist,
        {
            id:addid,	
            invoiceid:invoiceid,	
            productname:"",	
            description:"",	
            hsn:"",	
            quantity:"",	
            unit:"",	
            value:"0",	
            cgst_sgst_rate:"0",	
            igst_rate:"0",	
            cess_Advol_rate:"0",	
            cess_non_Advol_rate:"0",
            bill_from_GSTIN:myGSTN,

            CGST_SGST_Amt:"0",	
            IGST_Amt:"0",	
            CESS_Advol_Amt:"0",	
            CESS_non_Advol_Amt:"0",
            Total_inv_amount:"0",

            invoicemonth:month,
            invoiceyear:year,
        }
    ])}
   }

    const [productlist,setProductList]=useState([       
    ])


    useEffect(()=>{
        if(props.option==='Edit' || props.option==='Amend'||props.option==="View")
        {
            // fetchProductDetails();
            // calculateTotalAmounts()
        }
        else{
            setProductList([
                {
                    id:"1",	
                    invoiceid:invoiceid,	
                    productname:"",	
                    description:"",	
                    hsn:"",	
                    quantity:"",	
                    unit:"",	
                    value:"0",	
                    cgst_sgst_rate:"0",	
                    igst_rate:"0",	
                    cess_Advol_rate:"0",	
                    cess_non_Advol_rate:"0",
                    bill_from_GSTIN:myGSTN,        
        
                    CGST_SGST_Amt:"0",	
                    IGST_Amt:"0",	
                    CESS_Advol_Amt:"0",	
                    CESS_non_Advol_Amt:"0",
                    Total_inv_amount:"0",

                    invoicemonth:month,
                    invoiceyear:year,
                }
            ])
        }
        
    },[])
    

    


    function handleItemInputChange(e){
        const updatedArray=[...productlist];
        const {name,value}=e.target;
        const itemid = name.split("__")[0];
        const inputname = name.split("__")[1];

        const index=productlist.findIndex((item)=>item.id===itemid)
        // console.log(itemid,index,updatedArray)
        
        
        
        switch(inputname){
            case "hsn":
            case "quantity":
            case "value":
            case "cgst_sgst_rate":
            case "igst_rate":
                updatedArray[index] = { ...updatedArray[index], [inputname]: value.replace(/\D/g, "") };
                break;

            case 'delete':
                updatedArray.filter((item)=>item.id!==itemid)
                break;

            default:
                updatedArray[index] = { ...updatedArray[index], [inputname]: value };

        }
        setProductList(updatedArray)

    }


    function calculateTotalAmounts(){
        
        const totalTaxableAmt = productlist.reduce((acc, obj) => parseInt(acc) + parseInt(obj.value), 0);
        const totaligstAmt = productlist.reduce((acc, obj) => parseInt(acc) + parseInt(obj.IGST_Amt), 0);
        const totalcgstAmt = productlist.reduce((acc, obj) => parseInt(acc) + parseInt(obj.CGST_SGST_Amt/2), 0);
        const totalsgstAmt = productlist.reduce((acc, obj) => parseInt(acc) + parseInt(obj.CGST_SGST_Amt/2), 0);
        const totalcessAdvolAmt = productlist.reduce((acc, obj) => parseInt(acc) + parseInt(obj.CESS_Advol_Amt), 0);
        const totalnoncessAdvolvAmt = productlist.reduce((acc, obj) => parseInt(acc) + parseInt(obj.CESS_non_Advol_Amt), 0);

        const totalinvAmt = totalTaxableAmt+totaligstAmt+totalcgstAmt+totalsgstAmt+totalcessAdvolAmt+totalnoncessAdvolvAmt;


        props.productTotals(
            {
                totalTaxableAmt,
                totaligstAmt,
                totalcgstAmt,
                totalsgstAmt,
                totalinvAmt,
                totalcessAdvolAmt,
                totalnoncessAdvolvAmt
            }
        )
    
      }


      function handleItemInputBlur(e){
        const updatedArray=[...productlist];
        const {name,value}=e.target;//console.log(name,value,updatedArray)
        const itemid = name.split("__")[0];
        const inputname = name.split("__")[1];

        const index=productlist.findIndex((item)=>item.id===itemid)
        
        
        
        switch(inputname){
            case "value":
                const gsttaxamount=calculategst(value,updatedArray[index].cgst_sgst_rate)
                const cessadvol=calculateCess(value,updatedArray[index].cess_Advol_rate) 
                const cessnonadvol=calculateCess(value,updatedArray[index].cess_non_Advol_rate) 
                                
                updatedArray[index] = { ...updatedArray[index],
                    IGST_Amt: deemedexport?"0" : interstate?gsttaxamount.totaltax:"0",
                    CGST_SGST_Amt: deemedexport?"0" : !interstate?gsttaxamount.totaltax:"0", 
                    Total_inv_amount: gsttaxamount.inv_amount,

                    CESS_Advol_Amt:cessadvol,
                    CESS_non_Advol_Amt:cessnonadvol
                 };
                break;
                
            case "cgst_sgst_rate":
            
                const taxamount=calculategst(updatedArray[index].value,value)
                                
                updatedArray[index] = { ...updatedArray[index],
                    IGST_Amt: deemedexport?"0" : interstate?taxamount.totaltax:"0",
                    CGST_SGST_Amt: deemedexport?"0" : !interstate?taxamount.totaltax:"0", 
                    Total_inv_amount: taxamount.inv_amount,
                 };
                break;

            case "cess_Advol_rate":
                const cessadvolTaxAmt=inputname==="value" ? calculateCess(value,updatedArray[index].cess_Advol_rate)
                                        :inputname==="cess_Advol_rate" && calculateCess(updatedArray[index].value,value)

                    updatedArray[index] = { 
                        ...updatedArray[index],
                        CESS_Advol_Amt:cessadvolTaxAmt,
                    };

                break;
            case "cess_non_Advol_rate":
                const cessnonadvolTaxAmt=inputname==="value"  ? calculateCess(value,updatedArray[index].cess_non_Advol_rate)
                                            :inputname==="cess_non_Advol_rate" && calculateCess(updatedArray[index].value,value)

                    updatedArray[index] = { 
                        ...updatedArray[index],
                        CESS_non_Advol_Amt:cessnonadvolTaxAmt
                    };

                break;

            default:               

        }
        setProductList(updatedArray)
      }


      function calculateCess(taxableamount,Rate){
        let totaltax= (taxableamount*(Rate/100)).toFixed(2)
        // console.log(totaltax,(totaltax % 1).toFixed(2))
        

        if ((totaltax % 1).toFixed(2) >= 0.50) {
            // Apply upward rounding

            totaltax=Math.ceil(totaltax);
          } else {
            // Apply downward rounding
            totaltax=Math.floor(totaltax);
          }

          return totaltax
      }



      function calculategst(taxableamount,Rate){



        let totaltax= (taxableamount*(Rate/100)).toFixed(2)
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

      useEffect(()=>{
        if(props.option!=="View" ){
          calculateTotalAmounts()
        }
      },[productlist])


      const [originalproductlist,setoriginalproductlist]=useState([])
      const [amendedproductlist,setamendedproductlist]=useState([])

      async function fetchProductDetails(totals){

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${storedToken}`);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
            

            try{const response=await fetch(`${url_}/list/product/ofinvoice/findByBillFromGSTIN?bill_from_GSTIN=${myGSTN}&Invoicemonth=${month}&Invoiceyear=${year}&invoiceid=${invoiceid}`, requestOptions)
            if (response.status === 200) {
              const result = await response.json();
              console.log(result)

              if(result.length>0){
                result.map((item)=>{
                  item.id=item.id.toString();
                  item.value=parseFloat(item.value)
                  item.CGST_SGST_Amt=totals.CGST_SGST_Amt;
                  item.IGST_Amt=totals.IGST_Amt;
                  item.CESS_Advol_Amt=totals.CESS_Advol_Amt;
                  item.CESS_non_Advol_Amt=totals.CESS_non_Advol_Amt;
                  item.Total_inv_amount=totals.Total_inv_amount;
                })

              setProductList(result);
              setoriginalproductlist(result)
              setfetchedProductDetails(result);
              }
              
            }}catch(err){
                console.log(err)
            }
            

        
      }


      async function fetchAmendedProductDetails(totals){

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        

        try{const response=await fetch(`${url_}/list/amend/product/ofinvoice/findByBillFromGSTIN?bill_from_GSTIN=${myGSTN}&Invoicemonth=${month}&Invoiceyear=${year}&invoiceid=${invoiceid}`, requestOptions)
        if (response.status === 200) {
          const result = await response.json();
          console.log(result)

          if(result.length>0){
            result.map((item)=>{
              item.id=item.id.toString();
              item.value=parseFloat(item.value)
              item.CGST_SGST_Amt=totals.CGST_SGST_Amt;
              item.IGST_Amt=totals.IGST_Amt;
              item.CESS_Advol_Amt=totals.CESS_Advol_Amt;
              item.CESS_non_Advol_Amt=totals.CESS_non_Advol_Amt;
              item.Total_inv_amount=totals.Total_inv_amount;
            })
            
            setamendedproductlist(result)
          }
          
        }}catch(err){
            console.log(err)
        }
        

    
    }

    function changeProductDetails(option,totals){
      if(option==="Original"){
          setProductList(originalproductlist)
          
      }
      else if(option==="Amended"){
          setProductList(amendedproductlist)
      }
    
    }

  return (
                <table className={`table table-bordered ${style.itemtable} ${style.products}`}>
                        
                        <tbody>
                            <tr>
                                <th><label>Product Name</label></th>
                                <th><label>Description</label></th>
                                <th><label className={style.mandatory}>HSN</label></th>
                                <th><label>Quantity</label></th>
                                <th><label>Unit</label></th>
                                <th><label className={style.mandatory}>Value/Taxable Value</label></th>
                                <th><label className={style.gstmandatory}>CGST+SGST<br/>Rate(%)</label></th>
                                <th><label className={style.gstmandatory}>CESS Advol<br/>Rate(%)</label></th>
                                <th><label className={style.gstmandatory}>CESS non.Advol<br/>Rate(%)</label></th>
                                <th className={style.addelicon}>
                                    <label><i class="fa-solid fa-square-plus" style={{"color": "#5550A2"}} onClick={addProduct}></i></label>
                                </th> 
                            </tr>
                            {productlist.map((product)=>{
                                return(
                                    <tr>
                                        <td>
                                            <input name={`${product.id}__productname`}  onChange={handleItemInputChange} value={product.productname}/>
                                        </td>

                                        <td>
                                            <input name={`${product.id}__description`}  onChange={handleItemInputChange} value={product.description}/>
                                        </td>

                                        <td>
                                            <input name={`${product.id}__hsn`}  onChange={handleItemInputChange} value={product.hsn} maxLength={8}/>
                                        </td>

                                        <td>
                                            <input name={`${product.id}__quantity`}  onChange={handleItemInputChange} value={product.quantity}/>
                                        </td>

                                        <td>
                                            <input name={`${product.id}__unit`}  onChange={handleItemInputChange} value={product.unit}/>
                                        </td>

                                        <td>
                                            <input name={`${product.id}__value`}  onChange={handleItemInputChange} onBlur={handleItemInputBlur} value={product.value}/>
                                        </td>

                                        <td>
                                            <input name={`${product.id}__cgst_sgst_rate`}  onChange={handleItemInputChange} onBlur={handleItemInputBlur} value={product.cgst_sgst_rate}/>
                                        </td>

                                        <td>
                                            <input name={`${product.id}__cess_Advol_rate`}  onChange={handleItemInputChange} onBlur={handleItemInputBlur} value={product.cess_Advol_rate}/>
                                        </td>

                                        <td>
                                            <input name={`${product.id}__cess_non_Advol_rate`}  onChange={handleItemInputChange} onBlur={handleItemInputBlur} value={product.cess_non_Advol_rate}/>
                                        </td>

                                        <td className={style.addelicon}>
                                            <i className="fa-solid fa-trash-can" style={{"color": "#5550A2"}} name={`${product.id}__delete`} onClick={(e)=>{deletProduct(product.id)}}></i>
                                        </td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>                       
                    </table>
  );
}

export default ProductDetails;
