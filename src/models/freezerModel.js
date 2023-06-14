import { veryfyToken } from "../helpers";

const freezerModel = {
  getFreezerData: async (req, res) => {
    return res.send("recibiendo data");
  },
  sendFreezerData: async (req, res) => {
    const token = req.headers.authorization
    //verify token
    const device = veryfyToken(token);
    console.log(device);

    const { data } = req.body;
    return res.send({ data, msj: "lalala" });
  },
};

export default freezerModel;
