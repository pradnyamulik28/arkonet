import style from "./Cards.module.css"
import image1 from "../../../Images/online_file.jpg"
import image2 from "../../../Images/tax_image.jpg"
import image3 from "../../../Images/gst.webp"
import image4 from "../../../Images/package.jpg"
import image5 from "../../../Images/businss-one.jpg"
import image6 from "../../../Images/conference4.jpeg"
import { useState } from "react"

function Cards(){

  const [information,setinformation]=useState(
    
      {
        title:``,
        header:``,
        body:[``]
      }
    
  )

  const infoCard=[
    {
      title:`Facilities given by TAXKO`,
      header:`TAXKO: Your Ultimate Cloud-Based Tax Filing Solution`,
      body:[` Income Tax & GST integrated dashboard.`,

      `Easy create, edit and view client Information.`,
     
      `ITR and GST pdf file upload by tax professional.`,
     
      `GST yearly folders, Month wise view and types of filing inside`,
     
      `KYC upload facility to client.`,
     
      `View ITR and GST Filed status.`,
     
      `Client can view , download, print and share the files uploaded.`]
    },
    {
      title:`Unique Features.?`,
      header:`We Are The ONLY Post-Filing Platform In The Field Of ITR And GST`,
      body:[` Pre-Filing of Tax Returns like Income Tax Return (Direct Tax) and Goods & Service Tax-GST (Indirect Tax) are primary taxation segments in India.`,

      `Post-Filing of Tax Returns are considered in customer service. Managing client data, filed documents, handover of filed documents to client, maintaining filing status, tracking of filed return status for client etc. But currently there are no players in this segment.`,
     
      `TAXKO is going to bridge this gap by providing a platform that will connect tax professionals with their clients.`,
     
      `In addition to this but following are unique facilities that makes TAXKO inevitable choice:`,
     
     `- ITR & GST document upload and Delete by Tax Professional ONLY.
     
     - InvestNow for cross selling of financial products.
     
     - KYC upload facility to client.`
    ]
    },
    {
      title:`Why TAXKO?`,
      header:``,
      body:[` Cloud-Based Platform: Our platform is entirely cloud-based, which means you no longer need to worry about cumbersome installations or complex setups. TAXKO eliminates the need for local installations and providing you with the flexibility to access your data from any device with an internet connection.`,

      `User-Friendly Dashboard: We understand that simplicity is key when it comes to technology. That's why we've designed an intuitive and user-friendly dashboard that allows users of all levels of technical expertise to navigate and utilize our platform seamlessly.`,
     
      `Anytime, Anywhere Access: With TAXKO, you have the freedom to access your data, applications, and services from anywhere and at any time. Whether you're working from the office, home, or even on the go, you can count on TAXKO to be available to you 24/7.`]
    },
    {
      title:`SUBSCRIPTION PLAN`,
      header:`In This Digital World, Subscribe TAXKO At Less Than Your Printing Paper Cost. Serve Your Clients With More Efficient Manner. Access Anytime & Anywhere.`,
      body:[``]
    },
    {
      title:`We Serve`,
      header:`Our Mission: Enhance Your Experience And Serve You Better.`,
      body:[` Upon your membership with us, we will offer comprehensive technical assistance. Our specialized team is dedicated to resolving any technical challenges you may encounter. We offer numerous avenues for you to reach out to us when you encounter any software-related issues, and we are committed to resolving them effectively.`]
    },
    {
      title:`News and upcomings`,
      header:`Discover The Exciting New Features Awaiting You At TAXKO.`,
      body:[` In addition to the impressive features already available, we are continually enhancing our platform to provide you with an even more comprehensive and versatile experience. We are excited to introduce following range of new features and facilities that will further elevate your interaction with our platform.`,

      `Form 16 upload facility by client or employee.`,
     
      `Notification pannel to notify your clients in one click including image attraction.`,
     
      `www.filemytaxreturns.com to get new ITR filing in queue direct from client.`,

      `Direct WhatsApp link of consultant.`]
    }
  ]



  
    return(
        <div className={style.cards}>
        <section className={style.articles}>
        <article className={style.article}>
        <div className={style.article_wrapper}>
      <figure className={style.figure}>
        <img src={image1} alt="" />
      </figure>
      <div className={style.article_body}>
        <h2>FACILITIES GIVEN BY TAXKO</h2>
        <p>
        TAXKO caters to a variety of needs to enhance the overall experience of its users.Explore different facilities provided by TAXKO.
        </p>
        <a href="#informationModal" className="read-more" data-toggle="modal" onClick={()=>{setinformation(infoCard[0])}}>
          Read more <span className={style.sr_only}>about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>
  <article className={style.article}>

    <div className={style.article_wrapper}>
      <figure className={style.figure}>
        <img src={image2} alt="" />
      </figure>
      <div className={style.article_body}>
        <h2>UNIQUE FEATURES.?</h2>
        <p>
        Post-Filing of Tax Returns are considered in customer service and is one of the major unique feature of TAXKO.
        </p>
        <a href="#informationModal" className="read-more" data-toggle="modal" onClick={()=>{setinformation(infoCard[1])}}>
          Read more <span className={style.sr_only}>about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>
  <article className={style.article}>

    <div className={style.article_wrapper}>
      <figure className={style.figure}>
        <img src={image3} alt="" />
      </figure>
      <div className={style.article_body}>
        <h2>WHY TAXKO?</h2>
        <p>
        TAXKO is one of the best and leading cloud storage based Tax filing platform.
        </p>
        <a href="#informationModal" className="read-more" data-toggle="modal" onClick={()=>{setinformation(infoCard[2])}}>
          Read more <span className={style.sr_only}>about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>


  <article className={style.article}>
        <div className={style.article_wrapper}>
      <figure className={style.figure}>
        <img src={image4} alt="" />
      </figure>
      <div className={style.article_body}>
        <h2>FIND YOUR PACKAGE</h2>
        <p>
        TAXKO offers an array of budget-friendly, well-designed packages, making it convenient for users to opt for the package that aligns best with their needs.
        </p>
        <a href="#informationModal" className="read-more" data-toggle="modal" onClick={()=>{setinformation(infoCard[3])}}>
          Read more <span className={style.sr_only}>about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>


  <article className={style.article}>
        <div className={style.article_wrapper}>
      <figure className={style.figure}>
        <img src={image5} alt="" />
      </figure>
      <div className={style.article_body}>
        <h2>WE SERVE</h2>
        <p>
        Once you become a part of our system, you can expect exceptional service and unwavering support, ensuring your experience is nothing short of exceptional.
        </p>
        <a href="#informationModal" className="read-more" data-toggle="modal" onClick={()=>{setinformation(infoCard[4])}}>
          Read more <span className={style.sr_only}>about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>


  <article className={style.article}>
        <div className={style.article_wrapper}>
      <figure className={style.figure}>
        <img src={image6} alt="" />
      </figure>
      <div className={style.article_body}>
        <h2>NEWS AND UPCOMINGS</h2>
        <p>
        Check out the latest news and upcoming features at TAXKO.
        </p>
        <a href="#informationModal" className="read-more" data-toggle="modal" onClick={()=>{setinformation(infoCard[5])}} >
          Read more <span className={style.sr_only}>about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>
</section>


<div class={`modal fade animate ${style.modal}`} id='informationModal' data-easein="slideUpIn" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class={`modal-content ${style.animate_bottom}`}>
      <div class={`modal-header ${style.modal_header}`}>
        <h5 class={`modal-title ${style.modal_title}`} id="exampleModalLabel">{information.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class={`modal-body ${style.modal_body}`}>
      <h2 class={`${style.modal_h2}`}>{information.header}</h2>
      {information.body.map((item)=>{
        return(
          <p className={style.p}>{item}</p>
        )
      })}
      </div>
      
    </div>
  </div>
</div>   
</div>




    )
}

export default Cards