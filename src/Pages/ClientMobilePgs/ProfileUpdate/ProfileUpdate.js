import { Link, useNavigate } from "react-router-dom";
import style from "./ProfileUpdate.module.css"
import profile from "../../../Images/profile.png";
import { useEffect, useRef, useState } from "react";
import formfields from "./formfields";
import States_obj from "../../../ObjData/States.json";
import Aprofesion_obj from "../../../ObjData/CProf.json";
import residential_status from "../../../ObjData/ResidentialStatus.json";

import Swal from "sweetalert2";
import { url_ } from "../../../Config";


function ProfileUpdate(){
    const navigate=useNavigate();
  const storedToken = window.localStorage.getItem('jwtToken');
  const PAN=localStorage.getItem("pan");
  
 const client_id_it=localStorage.getItem("client_id_it");
 const client_id_gst=localStorage.getItem("client_id_gst");

    const [profileImg, setProfileImg] = useState({
      src: null,
      imgUploadButton: "Upload",
      selectedFile: null,
      maxSize: 100,
    });
  const fileInputRef = useRef(null);


    const [isNameNull, setIsNameNull] = useState(true);
    const [isProfessionNull, setIsProfessionNull] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidMobile, setIsValidMobile] = useState(true);
    const [isValidPIN, setIsValidPIN] = useState(true);
  
    const [mailList,setMailList]=useState(
      [      
        {
          "val":"Other",
          "option_name":"Other"
        }
      
      ]
    )
    const handleChange = (e) => {
      const { name, value } = e.target;  
      
  
      //=============================================================================
      switch (name) {
  
        case "name":
          setFormdata({ ...formdata, [e.target.name]: e.target.value });
          if (!e.target.value) {
            setIsNameNull(false);
          }
          else {
            setIsNameNull(true);
          }
          break;
  
  
        case "profession":
          setFormdata({ ...formdata, [e.target.name]: e.target.value });
          if (!e.target.value) {
            setIsProfessionNull(false);
          }
          else {
            setIsProfessionNull(true);
          }
          break;
  
  
        case "email":
          setFormdata({ ...formdata, [e.target.name]: e.target.value });
          //---Basic Email Validation
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          setIsValidEmail(emailPattern.test(e.target.value));
          break;  
       
  
        case "mobile":
          setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
          e.target.value = value.replace(/\D/g, "");
          // Basic mobile validation
          const mobilePattern = /^[789]\d{9}$/;
          setIsValidMobile(mobilePattern.test(e.target.value));
          break;
  
        case "pin_code":
            setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
            e.target.value = value.replace(/\D/g, "");
            // Basic pin code validation
            const pinPattern = /^[1-9]{1}[0-9]{5}$/;
            setIsValidPIN(pinPattern.test(e.target.value));
            break;
  
        case "telephone":
          setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
          e.target.value = value.replace(/\D/g, "");
          break;
  
  
          case "invest_now_email":
            const index = formfields.findIndex(item => item.name === "invest_now_email");
            if(index !==-1){
            if(formfields[index].type==="dropdown"&&e.target.value==="Other")
            {            
                formfields[index].type="text";
                if(e.target.value==="Other"){
                  setFormdata({ ...formdata, [e.target.name]: "" });
                  e.target.value = "";
                }              
            }
            else if(formfields[index].type==="dropdown" && e.target.value!=="Other"){
              formfields[index].type="dropdown";
              setFormdata({ ...formdata, [e.target.name]: e.target.value });
            }
            else{
              setFormdata({ ...formdata, [e.target.name]: e.target.value });
            }
          }
          

        
            break;
        default:
          setFormdata({ ...formdata, [e.target.name]: e.target.value });
      }
  
  
    };

  const [formdata, setFormdata] = useState({
    address: "",
    email: "",
    mobile: "",
    pan: "",
    pin_code: "",
    profession: "",
    state: "",
    invest_now_email:"",
    telephone: "",
    dob: "",
    name: "",
    residential_status: "",
  });

const [userPan,setUserPan]=useState()
  
  async function getCaInfo() {
   

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };


