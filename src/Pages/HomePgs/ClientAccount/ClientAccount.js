import { useState } from "react";
import taxko from "../../../Images/Taxko.jpg"
import style from "./ClientAccount.module.css"
import {url_} from "../../../Config"
import swal from "sweetalert2";
function ClientAccount(){


const [formData,setFormData]=useState({
  clientname:"",
  clientmobileno:"",
  taxprofname:"",
  taxprofmobile:""
})

const [isOpen,setIsOpen]=useState(false);

function handleChange(e)
{
  const { name, value } = e.target;
  setFormData({...formData,[name]:value})

}

function handleModal(){
setIsOpen(!isOpen)

}

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      formData.clientname === "" ||
      formData.clientmobileno === "" ||
      formData.taxprofname === "" ||
      formData.taxprofmobile === ""
    ) {
      swal.fire({
        text:
          formData.clientname === ""
            ? `Please enter your name.`
            : formData.clientmobileno === ""
            ? `Please enter your mobile no.`
            : formData.taxprofname === ""
            ? `Please enter Tax Professional name.`
            : formData.taxprofmobile === "" &&
              `Please enter Tax professional mobile no.`,
      });
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        yourname: formData.clientname,
        yourmobileno: formData.clientmobileno,
        taxprofessionalname: formData.taxprofname,
        taxprofessionalmobile: formData.taxprofmobile,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `${url_}/save/Client_TaxProfessional_data`,
          requestOptions
        );
        const result = await response.text();
        if (response.status === 200) {
          swal.fire({
            icon: "success",
            text: "Thank you for registering with us. We will contact you soon.",
          });
        }
      } catch (error) {
        console.log(error);
      }

      setFormData({
        clientname: "",
        clientmobileno: "",
        taxprofname: "",
        taxprofmobile: "",
      });
    }
  }
    return(
        <div>
                <div className={`modal  bd-example-modal-lg`} id="modal_name">
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                      <div
                        className="modal-header justify-content-center"
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div className={style.title}>
                          <h5>WHO IS YOUR TAX PROFESSIONAL? <span aria-hidden="true" style={{"font-size":"2rem", "alignSelf":"end"}}>&times;</span></h5>
                         
  

                        </div>
                        <div>
                          <p
                            style={{
                              textAlign: "center",
                              fontSize: "1rem",
                              fontWeight: "200",
                            }}
                          >
                            Please tell us about your Tax Professional and we
                            will let hom/her know you are looking for filed tax
                            documents on TAXKO
                          </p>
                        </div>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="form-group">
                            <label htmlFor="">YOUR NAME</label>
                            <input
                              type="text"
                              onChange={handleChange}
                              className={`form-control ${style.inputText}`}
                              name="clientname"
                              id="clientname"
                              value={formData.clientname}
                              autocomplete="off"
                              placeholder="FULL NAME"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">YOUR MONILE NUMBER</label>
                            <input
                              type="text"
                              onChange={handleChange}
                              className={`form-control ${style.inputText}`}
                              value={formData.clientmobileno}
                              name="clientmobileno"
                              id="clientmobileno"
                              autocomplete="off"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">YOUR TAX PROFESSIONAL NAME</label>
                            <input
                              type="text"
                              onChange={handleChange}
                              className={`form-control ${style.inputText}`}
                              name="taxprofname"
                              value={formData.taxprofname}
                              id="taxprofname"
                              autocomplete="off"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">
                              YOUR TAX PROFESSIONAL MOBILE NUMBER
                            </label>
                            <input
                              type="text"
                              onChange={handleChange}
                              className={`form-control ${style.inputText}`}
                              name="taxprofmobile"
                              value={formData.taxprofmobile}
                              id="taxprofmobile"
                              autocomplete="off"
                              maxLength={10}
                            />
                          </div>
                        </form>
                      </div>

                      {/* Modal Footer Starts 🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶*/}
                      <div
                        className="modal-footer"
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <button
                          className={`${style.btn} btn-warning`}
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                        <img
                          src={taxko}
                          className={`${style.modalimg}`}
                          alt=""
                        />
                      </div>
                      {/* Modal Footer Ends 🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶*/}
                    </div>
                  </div>
                </div>
                
              </div>
    )
}

export default ClientAccount;