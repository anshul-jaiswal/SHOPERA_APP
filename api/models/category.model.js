import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
const categoryschema = mongoose.Schema({
    _id: Number,
    catnm:
    {
        type: String,
        required: [true, "category name is required"],
        trim: true,
        lowercase:true,
        unique:true,
    },
    caticonname: {
        type: String,
        required: [true, "category icon required"],
        trim:true
    },
});
categoryschema.plugin(mongooseUniqueValidator);
const categoryschemamodel = mongoose.model("category_collection", categoryschema);
export default categoryschemamodel;