import { getId, validateQrIsNumber, verifyToken } from "../helpers.js";

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
      validateQrIsNumber(qr);
      const device = await db.collection("devices").findOne({ qr: qr });

      const authorized = await verifyToken(token, qr, db);
      const currentDay = getCurrentDay(); // Obtener el día actual en formato 'YYYY-MM-DD'

      let device_readings;
      let collection_exists = false;

      let refrigerator_data = await db
        .collection("refrigerations")
        .findOne({ qr: qr });

      if (!refrigerator_data) {
        collection_exists = false;
        device_readings = {
          readings: {},
        };
      } else {
        collection_exists = true;
        device_readings = { readings: refrigerator_data.readings };
      }

      // Verificar si ya existe un array de lecturas para el día correspondiente
      if (!device_readings.readings[currentDay]) {
        device_readings.readings[currentDay] = []; // Si no existe, crear un nuevo array vacío
      }

      // Agregar la lectura actual al array correspondiente al día
      readings.forEach((reading) => {
        device_readings.readings[currentDay].push({
          value: reading.value,
          timestamp: reading.timestamp,
        });
      });

      //console.log(JSON.stringify(device_readings, null, 2));

      if (authorized) {
        if (!collection_exists) {
          await context.db.collection("refrigerations").insertOne({
            unique_refrigeration_id: await getId(context.db, "REF"),
            refrigeration_id: await getId(
              context.db,
              "REF",
              device.assigned_to
            ),
            qr: qr,
            type: "exibidora",//harcodeado
            contents: ["lacteos"],//harcodeado
            company_id: device.assigned_to,
            readings: device_readings.readings,
          });
        } else {
          await context.db.collection("refrigerations").findOneAndUpdate(
            { qr: qr },
            {
              $set: {
                readings: device_readings.readings,
              },
            }
          );
        }

        let refrigerator = await context.db
          .collection("refrigerations")
          .findOne({ qr: qr });

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
