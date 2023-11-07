import style from "./Knowledge.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../../../Images/gst.webp";
import image2 from "../../../Images/online_file.jpg";
import image3 from "../../../Images/tax_image.jpg";
import image4 from "../../../Images/handsinservice-1.jpg";
import image5 from "../../../Images/shared_image.jpeg";
import { Navigate } from "react-router-dom";

import InfoCard from "../InfoCard/InfoCard";
const Card = ({ data, onCardClick, index }) => {
  
  return (
    <div
      className={`flex justify-between bg-emerald-500 rounded-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition ${
        data.id % 2 === 0 ? "flex-col" : "flex-col-reverse"
      } ${style.card}`}
    >
      <div className="p-4 space-y-4 text-white">
        <h5 className={`text-3xl font-bold ${style.h1}`}>{data.title}</h5>
        <p className={`text-lg opacity-70 ${style.information}`}>
          {data.subtitle}
        </p>
      </div>
      <div className="relative">
        <img
          loading="lazy"
          className={`w-full object-contain ${style[`image${index + 1}`]}`}
          src={data.imageSrc}
          alt={data.title}
        />
        <Link onClick={(e) => onCardClick(e,data.id)} className={`${style.view}`}>
          View more
        </Link>
      </div>
    </div>
  );
};

function Konwledge(props) {
  // //////////////////////
  // Data Store Starts here

  const [slideInformation, setSlideInformation] = useState(null);
  const [isPanelActive, setIsPanelActive] = useState(false);
  function handlePanel() {
    setIsPanelActive(!isPanelActive);
  }
  const navigate=useNavigate();
  useEffect(()=>{
    setIsPanelActive(false)
      },[])

  const [cardData, setCardData] = useState([
    {
      id: 1,
      title: "Facilities given by TAXKO",
      subtitle: "Explore different facilities provided by TAXKO. ",
      subtitle2:"TAXKO offers an array of facilities",
      imageSrc: image2,
      information: [
        `Income Tax & GST integrated dashboard.`,
        `Easy create, edit and view client Information.`,
        `ITR and GST pdf file upload by tax professional.`,
        `GST yearly folders, Month wise view and types of filing inside`,
        `KYC upload facility to client.`,
        `View ITR and GST Filed status.`,
        `Client can view , download, print and share the files uploaded.`
      ],
    },
    {
      id: 2,
      title: "Unique Features.?",
      subtitle: `Post-Filing of Tax Returns are considered in customer service and is one of the major unique feature of TAXKO`,
      subtitle2:
        "We are the ONLY Post-Filing Platform in the field of ITR and GST",
      imageSrc: image3,
      information: [
        `Pre-Filing of Tax Returns like Income Tax Return (Direct Tax) 
        and Goods & Service Tax-GST (Indirect Tax) are primary 
        taxation segments in India.`,
        `Post-Filing of Tax Returns are considered in customer 
        service. Managing client data, filed documents, handover 
        of filed documents to client, maintaining filing status, 
        tracking of filed return status for client etc. But currently there are no players in this segment.`,
        `TAXKO is going to bridge this gap by providing a platform that will connect tax professionals with
         their clients.`,
        `In addition to this but following are unique facilities that makes TAXKO inevitable choice:`,
        `ITR & GST document upload and Delete by Tax Professional ONLY.`,
         `InvestNow for cross selling of financial products.`,
        `KYC upload facility to client.`
      ],
    },
    {
      id: 3,
      title: "Why TAXKO?",
      subtitle:
        "TAXKO is one of the best and leading cloud storage based Tax filing platform.",
      
      imageSrc: image1,

      information: [
        ` 1. Cloud-Based Platform:  Our platform is entirely cloud-based, 
        which means you no longer need to worry about cumbersome installations 
        or complex setups. TAXKO eliminates the need for local installations and providing you with the flexibility 
        to access your data from any device with an internet connection.`,

        `2. User-Friendly Dashboard: We understand that simplicity is key when it comes to technology.
         That's why we've designed an intuitive and user-friendly dashboard 
         that allows users of all levels of technical expertise to navigate and utilize our platform seamlessly. 
        `,
        
        `3. Anytime, Anywhere Access: With TAXKO, you have the freedom to access your data, 
        applications, and services from anywhere and at any time. 
        Whether you're working from the office, home, or even on the go, you can count on TAXKO to be available to you 24/7.`,
      ],
    },
    {
      id: 4,
      title: "Find Your Packeage",
      subtitle:
        "TAXKO offers an array of budget-friendly, well-designed packages, making it convenient for users to opt for the package that aligns best with their needs.",
      imageSrc: image5,
    },
    {
      id: 5,
      title: "We Serve",
      subtitle:
        "Once you become a part of our system, you can expect exceptional service and unwavering support, ensuring your experience is nothing short of exceptional.",
      subtitle2:"Our mission: Enhance your experience and serve you better.",
      imageSrc: image4,

      information: [
        `Upon your membership with us, we will offer comprehensive technical assistance.
        Our specialized team is dedicated to resolving any technical challenges you may encounter.
        We offer numerous avenues for you to reach out to us when you encounter any software-related issues,
        and we are committed to resolving them effectively.`,
      ],
    },
    {
      id: 6,
      title: "News and upcomings",
      subtitle: "Check out the latest news and upcoming features at TAXKO.",
      subtitle2: "Discover the exciting new features awaiting you at TAXKO.",
      imageSrc: image3,
      information: [
        `In addition to the impressive features already available, we are continually enhancing our platform to provide you with an even more comprehensive and versatile experience.
         We are excited to introduce following range of new features and facilities that will further elevate your interaction with our platform.`,
        `Form 16 upload facility by client or employee.`,
        `Notification pannel to notify your clients in one click including image attraction.`,
         `www.filemytaxreturns.com to get new ITR filing in queue direct from client.`,
        `Direct WhatsApp link of consultant.`,
      ],
    },
  ]);

  const handleCardClick = (e,id) => {
   
    
    switch (id) {
      case 1:
       setSlideInformation(cardData[0]);
       handlePanel()
        break;
      case 2:
        setSlideInformation( cardData[1]);
        handlePanel()
        break;
      case 3:
        setSlideInformation( cardData[2]);
        handlePanel()
        break;
      case 4:  
      console.log("sub") 
      e.preventDefault();     
        navigate("/subscriptionplan");
        break;
      case 5:
        setSlideInformation( cardData[4]);
        handlePanel()
        break;
      case 6:
        setSlideInformation( cardData[5]);
        handlePanel()
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.container}>
    <div className={`${style.maincontainer}`}>
      
       <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      <h2 className={`${style.heading}`}>FEATURES</h2>
      <span className={`${style.seperator}`}></span>
      {!isPanelActive &&<div className="px-4 py-8 max-w-5xl mx-auto">
        <div
          id="cards-container"
          className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {cardData.map((data, index) => (
            <Card
              key={data.id}
              data={data}
              onCardClick={handleCardClick}
              index={index}
            />
          ))}
        </div>
      </div>}
      {isPanelActive && slideInformation && (
          <div>
            <InfoCard
              handlePanel={handlePanel}
              isClose={isPanelActive}
              info={slideInformation}
            />
          </div>
        )}
        </div>
    </div>
  );
}

export default Konwledge;
