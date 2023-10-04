import style from "./ClientSideBar.module.css";
import profile from "../../../Images/profile.png";
import { Link ,useNavigate} from "react-router-dom";
import { useSidebar } from './SidebarContext';

function ClientSideBar(props) {
  const { isOpen, toggleSidebar } = useSidebar();
  
  const clientName=localStorage.getItem("name");

  const navigate =useNavigate();
  function handelLogout(e) {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    toggleSidebar();
    navigate("/client/", { replace: true });
  }

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
              <img className={style.img} src={profile} alt="" />
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
              <Link to='clientdashboard'  onClick={toggleSidebar}>Dashboard</Link>
            </h5>
            <h5>
            My Profile{/* <Link to='##' onClick={toggleSidebar}>My Profile</Link>   */}
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
