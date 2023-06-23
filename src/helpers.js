const jwt = require("jsonwebtoken");
// const signature = process.env.JWTS;
const signature = "superclave123";

export const verifyToken = async (token, qr, db) => {

  // revisar este codigo pq deja pasar cualquier token!!!!
  console.log("llega este token");
  console.log(token);
  let context = {};
  context.db = db;
  let device = await context.db.collection("devices").findOne({ qr: qr} ,{projection:{token:1}});
  if (!token) {
    return false;
  }
  // verificar que sea el mismo token de la base de datos
  const bdtoken = device.token; 
  if (token == bdtoken) {
    return true;
  } else {
    return false;
  }
};
