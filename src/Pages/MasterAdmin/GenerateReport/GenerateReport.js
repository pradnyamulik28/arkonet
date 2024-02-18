import * as XLSX from "xlsx";
import { url_ } from "../../../Config";
import React from "react";

function GenerateReport({ reportGenRef}) {
  const storedToken = window.localStorage.getItem("jwtToken");

   // Forward the ref to a component instance or a DOM element
   React.useImperativeHandle(reportGenRef, () => ({
    fetchRecord,
  }));


  const getLastRow = (worksheet) => {
    // Get the range of the worksheet
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    const lastRowNumber = range.e.r;
    return lastRowNumber;
    // Extract the last row information
    // const lastRow = [];
    // for (let col = range.s.c; col <= range.e.c; col++) {
    //   const cellAddress = { r: range.e.r, c: col };
    //   const cellValue = worksheet[XLSX.utils.encode_cell(cellAddress)];
    //   lastRow.push(cellValue ? cellValue.v : undefined);
    // }

    // return lastRow;
  };

  const generateReport = (jsonData,salmanagerpan) => {
    const workbook = XLSX.utils.book_new();
    let lastRow = 0;
    let sm_ca_list, sm_dm_ca_list;
    let target_list, incentive_record,payment_record;
    const boldStyle = { font: { bold: true } };
    // ===================      SALE MANAGER DETAILS        ===========================================

    const saleColnm = [
      "Id",
      "Name",
      "Date of Birth",
      "Profession",
      "PAN",
      "Telephone",
      "Mobile",
      "Email",
      "Address",
      "Pin code",
      "State",
      "WhatsApp Link",
      "Status",
      "Registration Date",
    ];
    const saleobject=removeKeysFromObject(['password','id'],jsonData.sales_manager)

    const SaleMgmDetailsheet = XLSX.utils.aoa_to_sheet(
      [["Sale Manager Details"]],
      { origin: { r: 1, c: 4 } }
    );
    const salemgmarr = [
      saleColnm,
      Object.values(saleobject),
    ];
    XLSX.utils.sheet_add_aoa(SaleMgmDetailsheet, salemgmarr, {
      origin: { r: 3, c: 2 },
    });

    XLSX.utils.book_append_sheet(
      workbook,
      SaleMgmDetailsheet,
      "SaleManger_Details"
    );

    // ===================      CA DETAILS        ===========================================

    const CAsheet = XLSX.utils.aoa_to_sheet([["All CA list"]], {
      origin: { r: 1, c: 4 },
    });
    const ca_colNames = [
        "Registration Id",
        "Name",
        "Date of Birth",
        "Membership No",
        "Profession",
        "PAN",
        "Telephone",
        "Mobile",
        "Email",
        "Office Address",
        "Pin code",
        "state",
        "WhatsApp Link",
      ];
    if (jsonData.salesman_manager_ca.length > 0) {
        const smcaobject=removeKeysFromObject(['password','otp','refrenceId','disrefrenceId','salespersonId','dissalespersonId'],jsonData.salesman_manager_ca[0])
      
        const sm_ca_colNames=Object.keys(smcaobject);
      
      sm_ca_list = [
        ["Sale Manager CA List"],
        ca_colNames,
        ...jsonData.salesman_manager_ca.map((obj) =>
        sm_ca_colNames.map((key) => obj[key])
        ),
      ];
      XLSX.utils.sheet_add_aoa(CAsheet, sm_ca_list, { origin: { r: 3, c: 2 } });
    }

    if (jsonData.salesman_manager_distributor_ca.length > 0) {
        const smdcaobject=removeKeysFromObject(['password','otp','refrenceId','disrefrenceId','salespersonId','dissalespersonId'],jsonData.salesman_manager_distributor_ca[0])
        // console.log(smdcaobject)
      
      const smdm_ca_colNames=Object.keys(smdcaobject);
      
      sm_dm_ca_list = [
        ["Distributor CA List"],
        ca_colNames,
        ...jsonData.salesman_manager_distributor_ca.map((obj) =>
        smdm_ca_colNames.map((key) => obj[key])
        ),
      ];
      XLSX.utils.sheet_add_aoa(CAsheet, sm_dm_ca_list, {
        origin: { r: getLastRow(CAsheet) + 6, c: 2 },
      });
    }

    XLSX.utils.book_append_sheet(workbook, CAsheet, "CA_List");

    // ===================      DISTRIBUTOR DETAILS        ===========================================
    const distriobject=removeKeysFromObject(['password','salesmanid','salesmanagerpan'],jsonData.distributor[0])
    const distri_colNames=Object.keys(distriobject);
    const distColnm=["Id", "Name", "Date of Birth", "Profession", "PAN",
    "Telephone", "Mobile", "Email", "Address", "Pin code", "State", "WhatsApp Link",
    "Status", "Nominee name", "Nomiee mobile", "Registration Date",]
    const distributorarr = [
      distColnm,
      ...jsonData.distributor.map((obj) =>
      distri_colNames.map((key) => obj[key])),
    ];
    const DistributorListsheet = XLSX.utils.aoa_to_sheet(
      [["Distributor Details"]],
      { origin: { r: 1, c: 4 } }
    );
    XLSX.utils.sheet_add_aoa(DistributorListsheet, distributorarr, {
      origin: { r: 3, c: 2 },
    });
    XLSX.utils.book_append_sheet(
      workbook,
      DistributorListsheet,
      "Distributor_Details"
    );

    // ===================      INCENTIVE DETAILS        ===========================================

    const Incentivesheet = XLSX.utils.aoa_to_sheet(
      [["Target, Incentive and Payment record"]],
      { origin: { r: 1, c: 4 } },
    );
    if (jsonData.saleas_manager_all_target_peryear.length > 0) {
      const targetobj=removeKeysFromObject(['id','salesmanid','pan'],jsonData.saleas_manager_all_target_peryear[0])

      const target_colNames = Object.keys(targetobj);
      target_list = [
        ["Target Record"],
        ["Date","Year","Amount"],
        ...jsonData.saleas_manager_all_target_peryear.map((obj) =>
          target_colNames.map((key) => obj[key])
        ),
      ];
      XLSX.utils.sheet_add_aoa(Incentivesheet, target_list, {
        origin: { r: 7, c: 2 },
      });
    }

    if (jsonData.saleas_manager_all_incentive_records.length > 0) {
      const incentiveObj=removeKeysFromObject(['id','salesmanid','pan','fixdate'],jsonData.saleas_manager_all_incentive_records[0])
      XLSX.utils.sheet_add_aoa(Incentivesheet, [["Start Date",jsonData.saleas_manager_all_incentive_records[0].fixdate]], {
        origin: { r: 3, c: 2 },
      });

      const incentive_colNames = Object.keys(incentiveObj);
      incentive_record = [
        ["Incentive Record"],
        ["Year","Target Amount","Qarter Start","Qarter End","Incentive Amount","Quaerter"],
        ...jsonData.saleas_manager_all_incentive_records.map((obj) =>
          incentive_colNames.map((key) => obj[key])
        ),
      ];
      XLSX.utils.sheet_add_aoa(Incentivesheet, incentive_record, {
        origin: { r: getLastRow(Incentivesheet) + 6, c: 2 },
      });
    }

    if (jsonData.saleas_manager_total_paid_total_entry.length > 0) {
      const paymentobj=removeKeysFromObject(['id','pan'],jsonData.saleas_manager_total_paid_total_entry[0])
      const payment_colNames = Object.keys(paymentobj);
      payment_record = [
        ["Payment Record"],
        ["Amount","Payment Date"],
        ...jsonData.saleas_manager_total_paid_total_entry.map((obj) =>
          payment_colNames.map((key) => obj[key])
        )
        
      ];
      XLSX.utils.sheet_add_aoa(Incentivesheet, payment_record, {
        origin: { r: getLastRow(Incentivesheet) + 6, c: 2 },
      });
      XLSX.utils.sheet_add_aoa(Incentivesheet, [["Total Payment",jsonData.saleas_manager_total_paid.totalpaid]], {
        origin: { r: getLastRow(Incentivesheet) + 2, c: 2 },
      });
    }

    XLSX.utils.book_append_sheet(workbook, Incentivesheet, "Incentive_Details");

    XLSX.writeFile(workbook, `Sale_Manager_Report_${salmanagerpan}.xlsx`);
  };

  const removeKeysFromObject = ( keysToRemove,obj) => {
    const newObj = { ...obj };
    keysToRemove.forEach(key => delete newObj[key]);
    return newObj;
  };

  const fetchRecord = async (pan) => {
    // console.log(pan)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${url_}/all/disactivate/salesmanager/data/${pan}`,
      requestOptions
    );

    if (response.status === 200) {
      const result = await response.json();
    generateReport(result,pan);

    }
    
  };

  return (
    <></>
  );
}
export default GenerateReport;