//===========Retrive Both Data==============

    let isBoth=false;

    try{
      const GST_res=await fetch(`${url_}/getuserBypan/${PAN}/Both`, requestOptions);
     const GST_User = await GST_res.json(); 
     if (GST_res.status === 200) {      
      isBoth=true;
      return GST_User.userinfo.pan    
    } 
    }catch (error) {
      
    }
    //===========Retrive IT User Data==============
if(!isBoth){

  if(client_id_it){
    // console.log("IT",client_id_it)
    try{
      const IT_res=await fetch(`${url_}/getuserBypan/${PAN}/Income_Tax`, requestOptions);
     const IT_User = await IT_res.json(); 
     if (IT_res.status === 200) {
      // console.log(IT_User.userinfo.pan);
      return IT_User.userinfo.pan
     
    } 
    }catch (error) {
     
    }
  }
  


  


  //Retrive GST User Data

  else if(client_id_gst){
    // console.log("gst ",client_id_gst)
    try{
      const GST_res=await fetch(`${url_}/getuserBypan/${PAN}/GST`, requestOptions);
     const GST_User = await GST_res.json(); 
     if (GST_res.status === 200) {
      // console.log(GST_User.userinfo.pan)
      // setUserPan(GST_User.userinfo.pan)
      return GST_User.userinfo.pan
    } 
    }catch (error) {
     
    }
  }
  
}
    
    
    
  }
async function getClientInfo()
{
 const user_pan= await getCaInfo();

  const mailList1=await fetchMailList(user_pan);

  // console.log(mailList1)

  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const response=await fetch(`${url_}/taxreturn/pan?pan=${PAN}`, requestOptions)
if(response.status===200)
{
  const result=await response.json();
  const res=result.users[0]
  const index = formfields.findIndex(
    (item) => item.name === "invest_now_email"
  ); if (index !== -1) {
  if (mailList1.length>0&&mailList1.includes(res.invest_now_email)) {   
      formfields[index].type = "dropdown";    
  }
  else{
    formfields[index].type = "text";    
  }
}


  setMailList(mailList1);
  setFormdata({
    address: res.address,
    email: res.email,
    mobile: res.mobile,
    pan: res.pan,
    pin_code: res.pin_code,
    profession: res.profession,
    state: res.state,
    invest_now_email:res.invest_now_email,
    telephone: res.telephone,
    dob: res.dob,
    name: res.name,     
    residential_status:res.residential_status
  });
}
}
useEffect(()=>{
  
  getClientInfo()
  getClientImage();
  
},[])


  
async function fetchMailList(user_pan){
  // console.log(user_pan)
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${storedToken}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
    // console.log(`${url_}/Invest_now/get_all/by-pan/${user_pan}`)
    const response = await fetch(`${url_}/Invest_now/get_all/by-pan/${user_pan}`, requestOptions);
    if(response.status===200){
      const result = await response.json();
      const updateItems=[...mailList]
    
      // console.log("result",result)
      // const result = await response.json();      
      result.map((item)=>{      
      updateItems.push({
        id: item.id,
        pan: item.pan,
        val: item.investNow_Email,
        option_name: item.investNow_Email,
      });
    })    
    
    return updateItems;
    
  }

  }catch(error){
      console.log(error)
    }
}

const [investnowtype,setInvestNowType]=useState("dropdown")

