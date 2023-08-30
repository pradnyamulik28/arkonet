import React from "react";
import InputField from "../../../components/InputField/InputField";
import PasswordField from "../../../components/Password/PasswordField";
//import styles from "./Registration.module.css";
import DropDown from "../../../components/DropDown/DropDown";
import Aprofesion_obj from "../../../ObjData/AProf.json";
import States_obj from "../../../ObjData/States.json";

//Render Input Fields depending on their type 

export default class InputType extends React.Component {
  render() {

    //Text and Date Fields
    if (this.props.type === "text" || this.props.type === "date") {
      let maxLength=''
      if(this.props.name==="telephone" )
      {
          maxLength='11'
      }
      else if(this.props.name==="mobile")
      {
        maxLength='10'
      }
      return (
        <InputField
          key={"k" + this.props.id}
          id={this.props.id}
          lblname={this.props.labelname}
          name={this.props.name}
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          manadatory={this.props.mandatory ? "*" :""}
          onChange={this.props.onChange}
          maxLength={maxLength}
        />
      );
    } 
    
    //Password Field
    else if (this.props.type === "password") {
        
      return (
        <PasswordField
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          lblname={this.props.labelname}
          name={this.props.name}
          value={this.props.value}
          manadatory={this.props.mandatory ? "*" :""}
          strenghtScore={this.props.strenghtScore}
        />
      );
    } 
    
    //DropDown Field
    else if (this.props.type === "dropdown") {
        let value_array=[];
        if (this.props.name==="profession") {
            value_array=Aprofesion_obj
            
        } else if(this.props.name==="state"){
            value_array=States_obj
        }
      return (
        <DropDown
        value_array={value_array}
          lblname={this.props.labelname}
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          manadatory={this.props.mandatory ? "*" :""}
        />
      );
    }
  }
}
