import React from "react";
import "./LoginOption.modul.scss";
import { useNavigate, useLocation } from "react-router";
import { FaMobileAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const LoginOption = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const search = location?.search;
  const redirectEmailUrl = `/ContinueWithEmail/${search}`;

  const redirectMobileUrl = `/ContimueWithMobile/${search}`;

  return (
    <div className="for_Loginoption" style={{
        backgroundColor  :"#fff"
    }}>
      <div className="for_loginDailog">
        <div>
          <p className="for_loginDiTile">Log in or sign up in seconds</p>
          <p
          className="for_login_text"
          >
            Use your email or mobile number to continue with the organization.
          </p>
          <div className="forLoginOptionMain">
            <div
              className="loginMail"
              onClick={() => navigation(redirectEmailUrl)}
            >
              <IoMdMail style={{ height: "25px", width: "25px" }} />
              <p
                style={{
                  margin: "0px",
                  fontSize: "20px",
                  fontWeight: 500,
                  paddingLeft: "25px",
                }}
              >
                Continue with email
              </p>
            </div>
            <div
              className="loginMobile"
              onClick={() => navigation(redirectMobileUrl)}
            >
              <FaMobileAlt
                style={{ height: "25px", width: "25px", marginRight: "10px" }}
              />
              <p
                style={{
                  margin: "0px",
                  fontSize: "20px",
                  fontWeight: 500,
                  paddingLeft: "25px",
                }}
              >
                Log in with mobile
              </p>
            </div>
          </div>
          <p
            style={{
              marginTop: "40px",
              fontSize: "14px",
              color: "black",
              textAlign: "center",
            }}
          >
            By continuing, you agree to our Terms of Use. Read our Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginOption;
