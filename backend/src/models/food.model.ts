import   { Schema, model } from "mongoose";

export interface Food{
    id: string;
    name:string;
    cookTime:string;
    price:number;
    imageUrl:string;
    tags:string[];
    favorite:boolean; 
}

export const FoodSchema = new Schema<Food>(
    {
        // id: {type:mongoose.Schema.Types.ObjectId,required: true, unique:true},
        name:{type:String, required:true},
        cookTime:{type:String, required:true},
        price:{type:Number, required:true},
        imageUrl:{type:String, required:true},
        tags:{type:[String], required:true},
        favorite:{type:Boolean, default:false},
    },
   
    {
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals:true
        },
         timestamps:true
    }
   
);

export const FoodModel = model<Food>('Food', FoodSchema);