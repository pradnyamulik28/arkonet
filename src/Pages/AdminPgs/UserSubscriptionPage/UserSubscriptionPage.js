import { useNavigate } from "react-router-dom";
import style from "./UserSubscriptionPage.module.css";
import { useEffect, useState } from "react";
import { url_ } from "../../../Config";
import swal from "sweetalert2";
// import taxko from "../../Images/Taxko.jpg";
// import arkonet from "../../Images/Arkonet.jpg";

const UserSubscriptionPage = () => {

  const subscription_status=localStorage.getItem(`subscription_status`)

  const Navigate = useNavigate();
  const [isRefferFriend,setIsRefferFriend]=useState(true);
  const [isSuggession,setIsSuggession]=useState(false);
  const [isValidMobile, setIsValidMobile] = useState(true);

  const storedToken=localStorage.getItem("jwtToken");

  const [refferFriend,setRefferFriend]=useState({
    name:"",
    contactNo:"",
    profession:""
  })

  const [suggession,setSuggession]=useState({
    suggession:"",
  })


  function handleChange(e){
    const { name, value } = e.target;
    if(isRefferFriend){
     switch(name){
      case "contactNo":
        setRefferFriend({ ...refferFriend, [name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        const mobilePattern = /^[789]\d{9}$/;
        setIsValidMobile(mobilePattern.test(e.target.value));
        break;
      default:
        setRefferFriend({...refferFriend,[name]:value})
        break;
     }
      
     
      
    }
    if(isSuggession){
      setSuggession({...suggession,[name]:value})
    }
  }
  const GOTO = () => {
    Navigate('subscriptionplan')
    // , {
    //   state: {
    //     clientId: cid,
    //     clientname: cname,
    //     clientpan: cpan,
    //     clientCategory: ccategory,
    //     clientProfession: cprofession,
    //   },
    // });

  }


  
  function DateConvert(ConvertingDate) {

    if (ConvertingDate === null) {
      return null;
    } else {



      const date = new Date(ConvertingDate);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-GB', options);
      return formattedDate;

    }

  }

  function TimeConvert(ConvertingDate) {

    if (ConvertingDate === null) {
      return null;
    } else {
      const date = new Date(ConvertingDate);
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      const formattedTime = date.toLocaleTimeString('en-US', options);
      return formattedTime;

    }

  }

  function getTimeDifference(startDate, endDate) {
    const startDateTime = new Date();
    const endDateTime = new Date(endDate);
    const timeDiff=((endDateTime.getHours()*60)+endDateTime.getMinutes())-
    ((startDateTime.getHours()*60)+startDateTime.getMinutes())
    
    const hours = parseInt(timeDiff/60);
    const minutes = timeDiff%60;

    
  
    return { hours, minutes }; 
  }

  const [userInfo,setUserInfo]=useState({
    userid:localStorage.getItem("user_id"),
    userPAN:localStorage.getItem("pan"),
    days_left:"0",
    time_left:"0",
    referredBy:"Sonali Shyamkumar Goel",
    refferedPan:"",
    registration_date:"14 April 2024",
    end_date:"",
    end_time:"",
    pack_amount:"",
    pack_type:""

  });


  function copyReferralLink(){
   // const refferalLink=`http://localhost:3000/admin/refferal/user/${parseInt(new Date().getTime() / 1000)}_${userInfo.userPAN}`;
    const refferalLink=`http://taxko.in/admin/refferal/user/${parseInt(new Date().getTime() / 1000)}_${userInfo.userPAN}`;
    const copy = require('clipboard-copy')
    copy(refferalLink);
   
    swal.fire('Refferal link has been copied to clipboard');
  }


  function openPanel(e){
    if(e.target.id==="referfriendbtn"){
      setIsSuggession(false);
    setIsRefferFriend(true);
    }
    if(e.target.id==="suggessionbtn")
    {setIsSuggession(true);
    setIsRefferFriend(false);}
  }



  async function fetchData(){

console.log(userInfo.userPAN)
const updateItem={...userInfo};

    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${storedToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

try{
  const response=await fetch(`${url_}/subscriptionpackuserdata/${userInfo.userPAN}`, requestOptions);
const result= await response.text();



if(response.status===200)
{
  const data=JSON.parse(result) 
  
  console.log(data,data.subscriptionData.subscriptiontype,data.subscriptionData.subscriptionprice)

  updateItem.referredBy=data.Refered_by_name  &&  data.Refered_by_name;
  
  updateItem.registration_date=DateConvert(data.subscriptionData.registrationdate);

  updateItem.pack_type=data.subscriptionData.subscriptiontype &&  data.subscriptionData.subscriptiontype;

  updateItem.pack_amount=data.subscriptionData.subscriptionprice  && data.subscriptionData.subscriptionprice;
  
  updateItem.end_date=data.subscriptionData.subendtdate &&  DateConvert(data.subscriptionData.subendtdate);

  updateItem.end_time=data.getSubendtdate &&  TimeConvert(data.getSubendtdate);

  updateItem.time_left=data.getSubendtdate &&  getTimeDifference(data.getSubendtdate, data.getSubendtdate);
  
  updateItem.refferedPan=data.subscriptionData.refrenceId &&  data.subscriptionData.refrenceId;

}

}catch(error){
  console.log(error)
}


const daysDiff = (Math.floor((new Date(updateItem.end_date)-new Date())/ (1000 * 60 * 60 * 24)))+1;



setUserInfo({...userInfo,
  days_left:daysDiff,
  time_left:updateItem.time_left,//`${updateItem.time_left.hours}h : ${updateItem.time_left.minutes}m`,
  referredBy:updateItem.referredBy,
    refferedPan:updateItem.refferedPan,
    registration_date:updateItem.registration_date,
    end_date:updateItem.end_date,
    pack_amount:updateItem.pack_amount,
    pack_type:updateItem.pack_type,
    end_time:updateItem.end_time
});
  }

  function handleSubmit(){
    if(isRefferFriend){
      
      if(!isValidMobile||refferFriend.contactNo==="" ||
        refferFriend.name===""
        ||refferFriend.profession==="")
      {
        // console.log(isValidMobile)
        swal.fire({
          icon:"warning",
          text:(!isValidMobile||refferFriend.contactNo==="")?`Invalid Mobile no`:
          refferFriend.name===""?`Please enter a name.`:
          refferFriend.profession===""&&`Please enter profession`
        })
      }
      else{
        // console.log(isValidMobile,refferFriend.name,refferFriend.contactNo,refferFriend.profession)
        saveRefferFriend(refferFriend.name,refferFriend.contactNo,refferFriend.profession);
      setRefferFriend({
        name:"",
        contactNo:"",
        profession:""
      })        
      }  
      
    }
    if(isSuggession){
      if(suggession.suggession==="")
      {
        swal.fire({
          icon:"warning",
          text:"Please fill in some suggession."
        })
      }
      else{
        saveSuggession();
      setSuggession({
        suggession:""
      })
      }
      
    }
  }

  async function saveRefferFriend(name,contact,profession) {


    const subject = `Referral Friend Request`;

        const message = `Dear Support Team,
  Greeting from TAXKO!

  I hope this message finds you well. 
  
  One of our users, ${localStorage.getItem("user_name")}, has referred a new friend. The contact details of the referred individual are as follows:
- Name:${name}
- Contact Number:${contact}
- Profession:${profession}

  We place our confidence in your expertise and kindly request your assistance in reaching out to the aforementioned reference to gather more information.

                    
  Best regards,

  ${localStorage.getItem("user_name")},
  Contact no : ${localStorage.getItem("mobile")}`;

  const formattedMsg=message.replace(/\n/g, '<br>')


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var raw = JSON.stringify({
      userid: userInfo.userid,
      pan: userInfo.userPAN,
      name: refferFriend.name,
      contactno: refferFriend.contactNo,
      profession: refferFriend.profession,
      text: formattedMsg
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
console.log(subject);
console.log(message);
    try {
      const response = await fetch(
        `${url_}/save/Refear_a_friend?subject=${subject}&text=${formattedMsg}`,
        requestOptions
      );
      const result = await response.text();

      if (response.status === 200) {
        swal.fire({
          icon: "success",
          text: "Thank you for refference.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }


  async function saveSuggession() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var raw = JSON.stringify({
      userid: userInfo.userid,
      pan: userInfo.userPAN,
      seggesion: suggession.suggession,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url_}/save/User_seggesion`,
        requestOptions
      );
      const result = await response.text();

      if (response.status === 200) {
        swal.fire({
          icon: "success",
          text: "Thank you for your suggession..",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
fetchData();
  },[])
  return (
    <div className={`${style.workport}`}>

      <div className={`${style.maincont}`}>
        <div className={`${style.mainhair}`}>
          <h4 className={`${style.h31}`}>SUBSCRIPTION</h4>
        </div>

        <div className={`${style.mainhead}`}>
          <div className={`${style.circular}`}>
            <div className={`${style.card1}`}>
              
              <h3 className={userInfo.days_left>=15 ? `${style.h31}` : 
                              userInfo.days_left<=0 ? `${style.h31} ${style.subs_end}` : 
                                `${style.h31} ${style.subs_about_end}`}
                                >
                {userInfo.end_date===null ? ``  :
                userInfo.days_left===0  ? `${Math.abs(userInfo.time_left.hours)}h : ${Math.abs(userInfo.time_left.minutes)}m` :
                Math.abs(userInfo.days_left)}
                </h3>
               
              <p className={`${style.p1}`}>{
              userInfo.end_date===null  ? `Not Subscribed` :
              userInfo.days_left<0  ? `Days ago` :
              userInfo.days_left===0  ? 
              (userInfo.time_left.hours<=0 && userInfo.time_left.minutes<=0)?`Time Ago`:
              `Time Left`  : `Days Left`}
              </p>
            </div>
          </div>
          <div className={`${style.mainheadtextual}`}>
            {userInfo.end_date===null?``:<p className={`${style.p1}`}>Subscription Ends on</p>}
            <p className={`${style.p2}`}>{userInfo.end_date}&nbsp;&nbsp; {userInfo.end_time}</p>
            <p className={`${style.sub_details}`}>Selected Pack:&nbsp;&nbsp;{userInfo.pack_type}  
            &nbsp;&nbsp;&nbsp;&nbsp; Amount : &#8377;&nbsp;{userInfo.pack_amount}&nbsp;/- </p>
          </div>
          <div className={subscription_status==="on"?`${style.card2} ${style.active_subscription}`:`${style.card2}`}>
            <p className={`${style.cardp} `} onClick={GOTO}> {subscription_status==="on"?`Active`:userInfo.end_date===null?`Subscribe`:`RENEW`}</p>
          </div>
        </div>

        <div className={`${style.mainneck}`}>
          {userInfo.referredBy&&<div className={`${style.neckgraycard}`} >
            <div className={`${style.title}`}><p className={`${style.titlep}`}>Referred By</p></div>
            <div className={`${style.value}`}><p className={`${style.titlev}`}>{userInfo.referredBy}</p></div>
          </div>}
          <div className={`${style.neckgraycard}`} >
            <div className={`${style.title}`}><p className={`${style.titlep}`}>Registration Date</p></div>
            <div className={`${style.value}`}><p className={`${style.titlev}`}>{userInfo.registration_date}</p></div>
          </div>
        </div>

        <div className={`${style.mainadbominal}`}>
          <div className={`${style.card3}`}>
            <p className={`${style.cardp}`} id="referfriendbtn" onClick={openPanel}> REFER A FRIEND</p>
            {isRefferFriend&&<h1><i class="fa-solid fa-caret-down" style={{ color: "#707070" }}></i></h1>}
          </div>
          <div className={`${style.card3}`} >
            <p className={`${style.cardp}`} onClick={copyReferralLink}> COPY REFERAL LINK</p>
          </div>
          <div className={`${style.card3}`}>
            <p className={`${style.cardp}`} id="suggessionbtn" onClick={openPanel}> SUGGESSION</p>
            {isSuggession&&<h1><i class="fa-solid fa-caret-down" style={{ color: "#707070" }}></i></h1>}
          </div>          
        </div>

        <div className={`${style.mainlow}`}>
          <div className={`${style.card4}`}>

          {isRefferFriend&&<><div className={`${style.singleinput}`}>
              <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Name</p></div>
              <div className={`${style.formvalue}`}>
                <input name="name" className={`${style.formvalueinput}`} type="text" 
                onChange={handleChange} value={refferFriend.name}  autocomplete="off"/></div>
            </div>
            <div className={`${style.singleinput}`}>
              <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Contact Number</p></div>
              <div className={`${style.formvalue}`}>
                <input name="contactNo" className={`${style.formvalueinput}`} type="text" 
                onChange={handleChange} value={refferFriend.contactNo} maxLength={10} autocomplete="off"/></div>
            </div>
            <div className={`${style.singleinput}`}>
              <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Profession</p></div>
              <div className={`${style.formvalue}`}>
                <input name="profession" className={`${style.formvalueinput}`} type="text" 
                onChange={handleChange} value={refferFriend.profession}  autocomplete="off"/></div>
            </div></>}



            {isSuggession&&<>
            <div className={`${style.singleinput}`} style={{"height":"300px"}}>
            <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Suggession</p></div>
              <div className={`${style.formvalue}`}><textarea name="suggession" className={`${style.formvalueinput}`}  
              placeholder="Leave your suggession here" onChange={handleChange} value={suggession.suggession}/></div>
              </div>       
                        
            </>}

            <div className={`${style.bottomdown}`}>
              <button className={`${style.bottombtn}`} onClick={handleSubmit}>SUMBIT</button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default UserSubscriptionPage;
