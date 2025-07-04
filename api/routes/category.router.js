import express from 'express';
const category = express.Router();
import *as categorycontroller from '../controller/category.controller.js'
category.post("/save", categorycontroller.save);
category.get("/fetch", categorycontroller.fetch);
category.patch("/update", categorycontroller.update);
category.delete("/delete", categorycontroller.deletecategory);



export default category;