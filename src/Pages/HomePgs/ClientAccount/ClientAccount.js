import { useRef, useState } from "react";
import taxko from "../../../Images/Taxko.jpg";
import style from "./ClientAccount.module.css";
import { url_ } from "../../../Config";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
function ClientAccount() {
  const closemodal = useRef();
  const storedToken = localStorage.getItem("jwtToken");
  const [isValidMobile,setIsValidMobile]=useState(true)
  const [formData, setFormData] = useState({
    clientname: "",
    clientmobileno: "",
    taxprofname: "",
    taxprofmobile: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;


    switch(name){
      case "clientmobileno":
      case "taxprofmobile":
        setFormData({ ...formData, [name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        const mobilePattern = /^[789]\d{9}$/;
        setIsValidMobile(mobilePattern.test(e.target.value));
        break;
      default:
        setFormData({ ...formData, [name]: value });
        break;    
  }
}

  async function handleSubmit(e) {
    
    e.preventDefault();

    if (
      formData.clientname === "" ||
      formData.clientmobileno === "" ||
      formData.taxprofname === "" ||
      formData.taxprofmobile === ""||
      !/^[789]\d{9}$/.test(formData.clientmobileno)||   //Check mobile validity
      !/^[789]\d{9}$/.test(formData.taxprofmobile) //Check mobile validity
    ) {
      swal.fire({
        text:
          formData.clientname === ""
            ? `Please enter your name.`
            : (formData.clientmobileno === "" || !(/^[789]\d{9}$/.test(formData.clientmobileno)))
            ? `Please enter valid mobile no.`
            : formData.taxprofname === ""
            ? `Please enter Tax Professional name.`
            : (formData.taxprofmobile === "" ||!(/^[789]\d{9}$/.test(formData.taxprofmobile)))&&
              `Please enter valid Tax professional mobile no.`
            // :!(formData.clientmobileno.test(e.target.value))&&`Please check mobile no entered`,
      });
    } else {





      const subject = `Client Registration : `;

        const message = `Dear Support Team,
  Greeting from TAXKO!

  I hope this message finds you well. 
  
  ${formData.clientname}(Contact No :${formData.clientmobileno}) has expressed interest in TAXKO. ${formData.clientname} has also shared the details of their tax consultant, as follows:
- Name:${formData.taxprofname}
- Contact Number:${formData.taxprofmobile}

  We place our confidence in your expertise and kindly request your assistance in reaching out to the aforementioned references to gather more information.

                    
  Best regards,

  ${formData.clientname},
  Contact no : ${formData.clientmobileno}`;

  const formattedMsg=message;//message.replace(/\n/g, '<br>')

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        yourname: formData.clientname,
        yourmobileno: formData.clientmobileno,
        taxprofessionalname: formData.taxprofname,
        taxprofessionalmobile: formData.taxprofmobile,
        text: formattedMsg
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      // console.log(subject);
      // console.log(message)

      try {
        const response = await fetch(
          `${url_}/save/Client_TaxProfessional_data?subject=${subject}&text=${formattedMsg}`,
          requestOptions
        );
        const result = await response.text();
        if (response.status === 200) {
          swal.close();
          swal.fire({
            icon: "success",
            text: "Thank you for registering with us. We will contact you soon.",
          });
        }
      } catch (error) {
        console.log(error);
      }
clearForm()
      closemodal.current.click();
    }
  }
  function clearForm() {
    setFormData({
      clientname: "",
      clientmobileno: "",
      taxprofname: "",
      taxprofmobile: "",
    });
  }
  return (
    <div>
      <div
        className={`${style.yellow}`}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <Link>CREATE NEW ACCOUNT</Link>
      </div>

      <div
        class="modal fade "
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title " id="exampleModalLabel">
                <b>WHO IS YOUR TAX PROFESSIONAL</b>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={closemodal}
                onClick={clearForm}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-header">
              <p
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  fontWeight: "200",
                }}
              >
                Please tell us about your Tax Professional and we will let
                hom/her know you are looking for filed tax documents on TAXKO
              </p>
            </div>

            <div class="modal-body">
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
                    maxLength={10}
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
                  <label htmlFor="">YOUR TAX PROFESSIONAL MOBILE NUMBER</label>
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
            <div class={`modal-footer ${style.modal_footer}`}>
              {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
              <button
                type="button"
                class={`btn btn-warning ${style.btn}`}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <img src={taxko} className={`${style.modalimg}`} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    /*    <div>
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
                    
                    </div>
                  </div>
                </div>
                
              </div>
              */
  );
}

export default ClientAccount;
