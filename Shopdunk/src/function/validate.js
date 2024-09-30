import { toast } from "react-toastify";
// import { useState } from "react"; errrrrrrrrrrrrrrrrrrrrrr
// const defaultValidInput = {
//   isValidEmail: true,
//   isValidName: true,
//   isValidPhone: true,
//   isValidPassword: true,
//   isValidConFirmPassword: true,
// };
// const [checkValidInput, setCheckValidInput] = useState(defaultValidInput);
export const validateEmail = (email) => {
  // setCheckValidInput(defaultValidInput);
  let validEmail =
    /^(?:[a-z][a-z0-9_.]{0,31}@[a-z0-9]{2,}(?:.[a-z0-9]{2,4}){1,2})?$/gm;
  if (!email) {
    toast.error("Email enter required!");
    // setCheckValidInput({ ...defaultValidInput, isValidEmail: false });
    return false;
  } else if (!validEmail.test(email)) {
    toast.error("Please enter a valid email address");
    // setCheckValidInput({ ...defaultValidInput, isValidEmail: false });
    return false;
  }
  return true;
};
export const validatePhone = (phone) => {
  let validPhone =
    /^(?:(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3}))?$/;
  if (!phone) {
    toast.error("Phone enter required!");
    return false;
  } else if (!validPhone.test(phone)) {
    toast.error("Please provide valid phone number");
    return false;
  }
  return true;
};
export const validatePassword = (password, comfirmPassword) => {
  if (!password) {
    toast.error("Phone enter password!");
    return false;
  } else if (password.length < 6) {
    toast.error("Enter passwords of 6 characters or more");
    return false;
  }
  if (password != comfirmPassword) {
    toast.error("Your password is not the same!");
    return false;
  }
  return true;
};
export const validateUserName = (username) => {
  let validName = /^\S+$/;
  if (!username) {
    toast.error("Name enter required!");
    return false;
  } else if (!validName.test(username)) {
    toast.error("Please provide valid name");
    return false;
  }
  return true;
};
//
export const validateNumber = (number) => {
  var regex = /^[0-9]+$/gm;

  return regex.test(number);
};
