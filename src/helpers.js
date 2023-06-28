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
      id = await getNextId(db, "ref_id");
      break;
    default:
      throw new UserInputError("Wrong Type creation ID");
  }
  return type + "-" + id;
};

