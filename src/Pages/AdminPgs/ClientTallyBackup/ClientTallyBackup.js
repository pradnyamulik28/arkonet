import styles from "./ClientTallyBackup.module.css"
import { useNavigate, useLocation } from "react-router-dom";
function ClientTallyBackup(){
    const storedToken = window.localStorage.getItem("jwtToken");
    const client_pan = useLocation().state.ClientPan;
    const client_id = useLocation().state.clientId;


    const Navigate=useNavigate();
    function goToTallyView(uploder){
        Navigate("clienttallyview",{
            state: {
              clientId: client_id,
              ClientPan: client_pan,
              uploder:uploder
            },
          });
    }
    return(<>
        <div className="d-flex flex-column" >
          <div>
          <h4 className='d-flex align-items-center ml-3 mt-5'>
            <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={(e) => {    e.preventDefault();
                          Navigate(-1);
                        }}>
              &#8617;&nbsp;
            </div>
            <b>Client Tally Backup</b>
          </h4>
          </div>
          <div className={styles.row}>
          <div>
          <div className={`${styles.folder} text-danger`} style={{ "background-color": "rgba(255, 0, 0, 0.1)" }} onClick={(e)=>{goToTallyView("user")}}>
            <div className={`${styles.icons}`}>
              <span className="mt-2">
                <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
              </span>
              <span className="mt-3">
                <i className="bi bi-three-dots-vertical h4"></i>
              </span>
            </div>
            <h5 className={`ml-2`}>For Client</h5>
            <div className={`${styles.folder_date} ml-2`}></div>
          </div>
          </div>

        <div>
          <div className={`${styles.folder} text-primary`} style={{ backgroundColor: "rgba(0, 55, 255, 0.1)" }} onClick={(e)=>{goToTallyView("client")}}>
            <div className={`${styles.icons}`}>
              <span className="mt-2">
                <i className={`${styles.folder_icon} bi bi-folder-fill h1`}></i>
              </span>
              <span className="mt-3">
                <i className="bi bi-three-dots-vertical h4"></i>
              </span>
            </div>
            <h5 className={`ml-2`}>From Client</h5>
            <div className={`${styles.folder_date} ml-2`}></div>
          </div>
        </div>

        </div>
        </div>
      </>)
}
export default ClientTallyBackup;