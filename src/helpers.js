const jwt = require("jsonwebtoken");
// const signature = process.env.JWTS;
const signature = 'superclave123'

export const verifyToken = function (token) {

  if (!token) {
    return false;
  }
  // verificar que sea el mismo token de la base de datos
  const bdtoken = 123 //consultar el token de la BD
  if(token === bdtoken) {
   return true 
  }else{
    return false
  }
 
};
