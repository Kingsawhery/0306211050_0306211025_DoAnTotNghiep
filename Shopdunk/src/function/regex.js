export function isValidPhoneNumber(phone) {
    const regex = /^(0|\+84)(\d{9}|\d{10})$/;
    return regex.test(phone);
  }