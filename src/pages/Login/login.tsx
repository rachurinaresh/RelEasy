import "./login.scss";
import { ReactComponent as BrandingImage } from "../../../src/assets/svg/loginBrand.svg";
import { useNavigate } from "react-router";
import MicrosoftLogin from "react-microsoft-login";
import { useLazyGetTokenQuery } from "../../services/rtkQueryServices/loginService";
import { useAuth } from "../../context/AuthProvider";
import { UserService } from "../../services/UserService";

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [getAccessToken, accessToken] = useLazyGetTokenQuery();
  const authHandler = (err: any, data: any) => {
    if (data) {
      getAccessToken({ azureAccessToken: data.accessToken }).then((res) => {
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
          <MicrosoftLogin
            clientId={"b7adf1e7-9f32-4e9f-a8cf-8128345d11ea"}
            authCallback={authHandler}
            children={undefined}
            redirectUri="/projectManagementTools"
          />
          <div className="sign-up-wrapper text-align-end pe-3 mt-4">
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
