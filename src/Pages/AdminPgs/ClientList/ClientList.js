import styles from '../TotalClients/TotalClient.module.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';

const ClientList = () => {
  const ccategory = useLocation().state.ClientStateCategory;
  const FDmonth = useLocation().state.ClientStateCategorymonth;
  const [clientdata, setclientdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

const Navigate=useNavigate()
  const totalClient = async () => {

    try {
      console.log(
        `${ccategory === "Pending" ? `${url_}/pendingList/${user_id}/${FDmonth}` :
          ccategory === "IncomeFD" ? `${url_}/IncomeTax_Filed_List/${user_id}/${FDmonth}` :
            ccategory === "IncomeNFD" ? `${url_}/IncomeTax_NotFiled_List/${user_id}/${FDmonth}` :
              ccategory === "GSTR1FD" ? `${url_}/GST_GSTR-1_Filed_List/${user_id}/${FDmonth}` :
                ccategory === "GSTR1NFD" ? `${url_}/GST_GSTR-1_NotFiled_List/${user_id}/${FDmonth}` :
                  ccategory === "GSTR3BFD" ? `${url_}/GST_GSTR-3B_Filed_List/${user_id}/${FDmonth}` :
                    ccategory === "GSTR3BNFD" ? `${url_}/GST_GSTR-3B_NotFiled_List/${user_id}/${FDmonth}` :
                      null}`);



      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'

      };
      await fetch(`
      ${ccategory === "Pending" ? `${url_}/clientInfoByPayment/${user_id}/${FDmonth}` :
          ccategory === "IncomeFD" ? `${url_}/IncomeTax_Filed_List/${user_id}/${FDmonth}` :
            ccategory === "IncomeNFD" ? `${url_}/IncomeTax_NotFiled_List/${user_id}/${FDmonth}` :
              ccategory === "GSTR1FD" ? `${url_}/GST_GSTR-1_Filed_List/${user_id}/${FDmonth}` :
                ccategory === "GSTR1NFD" ? `${url_}/GST_GSTR-1_NotFiled_List/${user_id}/${FDmonth}` :
                  ccategory === "GSTR3BFD" ? `${url_}/GST_GSTR-3B_Filed_List/${user_id}/${FDmonth}` :
                    ccategory === "GSTR3BNFD" ? `${url_}/GST_GSTR-3B_NotFiled_List/${user_id}/${FDmonth}` :
                      null}`
        , requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          setclientdata(result)
        })

        .catch((error) => {
          console.log(error);
        })

    } catch (error) {
      console.warn("Error on function calling...");
    }
  };

  useEffect(() => {
    totalClient();
  }, []);

  const Goto = (cid, cname, cpan, ccategory, cprofession) => {
    Navigate('myfolder', {
      state: {
        clientId: cid,
        clientname: cname,
        clientpan: cpan,
        clientCategory: ccategory,
        clientProfession: cprofession,
      },
    });

  }
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  return (
    <div>
      <div >
        <form>

          <div className="form-row m-4 d-flex align-items-center">
            <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
              &#8617;&nbsp;
            </div>
            <div className="col-9">
              <input
                type="text"
                className={`form-control ${styles.round}`}
                placeholder="Search Client by Name/PAN"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className={styles.search}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>

          </div>
        </form>
      </div>

      <div className={`container m-8 ${styles.container}`}>
        <table className="table">
          <thead >
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Client Name</th>
              <th scope="col">PAN</th>
              <th scope="col">Mobile</th>
              <th scope="col">Mail</th>

            </tr>
          </thead>
          <tbody>
            {clientdata
              .filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.pan.toLowerCase().includes(searchQuery.toLowerCase())
              )

              .map((items, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{items.name}</td>
                  <td onClick={() => Goto(items.clientId, items.name, items.pan, items.category, items.profession)}className='text-primary' style={{ cursor: "pointer" }}>{items.pan}</td>
                  <td>{items.mobile}</td>
                  <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                      <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                      <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                    </svg>
                  </td>

                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientList;
