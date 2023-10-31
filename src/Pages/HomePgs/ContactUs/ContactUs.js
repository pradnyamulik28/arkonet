import { useEffect,useState } from "react";
import style from "./ContactUs.module.css";

function ContactUs() {



    const [formdata, setFormdata] = useState({
        firstName: "",
        LastName: "",
        email:"",
        contactNo:"",
        Message: ""
      });


    // useEffect(() => {
    //     const initMap = () => {
    //       const myOptions = {
    //         zoom: 14,
    //         center: new window.google.maps.LatLng(19.075314480255834, 72.88153973865361),
    //         mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    //       };
    //       const map = new window.google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
    //       const marker = new window.google.maps.Marker({
    //         map: map,
    //         position: new window.google.maps.LatLng(19.075314480255834, 72.88153973865361),
    //       });
    //       const infowindow = new window.google.maps.InfoWindow({
    //         content: "<strong>My Location</strong><br>Mumbai<br>",
    //       });
    //       window.google.maps.event.addListener(marker, "click", function () {
    //         infowindow.open(map, marker);
    //       });
    //       infowindow.open(map, marker);
    //     };
    
    //     // Load the Google Maps script
    //     const script = document.createElement("script");
    //     script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    //     script.async = true;
    //     script.defer = true;
    //     document.head.appendChild(script);
    
    //     script.onload = initMap;
    
    //     // Cleanup when the component unmounts
    //     return () => {
    //       document.head.removeChild(script);
    //     };
    //   }, []);


      function handleChange(e){
        const { name, value } = e.target;
        setFormdata({ ...formdata, [name]: value });
          }


      function handleContactUsQuery(e){
        e.preventDefault();
        console.log(formdata);
        setFormdata({
            firstName: "",
        LastName: "",
        email:"",
        contactNo:"",
        Message: ""
        })
      }

  return (
    <div className={`${style.container}`}>
      <div className={`${style.innerwrap}`}>
        <section className={`${style.section1} ${style.clearfix}}`}>
          <div className={`${style.textcenter}`}>
            <span className={`${style.shtext} ${style.heading}`}>Contact Us</span>
            <span className={`${style.seperator}`}></span>
            {/* <h1>Drop Us a Mail</h1> */}
          </div>
        </section>

        <section className={`${style.section2} ${style.clearfix}}`}>
          <div className={`${style.col2} ${style.column1} ${style.first}}`}>
            {/* <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script> */}
            <div
              className={`${style.sec2map}`}
              style={{ overflow: "hidden", height: "550px", width: "100%" }}
            >
                
              <div
                id="gmap_canvas"
                style={{ height: "100%", width: "100%" }}
              >

<iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4544.579964450332!2d74.23297943894102!3d16.70083637274872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1019213886153%3A0xab33886478d32ae1!2sRETINUE%20ASSOCIATES!5e0!3m2!1sen!2sin!4v1698471233844!5m2!1sen!2sin" 
width="100%" height="100%" frameborder="0" style={{"border":"0"}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
              </div>
              <div>
                {/* <small>
                  <a href="http://embedgooglemaps.com"> embed google maps </a>
                </small>
              </div>
              <div>
                <small>
                  <a href="http://freedirectorysubmissionsites.com/">
                    free web directories
                  </a>
                </small> */}
              </div>
            </div>
            <script type="text/javascript"></script>
          </div>
          <div className={`${style.col2} ${style.column2} ${style.last}}`}>
            <div className={`${style.sec2innercont}`}>
              <div className={`${style.sec2addr}`}>
                <p>
                3rd floor, Triveni Tower
Shahupuri 5th lane,
Kolhapur 416001
                </p>
                <p>
                  <span className={`${style.collig}`}>Phone :</span> +91 9820105056
                </p>
                <p>
                  <span className={`${style.collig}`}>Email :</span>{" "}
                  inquiry@taxko.in
                </p>
                {/* <p>
                  <span className={`${style.collig}`}>Fax :</span> +91 9768850839
                </p> */}
              </div>
            </div>
            <div className={`${style.sec2contactform}`}>
              <h3 className={`${style.sec2frmtitle}`}>
                Want to Know More?? Drop Us a Mail
              </h3>
              <form action="">
                <div className={`${style.clearfix}`}>
                  <input
                    className={`${style.col2} ${style.first}`}
                    type="text"
                    placeholder="FirstName"
                    name="firstName"
                    onChange={handleChange}
                    value={formdata.firstName}
                  />
                  <input
                    className={`${style.col2} ${style.last}`}
                    type="text"
                    placeholder="LastName"
                    name="LastName"
                    onChange={handleChange}
                    value={formdata.LastName}
                  />
                </div>
                <div className={`${style.clearfix}`}>
                  <input
                    className={`${style.col2} ${style.first}`}
                    type="Email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={formdata.email}
                  />
                  <input
                    className={`${style.col2} ${style.last}`}
                    type="text"
                    placeholder="Contact Number"
                    name="contactNo"
                    onChange={handleChange}
                    value={formdata.contactNo}
                  />
                </div>
                <div className={`${style.clearfix}`}>
                  <textarea name="Message" id="" cols="30" rows="7" onChange={handleChange} value={formdata.Message}
                  placeholder="Your message here..." />
                    
                  
                </div>
                <div className={`${style.clearfix}`}>
                  <input type="submit" value="Send" onClick={handleContactUsQuery}/>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactUs;
