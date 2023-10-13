import style from "./ClientSideBar.module.css";
import profile from "../../../Images/profile.png";
import { Link ,useNavigate} from "react-router-dom";
import { useSidebar } from './SidebarContext';
import { useState , useRef} from "react";
import swal from "sweetalert2";

function ClientSideBar(props) {
  const { isOpen, toggleSidebar } = useSidebar();
  const [profileImg,setProfileImg]=useState({
    src:null,
    imgUploadButton:"Upload",
  selectedFile:null,
maxSize:100
});
  // const [imgUploadButton,setImgUploadButton]=useState("Upload");
  const fileInputRef = useRef(null);


  
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
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Photo uploaded sucessfully',
          showConfirmButton: false,
          timer: 1500
        })
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
      console.log(fileSizeInBytes,":",fileSizeInKb+":",fileSizeInMb);
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
        swal.fire(`Please select a valid image file (JPEG or PNG) with a size less than ${profileImg.maxSize} KB.`);
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
