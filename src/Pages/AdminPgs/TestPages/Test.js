// import React, { useState } from 'react';
// import style from './Test.module.css';

// const Test = () => {
//   const [selectedCountry, setSelectedCountry] = useState('Select your C.A ...');
//   const [searchWord, setSearchWord] = useState('');
//   const [isActive, setIsActive] = useState(false);




//   const options = [
//     { value: "1", name: "A", pin_code: "12345" },
//     { value: "2", name: "B", pin_code: "12345" },
//     { value: "3", name: "C", pin_code: "12345" },
//     { value: "4", name: "D", pin_code: "12345" },
//     { value: "5", name: "E", pin_code: "12345" },
//     { value: "6", name: "F", pin_code: "78901" },
//     { value: "7", name: "G", pin_code: "34567" },
//     { value: "8", name: "H", pin_code: "89012" },
//     { value: "9", name: "I", pin_code: "45678" },
//     { value: "10", name: "J", pin_code: "90123" },
//     { value: "11", name: "K", pin_code: "56789" },
//     { value: "12", name: "L", pin_code: "01234" },
//     { value: "13", name: "M", pin_code: "67890" },
//     { value: "14", name: "N", pin_code: "12345" },
//     { value: "15", name: "O", pin_code: "78901" },
//     { value: "16", name: "P", pin_code: "23456" },
//     { value: "17", name: "Q", pin_code: "89012" },
//     { value: "18", name: "R", pin_code: "34567" },
//     { value: "19", name: "S", pin_code: "90123" },
//     { value: "20", name: "T", pin_code: "45678" },
//     { value: "21", name: "U", pin_code: "01234" },
//     { value: "22", name: "V", pin_code: "56789" },
//     { value: "23", name: "W", pin_code: "12345" },
//     { value: "24", name: "X", pin_code: "67890" },
//     { value: "25", name: "Y", pin_code: "54321" },
//     { value: "26", name: "Z", pin_code: "98765" },
//     { value: "27", name: "AA", pin_code: "23456" },
//     { value: "28", name: "BB", pin_code: "78901" },
//     { value: "29", name: "CC", pin_code: "34567" },
//     { value: "30", name: "DD", pin_code: "89012" },
//     { value: "31", name: "EE", pin_code: "45678" },
//     { value: "32", name: "FF", pin_code: "90123" },
//     { value: "33", name: "GG", pin_code: "56789" },
//     { value: "34", name: "HH", pin_code: "01234" },
//     { value: "35", name: "II", pin_code: "67890" },
//     { value: "36", name: "JJ", pin_code: "12345" },
//     { value: "37", name: "KK", pin_code: "78901" },
//     { value: "38", name: "LL", pin_code: "23456" },
//     { value: "39", name: "MM", pin_code: "89012" },
//     { value: "40", name: "NN", pin_code: "34567" },
//     { value: "41", name: "OO", pin_code: "90123" },
//     { value: "42", name: "PP", pin_code: "45678" },
//     { value: "43", name: "QQ", pin_code: "01234" },
//     { value: "44", name: "RR", pin_code: "56789" },
//     { value: "45", name: "SS", pin_code: "12345" },
//     { value: "46", name: "TT", pin_code: "67890" },
//     { value: "47", name: "UU", pin_code: "54321" },
//     { value: "48", name: "VV", pin_code: "98765" },
//     { value: "49", name: "WW", pin_code: "23456" },
//     { value: "50", name: "XX", pin_code: "12345" }
//   ];

//   // const options = data.map(item => {

//   //   return {
//   //     value: item.registration.regId,
//   //     name: item.registration.name,
//   //     pin_code: item.registration.pin_code
//   //   };
//   // });

//   const addCountry = () => {
//     return options.map((item, index) => {
//       const isSelected = item.value === selectedCountry ? 'selected' : '';
//       return (
//         <li key={item.value} onClick={() => updateName(item.value, item.name)} className={isSelected}>
//           {item.name}
//         </li>
//       );
//     });
//   };




//   const handleInputChange = (e) => {
//     setSearchWord(e.target.value.toLowerCase());
//   };

//   // ...

//   const filterCountries = () => {
//     const filteredOptions = options.filter((item) => item.pin_code.startsWith(searchWord));

//     if (filteredOptions.length === 0) {
//       return (
//         <li key="no-result" className="no-result">
//           No result found
//         </li>
//       );
//     }

//     const matchingResults = filteredOptions.map((item, index) => {
//       const isSelected = item.value === selectedCountry ? 'selected' : '';
//       return (
//         <li key={index} onClick={() => updateName(item)} className={isSelected}>
//           {item.name}
//         </li>
//       );
//     });

//     const remainingResults = options
//       .filter((item) => !filteredOptions.includes(item))
//       .map((item, index) => {
//         const isSelected = item.value === selectedCountry ? 'selected' : '';
//         return (
//           <>
//             <li key={matchingResults.length + index} onClick={() => updateName(item)} className={isSelected}>
//               {item.name}
//             </li>
//             <li key={matchingResults.length + index} onClick={() => updateName(item)} className={isSelected}>
//               {item.name}
//             </li>
//           </>
//         );
//       });

//     return [...matchingResults, ...remainingResults];
//   };



//   const updateName = (regid, name) => {
//     setSearchWord('');
//     setSelectedCountry(name); // Change this line to setSelectedCountry(selectedCountry)
//     setIsActive(false);

//     // Log the selected value and name to the console
//     console.log("Selected Value:", regid);
//     console.log("Selected Name:", name);
//   };

//   // ...


//   return (
//     <div className={`${style.wrapper} ${isActive ? 'active' : ''}`}>
//       <div className={style.select_btn} onClick={() => setIsActive(!isActive)}>
//         <span>{selectedCountry}</span>
//         {isActive ?
//           <i className="uil uil-angle-down"></i>
//           :
//           <i className="uil uil-angle-up"></i>}
//       </div>
//       {isActive && <>
//         <div className={style.content}>
//           <div className={style.search}>
//             <i className="uil uil-search"></i>
//             <input
//               spellCheck="false"
//               type="text"
//               placeholder="Search"
//               value={searchWord}
//               onChange={handleInputChange}
//             />
//           </div>
//           <ul className={style.options}>{searchWord ? filterCountries() : addCountry()}</ul>
//         </div>
//       </>}
//     </div>
//   );
// };

import React, { useRef } from 'react';
import defaultImage from '../../../../src/Images/Taxko.jpg'; // Adjust the path to your default image

const Test = () => {
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    // Simulating a click on the hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected File:', selectedFile);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Select Default Image</button>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Test;




