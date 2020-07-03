import React, { useEffect } from 'react';
import Backend from '../../lib/Backend';
import MessageBanner from '../MessageBanner/MessageBanner';
import { useHistory } from 'react-router-dom';

const MessageGlobal = () => {

  const history = useHistory();

  const initData = Backend.getInitData();

  if('userConfirm' in initData) {

    Backend.removeData('userConfirm');

    return (
      <MessageBanner type="info">
        Votre compte a bien été confirmé.
      </MessageBanner>
    );
  }

  if('logout' in initData || (history.location.state || {}).hasLogout) {

    'logout' in initData && Backend.removeData('logout');

    return (
      <MessageBanner type="info">
        Vous êtes déconnecté.
      </MessageBanner>
    );
  }

  return null;
}
 
export default MessageGlobal;