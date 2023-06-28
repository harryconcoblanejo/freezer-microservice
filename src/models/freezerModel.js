import { verifyToken } from "../helpers.js";
let data ={
  readings: {}
}
const freezerModel = {
  getFreezerData: async (req, res) => {
    return res.send('Recibiendo data desde freezerModel');
  },
  sendFreezerData: async (req, res, db) => {
    try {
      let context = {};
      context.db = db;
      const { readings} = req.body;
      const token = req.headers.authorization;
      const qr = req.headers['qr'];

      // Verificar el token
      const authorized = await verifyToken(token, qr, db);

      const currentDay = getCurrentDay(); // Obtener el día actual en formato 'YYYY-MM-DD'

     /*  let freezer = {
        assigned_to: 'COM-1',
        device_id: 'FRE-1',
        assigned_refrigerator: 'REF-1',
        battery_level: battery_level,
        readings: {}
      }; */

     

      // Verificar si ya existe un array de lecturas para el día correspondiente
      if (!data.readings[currentDay]) {
        data.readings[currentDay] = []; // Si no existe, crear un nuevo array vacío
      }

      // Agregar la lectura actual al array correspondiente al día
    
        readings.forEach(reading => {
          console.log('en el for')
          console.log(reading)
          data.readings[currentDay].push({
            value: reading.value,
            timestamp: reading.timestamp
          })
        });
      console.log('salgo del for');
      console.log(console.log(JSON.stringify(data, null, 2)))
      if (authorized) {
        
        return res.send({ data, msj: 'Data enviada con éxito!' });
      } else {
        res.send({ msj: 'Dispositivo no autorizado' });
        throw new Error('Dispositivo no autorizado');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// Función para obtener el día actual en formato 'YYYY-MM-DD'
function getCurrentDay() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default freezerModel;