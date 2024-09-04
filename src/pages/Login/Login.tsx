import React, { useState } from 'react';
import FormSignIn from './FormSignIn/FormSignIn';
import FormSignUp from './FormSignUp/FormSignUp';

function Login() {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  return (
    <>
      {showLogin ? (
        <FormSignIn setShowLogin={setShowLogin} />
      ) : (
        <FormSignUp setShowLogin={setShowLogin} />
      )}
    </>
  );
}

export default Login;
