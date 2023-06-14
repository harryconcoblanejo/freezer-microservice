import { veryfyToken } from "../helpers";

const freezerModel = {
  getFreezerData: async (req, res) => {
    return res.send("recibiendo data");
  },
  sendFreezerData: async (req, res) => {
    const token = req.headers.authorization // usar este
    const tokenTest=123
    //verify token
    const authorized = veryfyToken(tokenTest);
    if(authorized){
        //meter todo el codigo aca
    const { data } = req.body;
    return res.send({ data, msj: "lalala" });
    }else{
       throw new Error ("Unauthorized device!!"); 
    }
   
  },
};

export default freezerModel;
