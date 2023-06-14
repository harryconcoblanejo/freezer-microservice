const freezerModel = {
  getFreezerData: async (req, res) => {
    return res.send("recibiendo data");
  },
  sendFreezerData:async(req,res)=>{
    const data= req.body
    return res.send({data:data, msj:'lalala'})
  }
};

export default  freezerModel