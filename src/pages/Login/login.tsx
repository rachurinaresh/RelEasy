import "./login.scss";
import { ReactComponent as BrandingImage } from "../../../src/assets/svg/loginBrand.svg";
import { useNavigate } from "react-router";
import { useLazyGetTokenQuery } from "../../services/rtkQueryServices/loginService";
import { useAuth } from "../../context/AuthProvider";
import { UserService } from "../../services/UserService";
import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  
  const auth = useAuth();
  const [getAccessToken, accessToken] = useLazyGetTokenQuery();

  const responseMessage = (response) => {
    if (response) {
      getAccessToken({ azureAccessToken: response.credential }).then((res) => {
        if (res.isSuccess) {
          UserService.accessToken = res.data.data.token;
          auth?.logIn();
          navigate("/projectManagementTools");
        }
      });
    }
};

  return (
    <div className="login-container d-flex vh-100 justify-content-center align-items-center">
      <div className="bg-white login-wrapper">
        <h3 className="text-align-center mt-3 mb-2 releasy-welcome">
          Welcome to RelEasy
        </h3>
        <div className="d-flex login-header justify-content-center">Login</div>
        <div>
          <BrandingImage className="w-100" />
        </div>
        <div className="d-flex align-items-center justify-content-center flex-column position-relative">
          <span className="pe-3"></span>
          <h2>Google Login</h2>
          <GoogleLogin onSuccess={responseMessage} />
          
          <div className="sign-up-swrapper text-align-end pe-3 mt-4">
            Don't have any account?{" "}
            <span
              className="sign-up cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
