import { Link } from "react-router-dom";
import style from "./ClientHelp.module.css";
import QueryOpt from "../../../ObjData/QueryOpt.json";

function ClientHelp() {


  function getLastFiveYears() {
    const currentYear = new Date().getFullYear();
    const lastFiveYears = [];

    for (let i = 0; i < 5; i++) { // Change 6 to 5 to get the last five years
      lastFiveYears.push(`${currentYear - i-1}-${(currentYear - i).toString().slice(-2)}`);//{currentYear - i-1}-${(currentYear - i).toString().slice(-2)
    }

    return lastFiveYears;
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

          <select className={`${style.ddmenu1}`} id="opts1" required>
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
          <select className={`${style.ddmenu1}`} id="opts2" required>
            <option value="" disabled selected>
              Select The Year
            </option>
            {lastFiveYearsArray.map((financial_year,index)=>
              <option value={financial_year} key={index}>{financial_year}</option>              
            )}          
            <option value="notApplicable">Not Applicable</option>
          </select>
          {/* Use this if dropdown menu */}

          <label htmlFor="text1" className={`${style.label1}`}>
            Details<p className={`${style.p}`}>&#42;</p>
          </label>
          <input type="text" className={`${style.text2}`} placeholder="Max. 1000 Words.."/>
          <p className={`${style.p2}`}>
            <p className={`${style.p}`}>&#42; </p> Compulsaory Field
          </p>
        </div>
        <div className={` ${style.btn}`}>
          <button type="submit" className={` ${style.sbt}`}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientHelp;
