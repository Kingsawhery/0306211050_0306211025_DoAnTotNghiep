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
  /^[a-z0-9][a-z0-9_.]{0,31}@[a-z0-9]{2,}(?:\.[a-z0-9]{2,4}){1,2}$/gm
  if (!email) {
    toast.dismiss();
    toast.error("Email enter required!");
    // setCheckValidInput({ ...defaultValidInput, isValidEmail: false });
    return false;
  } else if (!validEmail.test(email)) {
    toast.dismiss();
    toast.error("Please enter a valid email address");
    // setCheckValidInput({ ...defaultValidInput, isValidEmail: false });
    return false;
  }
  return true;
};

export const validatePhone = (phone) => {
  let validPhone = /^(84|0)(3|5|7|8|9)([0-9]{8})$/;
  if (validPhone.test(phone) && phone) {
    console.log(validPhone.test(phone));
    return true;
  }
  toast.dismiss();
  toast.error("Please enter a valid phone address");
  return false;
};
export const validatePassword = (password, comfirmPassword) => {
  if (!password) {
    toast.dismiss();
    toast.error("Phone enter password!");
    return false;
  } else if (password.length < 6) {
    toast.dismiss();
    toast.error("Enter passwords of 6 characters or more");
    return false;
  }
  if (password != comfirmPassword) {
    toast.dismiss();
    toast.error("Your password is not the same!");
  }
};
export const validateUserName = (username) => {
  let validName = /^\S+$/;
  if (!username) {
    toast.dismiss();
    toast.error("Name enter required!");
    return false;
  } else if (!validName.test(username)) {
    toast.dismiss();
    toast.error("Please provide valid name");
    return false;
  }
  return true;
};
//
export const validateNumber = (number) =>{
  var regex = /^[0-9]+$/gm;

  return regex.test(number);
}