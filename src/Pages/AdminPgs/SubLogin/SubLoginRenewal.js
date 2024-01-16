import React from 'react';
import PaymentGateway from '../../../PaymentGateway'
import { url_ } from '../../../Config';

const SubLoginRenewal = (props) => {

  const U_Name = window.localStorage.getItem('user_name');
  const U_Mobile = window.localStorage.getItem('mobile');
  const U_Email = window.localStorage.getItem('email');
  const U_Pan = window.localStorage.getItem('pan');
  const AmountofRenew = Math.round(props.AmountToPay);
  const SubUserId = props.SubUserId;
  // console.log(SubUserId)

  const storedToken = window.localStorage.getItem('jwtToken');
  const End_Date = window.localStorage.getItem('End_Date');


  const RenewSUbPack = async () => {
    // console.log('Endate', End_Date);
    // console.log('Sub ID:', SubUserId);
    // console.log('AMount', AmountofRenew);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var raw = JSON.stringify({
        "subUserId": SubUserId,
        "endDate": End_Date
      });

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      // const response =
      await fetch(`${url_}/RenewPack`, requestOptions);
      // const result = await response.text();
      // if (response.status === 200) {
      //   Swal.fire("Success.", `${result}`, "success")
      // } else {
      //   Swal.fire("Failed!", `Failed to assign clients!!`, "error")
      // }
      // console.log(result);
    } catch (error) {
      console.log('error', error);
    }

  };

  return (
    <div className='w-100' onClick={RenewSUbPack}>
      <PaymentGateway
        ClientContact={U_Mobile}
        ClientEmail={U_Email}
        ClientName={U_Name}
        ClientPan={U_Pan}
        Amount={Math.round(AmountofRenew)}
        FunctionToExcute={RenewSUbPack}
      >
        {props.children}

      </PaymentGateway>
    </div>
  );
}

export default SubLoginRenewal;
