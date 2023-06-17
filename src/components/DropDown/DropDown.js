import React from 'react';
import styles from './DropDown.module.css'


const DropDown = (props) => {
  // const [selectedOption, setSelectedOption] = useState('');

  // const handleSelectChange = (event) => {
  //   event.preventDefault();
  //   setSelectedOption(event.target.value);
  // };

  // console.log(JSON.stringify(selectedOption));
  // console.log(props.value_array)
  return (
    <>
      <div className={styles.selecttag}>
        <label htmlFor={props.id}>{props.lblname}</label>
        <select id={props.id} value={props.value} onChange={props.onChange} >
          {
            props.value_array.map((data) => {
              return (
                <option value={data?.val}>{data?.option_name}</option>
              )
            })
          }

        </select>

      </div>
      <div>

      </div>
    </>
  );
}

export default DropDown;

