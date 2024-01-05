
import React from 'react';
import styles from './ClientDocFolder.module.css';
import { Link } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom'
import { useSidebar } from '../ClientSideBar/SidebarContext';
import { useState,useEffect } from 'react';
import ClientFileBackup from '../ClientFileBackup/ClientFileBackup';



const ClientDocFolder = () => {
  const  id  = localStorage.getItem("client_id_it");//useLocation().state.clientid; //Get Client Id parameter from route
  const navigate = useNavigate();

  const { toggleSidebar } = useSidebar();
  const currentYear = new Date().getFullYear();
  

  function getLastFiveYears() {
    let currentYear = new Date().getFullYear();
    const currentMonth=new Date().getMonth();

    //if Month is Jan,Feb or March 
    if(currentMonth<3){    
      currentYear=currentYear-1
    }
    const lastFiveYears = [];

    for (let i = 0; i < 5; i++) { // Change 6 to 5 to get the last five years
      lastFiveYears.push(currentYear - i);
    }

    return lastFiveYears;
  }

  const lastFiveYearsArray = getLastFiveYears();

  const getFolderColor = (index) => {
    const colors = ['text-primary', 'text-danger', 'text-warning', 'text-success', 'text-secondary', 'text-info'];
    return colors[index % colors.length];
  };

 
  const [isBackupFile,setBackupFile]=useState(false);
      
  function showBackupFile(){
  
      const todayDate = new Date();
      const currentDate = new Date(todayDate.getFullYear(),todayDate.getMonth(),todayDate.getDate()); 
      const targetDate = new Date(todayDate.getFullYear(), 2, 31);//Set Date to March 31
    // console.log("Target date",targetDate)
      const dayDifference =(targetDate.getTime() - currentDate.getTime())/ (1000 * 3600 * 24);
     
      // Check if it's 15 days or more before March 31st
      if (dayDifference < 15 && dayDifference >0) {
          setBackupFile(true);
        }  
        else{
          setBackupFile(false);
        }
      }
    
      useEffect(()=>{
        showBackupFile();
      },[isBackupFile])
  
  

  return (
    
    <div className={`${styles.outercontainer}`}>
    <div className={`container mt-3 ${styles.maincontainer}`}>
      <div className="row" >
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " id={styles.maindiv}>
          <div className={`${styles.headerbar}`}>
          <h1 className={styles.h1}><b onClick={(e) => {
                            e.preventDefault();
                            navigate(-1, {
                              state: { clientid: id},
                            });
                          }}  >                        
                         &#8617;&nbsp;Income Tax
                         </b> </h1>
                         <h4 onClick={toggleSidebar}>
                <i className="fa-solid fa-ellipsis"></i>
              </h4>
              </div>
          <div className="row">
            {lastFiveYearsArray.map((year, index) => (
              <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                <Link to={`clientfileview`}  
                className={`${styles.linktab}`} 
                state={{clientid:id,year:`${year - 1}-${year.toString().slice(-2)}`,AY:`${year}-${(year+1).toString().slice(-2)}`}}> {/* Pass the year to SendData */}
                  <div className={`${styles.card} ${styles[`card${index + 1}`]}`} id={styles.card1}>
                    <div className={styles.icon}>
                      <p className={styles.icons}>
                        <i className={`bi bi-folder-fill ${getFolderColor(index)}`} id={styles.icon_left}></i>
                        <i className={`fa-solid fa-ellipsis-vertical ${getFolderColor(index)}`} id={styles.icon_right}></i>
                      </p>
                    </div>
                    <div className={`${getFolderColor(index)} ${styles.cont} h6`}>
                      <h5>A.Y {year}-{(year+1).toString().slice(-2)}</h5>
                      <p>Financial Year {year - 1}-{year.toString().slice(-2)}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {/* {isBackupFile&&<div className='col-6'>
<ClientFileBackup title={`Backup ${currentYear-5}-${(currentYear-4).toString().slice(2)} files`} category="IT"/>
</div>} */}

{isBackupFile&&<div className='col-6'>
<ClientFileBackup title={`Backup ${currentYear-4}-${(currentYear-3).toString().slice(2)} files`} category="IT"/>
</div>}
          </div>
        </div>
      </div>
     </div>
    </div>    
  );
}

export default ClientDocFolder;