function viewMailList(e){
  setInvestNowType("dropdown")
  console.log("clicked")
  const index = formfields.findIndex(item => item.name === "invest_now_email");
  if(index !==-1){
  formfields[index].type="dropdown";
  }
  handleChange(e)
              
}

  const handleSubmit = async (event) => {
    event.preventDefault();
console.log(formdata.invest_now_email)



    if (!formdata.name) {
      setIsNameNull(false);
    }

    if (!formdata.profession) {
      setIsProfessionNull(false);
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(formdata.email));

    

    // Mobile Validation
    const mobilePattern = /^[789]\d{9}$/;
    setIsValidMobile(mobilePattern.test(formdata.mobile));

    const pinPattern = /^[1-9]{1}[0-9]{5}$/;
    setIsValidPIN(pinPattern.test(formdata.pin_code));


    // Check Form Fields
    if (
      !formdata.name ||
      !formdata.profession ||
      !isValidMobile ||
      !isValidPIN||
      !isValidEmail
    ) {
      Swal.fire("Failed!", 
      !isValidMobile || !formdata.mobile ? "Invalid Mobile!!"
      : !isValidEmail || !formdata.email ? "Invalid Mail!!"
      : !isValidPIN || !formdata.pin_code ? "Invalid Pin code!!"
      : "Please fill the mandatory fields!!", "error");
      console.log(formdata);
      return;
    } else {
      // console.log(formdata);

      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          `Bearer ${storedToken}`);

        const raw = JSON.stringify({
          name: formdata.name,
          dob: formdata.dob,
          profession: formdata.profession,
          telephone: formdata.telephone,
          mobile: formdata.mobile,
          email: formdata.email,
          address: formdata.address,
          pin_code: formdata.pin_code,
          state: formdata.state,
          residential_status: formdata.residential_status,
          invest_now_email:formdata.invest_now_email
        });
// console.log(raw)
        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(`${url_}/updateByPanClient/${PAN}`, requestOptions);
        const result = await response.text();
        // console.log(result);
        if (response.status === 200) {
          Swal.fire("Success!", `Data Update Successful.`, "success");
          setFormdata({
            address: "",
            email: "",
            mobile: "",
            pan: "",
            pin_code: "",
            profession: "",
            state: "",
            telephone: "",
            dob: "",
            name: "",
            residential_status: "",
            invest_now_email:""
          });
          window.location.reload();
          
        } else {
          Swal.fire("Failed!", `${result}`, "error");
        }
      } catch (error) {
        console.error('error', error);
      }


    }
  };


  async function getClientImage(){

    const pan = localStorage.getItem("pan");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try{const response = await fetch(
      `${url_}/getclientimage/${pan}`,
      requestOptions
    );
    if (response.status === 200) {
      const result = await response.json();
      setProfileImg({
        ...profileImg,
        src: `data:image/png;base64,${result.content}`,
      });
    }}
    catch(error){
      console.log(error)
    }
  }

  
  function handleProfileUpdate(){
    if(profileImg.imgUploadButton==="Upload"){
      fileInputRef.current.click();
      // setProfileImg({...profileImg,imgUploadButton:"Update"});
    }
    else if(profileImg.imgUploadButton==="Update"){
      //==========API To update database================
      if (profileImg.selectedFile) {
        // You can perform file upload logic here, e.g., using FormData or an API call


        //==================================================
        var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var formdata = new FormData();
formdata.append("pan", `${PAN}`);
formdata.append("image", profileImg.selectedFile, profileImg.selectedFile);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${url_}/client/uploadimage`, requestOptions)
.then(response => {
  if(response.status===200)
  {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Photo updated sucessfully`,
      showConfirmButton: false,
      timer: 2000
    })
  }
 return response.text()})
.then(result => console.log(result))
.catch(error => console.log('error', error));
        //=========================================



        
        console.log('Selected File:', profileImg.selectedFile);
      } else {
        alert('Please select a file before submitting.');
      }
      setProfileImg({...profileImg,imgUploadButton:"Upload"});
    }    
  }


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const renamedFile = new File([file], "clientprofile", {
      type: file.type,
    });
    if (file) {
      const fileSizeInBytes = file.size;
    const fileSizeInKb = fileSizeInBytes / 1024;
    const fileSizeInMb = fileSizeInKb / 1024;
      //console.log(fileSizeInBytes,":",fileSizeInKb+":",fileSizeInMb);
      if (fileSizeInKb <= profileImg.maxSize && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')) {
        const reader = new FileReader();

      reader.onload = (e) => {
        // Get the binary data of the uploaded image
        const binaryData = e.target.result;
        setProfileImg({...profileImg,src:binaryData,imgUploadButton:"Update",selectedFile:renamedFile});//setProfileImg({...profileImg,imgUploadButton:"Update"});
      };
      reader.readAsDataURL(file);
       }
       else{
        Swal.fire({
          title: `Select (JPEG or PNG) with a size less than ${profileImg.maxSize} KB.`,
          text: 'Click OK to open a image reducer website in a new tab',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            // Replace 'https://example.com' with the URL you want to open
            window.open("https://www.reduceimages.com/", '_blank');
            fileInputRef.current.value = '';
          }
          else{
            fileInputRef.current.value = '';
          }
        });
       }

      
    }
  };

