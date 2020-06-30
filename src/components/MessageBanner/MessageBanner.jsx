import React from 'react';
import style from './style';

const MessageBanner = ({type="info", children}) => {
  return (
    <div className={`${style} msg-banner-${type}`}>
      {children}
    </div>
  );
}
 
export default MessageBanner;