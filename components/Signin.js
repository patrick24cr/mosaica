import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="profileInfo">
      <h1>Welcome to Mosaica</h1>
      <button type="button" className="button1" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