return (
  <div className={`${style.row1}`}>
    <div className={`${style.allport}`}>
      {/* Headbar Starts*/}
      <div className={`${style.headerbar}`}>
        <div className={`${style.leftear}`}>
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate("/client/clientpasscheck/clienthome");
            }}
            style={{ fontSize: "2rem", margin: "0.5rem", color: "black" }}
          >
            <i
              className="fa-solid fa-angle-left"
              style={{ fontSize: "1.5rem", color: "grey" }}
            ></i>

          </Link>
        <h4 className={`${style.h31}`}>Update Information</h4>

        </div>
      </div>
      {/* Headbar Ends ....................................................................................................... */}

      {/* ABD Starts*/}
      <div className={`${style.abd}`}>
      </div>
      {/* ABD Ends ....................................................................................................... */}

      {/* workport Starts*/}
      <div className={`${style.workport}`}>
      <div className={`${style.profileport}`}>
            <div className={`${style.card}`}>
              <img
                src={profileImg.src ?  profileImg.src :profile}
                alt="profile_picture"
                className={`${style.img1}`}
              />

              <div className={`${style.cardbody}`}>   
        <b onClick={handleProfileUpdate}>{profileImg.imgUploadButton}</b>
              <input
            id="profileImg"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
        <p className={`${style.p1}`}>{PAN}</p>
    </div>
            </div>
          </div>
          {formfields.map((formfield)=>{
            return(
              <div className={`${style.input}`}>          
          <div className={`${style.label}`}>
            <label htmlFor={formfield.name} className={formfield.mandatory?`${style.ltxt} ${style.mandatory}`:`${style.ltxt}`}>
              {formfield.labelname} 
            </label> 
          </div>
          <div className={`${style.txtbox}`}>
           {formfield.type==="dropdown"?          
           
              
              <select id={formfield.id} value={formdata[formfield.name]} onChange={handleChange} name={formfield.name} className={`${style.ipc} ${style.select}`} >
            <option value="" >-- Select --</option>
            {              
              formfield.name==="state"&&States_obj.map((data) => {
              return (<option value={data.val}>{data.option_name}</option>)
              })              
            }
             {              
              formfield.name==="profession"&&Aprofesion_obj.map((data) => {
              return (<option value={data.val}>{data.option_name}</option>)
              })              
            }
            {              
              formfield.name==="residential_status"&&residential_status.map((data) => {
              return (<option value={data.val}>{data.option_name}</option>)
              })              
            }
             {              
              formfield.name==="invest_now_email"&&mailList.map((data) => {
              return (<option value={data.val}>{data.option_name}</option>)
              })              
            }

      </select>
      
      
           : <input
              type={formfield.type}
              className={`${style.ipc}`}
              id={formfield.id}
              name={formfield.name}
              value={formdata[formfield.name]}
              onChange={handleChange}
              autoComplete="off"
              maxLength={formfield.maxLength}
            />
            
            
            }
            {
        formfield.name==="invest_now_email"&&<p onClick={viewMailList} className={style.ltxt} >View Mail List</p>
      }
          </div>
        </div>
            )
          })}
       

        
      </div>
      {/* workport Ends ....................................................................................................... */}
    </div>
    <div className={`${style.button}`}>
      <button
        type="submit"
        className={`${style.btnsbt}`}
        onClick={handleSubmit}
      >
        Update
      </button>
    </div>
  </div>
);
}
export default ProfileUpdate;