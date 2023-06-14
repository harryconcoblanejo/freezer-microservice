import  {verifyToken } from "../helpers.js";

const freezerModel = {
  getFreezerData: async (req, res) => {
    return res.send("recibiendo data");
  },
  sendFreezerData: async (req, res) => {
    try {
    const { data1 } = req.body;
    const token = req.headers.authorization; // usar este
    const tokenTest = 123;
    //verify token
    const authorized = verifyToken(tokenTest); 
    if (authorized) {
        //meter todo el codigo aca
        return res.send({ data1, msj: "lalala" });
      }
      else{
        res.send({msj:' device no autorizado'})
        throw new Error(' device no autorizado')
      }
    } catch (error) {
        console.log(error)
       
    }
   
  
  },
};

export default freezerModel;
