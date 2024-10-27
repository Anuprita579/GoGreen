import React, {useRef} from 'react'
//MUI Components
import { Input as BaseInput } from "@mui/base/Input";
import Box from "@mui/system/Box";
import PropTypes from "prop-types";
import styles from "./styles.module.scss"

const OTP = ({ separator, length, value, onChange, validatedOtp }) => {
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
          <div key={index}>
            <BaseInput
              className={validatedOtp ? `${styles.otpInputboxDisabled}` : `${styles.otpInputbox}`}
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
          </div>
        ))}
      </Box>
  )
}

export default OTP

OTP.propTypes = {
    length: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    separator: PropTypes.node,
    value: PropTypes.string.isRequired,
  };
