import { verifyToken } from "../helpers.js";

const freezerModel = {
  getFreezerData: async (req, res) => {
    return res.send("recibiendo data");
  },
  sendFreezerData: async (req, res, db) => {
    try {
      const { data1, qr } = req.body;
      const token = req.headers.authorization;

      //verify token
      const authorized = verifyToken(token, qr, db);
      if (authorized) {
        return res.send({ data1, msj: "lalala" });
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
