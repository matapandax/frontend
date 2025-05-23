import React from "react";


const Login: React.FC = () => {
  return (
    <div className="container">
      {/* Left section with illustration */}
      <div className="left-panel">
        <div className="illustration-container">
          <img src="../assets/images/amico.png" alt="Illustration" />
        </div>
      </div>

      {/* Right section with login form */}
      <div className="right-panel">
        <div className="form-container">
          {/* Logo */}
          <div className="logo">
            <img src="../assets/images/logo 4.png" alt="ICE Institute Logo" />
          </div>

          {/* Login form */}
          <h1>Login</h1>
          <form action="/welcome" method="get">
            {/* Email field */}
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                required
              />
            </div>

            {/* Password field */}
            <div className="form-group">
              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="min. 8 character"
                required
              />
            </div>

            {/* Forgot password link */}
            <div className="forgot-password">
              <a href="#">Forget password?</a>
            </div>

            {/* Login button */}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="footer">©2022 All rights reserved</div>
      </div>
    </div>
  );
};

export default Login;
