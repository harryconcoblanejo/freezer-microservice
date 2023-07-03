const jwt = require("jsonwebtoken");
// const signature = process.env.JWTS;
const signature = "superclave123";




export const verifyToken = async (token, qr, db) => {
  let authorized = false
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


const getNextId = async function (db, index, company) {
  let document;
console.log('este es el index');
console.log(index)
  if (company) {
    document = await db
      .collection("companies")
      .findOneAndUpdate(
        { company_id: company },
        { $inc: { [index]: 1 } },
        { returnDocument: 'after' }
      );
    return document.value;
  } else {
    

    document = await db
      .collection("counters")
      .findOneAndUpdate(
        { name: index },
        { $inc: { value: 1 } },
        { returnDocument: 'after' }
      );
    return document.value.value;
  }
};

export const getId = async function (db, type, company_id) {
  let id;

  switch (type) {
    case "REF":
      if (company_id != null) {
       
        id = await getNextId(db, "ref_counter", company_id);
        id = id.ref_counter + "-" + company_id.split("-")[1];
      } else {
        //si no viene el company ID es por que este es el id unico del envio.
        id = await getNextId(db, "refrigeration_id");
      }
      break;
    default:
      throw new UserInputError("Wrong Type creation ID");
  }
  return type + "-" + id;
};

export const validateQrIsNumber = (qr) => {

  if (isANumber(qr)) {
      return true
  } else {
      return false;
  }
};

const isANumber = (qr) => {

  let isNum = /^\d+$/.test(qr);
  if (isNum) {
      return true;
  } else {
      throw new UserInputError("The QR is not a number!");

  }

}
