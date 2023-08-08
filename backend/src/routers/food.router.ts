import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

const router = Router();

router.get("/seed", asyncHandler(

   async(req, res) =>{
    
    const foodsCount = await FoodModel.countDocuments();
    if(foodsCount> 0){
       // console.log("Seed is already done");
        res.send("Seed is already done!");
        return;
    } else{
    await FoodModel.insertMany(sample_foods);
   // console.log("Seed is done");
    res.send("Seed is done!");
    }
}
)
)

router.get("/", asyncHandler(async (req, res) => {
    
      const foods = await FoodModel.find();
    //   console.log("Fetched foods:", foods); // Add this line for logging
      res.send(foods);
}
)
)
 



router.get("/search/:searchItem", asyncHandler(
    async(req, res) =>{
    const searchRegex = new RegExp(req.params.searchItem, 'i');
    const foods = await FoodModel.find({name:{$regex:searchRegex}})
   
    res.send(foods)
})
)
router.get("/tags", asyncHandler(
    async (req, res) => {
      const tags = await FoodModel.aggregate([
        {
          $unwind:'$tags'
        },
        {
          $group:{
            _id: '$tags',
            count: {$sum: 1}
          }
        },
        {
          $project:{
            _id: 0,
            name:'$_id',
            count: '$count'
          }
        }
      ]).sort({count: -1});
  
      const all = {
        name : 'All',
        count: await FoodModel.countDocuments()
      }
  
      tags.unshift(all);
      res.send(tags);
    }
  ))
  
  router.get("/tags/:tagName",asyncHandler(
    async (req, res) => {
      const foods = await FoodModel.find({tags: req.params.tagName})
      res.send(foods);
    }
  ))
  
  router.get("/:foodId", asyncHandler(
    async (req, res) => {
      const food = await FoodModel.findById(req.params.foodId);
      res.send(food);
    }
  ))

export default router;