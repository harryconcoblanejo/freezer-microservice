import  {verifyToken } from "../helpers.js";

const freezerModel = {
  getFreezerData: async (req, res) => {
    return res.send("recibiendo data");
  },
  sendFreezerData: async (req, res) => {
    const { data1 } = req.body;
    const token = req.headers.authorization; // usar este
    const tokenTest = 123;
    //verify token
    const authorized = verifyToken(tokenTest);
    if (authorized) {
      //meter todo el codigo aca
      return res.send({ data1, msj: "lalala" });
    } else {
      throw new Error("Unauthorized device!!");
    }
  },
};

export default freezerModel;
