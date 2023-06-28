import { verifyToken } from "../helpers.js";
let data = {
  readings: {},
};
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
      //si existe la collection 'freezers'
      let freezer_data = await db.collection('freezers').findOne({qr:qr})
      console.log(freezer_data)
      if(!freezer_data){
        data = {
          readings:{}
        }
      }else{
        data=freezer_data.readings
      }

      let params = data 
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
        return res.send({ params, msj: "Data enviada con éxito!" });
      } else {
        res.send({ msj: "Dispositivo no autorizado" });
        throw new Error("Dispositivo no autorizado");
      }
    } catch (error) {
      console.log(error);
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
