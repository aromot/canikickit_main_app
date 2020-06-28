import React, { useEffect } from 'react';
import Backend from '../../lib/Backend';
import Axios from 'axios';
import { Global } from '@emotion/core';
import globalStyle from './global-style';
import style from './style';
import "normalize.css";
import FormRegister from '../../domains/Users/FormRegister/FormRegister';

const App = () => {

  async function init() {
    const url = Backend.getInitData().initRoute
    try {
      const response = await Axios.get(url);
      console.log(response.data);
      Backend.setRoutes(response.data.routes);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Global styles={globalStyle} />
      <div className={style}>
        <FormRegister />
      </div>
    </>
  );
}
 
export default App;