const jwt = require("jsonwebtoken");
// const signature = process.env.JWTS;
const signature = "superclave123";




export const verifyToken = async (token, qr, db) => {
  let authorized = false
  // revisar este codigo pq deja pasar cualquier token!!!!

  let context = {};
  context.db = db;
  
  let device = await context.db.collection("devices").findOne({ qr: qr} ,{projection:{token:1}});
  if (!token) {
    authorized = false
  }
  // verificar que sea el mismo token de la base de datos
  const bdtoken = device.token; 
 
  if (token == `Bearer ${bdtoken}`) {
    authorized = true
  } else {
    authorized = false
  }
  return authorized
};
