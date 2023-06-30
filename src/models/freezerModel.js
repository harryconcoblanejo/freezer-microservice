import { getId, verifyToken } from "../helpers.js";

const freezerModel = {
  getFreezerData: async (req, res) => {
    return res.send("Recibiendo data desde freezerModel");
  },
  sendFreezerData: async (req, res, db) => {
    try {
      let context = {};
      context.db = db;
      const { readings } = req.body;
      const token = req.headers.authorization;
      const qr = req.headers["qr"];

      const authorized = await verifyToken(token, qr, db);
      const currentDay = getCurrentDay(); // Obtener el día actual en formato 'YYYY-MM-DD'

      let data;
      //si existe la collection 'refrigerators'
     let refrigerator_data = null
      // let refrigerator_data = await db
      //   .collection("refrigerations")
      //   .findOne({ qr: qr });

      // console.log(refrigerator_data);

      if (!refrigerator_data) {
        data = {
          readings: {},
        };
      } else {
        data = refrigerator_data.readings;
      }

      let params = data;
      // Verificar si ya existe un array de lecturas para el día correspondiente
      if (!params.readings[currentDay]) {
        params.readings[currentDay] = []; // Si no existe, crear un nuevo array vacío
      }

      // Agregar la lectura actual al array correspondiente al día

      readings.forEach((reading) => {
        console.log(reading);
        params.readings[currentDay].push({
          value: reading.value,
          timestamp: reading.timestamp,
        });
      });

      console.log(console.log(JSON.stringify(data, null, 2)));
      if (authorized) {
      /*   crear el documento en la collection refrigerators
     hacer un post en la DB

      ////codigo de ejemplo con shipments//////////

      let refrigerator = await context.db.collection("refrigerator").insertOne({
        unique_refrigerator_id: await getId(context.db, "REF"),
        refrigerator_id: await getId(context.db, "REF", company.company_id /belogn_to),
        company_id: company.company_id,
        qr: qr, 
        type: type,
        contents: contents,  
      });

       
      */
       await context.db.collection("refrigerations").insertOne({
        unique_refrigeration_id: await getId(context.db, "REF"),
        refrigeration_id: await getId(context.db, "REF", "COM-1"),
        qr: qr, 
        type: 'exibidora',
        contents: ['lacteos'],
        company_id:"COM-1",  //harcodeado
        readings:params.readings
      });
      let refrigerator= await context.db.collection('refrigerations').findOne({qr:qr})
      // modificar el device agregandole assigned_ref
        console.log(refrigerator)
        return res.send({ refrigerator, msj: "Data enviada con éxito!" });
      } else {
        res.send({ msj: "Token no autorizado" });
        throw new Error("Token no autorizado");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: `${error.message}, ("QR no autorizado")` });
    }
  },
};

// Función para obtener el día actual en formato 'YYYY-MM-DD'
function getCurrentDay() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default freezerModel;
