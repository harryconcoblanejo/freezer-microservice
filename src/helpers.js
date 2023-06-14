const jwt = require("jsonwebtoken");
// const signature = process.env.JWTS;
const signature = 'superclave123'

export const verifyToken = function (token) {

  if (!token) {
    return null;
  }

  token = token?.split(" ")[1];

  let verifiedToken = jwt.verify(token, signature);

  let date = new Date();
  let expDate = new Date(verifiedToken.expires);

  if (date.getTime() > expDate.getTime()) {
    //console.log(`Token has expired`);
    return null;
  }

  let device = {
    deviceData: verifiedToken.deviceData,  
  };
  return device;
};
