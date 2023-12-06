import Aprofesion_obj from "../../../ObjData/CProf.json";
import States_obj from "../../../ObjData/States.json";

//List of Input Fields
const formfields = [
 
  {
    labelname: "Name",
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Enter your name",
    mandatory: true,
    validationmsg: "Fill the name"
  },
  {
    labelname: "DOB/DOI",
    id: "datebirth",
    name: "datebirth",
    type: "date",
    placeholder: "",
    mandatory: false,
    validationmsg: ""
  },
  {
    labelname: "Profession",
    id: "profession",
    name: "profession",
    type: "dropdown",
    placeholder: "",
    mandatory: true,
    validationmsg: "Select Profession",
    value_array:Aprofesion_obj
  },

  {
    labelname: "Telephone",
    id: "telephone",
    name: "telephone",
    type: "text",
    placeholder: "Enter your Telephone",
    mandatory: false,
    validationmsg: "",
    maxLength:11
  },
  {
    labelname: "Mobile",
    id: "mobile",
    name: "mobile",
    type: "text",
    placeholder: "Enter your Mobile",
    mandatory: true,
    validationmsg: "Enter Valid Mobile Number",
    maxLength:10
  },
  {
    labelname: "Email",
    id: "email",
    name: "email",
    type: "text",
    placeholder: "Enter your Email",
    mandatory: true,
    validationmsg: "Enter Valid Email"
  },
  {
    labelname: " Addresss",
    id: "Address",
    name: "Address",
    type: "text",
    placeholder: "Enter your address",
    mandatory: false,
    validationmsg: ""
  },
  {
    labelname: "Pin Code",
    id: "pin_Code",
    name: "pin_Code",
    type: "text",
    placeholder: "Enter your pin",
    mandatory: true,
    validationmsg: "Enter valid pin",
    maxLength:6
  },
  {
    labelname: "State",
    id: "state",
    name: "state",
    type: "dropdown",
    placeholder: "",
    mandatory: false,
    validationmsg: "",
    value_array:States_obj
  },
  {
    labelname: "InvestNow Email",
    id: "invest_now_email",
    name: "invest_now_email",
    type: "dropdown",
    placeholder: "Enter your investnow email",
    mandatory: false,
    validationmsg: ""
  }
  ,
  {
    labelname: "Residential Status",
    id: "residential_status",
    name: "residential_status",
    type: "dropdown",
    placeholder: "",
    mandatory: false,
    validationmsg: ""
  }


];
export default formfields;
