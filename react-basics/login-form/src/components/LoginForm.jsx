import { useState } from "react";
import './LoginForm.css';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  function visibilityToggle() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <div>
        <input
          className="login-form-input"
          placeholder="Email"
          size="20"
        />
      </div>
      <div>
        <input
          className="login-form-input"
          placeholder="Password"
          size="20"
          type={showPassword ? "text" : "password"}
        />
        <button
          onClick={visibilityToggle}
        >{showPassword ? "Hide" : "Show"}</button>
      </div>
      <button
        className="login-form-button"
      >Login</button>
      <button
        className="login-form-button"
      >Sign Up</button>
    </>
  );
}

export default LoginForm;