import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,

    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
        minlength: 5,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
    },
    mobile: {
        type: String,
        required: [true, "mobile is required"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
    gender: {
        type: String,
        required: [true, "gender is required"],
    },
    role: String,
    status: Number,
    info: String,
});

//to apply unique validator
userSchema.plugin(mongooseUniqueValidator);

//schema validation 
const UserSchemaModel = mongoose.model('user_collections', userSchema);

export default UserSchemaModel;
