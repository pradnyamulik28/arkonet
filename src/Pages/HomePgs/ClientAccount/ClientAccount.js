import taxko from "../../../Images/Taxko.jpg"
import style from "./ClientAccount.module.css"
function ClientAccount(){
  function handleSubmit(e){
    e.preventDefault()
  }
    return(
        <div
                className={`${style.yellow}`}
                data-target=".bd-example-modal-lg"
                data-toggle="modal"
              >
                <div className="modal fade bd-example-modal-lg" id="modal_name">
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                      <div
                        className="modal-header justify-content-center"
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div >
                          <h5>WHO IS YOUR TAX PROFESSIONAL?</h5>
                         
  <span aria-hidden="true" style={{"font-size":"2rem", "alignSelf":"end"}}>&times;</span>

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
                              className={`form-control ${style.inputText}`}
                              name="full_name"
                              id="full_name"
                              placeholder="FULL NAME"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">YOUR MONILE NUMBER</label>
                            <input
                              type="text"
                              className={`form-control ${style.inputText}`}
                              name="mobile_no"
                              id="mobile_no"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">YOUR TAX PROFESSIONAL NAME</label>
                            <input
                              type="text"
                              className={`form-control ${style.inputText}`}
                              name="tax_prof_name"
                              id="tax_prof_name"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">
                              YOUR TAX PROFESSIONAL MOBILE NUMBER
                            </label>
                            <input
                              type="text"
                              className={`form-control ${style.inputText}`}
                              name="tax_prof_no"
                              id="tax_prof_no"
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
                <a href="##">CREATE NEW ACCOUNT</a>
              </div>
    )
}

export default ClientAccount;