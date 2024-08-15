import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
//useContext
import { useActiveStep } from "../../utils/ActiveStepContext";
import { useLoginState } from "../../utils/LoginStateContext";
//API URL
// import { GenerateOTPAPI, ValidateOTPAPI } from "../../utils/apiUrl";
// import callAPI from "../../utils/apiAction";
//Common Components
import ButtonComponent from "../../commonComponents/ButtonComponent";
//MUI Components
import { Input as BaseInput } from "@mui/base/Input";
import Box from "@mui/system/Box";
import PropTypes from "prop-types";
//MUI ICONS
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
//Sign in with Google
// import { GoogleOAuthProvider, GoogleOAuthButton, GoogleLogin} from "@react-oauth/google";

function OTP({ separator, length, value, onChange, validatedOtp }) {
  console.log("Validated OTP for disabled otp input box: ", validatedOtp);
  const inputRefs = useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    if (!/\d/.test(currentValue)) {
      event.preventDefault();
      return;
    }

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      if (typeof prev !== "string") prev = ""; // Ensure prev is a string
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });

    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
      }}
    >
      {new Array(length).fill(null).map((_, index) => (
        <>
          <BaseInput
            className={validatedOtp ? "otp-inputbox-disabled" : "otp-inputbox"}
            aria-label={`Digit ${index + 1} of OTP`}
            disabled={validatedOtp}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? "",
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
};

const Signin = ({ sourceComponent, onClose }) => {
//   const GenerateOtp = GenerateOTPAPI;
//   const ValidateOtp = ValidateOTPAPI;
  const apiKey = process.env.REACT_APP_CLIENT_ID;
  console.log("API Key for signin with google : ", apiKey);
  const [loginResponse, setLoginResponse] = useState(null);

  const { incrementStep, setActiveStep } = useActiveStep();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [validatedOtp, setValidatedOtp] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); //checkbox
  const [isAllValid, setIsAllValid] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [isContinueClicked, setIsContinueClicked] = useState(false);
  const { isLoggedIn, userInfo, login, logout } = useLoginState();

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [mobileErrorMessage, setMobileErrorMessage] = useState("");
  const [otpErrorMessage, setOtpErrorMessage] = useState("");

  const handleLoginSuccess = (response) => {
    setLoginResponse(response);
  };
  console.log("Login Response Agter Signin with google : ", loginResponse);

  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
  };

  useEffect(() => {
    // const isUserLoggedIn = sessionStorage.getItem('signInCompleted');
    if (isLoggedIn) {
      incrementStep();
    }
  }, []);

  useEffect(() => {
    setIsAllValid(
      isCheckboxChecked &&
        isValidName &&
        isValidPhone &&
        isOtpSent &&
        validatedOtp
    );
  }, [isCheckboxChecked, isValidName, isValidPhone, isOtpSent, validatedOtp]);

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
      console.log("Form submited");
      // sessionStorage.setItem('signInCompleted', 'true');
      login({
        username: sessionStorage.getItem("name"),
        mobileNo: sessionStorage.getItem("mobileNo"),
      });
      //   console.log("Login State Context inside handleSubmit function : ", isLoggedIn, userInfo);
      setIsContinueClicked(true);
      switch (sourceComponent) {
        case "like":
          console.log("Login after like");
          break;
        case "header":
          console.log("Login after header.");
          onClose();
          break;
        case "aptitude-test":
          console.log("Login after Aptitude Test.");
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
  console.log("Login State Context without null : ", isLoggedIn, userInfo);

  const handleSignInSuccess = (response) => {
    console.log("Sign-in completed by GoogleOAuth : ", response);
    // setIsContinueClicked(true);
    // login({
    //     username: sessionStorage.getItem('name'),
    //     mobileNo: sessionStorage.getItem('mobileNo')
    //   });
    // incrementStep();
  };

  const mobileNo = phone;
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
    if (inputType === "phone") {
    setPhone(value);
    let regex = /^\d{10}$/;
    if (!regex.test(value.trim())) {
      setMobileErrorMessage("Enter a valid 10 digit mobile number");
      setIsValidPhone(false);
    } else {
      setMobileErrorMessage("");
      setIsValidPhone(true);
    }
  }
  };

  // otp block
  const [nameIsDisabled, setNameIsDisabled] = useState(false);
  const [phoneIsDisabled, setPhoneIsDisabled] = useState(false);
  const showOtpField = async () => {
    if (isValidName && isValidPhone) {
      if (phone.trim() === "") {
        setMobileErrorMessage("Mobile number is required");
      }
      if (fullName.trim() === "") {
        setNameErrorMessage("Full name is required");
      }
      if (
        fullName.trim() !== "" &&
        phone.trim() !== "" &&
        nameErrorMessage === "" &&
        mobileErrorMessage === ""
      ) {
        setMobileErrorMessage("");
        setNameErrorMessage("");
        // trigger api to generate otp
        // try {
        //   const { statusCode, message, loading, error } = await callAPI(
        //     GenerateOtp,
        //     "POST",
        //     { mobileNo, userName: fullName }
        //   );
        //   console.log("OTP data status code: ", statusCode);

        //   if (statusCode === 200) {
        //     setNameIsDisabled(true);
        //     setPhoneIsDisabled(true);

        //     console.log(statusCode);
        //     setIsOtpSent(true);
        //     setCountdown(120);
        //   } else {
        //     console.log("otp not generated");
        //     console.log(message);
        //     setIsOtpSent(false);
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
      }
    }
  };
  const handleEdit = () => {
    setPhoneIsDisabled(false);
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
      // validate otp
    //   try {
    //     const { statusCode, isSuccess, message, loading, error } =
    //       await callAPI(ValidateOtp, "POST", {
    //         mobileNo,
    //         userName: fullName,
    //         otp: otp,
    //       });
    //     console.log("Valid Data status code:", statusCode);
    //     console.log("isSuccess : ", isSuccess);

    //     if (statusCode === 200) {
    //       console.log(statusCode);
          
    //       if (isSuccess === true) {
    //         setOtp(otpVal);
    //         setValidatedOtp(true);
    //         setShowTimer(false);
    //       } else {
    //         setOtpErrorMessage("Invalid OTP");
    //         console.log(message);
    //         setValidatedOtp(false);
    //         setShowTimer(true);
    //         setOtp(""); // Reset OTP 
    //       }
    //     } else {
    //       setOtpErrorMessage("Invalid OTP");
    //       console.error("Server responded with error:");
    //       setValidatedOtp(false);
    //       setOtp(""); // Reset OTP
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
      // Store data using session
      sessionStorage.setItem("name", fullName);
      sessionStorage.setItem("mobileNo", phone);
    }
  };
  const handleCloseMenu = () => {
    onClose();
  }

  const location = useLocation();
  return (
    <>
      <div className="signin-page">
        <div className="signin-page-container">
        { !location.pathname.includes('calculate') && (
                <div className="closeIcon">
                    <ButtonComponent > 
                        <CloseIcon className='search-icon' onClick={handleCloseMenu} />
                    </ButtonComponent>
                </div>
            )}
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit} className="signin-form">
            <label htmlFor="Name">
              Name<sup>*</sup>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => check(e, "fullName")}
              placeholder="Enter full name"
              className="form-inputbox-name"
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
            <h5 className="error-messages">
              {nameErrorMessage !== "" && nameErrorMessage}
            </h5>
            <label htmlFor="phone">
              Mobile Number<sup>*</sup>
            </label>
            <div className="phone-row">
              <div className="form-inputbox">
                +91
                <hr></hr>
                {/* <input
                  type="text"
                  value={phone}
                  onChange={(e) => check(e, "phone")}
                  placeholder="Enter mobile number"
                  required
                  disabled={phoneIsDisabled}
                  onKeyDown={(event) => {
                    const char = event.key;
                    if (/[0-9]/.test(char) || char === 'Backspace' || char === 'ArrowLeft' || char === 'ArrowRight') {
                      return true;
                    } else {
                      event.preventDefault();
                    }
                  }}
                /> */}
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => check(e, "phone")}
                  placeholder="Enter mobile number"
                  required
                  disabled={phoneIsDisabled}
                  onKeyDown={(event) => {
                    const char = event.key;
                    if (
                      /[0-9]/.test(char) ||
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
                <div className="icons-inline">
                  {" "}
                  <CheckCircleOutlineIcon sx={{ fill: "#509E82" }} />
                  OTP sent
                </div>
              ) : (
                <ButtonComponent
                  children="Send OTP"
                  className={
                    isOtpSent
                      ? "disappear-button"
                      : isValidName && isValidPhone
                      ? "gradient-button-send-otp"
                      : "disabled-button"
                  }
                  onClick={showOtpField}
                  disabled={!isValidName || !isValidPhone}
                />
              )}
            </div>
            <h5 className="error-messages">
              {mobileErrorMessage !== "" && mobileErrorMessage}
            </h5>

            <label htmlFor="otp">
              OTP<sup>*</sup>
            </label>
            <div className="otp-row">
              <OTP
                value={otp}
                onChange={setOtp}
                length={4}
                validatedOtp={validatedOtp}
              />
              {isOtpSent ? (
                <>
                  {validatedOtp ? (
                    <div className="icons-inline">
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
                        <h6 className="error-message">{otpErrorMessage}</h6>
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

            <div className="terms-and-policy">
              <input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
              />
              {/* <h5>I agree to the <Link to="/terms-and-conditon" style={{color: "black"}}><Link style={{textDecoration: "none", color: "black"}} to="/Terms-Policy"><span>Terms-and-Conditions</span></Link></Link> and <span>Privacy-Policy</span></h5> */}
              <h5>
                I agree to the{" "}
                <Link to="/terms-and-conditon" style={{ color: "black" }}>
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
                </Link>{" "}
              </h5>
            </div>

            <h6>Your information is secured with us.</h6>

            <ButtonComponent
              type="submit"
              children="Continue"
              className={
                isAllValid && !isContinueClicked
                  ? "continue-gradient-button"
                  : "continue-disabled-button"
              }
              disabled={!isAllValid || isContinueClicked}
            />
            {/* <h4 className="or-section">OR</h4> */}
{/* 
            <GoogleOAuthProvider clientId={apiKey}>
             
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
              />
            </GoogleOAuthProvider> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;