import React from 'react';
import Whatsappicon from '../../Images/Whatsapp_icon.png';
import style from './WhatsappChat.module.css'

const WhatsappChat = () => {
  return (
    <div className={`${style.whatsappimg}`}>
      <a href="https://wa.me/919820105056" target='_blank'>
        <img src={Whatsappicon} alt="" sizes="" srcset="" />
      </a>
    </div>
  );
}

export default WhatsappChat;
