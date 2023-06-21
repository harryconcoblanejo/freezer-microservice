import { verifyToken } from "../helpers.js";

const freezerModel = {
  getFreezerData: async (req, res) => {
    return res.send("recibiendo data");
  },
  sendFreezerData: async (req, res, db) => {
    try {
      const { readings,battery_level, current_temp, qr } = req.body;
      const token = req.headers.authorization;

      //verify token
      const authorized = verifyToken(token, qr, db);

    //Estructura del objeto data:
    /* 
    temperature_readings: { 
    value
    timestamp
    counter
    }

    battery_level:{
    departure
    arrival
    }

    alerts:[{
    type
    value
    timestamp
    }]

     status
     counter
     alerts_flags
     
     */

      if (authorized) {
        return res.send({readings, msj: "lalala" });
      } else {
        res.send({ msj: " device no autorizado" });
        throw new Error(" device no autorizado");
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default freezerModel;
