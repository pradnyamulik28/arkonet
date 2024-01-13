import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { url_ } from "../../../Config";
import state_list from "../../../ObjData/States.json";
import style from "./BulkImport.module.css";

const BulkImport = ({fileInputRef}) => {
  const user_id = window.localStorage.getItem("user_id");
  const storedToken = window.localStorage.getItem("jwtToken");
  const [failedRecords, setFailedRecords] = useState([]);
  

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.name.endsWith('.xlsx')) {
        const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const jsonData = parseExcel(workbook);
          saveAsJSON(jsonData);
        } catch (error) {
          console.error("Error parsing Excel file:", error);
        }
      };

      reader.readAsBinaryString(file);
        
      } else {
        e.target.value = null;
        Swal.fire(
          'Invalid File Type!',
          "Please select a valid file type (XLSX).",
          "error"
        );
        
        
      }
      
    }
  };

  const parseExcel = (workbook) => {
    const result = {};
    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      result[sheetName] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    });
    return result;
  };

  const saveAsJSON = async (jsonData) => {
    Swal.fire({
      title: "Confirm.!",
      text: `Start bulk import ?
      It might take some time.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, start.!",
    }).then((result) => {
      if (result.isConfirmed) {
        const jsonString = JSON.stringify(jsonData, null, 2);

        const Income_Tax = jsonData.Income_Tax;
        const GST = jsonData.GST;

        const FilterIT = Income_Tax.filter((item) => {
          return (
            item.pan !== "" &&
            item.name !== "" &&
            item.profession !== "" &&
            item.mobile !== "" &&
            item.email !== "" &&
            item.state !== ""
          );
        });
        const FilterGST = GST.filter((item) => {
          return (
            item.pan !== "" &&
            item.name !== "" &&
            item.profession !== "" &&
            item.mobile !== "" &&
            item.email !== "" &&
            item.state !== ""
          );
        });



        const FailedIT = Income_Tax.filter((item) => {
          return (
            !item.pan  ||
            !item.name  ||
            !item.profession  ||
            !item.mobile  ||
            !item.email  ||
            !item.state 
          );
        });
        const FailedGST = GST.filter((item) => {
          return (
            !item.pan  ||
            !item.name  ||
            !item.profession  ||
            !item.mobile  ||
            !item.email  ||
            !item.state 
          );
        });
        FailedIT.map((item) => {          
          item.error= "Blank Mandatory field";
        });
        FailedGST.map((item) => {          
          item.error= "Blank Mandatory field";
        });
        // console.log(FailedIT,FailedGST)


        FilterIT.map((item) => {
          item.dob = formatDate(item.dob);
          item.userid = user_id;
          item.category = "Income_Tax";
          item.residential_status = "";
          item.state=formatStates(item.state)
        });
        FilterGST.map((item) => {
          item.dob = formatDate(item.dob);
          item.userid = user_id;
          item.category = "GST";
          item.residential_status = "";
          item.state=formatStates(item.state)
        });

        const Both=FilterIT.filter(item => FilterGST.map(item => item.pan).includes(item.pan))
        Both.map((item) => {
          item.category = "Both";
        });

        const ITFiltered=FilterIT.filter(item => !FilterGST.map(item => item.pan).includes(item.pan))
        const GSTFiltered=FilterGST.filter(item => !FilterIT.map(item => item.pan).includes(item.pan))

        const combinedRecord=[...Both,...ITFiltered,...GSTFiltered]

        // console.log(combinedRecord)


        handleRegistration(combinedRecord,FailedIT,FailedGST)
      }
    });
  };

  const handleConvertToExcel = (jsonData) => {
    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FailedRecords");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "TAXKOFailedRecords.xlsx");
  };

  function formatStates(statenm) {
    const stateparts = statenm.toLowerCase().split(" ");

    const statename = state_list.filter((item) => {
      const valpart = item.val.toLowerCase().split(" ");
      const optionpart = item.option_name.toLowerCase().split(" ");
      if (
        stateparts.some((state) => valpart.includes(state)) ||
        stateparts.some((state) => optionpart.includes(state))
      ) {
        return true;
      } else return false;
    });
    return statename[0].val;
  }

  const handleRegistration = async (data,FailedIT,FailedGST) => {
    // console.log(data)
    Swal.fire({
      icon: "warning",
      iconColor: "red",
      title: "Do not refresh the page",
      text: "Please wait bulk import in progress...",
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const registrationPromises = data.map(async (client) => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(client),
          redirect: "follow",
        };
        const response = await fetch(`${url_}/createclient`, requestOptions);
        if (!response.ok) {
        const result = await response.text();

          throw new Error(
            `${
              result.includes("Already Exists")
                ? "Record already exists."
                : 
                result.includes("email is already registered")?
                'Email is already registered.'
                :result
            }`
          );
        }

        return response.text();
      } catch (error) {
        return { error: error.message, client };
      }
    });

    try {
      const results = await Promise.all(registrationPromises);
      // console.log(results)
      const failedRecords = results
        .filter((result) => result.hasOwnProperty("error"))
        .map((result) => result);

      const failedRecords1 = failedRecords.map((item) => ({
        ...item.client,
        error: item.error,
      }));

      const allFailedRecords=[...FailedIT,...FailedGST,...failedRecords1].map(({ userid, category, ...rest }) => rest)


      if (allFailedRecords.length > 0) {
        Swal.close()
        Swal.fire({
          title: "Failed Registration Records",
          showCloseButton: true,
          html: generateTableHTML(allFailedRecords),
          customClass: style.swal_wide,
          confirmButtonText: "Generate Excel file",
          showCancelButton: true,
          
        }).then((result) => {
          if (result.isConfirmed) {
            handleConvertToExcel(allFailedRecords);
          }
          window.location.reload()
        });
      }
      else{
        Swal.close();
        await Swal.fire({
          position: 'center',
          icon: 'success',
          text:"Record import completed.!",
          showConfirmButton: false,
          timer: 5000
        })
        window.location.reload()
      }
    } catch (error) {
      // Handle errors for the entire Promise.all block
      console.error("Error registering users:", error);
    }
  };

  const generateTableHTML = (failedRecords) => {
    return `
    <div class="table-responsive" style="height: 400px; overflow: auto"> 
      <table class="table">
        <thead>
          <tr class="table-active">
            <th>Client name</th>
            <th>PAN</th>           
            <th>Error</th>           
          </tr>
        </thead>
        <tbody>
          ${failedRecords
            .map(
              (record, index) => `
            <tr key=${index}>
              <td style={{"textAlign":"left"}}>${record.name}</td>
              <td>${record.pan}</td>
              <td className=${style.single_line}>${record.error}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      </div>
    `;
  };

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
  


  return (
    <div style={{"display":"none"}}>
      <input type="file" onChange={handleFileUpload} ref={fileInputRef}/>
    </div>
  );
};

export default BulkImport;
