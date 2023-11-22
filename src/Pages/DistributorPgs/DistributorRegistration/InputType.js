import React from "react";
import InputField from "../../../components/InputField/InputField";
import PasswordField from "../../../components/Password/PasswordField";
//import styles from "./Registration.module.css";
import DropDown from "../../../components/DropDown/DropDown";
import Aprofesion_obj from "../../../ObjData/distributorProf.json";
import States_obj from "../../../ObjData/States.json";

//Render Input Fields depending on their type 

export default class InputType extends React.Component {
  
  render() {



    //--------Add attributes dynamically
    const properties={
      key:"k" + this.props.id,
            id:this.props.id,
            lblname:this.props.labelname,
            name:this.props.name,
            type:this.props.type,
            placeholder:this.props.placeholder,
            value:this.props.value,
            manadatory:this.props.mandatory ? "*" : "",
            onChange:this.props.onChange,
            validationmsg:this.props.validationmsg,           
    }
   


    switch(this.props.name){
      case "name":
        properties.isNameNull=this.props.isNameNull;
      break;
      
      case "profession":
        properties.value_array = Aprofesion_obj;
        properties.isProfessionNull=this.props.isProfessionNull;
      break;
      
      case "state":
        properties.value_array = States_obj;
        properties.isStateNull=this.props.isStateNull;
      break;
      
      case "email":
        properties.isValidEmail=this.props.isValidEmail;
      break;
      
      case "address":
        properties.isAddressNull=this.props.isAddressNull;
      break;
      
      case "mobile":
        properties.maxLength=10;
        properties.isValidMobile=this.props.isValidMobile;
      break;
      
      case "telephone":
        properties.maxLength = 11;
      break;
      
      case "pan":
        properties.maxLength=10;
        properties.isValidPAN=this.props.isValidPAN;
      break;
      
      case "pin_code":
        properties.maxLength=6;
        properties.isValidPIN=this.props.isValidPIN;
      break;
      
      default:
      
      break;
      
    }    
    

    if(this.props.type==="password")
    {
      properties.strenghtScore=this.props.strenghtScore;
          properties.isPasswordMatch=this.props.isPasswordMatch;
    }

    //Text and Date Fields
    if (this.props.type === "text" || this.props.type === "date") {
      return (
        <InputField
          {...properties}
        />
      );
    }

    //Password Field
    else if (this.props.type === "password") {
      return (
        <PasswordField
          {...properties}
        />
      );
    }     

    //DropDown Field
    else if (this.props.type === "dropdown") {
            return (
        <DropDown
          {...properties}
        />
      );
    }
  }
}
