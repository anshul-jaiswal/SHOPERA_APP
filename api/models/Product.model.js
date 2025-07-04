import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
const ProductSchema=mongoose.Schema({
    _id:Number,
    catnm:
    {
        type: String,
        required: [true, "category name is required"],
        trim: true,
        lowercase:true,
       
    },
    Subcatnm:
    {
        type: String,
        required: [true, "subcategory name is required"],
        trim: true,
        lowercase:true,
     
    },
    title:
    {
        type:String,
        require:[true,"Product name is required"],
        lowercase:true,
        trim:true,
        unique:true,
    },
    description:
    {
        type:String,
        require:[true,"Product Description is required"],
        lowercase:true,
        trime:true
    },
    price:{
        type:String,
        require:[true,"Product price is required"],
        trim:true,
        lowercase:true
    },
    size:{
        type:String,
        require:[true,"Product size is required"],
       trim:true
    },
    producticonnm:{
        type:String,
        require:[true,"Product icon name is required"],
        trim:true
    }

});
ProductSchema.plugin(mongooseUniqueValidator)

const ProductSchemamodel=mongoose.model('product_collection',ProductSchema)
export default ProductSchemamodel;