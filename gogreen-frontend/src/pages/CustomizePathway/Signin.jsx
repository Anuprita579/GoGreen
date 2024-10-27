import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
//useContext
import { useActiveStep } from "../../utils/ActiveStepContext";
import { useLoginState } from "../../utils/LoginStateContext";
//API URL
import axios from 'axios'
//Common Components
import ButtonComponent from "../../commonComponents/ButtonComponent";
//MUI ICONS
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
//Sign in with Google
import { GoogleOAuthProvider, GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
//Import 
import OTP from "./OTP";
import styles from "./styles.module.scss"


const Signin = ({ sourceComponent, onClose }) => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENTID;
  
  const [loginResponse, setLoginResponse] = useState(null);

  const { incrementStep, setActiveStep } = useActiveStep();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [userId, setUserId] = useState(null);
  const [validatedOtp, setValidatedOtp] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); //checkbox
  const [isAllValid, setIsAllValid] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [isContinueClicked, setIsContinueClicked] = useState(false);
  const { isLoggedIn, login } = useLoginState();

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [mobileErrorMessage, setMobileErrorMessage] = useState("");
  const [otpErrorMessage, setOtpErrorMessage] = useState("");

  const handleLoginSuccess = (response) => {
    console.log("Login successful", response);
    setLoginResponse(response);
    const { credential } = response;
    const decodedToken = jwtDecode(credential);
    // Extract name and email from the decoded token
    const { name, email } = decodedToken;
    // Store name and email in session storage
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('email', email);
    console.log('User Info:', { name, email });
    setIsContinueClicked(true);
    login({
        username: sessionStorage.getItem('name'),
        email: sessionStorage.getItem('email')
      });
    incrementStep();
  };

  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setActiveStep(1);
    }
  }, []);

  useEffect(() => {
    setIsAllValid(
      isCheckboxChecked &&
        isValidName &&
        isValidEmail &&
        isOtpSent &&
        validatedOtp
    );
  }, [isCheckboxChecked, isValidName, isValidEmail, isOtpSent, validatedOtp]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  //Function for continue button to act as next button
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAllValid) {
      login({
        username: sessionStorage.getItem("name"),
        email: sessionStorage.getItem('email')
      });
      setIsContinueClicked(true);
      switch (sourceComponent) {
        case "header":
          onClose();
          break;
        default:
          console.log("Default Action");
          break;
      }
      incrementStep();
    } else {
      console.log("Form not submited");
    }
  };

  const mobileNo = email;
  const [otp, setOtp] = useState("");

  // Validation of name and mobile number
  const check = (e, inputType) => {
    const { value } = e.target;
    if (inputType === "fullName") {
      setFullName(value);
      if (value === "") {
        setNameErrorMessage("Full name is required");
        setIsValidName(false);
      } else {
        let regex = /^[A-Za-z\s'-]+$/;
        if (!regex.test(fullName.trim())) {
          setNameErrorMessage("Enter a valid full name");
          setIsValidName(false);
        } else {
          setNameErrorMessage("");
          setIsValidName(true);
        }
      }
    }
    if (inputType === "email") {
    setEmail(value);
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(value.trim())) {
      setMobileErrorMessage("Enter a valid email");
      setIsValidEmail(false);
    } else {
      setMobileErrorMessage("");
      setIsValidEmail(true);
    }
  }
  };

  // otp block
  const [nameIsDisabled, setNameIsDisabled] = useState(false);
  const [emailIsDisabled, setEmailIsDisabled] = useState(false);
  const showOtpField = async () => {
    if (isValidName && isValidEmail) {
      if (email.trim() === "") {
        setMobileErrorMessage("Mobile number is required");
      }
      if (fullName.trim() === "") {
        setNameErrorMessage("Full name is required");
      }
      if (
        fullName.trim() !== "" &&
        email.trim() !== "" &&
        nameErrorMessage === "" &&
        mobileErrorMessage === ""
      ) {
        setMobileErrorMessage("");
        setNameErrorMessage("");
        try{
          const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/signup`, {
            name: fullName,
            email: email,
          });
  
          if (response.data.status === "SUCCESS") {
            setUserId(response.data.data.userId);
            console.log(response.data.data.userId);
            setNameIsDisabled(true);
            setEmailIsDisabled(true);
            setIsOtpSent(true);
            setCountdown(120);
          } else {
            // handle error messages
            setIsOtpSent(false);
          }
        }
        catch(err){
          console.error(err);
          setIsOtpSent(false);
        }
      }
    }
  };
  const handleEdit = () => {
    setEmailIsDisabled(false);
    setIsOtpSent(false);
  };
  const minutes = String(Math.floor(countdown / 60)).padStart(2, "0");
  const seconds = String(countdown % 60).padStart(2, "0");

  useEffect(() => {
    if (otp.length === 4) {
      validateOtp(otp);
    }
  }, [otp]);
  const validateOtp = async (otpVal) => {
    if (validatedOtp) return;
    setOtp(parseInt(otpVal));
    if (otpVal.length !== 4) {
      setOtpErrorMessage("OTP should be 4 digits.");
      return;
    } else {
      setOtpErrorMessage("");

    try{
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/verifyOTP`, {
        userId: userId && userId,
        otp: otp,
      });

      if (response.data.status === "SUCCESS") {
        setOtp(otpVal);
        setValidatedOtp(true);
        setShowTimer(false);
      } else if (response.data.status === "FAILED"){
        // handle error messages
        setOtpErrorMessage("Invalid OTP");
        setValidatedOtp(false);
        setShowTimer(true);
        setOtp(""); // Reset OTP 
      }
    }
    catch(err){
      console.error(err);
    }
      // Store data using session
      sessionStorage.setItem("name", fullName);
      sessionStorage.setItem("email", email);
    }
  };
  const handleCloseMenu = () => {
    onClose();
  }

  const location = useLocation();
  return (
    <>
      <div className={styles.signinPage}>
        <div className={styles.signinPageContainer}>
        { !location.pathname.includes('calculate') && (
                <div className={styles.closeIcon}>
                    <ButtonComponent > 
                        <CloseIcon className='search-icon' onClick={handleCloseMenu} />
                    </ButtonComponent>
                </div>
            )}
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit} className={styles.signinForm}>
            <label htmlFor="Name">
              Name<sup>*</sup>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => check(e, "fullName")}
              placeholder="Enter full name"
              className={styles.formInputboxName}
              required
              disabled={nameIsDisabled}
              onKeyDown={(event) => {
                const char = event.key;
                if (
                  !/[a-zA-Z ]/.test(char) &&
                  char !== "Backspace" &&
                  char !== "ArrowLeft" &&
                  char !== "ArrowRight" &&
                  char !== "Tab" &&
                  char !== "Delete"
                ) {
                  event.preventDefault();
                }
              }}
            />
            <h5 className={styles.errorMessages}>
              {nameErrorMessage !== "" && nameErrorMessage}
            </h5>
            <label htmlFor="email">
              Email<sup>*</sup>
            </label>
            <div className={styles.phoneRow}>
              <div className={styles.formInputbox}>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => check(e, "email")}
                  placeholder="Enter email"
                  required
                  disabled={emailIsDisabled}
                  onKeyDown={(event) => {
                    const char = event.key;
                    if (
                      /^[a-zA-Z0-9@._-]$/.test(char) ||
                      char === "Backspace" ||
                      char === "ArrowLeft" ||
                      char === "ArrowRight"
                    ) {
                      return true;
                    } else {
                      event.preventDefault();
                    }
                  }}
                />
                {!validatedOtp && <div onClick={handleEdit}>
                  <EditIcon />
                </div>}
              </div>

              {isOtpSent ? (
                <div className={styles.iconsInline}>
                  {" "}
                  <CheckCircleOutlineIcon sx={{ fill: "#509E82" }} />
                  OTP sent
                </div>
              ) : (
                <ButtonComponent
                  children="Send OTP"
                  className={
                    isOtpSent
                      ? `${styles.disappearButton}`
                      : isValidName && isValidEmail
                      ? `${styles.gradientButtonSendOtp}`
                      : `${styles.disabledButton}`
                  }
                  onClick={showOtpField}
                  disabled={!isValidName || !isValidEmail}
                />
              )}
            </div>
            <h5 className={styles.errorMessages}>
              {mobileErrorMessage !== "" && mobileErrorMessage}
            </h5>

            <label htmlFor="otp">
              OTP<sup>*</sup>
            </label>
            <div className={styles.otpRow}>
              <OTP
                value={otp}
                onChange={setOtp}
                length={4}
                validatedOtp={validatedOtp}
              />
              {isOtpSent ? (
                <>
                  {validatedOtp ? (
                    <div className={styles.iconsInline}>
                      {" "}
                      <CheckCircleOutlineIcon sx={{ fill: "#509E82" }} />
                      Verified
                    </div>
                  ) : (
                    <div></div>
                  )}
                </>
              ) : null}
            </div>

            {isOtpSent && (
              <>
                {countdown > 0 ? (
                  <>
                    {showTimer && (
                      <>
                        <h6 className={styles.errorMessage}>{otpErrorMessage}</h6>
                        <h6>
                          Resend OTP in {minutes}:{seconds}
                        </h6>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {otpErrorMessage}
                    <h6>
                      Did not recieve OTP?{" "}
                      <Link
                        onClick={showOtpField}
                        style={{ fontWeight: 600, color: "black" }}
                      >
                        {" "}
                        Resend OTP{" "}
                      </Link>{" "}
                    </h6>
                  </>
                )}
              </>
            )}
            <br></br>

            <div className={styles.termsAndPolicy}>
              <input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
              />
              <h5>
                I agree to the{" "}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/terms-policy"
                    onClick={onClose}
                  >
                    <span>Terms-and-Conditions </span>
                  </Link>

                  and

                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/privacy-policy"
                    onClick={onClose}
                  >
                    <span> Privacy-Policy </span>
                  </Link>
              </h5>
            </div>

            <h6>Your information is secured with us.</h6>

            <ButtonComponent
              type="submit"
              children="Continue"
              className={
                isAllValid && !isContinueClicked
                  ? `${styles.continueGradientButton}`
                  : `${styles.continueDisabledButton}`
              }
              disabled={!isAllValid || isContinueClicked}
            />
            <h4 className={styles.orSection}>OR</h4>

            <GoogleOAuthProvider clientId={clientId}>
             
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
              />
            </GoogleOAuthProvider>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;