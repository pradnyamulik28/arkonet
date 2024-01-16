import styles from "./ClientTallyBackup.module.css"
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function ClientTallyBackup(){
    const storedToken = window.localStorage.getItem("jwtToken");
    const client_pan = ""//useLocation().state.ClientPan;
    const client_id = ""//useLocation().state.clientId;


    const Navigate=useNavigate();
    function goToTallyView(uploder){
        Navigate("tallyview",{
            state: {
              clientId: client_id,
              ClientPan: client_pan,
              uploder:uploder
            },
          });
    }
    return(<div className={`${styles.outercontainer}`}>
     <div className={`${styles.header}`} >
<div className={`${styles.leftear}`} >
  <Link className={`${styles.ancher}`}  
  onClick={(e) => {    e.preventDefault();
                          Navigate(-1);
                        }}><h3>
  <i class="fa-solid fa-angle-left"></i></h3></Link>
  </div>
<div className={`${styles.eyes}`} ><h3>Client Tally Backup</h3></div>
<div className={`${styles.rightear}`} ><h3>&nbsp;</h3></div>
</div>
        <div className={`row ${styles.row1}`}>
       <div className="col-6">
          <div className={`${styles.folder} text-danger`} style={{ "background-color": "rgba(255, 0, 0, 0.1)" }} onClick={(e)=>{goToTallyView("user")}}>
            <div className={`${styles.icons}`}>
              <span className="mt-2">
                <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
              </span>
              <span className="mt-3">
                <i className="bi bi-three-dots-vertical h4"></i>
              </span>
            </div>
            <h5 className={`ml-2`}>From Tax Professional</h5>
            <div className={`${styles.folder_date} ml-2`}></div>
          </div>
        </div>

        <div >
          <div className={`${styles.folder} text-primary`} style={{ backgroundColor: "rgba(0, 55, 255, 0.1)" }} onClick={(e)=>{goToTallyView("client")}}>
            <div className={`${styles.icons}`}>
              <span className="mt-2">
                <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
              </span>
              <span className="mt-3">
                <i className="bi bi-three-dots-vertical h4"></i>
              </span>
            </div>
            <h5 className={`ml-2`}>My Backup</h5>
            <div className={`${styles.folder_date} ml-2`}></div>
          </div>
        </div>
        </div>

      </div>)
}
export default ClientTallyBackup;