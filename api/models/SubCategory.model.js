import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
const SubCategoryschema = mongoose.Schema({
    _id: Number,
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
    subcaticonnm: {
        type: String,
        required: [true, "subcategory icon required"],
        trim:true
    },
});
SubCategoryschema.plugin(mongooseUniqueValidator);
const SubCategoryschemamodel = mongoose.model("SubCategory_collection", SubCategoryschema);
export default SubCategoryschemamodel;