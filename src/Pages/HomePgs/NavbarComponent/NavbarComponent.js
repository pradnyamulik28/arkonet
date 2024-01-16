// NavbarComponent.jsx

import React, { useEffect, useState } from "react";
import style from "./NavbarComponent.module.css";
import logoimg from "../../../Images/taxko_logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import HomePgClientRegister from "../HomePgClientRegister/HomePgClientRegister";
const NavbarComponent = ({ scrollToRef }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const maxWidth = 600; // Set your desired maximum width

  const handleScreenChange = () => {
    
    if (window.innerWidth <= maxWidth) {
      setIsExpanded(!isExpanded);
    }
  };



  

  return (
    <div className={`${style.container}`}>
      <header className={style.site_header}>
        <div className={style.header__content_flow}>
          <section className={style.header_content_left}>
            <Link
              to="https://taxko.in"
              className={style.brand_logo}
              target="_blank"
            >
              <img
                src={logoimg}
                style={{ width: "50px", height: "50px" }}
                alt=""
              />
            </Link>
            <div className={style.nav_toggle} onClick={handleScreenChange}>
              <span className={style.toggle_icon}></span>
            </div>
            
            <span class={`${style.loginbtn} ${style.viewmenu_item}`} >
                    <i class="fa-solid fa-user"></i>
                    <Link  className={style.login}> Login
                    <ul class={style.dropdown_content} role="menu">
                      <li style={{ "--delay": "1" }}>
                        <Link onClick={(e) => {e.preventDefault();navigate("/admin");}}>CA Login</Link>
                      </li>
                      <li style={{ "--delay": "2" }}>
                        <Link onClick={(e) => {e.preventDefault();navigate("/client");}}>Tax Payer Login</Link>
                      </li>
                      <li style={{ "--delay": "3" }}>
                        <Link onClick={(e) => {e.preventDefault();navigate("/distributor");}}>Distributor Login</Link>
                      </li>
                      <li style={{ "--delay": "3" }}>
                        <Link onClick={(e) => {e.preventDefault();navigate("/sales");}}>Sale Manager Login</Link>
                      </li> 
                    </ul>
                    </Link>
                    <Link class={style.last_link}>
                      Register
                      <ul class={style.dropdown_content} role="menu">
                      <li style={{ "--delay": "1" }}>
                      <Link onClick={(e) => {e.preventDefault();navigate("admin/User_registration");}}>CA Registration</Link>
                      </li>
                      <li style={{ "--delay": "2" }}>
                      <Link data-toggle="modal" data-target="#clientregistrationform" onClick={(e) => {e.preventDefault();}}>TaxPayer Registration</Link>
                      </li>
                    </ul>
                    </Link>
                  </span>
          </section>
          <section className={style.header_content_right}>
            <nav className={style.header_nav} role="navigation">
              <ul className={style.nav__list} aria-expanded={isExpanded.toString()}>
                <li className={style.list_item}>
                  <Link to="" className={style.nav__link} onClick={handleScreenChange}>Home</Link>
                </li>
                <li className={style.list_item}>
                  <Link to="/features"  className={style.nav__link} onClick={handleScreenChange}>Features</Link>
                </li>
                <li className={style.list_item}>
                  <Link to="/subscription"  className={style.nav__link} onClick={handleScreenChange}>Subscriptions</Link>
                </li>
                <li className={style.list_item}>
                  <Link to="/products"  className={style.nav__link} onClick={handleScreenChange}>Products</Link>
                </li>
                <li className={style.list_item}>
                  <Link to="/AboutUs" className={style.nav__link} onClick={handleScreenChange}>About</Link>
                </li>
                <li className={style.list_item}>
                  <Link to="ContactUs" className={style.nav__link} onClick={handleScreenChange}>Contact</Link>
                </li>
                <li className={style.list_item}>
                  <Link to="Career" className={style.nav__link} onClick={handleScreenChange}>CAREERS</Link>
                </li>
                <li className={`${style.list_item}`}>
                <span class={`${style.loginbtn} ${style.hidebtn}`}>
                    <i class="fa-solid fa-user"></i>
                    <Link className={style.login}> Login
                    <ul class={style.dropdown_content} role="menu">
                      <li style={{ "--delay": "1" }}>
                        <Link onClick={(e) => {e.preventDefault();navigate("/admin");}}>CA Login</Link>
                      </li>
                      <li style={{ "--delay": "2" }}>
                        <Link onClick={(e) => {e.preventDefault();navigate("/client");}}>Tax Payer Login</Link>
                      </li>
                      <li style={{ "--delay": "3" }}>
                        <Link onClick={(e) => {e.preventDefault();navigate("/distributor/");}}>Distributor Login</Link>
                      </li>
                       <li style={{ "--delay": "3" }}>
                        <Link onClick={(e) => {e.preventDefault();navigate("/sales");}}>Sale Manager Login</Link>
                      </li> 
                    </ul>
                    </Link>
                    <Link class={style.last_link}>
                      Register
                      <ul class={style.dropdown_content} role="menu">
                      <li style={{ "--delay": "1" }}>
                        <Link onClick={(e) => {e.preventDefault();navigate("admin/User_registration");}}>CA Registration</Link>
                      </li>
                      <li style={{ "--delay": "2" }}>
                        <Link data-toggle="modal" data-target="#clientregistrationform" onClick={(e) => {e.preventDefault();}}>TaxPayer Registration</Link>
                      </li>
                    </ul>
                    </Link>
                  </span>
                </li>
              </ul>
              
            </nav>
            
          </section>
        </div>
      </header>
      
    </div>
  );
};

export default NavbarComponent;
