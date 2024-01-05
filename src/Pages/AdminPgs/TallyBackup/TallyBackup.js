import styles from "./TallyBackup.module.css";
import imgprofile from "../../../Images/profile.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { url_ } from '../../../Config';


function TallyBackup() {
  const username = localStorage.getItem("user_name");
  const userpan = localStorage.getItem("pan");
  const userPro = localStorage.getItem("profession");
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  const Navigate = useNavigate();
  function viewTallyBackup() {
    Navigate("tallyview");
  }

  const [imgcontent, setImgContent] = useState(null);

  function getProfileImage() {
    try {
      fetch(`${url_}/getpaymentDetails/${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          setImgContent(res.content);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.warn("Error on function calling...");
    }
  }

  useEffect(() => {
    getProfileImage();
  }, []);
  const imageSrc = imgcontent
    ? `data:image/jpeg;base64,${imgcontent}`
    : imgprofile;

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className={`${styles.profileimg}`}>
          <img src={imageSrc} alt="" className="mt-4 mb-4" />
          <h3>{username}</h3>
          <h5>{userpan}</h5>
          <h6>{userPro}</h6>
        </div>

        <div className={`${styles.myfolder}`}>
          <div className={`${styles.myfolder_btn} mb-4 mt-5`}>
            <span className="font-weight-bold ">My Folders</span>
          </div>

          <div className={`${styles.myfolder_folder}`}>
            <div>
              <div
                className={`${styles.folder} text-primary`}
                style={{ backgroundColor: "rgba(0, 55, 255, 0.1)" }}
                onClick={viewTallyBackup}
              >
                <div className={`${styles.icons}`}>
                  <span className="mt-2">
                    <i
                      className={`${styles.folder_icon} bi bi-folder-fill h1`}
                    ></i>
                  </span>
                  <span className="mt-3">
                    <i className="bi bi-three-dots-vertical h4"></i>
                  </span>
                </div>
                <h5 className={`ml-2`}>Full Tally Backup</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TallyBackup;
