import express from "express";
import freezerModel from '../models/freezerModel.js'
const router = express.Router();


router.get("/get", async(req, res) => {
  await freezerModel.getFreezerData(req,res)
});

router.post('/post',async(req,res)=>{    
   await freezerModel.sendFreezerData2(req,res,req.db)
})
module.exports = router;
