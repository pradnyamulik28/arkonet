
//List of Input Fields
const formfields = [
    {
      labelname: "Name",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      mandatory:true
    },
    {
        labelname: "DOB/DOI",
        id: "datebirth",
        name: "datebirth",
        type: "date",
        placeholder: "",
        mandatory:false
      },
     {
        labelname: "Membership Number",
        id: "membership_No",
        name: "membership_No",
        type: "text",
        placeholder: "Enter your Membership Number",
        mandatory:false
      },
     {
        labelname: "Profession",
        id: "profession",
        name: "profession",
        type: "dropdown",
        placeholder: "",
        mandatory:true
      },
    {
      labelname: "PAN",
      id: "pan",
      name: "pan",
      type: "text",
      placeholder: "Enter your PAN",
      mandatory:true
    },
    {
      labelname: "Telephone",
      id: "telephone",
      name: "telephone",
      type: "text",
      placeholder: "Enter your Telephone",
      mandatory:false
    },
    {
      labelname: "Mobile",
      id: "mobile",
      name: "mobile",
      type: "text",
      placeholder: "Enter your Mobile",
      mandatory:true
    },
    {
      labelname: "Email",
      id: "email",
      name: "email",
      type: "text",
      placeholder: "Enter your Email",
      mandatory:true
    },
    {
      labelname: "Office Addresss",
      id: "office_Address",
      name: "office_Address",
      type: "text",
      placeholder: "Enter your office address",
      mandatory:false
    },
    {
        labelname: "Pin Code",
        id: "pin_Code",
        name: "pin_Code",
        type: "text",
        placeholder: "Enter your pin",
        mandatory:false
      },
     {
        labelname: "State",
        id: "state",
        name: "state",
        type: "dropdown",
        placeholder: "",
        mandatory:false
      },
      {
        labelname: "WhatsApp Link",
        id: "whatsApp_Link",
        name: "whatsApp_Link",
        type: "text",
        placeholder: "Enter your whatsapp link",
        mandatory:false
      },
      {
        labelname: "InvestNow Email",
        id: "investNow_Email",
        name: "investNow_Email",
        type: "text",
        placeholder: "Enter your investnow email",
        mandatory:false
      },
      {
        labelname: "Password",
        id: "password",
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        mandatory:true
      },
      {
        labelname: "Confirm Password",
        id: "confirmpassword",
        name: "confirmpassword",
        type: "password",
        placeholder: "Re-enter password",
        mandatory:true
      }
  ];
  export default formfields;
  