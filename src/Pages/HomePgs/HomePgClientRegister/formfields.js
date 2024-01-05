
//List of Input Fields
const formfields = [
  {
    labelname: "PAN",
    id: "pan",
    name: "pan",
    type: "text",
    placeholder: "Enter your PAN (XXXXX-1234-X)",
    mandatory: true,
    validationmsg: "Enter Valid PAN"
  },
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
    labelname: "DOB",
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
    labelname: "Addresss",
    id: "address",
    name: "address",
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
  },
  // {
  //   labelname: "WhatsApp Link",
  //   id: "whatsApp_Link",
  //   name: "whatsApp_Link",
  //   type: "text",
  //   placeholder: "Enter your whatsapp link",
  //   mandatory: false,
  //   validationmsg: ""
  // },
  // {
  //   labelname: "InvestNow Email",
  //   id: "investNow_Email",
  //   name: "investNow_Email",
  //   type: "text",
  //   placeholder: "Enter your investnow email",
  //   mandatory: false,
  //   validationmsg: ""
  // },
  {
    labelname: "Residential Status",
    id: "residential_status",
    name: "residential_status",
    type: "dropdown",
    placeholder: "",
    mandatory: false,
    validationmsg: ""
  },
  {
    labelname: "Password",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    mandatory: true,
    validationmsg: ""
  },
  {
    labelname: "Confirm Password",
    id: "confirmpassword",
    name: "confirmpassword",
    type: "password",
    placeholder: "Re-enter password",
    mandatory: true,
    validationmsg: "Password Mismatch"
  }
];
export default formfields;
