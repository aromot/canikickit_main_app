import React from 'react';
import Backend from '../../lib/Backend';
import MessageBanner from '../MessageBanner/MessageBanner';

const MessageGlobal = () => {

  const initData = Backend.getInitData();

  if( ! ('userConfirm' in initData) )
    return null;

  return (
    <MessageBanner type="info">
      Votre compte a bien été confirmé.
    </MessageBanner>
  );
}
 
export default MessageGlobal;