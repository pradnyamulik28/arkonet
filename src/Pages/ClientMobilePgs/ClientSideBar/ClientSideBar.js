import style from "./ClientSideBar.module.css";
import profile from "../../../Images/profile.png";
import { Link ,useNavigate} from "react-router-dom";
import { useSidebar } from './SidebarContext';
import { useState , useRef,useEffect} from "react";
import swal from "sweetalert2";
import { url_ } from "../../../Config";

function ClientSideBar(props) {
  const { isOpen, toggleSidebar } = useSidebar();
  const storedToken = window.localStorage.getItem("jwtToken");
  const clientPan=window.localStorage.getItem("pan");
  //console.log(clientPan)
  const [profileImg,setProfileImg]=useState({
    src:null,
    imgUploadButton:"Upload",
  selectedFile:null,
maxSize:100
});
  // const [imgUploadButton,setImgUploadButton]=useState("Upload");
  const fileInputRef = useRef(null);

async function getClientImage(){

  const pan=localStorage.getItem("pan");
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${url_}/getclientimage/${pan}`, requestOptions)
  .then(response => response.json())
  .then(result => {//console.log(result)
    setProfileImg({...profileImg,src:`data:image/png;base64,${result.content}`})
  })
  .catch(error => console.log('error', error));
}

useEffect(() => {
  getClientImage();
}, []);

  
  //const clientName=localStorage.getItem("name");

  const fullClientName = localStorage.getItem("name");
  const clientName= !fullClientName?"":
                    fullClientName.split(" ")[0];

  const navigate =useNavigate();
  function handelLogout(e) {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    toggleSidebar();
    navigate("/client/", { replace: true });
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
formdata.append("pan", `${clientPan}`);
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
    swal.fire({
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
        swal.fire({
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
    
      <div className={isOpen ?`${style.row}`:`${style.closesidebar}`}>
        {/* Background */}

        {/* Mobile Viewport */}
        <div
          className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.mobileport}`}
        >
          {/* Headbar Starts*/}
          <div className={`${style.headerbar}`}>
            <div className={`${style.leftear}`}>
              <div className={style.profileImg}>
              <img className={style.img} src={profileImg.src ?  profileImg.src :profile} alt="" />
              <b onClick={handleProfileUpdate}>{profileImg.imgUploadButton}</b>
              <input
            id="profileImg"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
              </div>
              <div className={`${style.greet}`}>
                <p>Hello</p>
                <h6>{clientName}</h6>
              </div>
            </div>
           
            <div className={`${style.rightear}`}>
              <h4>
                <i className="fa-solid fa-xmark" onClick={toggleSidebar}></i>
              </h4>
            </div>
          </div>
          {/* Headbar Ends ....................................................................................................... */}

          {/* Adress Starts */}
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.Addressport}`}
          >
            <h5>
              <Link to='clientpasscheck/clienthome'  onClick={toggleSidebar}>Home</Link>
            </h5>
            <h5>
              <Link to='clientdashboard'  onClick={toggleSidebar}>Dashboard</Link>
            </h5>
          
            <h5>
              <Link to='caprofile' onClick={toggleSidebar}>My CA</Link>              
            </h5>
            <h5>
              <Link to="investnow" onClick={toggleSidebar}>Invest Now</Link>
            </h5>
            <h5>
              <Link to="help" onClick={toggleSidebar}>Help</Link>
            </h5>
            <h5>
              <Link to="changepass" onClick={toggleSidebar}>Change Password</Link>
            </h5>
          </div>
          {/* Adress Ends......................................................................................................... */}

          {/* Log Starts */}
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ${style.logport}`}
          >
            <h5 onClick={handelLogout}>
              <a href="##">
                <i
                  className="fa-solid fa-power-off"
                  style={{ color: "#ffb405" }}
                  id="logout"
                ></i>
                <label htmlFor="logout">Logout</label>
              </a>
            </h5>
            <p>Version 2.0.1</p>
          </div>
          {/* Log Ends......................................................................................................... */}
        </div>
      </div>
  );
}

export default ClientSideBar;
