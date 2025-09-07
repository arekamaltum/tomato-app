import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food

const addFood=async (req,res)=>{
    let image_filename=`${req.file.filename}`
     const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
     })
     try {
        await food.save();
        res.status(201).send("food added")
     } catch (error) {
        console.log(error);
        res.json({success:false})
     }
}
//get all foods
const listFood=async (req,res)=>{
   try {
      const foods=await foodModel.find({});
      res.json({success:true,data:foods})
   } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message})
   }
}

const removeFood=async (req,res)=>{
   try {
      const food=await foodModel.findById(req.body.id) //get food from database
      fs.unlink(`uploads/${food.image}`,()=>{ })  //delete file from uploads folder
      await foodModel.findByIdAndDelete(req.body.id) //delete food from database
      res.json({success:true,message:"food removed successfully"})
   } catch (error) {
      res.json({success:false,message:error.message})
      console.log(error);
   }
}
export{addFood,listFood,removeFood}