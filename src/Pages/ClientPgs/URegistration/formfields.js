
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
    validationmsg: "Select Profession"
  },
  {
    labelname: "PAN",
    id: "pan",
    name: "pan",
    type: "text",
    placeholder: "Enter your PAN",
    mandatory: true,
    validationmsg: "Enter Valid PAN"
  },
  {
    labelname: "Telephone",
    id: "telephone",
    name: "telephone",
    type: "text",
    placeholder: "Enter your Telephone",
    mandatory: false,
    validationmsg: ""
  },
  {
    labelname: "Mobile",
    id: "mobile",
    name: "mobile",
    type: "text",
    placeholder: "Enter your Mobile",
    mandatory: true,
    validationmsg: "Enter Valid Mobile Number"
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
    mandatory: false,
    validationmsg: ""
  },
  {
    labelname: "State",
    id: "state",
    name: "state",
    type: "dropdown",
    placeholder: "",
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
