import styles from "./TallyBackup.module.css"
import imgprofile from '../../../Images/profile.png'
import { useNavigate } from "react-router-dom";

function TallyBackup(){


    const username = localStorage.getItem("user_name");
    const userpan = localStorage.getItem("pan");
    const userPro = localStorage.getItem("profession");

    const Navigate=useNavigate();
    function viewTallyBackup(){
Navigate("tallyview");
    }
return(
    <div className='container'>
        <div className="row d-flex flex-column justify-content-center">
<div className={`${styles.profileimg}`}>
            <img src={imgprofile} alt="" className='mt-4 mb-4' />
            <h3>{username}</h3>
            <h5>{userpan}</h5>
            <h6>{userPro}</h6>
          </div>


          <div className={`${styles.myfolder}`}>
            <div className={`${styles.myfolder_btn} mb-4 mt-5`}>
              <span className='font-weight-bold '>My Folders</span>
            </div>

            <div className={`${styles.myfolder_folder}`}>
            <div >
                  <div className={`${styles.folder} text-primary`} style={{ backgroundColor: "rgba(0, 55, 255, 0.1)" }} onClick={viewTallyBackup}>
                    <div className={`${styles.icons}`}>
                      <span className="mt-2">
                        <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
                      </span>
                      <span className="mt-3">
                        <i className="bi bi-three-dots-vertical h4"></i>
                      </span>
                    </div>
                    <h5 className={`ml-2`}>Full Tally Backup</h5>            
                  </div>
            </div></div>
                </div>
                </div></div>
)
}
export default TallyBackup;