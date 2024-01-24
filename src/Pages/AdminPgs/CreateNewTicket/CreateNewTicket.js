import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import QueryOpt from "../../../ObjData/QueryOpt.json";
import swal from "sweetalert2";
import { url_ } from "../../../Config";
import style from "./CreateNewTicket.module.css";

const CreateNewTicket = () => {

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
    // ituserid: localStorage.getItem("user_id_it"),
    // itusername: "",
    // gstuserid: localStorage.getItem("user_id_gst"),
    // gstusername: ""
  });
  // async function getCAInfo() {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", `Bearer ${storedToken}`);

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   //===========Retrive IT User Data==============

  //   if (helpMail.ituserid) {
  //     try {
  //       const IT_res = await fetch(`${url_}/getuserBypan/${window.localStorage.getItem("pan")}/Income_Tax`, requestOptions);
  //       const IT_User = await IT_res.json();
  //       if (IT_res.status === 200) {

  //         setHelpMail({ ...helpMail, itusername: IT_User.userinfo.name })
  //       } else if (IT_res.status === 404) {
  //         console.log("Not registered under IT");

  //         //swal.fire("Failed!", `${IT_User}`, "error");
  //       }
  //     } catch (error) {
  //       swal.fire("Failed!", `${error}`, "error");
  //     }
  //   }



  //   if (helpMail.gstuserid) {
  //     try {
  //       const GST_res = await fetch(`${url_}/getuserBypan/${window.localStorage.getItem("pan")}/Demo`, requestOptions);
  //       const GST_User = await GST_res.json();
  //       if (GST_res.status === 200) {
  //         setHelpMail({ ...helpMail, gstusername: GST_User.userinfo.name })
  //       } else if (GST_res.status === 404) {
  //         console.log("Not registered under GST");

  //         //swal.fire("Failed!", `${IT_User}`, "error");
  //       }
  //     } catch (error) {
  //       swal.fire("Failed!", `${error}`, "error");
  //     }
  //   }
  //   //===========Retrive GST User Data==============


  // }

  // useEffect(() => {
  //   getCAInfo();
  // }, []);



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

      // switch (formdata.query_nature) {
      //   case "GST":
      //     message = message.concat(`Dear, Taxko Team,
      //     `);

      //     break;
      //   default:
      //     message = message.concat(`Dear, ${helpMail.itusername},
      //     `);
      // }

      message = message.concat(`Dear, Taxko Team
Greeting from ${user_name}

I hope this message finds you well. 

${user_name}'s query details are as follows,

${formdata.details}
                    
Best regards,

${user_name},
Contact no : ${user_mobile}`);


      // switch (formdata.query_nature) {
      //   case "GST":
      //     if (helpMail.gstusername !== "" && helpMail.gstuserid !== "") {
      //       console.log(helpMail.gstuserid)
      //       console.log(subject);
      //       console.log(message);
      //       sendEmail("1", helpMail.gstuserid, subject, message);
      //     }
      //     else {
      //       swal.fire("Sorry!", "You are not registered under GST", "error");
      //     }
      //     break;
      //   default:
      //     if (helpMail.itusername !== "" && helpMail.ituserid !== "") {
      //       console.log(helpMail.ituserid)
      //       console.log(subject);
      //       console.log(message);
      //       sendEmail("1", helpMail.ituserid, subject, message);
      //     }
      //     else {
      //       swal.fire("Sorry!", "You are not registered under IT", "error");
      //     }

      // }

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
    //console.log(`${url_}/sendemailclient?clientid=${clientid}&userid=${userid}&subject=${subject}&body=${body}`)
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
        {/* <div className={`col-10 ${style.temp}`}></div> */}

        {/* <div className={` ${style.backlink}`}>
          <a href="##">&lt;&nbsp;Help</a>
        </div> */}

        <div className={` ${style.helptitle}`}>
          <h4 className={``}>HELP</h4>
          <h4 className={`w-100 text-center ${style.h41}`}>CREATE NEW TICKET</h4>
          <h5 className={` mt-4 mb-5`}><b>We are happy to help you</b></h5>
        </div>

        <div className={` ${style.iboxes}`}>
          <label htmlFor="opts1" className={`${style.label1}`}>
            Select the nature of quarry <p className={`${style.p}`}>&#42;</p>
          </label>
          {/* <input  id="opts1" type="text" className={`${style.text1}`} placeholder='Select Option' /> */}

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

export default CreateNewTicket;

