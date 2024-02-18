const invoice_fields={

    id:"",
    
    invoiceid:"",

	Supplytype:"",	

	Subtype:"",	

	Documenttype:"",	

	Documentno:"",	

	Documentdate:"",	

	Transaction_Type:"",

    Bill_from_Name:"",

	Bill_from_GSTIN:"",		

	Bill_from_State:"",	

	Dispatch_from_Address:"",	

	Dispatch_from_Place:"",	

	Dispatch_from_Pincode:"",	

	Dispatch_from_State:"",

	Bill_to_Name:"",	

	Bill_to_GSTIN:"",	

	Bill_to_State:"",	

	Ship_to_Address:"",	

	Ship_to_Place:"",	

	Ship_to_Pincode:"",	

	Ship_to_State:"",

	Total_taxiable_value:"0",	

	CGST_amount:"0",	

	SGST_amount:"0",	

	IGST_amount:"0",		

	Rate:null,	

	CESS_advol_amount:"0",	

	CESS_non_advol_amount:"0",	

	Other_amount:"0",	

	Total_inv_amount:"0",	

	Transportation_transpoter_id:"",	

	Transportation_transpoter_Name:"",	

	Transportation_Approxiamte_distance:"",	

	Part_b_mode:"",	

	Part_b_vechiletype:"",	

	Part_b_vechileNo:"",	

	Part_b_Transper_doc:"",	

	Part_b_Transper_doc_no_date:"",		

	invoiceImport:false,	

	cancelled:false,	

	amended:false,	

	interstate:false,	

	rcm:false,	

	deemexport:false,	

	sez:false,	

	Credit_note:false,	

	Credit_amount:"",

	issueDate:""
}
export default invoice_fields;



const abc=
	{
		"invoiceid": 1,
	  "supplytype": "Outword",
	  "subtype": "Supply",
	  "documenttype": "Tax_Income",
	  "documentno": "10",
	  "documentdate": "2024-01-31",
	  "bill_from_Name": "enterprise",
	  "bill_from_GSTIN": "GSTIN10542572",
	  "bill_from_State": "Maharashtra",
	  "dispatch_from_Address": "Kolhapur",
	  "dispatch_from_Place": "Kolhapur",
	  "dispatch_from_Pincode": "4162522",
	  "bill_to_Name": "Veer",
	  "bill_to_GSTIN": "GSTIN10542572",
	  "bill_to_State": "Maharashtra",
	  "ship_to_Address": "Kolhapur",
	  "ship_to_Place": "Kolhapur",
	  "ship_to_Pincode": "41625221",
	  "total_taxiable_value": 123.45,
	  "cgst_amount": 12.34,
	  "sgst_amount": 23.45,
	  "igst_amount": 34.56,
	  "rate": 45.67,
	  "cess_advol_amount": 56.78,
	  "cess_non_advol_amount": 67.89,
	  "other_amount": 78.90,
	  "total_inv_amount": 789.01,
	  "transportation_transpoter_id": "1522522",
	  "transportation_transpoter_Name": "Veer1",
	  "transportation_Approxiamte_distance": 150.5,
	  "part_b_mode": "Air",
	  "part_b_vechiletype": "cargo",
	  "part_b_vechileNo": 123456789,
	  "part_b_transper_doc": 987654321,
	  "part_b_Transper_doc_no_date": "2024-01-31",
	  "invoiceImport": true,
	  "cancelled": false,
	  "amended": true,
	  "interstate": false,
	  "rcm": true,
	  "deemexport": false,
	  "sez": true,
	  "credit_note": false,
	  "credit_amount": 456.78,
	  "issueDate": "2024-01-31",
	  "invoiceyear": "2024",
	  "invoicemonth": "01",
	  "dispatch_from_State": "Maharashtra",
	  "ship_to_State": "Maharashtra",
	   "transaction_Type": "regular",
	
	}
	
	



const message = `Dear {name} ,
  Greeting from TAXKO!

  I hope this message finds you well. 
  
  Our valued customer {name} has seamlessly generated an invoice for your GSTIN number using our TAXKO application for the month of November. Take a moment to visit the website link provided below to explore our product. This product could prove beneficial for your needs.
                    
  Best regards,

  TAXKO,
  Website (taxko.in)
  Contact no : +91 9820105056`;