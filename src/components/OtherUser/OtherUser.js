import React, { useState } from 'react';
import style from './OtherUser.module.css';
import { url_ } from '../../Config';
import ClientAccount from '../../Pages/HomePgs/ClientAccount/ClientAccount';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const OtherUser = (props) => {




  const navigate = useNavigate();
  const storedToken = window.localStorage.getItem('jwtToken');
  const ClientPAN = window.localStorage.getItem('pan');
  const ClientUser = window.localStorage.getItem('userid');

  const UserData = props.USERSDATA;
  // const UserData = [];


  const [selectedCountry, setSelectedCountry] = useState('Select your C.A ...');
  const [searchWord, setSearchWord] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');




  // const options = [
  //   { value: "1", name: "A", pin_code: "12345" },
  //   { value: "2", name: "B", pin_code: "12345" },
  //   { value: "3", name: "C", pin_code: "12345" },
  //   { value: "4", name: "D", pin_code: "12345" },
  //   { value: "5", name: "E", pin_code: "12345" },
  //   { value: "6", name: "F", pin_code: "78901" },
  //   { value: "7", name: "G", pin_code: "34567" },
  //   { value: "8", name: "H", pin_code: "89012" },
  //   { value: "9", name: "I", pin_code: "45678" },
  //   { value: "10", name: "J", pin_code: "90123" },
  //   { value: "11", name: "K", pin_code: "56789" },
  //   { value: "12", name: "L", pin_code: "01234" },
  //   { value: "13", name: "M", pin_code: "67890" },
  //   { value: "14", name: "N", pin_code: "12345" },
  //   { value: "15", name: "O", pin_code: "78901" },
  //   { value: "16", name: "P", pin_code: "23456" },
  //   { value: "17", name: "Q", pin_code: "89012" },
  //   { value: "18", name: "R", pin_code: "34567" },
  //   { value: "19", name: "S", pin_code: "90123" },
  //   { value: "20", name: "T", pin_code: "45678" },
  //   { value: "21", name: "U", pin_code: "01234" },
  //   { value: "22", name: "V", pin_code: "56789" },
  //   { value: "23", name: "W", pin_code: "12345" },
  //   { value: "24", name: "X", pin_code: "67890" },
  //   { value: "25", name: "Y", pin_code: "54321" },
  //   { value: "26", name: "Z", pin_code: "98765" },
  //   { value: "27", name: "AA", pin_code: "23456" },
  //   { value: "28", name: "BB", pin_code: "78901" },
  //   { value: "29", name: "CC", pin_code: "34567" },
  //   { value: "30", name: "DD", pin_code: "89012" },
  //   { value: "31", name: "EE", pin_code: "45678" },
  //   { value: "32", name: "FF", pin_code: "90123" },
  //   { value: "33", name: "GG", pin_code: "56789" },
  //   { value: "34", name: "HH", pin_code: "01234" },
  //   { value: "35", name: "II", pin_code: "67890" },
  //   { value: "36", name: "JJ", pin_code: "12345" },
  //   { value: "37", name: "KK", pin_code: "78901" },
  //   { value: "38", name: "LL", pin_code: "23456" },
  //   { value: "39", name: "MM", pin_code: "89012" },
  //   { value: "40", name: "NN", pin_code: "34567" },
  //   { value: "41", name: "OO", pin_code: "90123" },
  //   { value: "42", name: "PP", pin_code: "45678" },
  //   { value: "43", name: "QQ", pin_code: "01234" },
  //   { value: "44", name: "RR", pin_code: "56789" },
  //   { value: "45", name: "SS", pin_code: "12345" },
  //   { value: "46", name: "TT", pin_code: "67890" },
  //   { value: "47", name: "UU", pin_code: "54321" },
  //   { value: "48", name: "VV", pin_code: "98765" },
  //   { value: "49", name: "WW", pin_code: "23456" },
  //   { value: "50", name: "XX", pin_code: "12345" }
  // ];

  const options = UserData.map(item => {

    return {
      value: item.registration.regId,
      name: item.registration.name,
      pin_code: item.registration.pin_code
    };
  });

  const addCountry = () => {
    return options.map((item, index) => {
      const isSelected = item.value === selectedCountry ? 'selected' : '';
      return (
        <li key={item.value} onClick={() => updateName(item.value, item.name)} className={isSelected}>
          {item.name}
        </li>
      );
    });
  };




  const handleInputChange = (e) => {
    setSearchWord(e.target.value.toLowerCase());
  };

  // ...

  const filterCountries = () => {
    const filteredOptions = options.filter((item) => item.pin_code.startsWith(searchWord));

    if (filteredOptions.length === 0) {
      return (
        <li key="no-result" className="no-result">
          No result found
        </li>
      );
    }

    const matchingResults = filteredOptions.map((item, index) => {
      const isSelected = item.value === selectedCountry ? 'selected' : '';
      return (
        <li key={index} onClick={() => updateName(item.value, item.name)} className={isSelected} style={{ backgroundColor: "#ffd401c2" }}>
          {item.name}
        </li>
      );
    });

    const remainingResults = options
      .filter((item) => !filteredOptions.includes(item))
      .map((item, index) => {
        const isSelected = item.value === selectedCountry ? 'selected' : '';
        return (
          <>
            <li key={matchingResults.length + index} onClick={() => updateName(item.value, item.name)} className={isSelected}>
              {item.name}
            </li>

          </>
        );
      });

    return [...matchingResults, ...remainingResults];
  };



  const updateName = (regid, name) => {
    setSearchWord('');
    setSelectedValue(regid)
    setSelectedCountry(name); // Change this line to setSelectedCountry(selectedCountry)
    setIsActive(false);

    // Log the selected value and name to the console
    console.log("Selected Value:", regid);
    console.log("Selected Name:", name);
  };



  const UpdateUser = async () => {
    if (ClientUser !== "null") {
      Swal.fire("Failed!", "You have already submitted CA. Please wait till CA approves you.", "error")

    } else {
      console.log(selectedValue)

      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var raw = JSON.stringify({
          "userid": selectedValue
        });

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        const response = await fetch(`${url_}/updateUserInTemp/${ClientPAN}`, requestOptions);
        if (response.status === 200) {
          await Swal.fire("Success.", "CA updated successfully.", 'success')

          navigate("/client/", { replace: true });
          window.location.reload()
        } else {
          Swal.fire("Failed!!.", "Failed to update CA.", "error")

        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  }



  return (
    <>
      <span className="col-6" data-toggle="modal" data-target="#exampleModalCenter">
        {props.children}
      </span>

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Select Tax Professional</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <>
                <div className={`${style.wrapper} ${isActive ? 'active' : ''}`}>
                  <div className={style.select_btn} onClick={() => setIsActive(!isActive)}>
                    <span>{selectedCountry}</span>
                    {isActive ?
                      <i className="uil uil-angle-down"></i>
                      :
                      <i className="uil uil-angle-up"></i>}
                  </div>
                  {isActive && <>
                    <div className={style.content}>
                      <div className={style.search}>
                        <i className="uil uil-search"></i>
                        <input
                          spellCheck="false"
                          type="text"
                          placeholder="Search"
                          value={searchWord}
                          onChange={handleInputChange}
                        />
                      </div>
                      <ul className={style.options}>
                        {searchWord ? filterCountries() : addCountry()}
                        <li style={{ backgroundColor: "#e8e8e8" }} >
                          Not in the list, click <small className='ml-2 btn btn-warning text-white d-flex justify-content-center align-items-center' style={{
                            width: "3rem",
                            height: "2rem"
                          }}><b>ADD</b></small>
                        </li>
                      </ul>
                    </div>
                  </>}
                </div>
              </>

              <div className='d-flex justify-content-center align-items-center'>
                <h6>Not in the list, click here </h6>
                <div className='mr-2 ml-2'>
                  <i class="bi bi-caret-right-fill"></i>
                  <i class="bi bi-caret-right-fill"></i>
                </div>
                <>
                  <ClientAccount>
                    <div className="input-group-append">
                      <button className="btn btn-warning text-white" type="button"><b>ADD</b></button>
                    </div>
                  </ClientAccount>
                </>


              </div>
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
              <button type="button" className="btn btn-warning"><b className='text-white' onClick={UpdateUser}>SUBMIT</b></button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default OtherUser;
