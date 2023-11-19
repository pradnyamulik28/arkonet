import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import QueryOpt from "../../../ObjData/QueryOpt.json";
import swal from "sweetalert2";
import { url_ } from "../../../Config";
import style from "./DistributorHelp.module.css";

const DistributorHelp = () => {

  const user_id = window.localStorage.getItem('user_id');
  const user_name = window.localStorage.getItem('user_name');
  const storedToken = window.localStorage.getItem('jwtToken');
  const user_mobile = window.localStorage.getItem('mobile');


  const [formdata, setFormdata] = useState({
    query_nature: "",
    financialyear: "",
    details: ""
  });


  const wordLimit = 100;


  const [helpMail, setHelpMail] = useState({
    subject: "", msg: "",
    userid: user_id,
    username: user_name
   
  });
  



  function getLastFiveYears() {
    const currentYear = new Date().getFullYear();
    const lastFiveYears = [];

    for (let i = 0; i < 5; i++) { // Change 6 to 5 to get the last five years
      lastFiveYears.push(`${currentYear - i - 1}-${(currentYear - i).toString().slice(-2)}`);//{currentYear - i-1}-${(currentYear - i).toString().slice(-2)
    }

    return lastFiveYears;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    //console.log(name,value)
    switch (name) {
      case "details":
        const inputText = e.target.value;
        // Split the text into words and filter out empty strings
        const words = inputText.split(' ').filter(word => word.length > 0);

        if (words.length <= wordLimit) {
          setFormdata({ ...formdata, [name]: value });
        }
        else {

        }
        break;
      default:
        setFormdata({ ...formdata, [name]: value });

    }

  }


  async function handleSubmit() {

    if (!formdata.query_nature || !formdata.financialyear || !formdata.details) {
      swal.fire("Failed!", "Please fill the mandatory fields!!", "error");
    }
    else {
      const subject = `User's query in ${formdata.query_nature}, for the Financial year ${formdata.financialyear}`;


      let message = ``;


      message = message.concat(`Dear, Taxko Team
Greeting from ${user_name}

I hope this message finds you well. 

${user_name}'s query details are as follows,

${formdata.details}
                    
Best regards,

${user_name},
Contact no : ${user_mobile}`);



      console.log(subject);
      console.log(message);
      sendEmail(subject, message);
      setFormdata({
        query_nature: "",
        financialyear: "",
        details: ""
      });
    }
  }


  async function sendEmail(subject, body) {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    // var raw = body;

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/sendemailuser/help?userid=${user_id}&subject=${subject}`, requestOptions)
      const result = await response.text();
      if (response.status === 200) {

        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Email sent.!',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        swal.fire("Failed!", `${result}`, "error");
      }
    } catch (error) {
      swal.fire("Failed!", `${error}`, "error");
    }

  }


  const lastFiveYearsArray = getLastFiveYears();


  return (
    <div className={`row ${style.mainrow} mt-4`}>
      <div className={` ${style.mainport}`}>
       

        <div className={` ${style.helptitle}`}>
          <h2 className={``}>HELP</h2>
          
          <h5 className={` mt-4 mb-5`}><b>We are happy to help you</b></h5>
        </div>

        <div className={` ${style.iboxes}`}>
          <label htmlFor="opts1" className={`${style.label1}`}>
            Select the nature of quarry <p className={`${style.p}`}>&#42;</p>
          </label>
          

          <select name="query_nature" className={`${style.ddmenu1}`} id="opts1" onChange={handleChange}
            value={formdata.query_nature} required>
            <option value="" disabled selected>
              Select an option
            </option>
            {QueryOpt.map((options, index) => <option value={options.val} key={index}>{options.option_name}</option>)}
          </select>


          {/* Use this if dropdown menu */}

          <label htmlFor="opts2" className={`${style.label1}`}>
            For Financial Year <p className={`${style.p}`}>&#42;</p>
          </label>
          {/* <input id="opts2" type="text" className={`${style.text1}`} placeholder='2023-24' /> */}
          <select name="financialyear" value={formdata.financialyear} className={`${style.ddmenu1}`} id="opts2" onChange={handleChange} required>
            <option value="" disabled selected>Select The Year</option>
            {lastFiveYearsArray.map((financial_year, index) =>
              <option value={financial_year} key={index}>{financial_year}</option>
            )}
            <option value="notApplicable">Not Applicable</option>
          </select>
          {/* Use this if dropdown menu */}

          <label htmlFor="text1" className={`${style.label1}`}>
            Details<p className={`${style.p}`}>&#42;</p>
          </label>
          <textarea name="details" className={`${style.text2}`} value={formdata.details}
            onChange={handleChange} placeholder={`Max. ${wordLimit} Words..`} />

          <div className={`${style.p2}`}>
            <p className={`${style.wordcount}`}>Word Count: {formdata.details.split(' ').filter(word => word.length > 0).length}/{wordLimit}</p>
            <p className={`${style.p}`}>&#42; </p> Compulsaory Field
          </div>
        </div>
        <div className={` ${style.btn}`}>
          <button type="submit" onClick={handleSubmit} className={` ${style.sbt}`}>
            SUBMIT
          </button>
        </div>

      </div>
    </div>

  );
}

export default DistributorHelp;

