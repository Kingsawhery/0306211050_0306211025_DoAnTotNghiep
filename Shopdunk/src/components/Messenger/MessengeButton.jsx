import React from 'react';
import "../Messenger/MessengerButton.scss"
const MessengerButton = () => {
  const pageLink = 'https://m.me/165805206609003'; // link tới fanpage của bạn

  return (
    <a
      href={pageLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#0084FF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 1000,
        cursor: 'pointer'
      }}
      className='messengerBtn'
    >
<img src={`${process.env.REACT_APP_LOCALHOST_SERVER}/messenger.png`} alt="Ảnh" />
    </a>
  );
};

export default MessengerButton;
