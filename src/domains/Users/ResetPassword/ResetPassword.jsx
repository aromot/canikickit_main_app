import React from 'react';
import { useParams } from 'react-router-dom';
import FormResetPassword from './FormResetPassword';

const ResetPassword = () => {

  const params = useParams();

  return (
    <>
      <h1>Mise à jour de votre mot de passe</h1>
      <FormResetPassword resetKey={params.key} />
    </>
  );
}
 
export default ResetPassword;