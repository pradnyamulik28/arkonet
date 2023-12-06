
//List of Input Fields
const formfields = [
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
    id: "dob",
    name: "dob",
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
    labelname: " Addresss",
    id: "address",
    name: "address",
    type: "text",
    placeholder: "Enter your address",
    mandatory: false,
    validationmsg: ""
  },
  {
    labelname: "Pin Code",
    id: "pin_code",
    name: "pin_code",
    type: "text",
    placeholder: "Enter your pin",
    mandatory: true,
    validationmsg: "Enter valid pin"
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
