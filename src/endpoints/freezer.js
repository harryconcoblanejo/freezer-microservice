import express from "express";
import freezerModel from '../models/freezerModel.js'
const router = express.Router();


router.get("/get", async(req, res) => {
  // Lógica para obtener data
  await freezerModel.getFreezerData(req,res)
});

router.post('/post',async(req,res)=>{
    //logica para enviar data de freezers     
   await freezerModel.sendFreezerData(req,res)
})
module.exports = router;
