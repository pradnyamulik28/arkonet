import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import style from "./ClientHelp.module.css";
import QueryOpt from "../../../ObjData/QueryOpt.json";
import swal from "sweetalert2";
import { url_ } from "../../../Config";
function ClientHelp() {

  const storedToken = window.localStorage.getItem("jwtToken");

  const [formdata, setFormdata] = useState({
    query_nature:"",
    financialyear:"",
    details:""
  });
  const wordLimit = 100;


  const [helpMail,setHelpMail]=useState({subject:"",msg:"",ituserid:"",itusername:"",gstuserid:"",gstusername:""});
  async function getCAInfo(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    //===========Retrive IT User Data==============

    try{
      const IT_res=await fetch(`${url_}/getuserBypan/${window.localStorage.getItem("pan")}/Income_Tax`, requestOptions);
     const IT_User = await IT_res.json(); 
     if (IT_res.status === 200) {
      
     setHelpMail({...helpMail,ituserid:IT_User.userinfo.regId,itusername:IT_User.userinfo.name})
    } else if(IT_res.status === 404){
      console.log("Not registered under IT");    
       
      //swal.fire("Failed!", `${IT_User}`, "error");
    }
    }catch (error) {
      swal.fire("Failed!", `${error}`, "error");
    }



     //===========Retrive GST User Data==============

     try{
      const GST_res=await fetch(`${url_}/getuserBypan/${window.localStorage.getItem("pan")}/GST`, requestOptions);
     const GST_User = await GST_res.json(); 
     if (GST_res.status === 200) {      
     setHelpMail({...helpMail,gstuserid:GST_User.userinfo.regId,gstusername:GST_User.userinfo.name})
    } else if(GST_res.status === 404){
      console.log("Not registered under GST");    
       
      //swal.fire("Failed!", `${IT_User}`, "error");
    }
    }catch (error) {
      swal.fire("Failed!", `${error}`, "error");
    }
  }

  useEffect(() => {
    getCAInfo();
  }, []);



  function getLastFiveYears() {
    const currentYear = new Date().getFullYear();
    const lastFiveYears = [];

    for (let i = 0; i < 5; i++) { // Change 6 to 5 to get the last five years
      lastFiveYears.push(`${currentYear - i-1}-${(currentYear - i).toString().slice(-2)}`);//{currentYear - i-1}-${(currentYear - i).toString().slice(-2)
    }

    return lastFiveYears;
  }

  function handleChange(e){
    const { name, value } = e.target;
    //console.log(name,value)
    switch(name){
      case "details":
        const inputText = e.target.value;
        // Split the text into words and filter out empty strings
        const words = inputText.split(' ').filter(word => word.length > 0);
    
        if (words.length <= wordLimit) {
          setFormdata({ ...formdata, [name]: value });
        }
        else{
          
        }  
        break;
      default:
        setFormdata({ ...formdata, [name]: value });

    }
    
  }


  async function handleSubmit(){
    
    if(!formdata.query_nature||!formdata.financialyear||!formdata.details)
    {
      swal.fire("Failed!", "Please fill the mandatory fields!!", "error");
    }
    else
    {
      const subject=`Client query in ${formdata.query_nature}, for the Financial year ${formdata.financialyear}`;


    let message=``;
    
      switch(formdata.query_nature)
      {
        case "GST":
          message=message.concat(`Dear, ${helpMail.gstusername},
          `);
         
          break;
        default:
          message=message.concat(`Dear, ${helpMail.itusername},
          `);
      }
      message=message.concat(`
Greeting from TAXKO!

I hope this message finds you well. 

${localStorage.getItem("name")}'s query details are as follows,

${formdata.details}
                    
Best regards,

${localStorage.getItem("name")},
Contact no : ${localStorage.getItem("mobile")}`);


switch(formdata.query_nature)
{
  case "GST":
    if(helpMail.gstusername!==""&&helpMail.gstuserid!==""){
      console.log("1",helpMail.gstuserid)
      sendEmail("1",helpMail.gstuserid,subject,message);
    }
    else{
      swal.fire("Sorry!", "You are not registered under GST", "error");
    }
    break;
  default:
    console.log("1",helpMail.ituserid)
    sendEmail("1",helpMail.ituserid,subject,message);

}


      
      setFormdata({query_nature:"",
      financialyear:"",
      details:""});
    }    
  }


  async function sendEmail(clientid,userid,subject,body)
  {
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

try{const response=await fetch(`${url_}/sendemailclient?clientid=${clientid}&userid=${userid}&subject=${subject}`, requestOptions)
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
}}catch(error){
  swal.fire("Failed!", `${error}`, "error");
}

  }


  const lastFiveYearsArray = getLastFiveYears();
 

  return (
    <div className={`row ${style.mainrow}`}>
      <div className={` ${style.mainport}`}>
        {/* <div className={`col-10 ${style.temp}`}></div> */}

        <div className={` ${style.backlink}`}>
        <Link
              to="/client/clientpasscheck/clienthome"
              style={{ fontSize: "1rem", margin: "0.5rem", color: "black" }}
            >              
              <i className="fa-solid fa-angle-left"></i> &nbsp;Help
            </Link>
         
        </div>

        <div className={` ${style.helptitle}`}>
          <h3 className={`${style.h41}`}>HELP</h3>
          <p className={`${style.p1}`}>We are happy to help you</p>
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
            {QueryOpt.map((options,index)=><option value={options.val} key={index}>{options.option_name}</option>)}
          </select>

          
          {/* Use this if dropdown menu */}

          <label htmlFor="opts2" className={`${style.label1}`}>
            For Financial Year <p className={`${style.p}`}>&#42;</p>
          </label>
          {/* <input id="opts2" type="text" className={`${style.text1}`} placeholder='2023-24' /> */}
          <select name="financialyear" value={formdata.financialyear} className={`${style.ddmenu1}`} id="opts2" onChange={handleChange} required>
            <option value="" disabled selected>Select The Year</option>
            {lastFiveYearsArray.map((financial_year,index)=>
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

export default ClientHelp;
