export function generateRandomString(character) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Các ký tự có thể sử dụng
  let result = ''; // Chuỗi kết quả

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); 
    result += characters.charAt(randomIndex); 
  }
  result = character + result;

  return result;
}